// Browser-only CPU tutor. Models are loaded only after an explicit user action.
export const MODEL_INFO = Object.freeze({
  name: 'Qwen2.5-0.5B-Instruct · Q4_K_M',
  bytes: 491400032,
  sha256: '74a4da8c9fdbcd15bd1f6d01d621410d31c6fc00986f5eb687824e7b93d7a9db',
  license: 'Apache-2.0',
  source: 'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF'
});
export const DEFAULT_MODEL_URL = 'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/6dd44a1fb35d11b5d1b28902876ce3cc9e882d0e/qwen2.5-0.5b-instruct-q4_k_m.gguf';
const failure = (code, message = code) => Object.assign(new Error(message), {code});

export function createTutor({onStatus = () => {}, contextProvider = () => ''} = {}) {
  let worker = null, pending = null, serial = 0;
  let state = {state: 'idle', progress: 0, model: '', code: ''};
  const emit = patch => { state = {...state, ...patch}; try { onStatus({...state}); } catch (_) {} };
  const stop = (code = 'cancelled') => {
    if (worker) worker.terminate();
    worker = null;
    if (pending) { clearTimeout(pending.timer); clearTimeout(pending.absolute); pending.reject(failure(code)); pending = null; }
    emit({state: 'idle', model: '', progress: 0, code});
  };
  function request(type, data, onToken) {
    if (pending) return Promise.reject(failure('busy'));
    return new Promise((resolve, reject) => {
      const id = ++serial;
      const timeout = () => { stop('timeout'); emit({state: 'error', code: 'timeout'}); };
      pending = {id, resolve, reject, onToken, timer: setTimeout(timeout, 120000), absolute: setTimeout(timeout, type === 'load' ? 600000 : 240000)};
      worker.postMessage({id, type, ...data});
    });
  }
  function attach() {
    worker = new Worker(new URL('./tutor-worker.js', import.meta.url), {type: 'module'});
    worker.onmessage = ({data}) => {
      if (!pending || data.id !== pending.id) return;
      if (data.type === 'progress' || data.type === 'token') {
        clearTimeout(pending.timer);
        pending.timer = setTimeout(() => { stop('timeout'); emit({state: 'error', code: 'timeout'}); }, 120000);
        if (data.type === 'progress') emit({progress: data.progress});
        else if (pending.onToken) { try { pending.onToken(data.text); } catch (_) {} }
        return;
      }
      const job = pending; pending = null;
      clearTimeout(job.timer); clearTimeout(job.absolute);
      if (data.type === 'error') {
        const err = failure(data.code || 'load-failed', data.message);
        stop(err.code); emit({state: 'error', code: err.code}); job.reject(err);
      } else {
        emit({state: 'ready', progress: 1, model: data.result.model || state.model, code: ''});
        job.resolve(data.result);
      }
    };
    worker.onerror = () => { stop('runtime-error'); emit({state: 'error', code: 'runtime-error'}); };
  }
  return {
    status: () => ({...state}),
    async loadModel(input = DEFAULT_MODEL_URL) {
      if (pending) throw failure('busy');
      if (location.protocol === 'file:' || typeof Worker === 'undefined' || typeof WebAssembly === 'undefined') throw failure('unsupported', 'Open with HTTPS or the included localhost server.');
      if (typeof input !== 'string' && !(input instanceof Blob)) throw failure('invalid-model');
      if (input instanceof Blob && input.size > 800 * 1024 * 1024) throw failure('model-size', 'Use a model below 800 MiB.');
      stop(''); attach(); emit({state: 'loading', progress: 0, code: ''});
      return request('load', {input, expected: input === DEFAULT_MODEL_URL ? MODEL_INFO : null});
    },
    async ask(question, {language = 'zh-TW', context, onToken} = {}) {
      if (pending) throw failure('busy');
      if (!worker || state.state !== 'ready') throw failure('not-ready');
      const q = String(question || '').trim().slice(0, 900);
      if (!q) throw failure('empty-question');
      let notes = context === undefined ? await contextProvider() : context;
      if (typeof notes !== 'string') notes = JSON.stringify(notes || '');
      emit({state: 'generating', code: ''});
      return request('ask', {question: q, language: String(language).slice(0, 32), context: notes.slice(0, 4000)}, onToken);
    },
    cancel: () => stop(),
    unload: async () => stop('')
  };
}

/* v3: prefer the model parts published with this site (models/manifest.json), else the pinned Hugging Face file */
export async function coachModelURL() { try { const r = await fetch('./models/manifest.json', { method: 'HEAD', cache: 'no-store' }); if (r.ok) return './models/manifest.json'; } catch { } return DEFAULT_MODEL_URL; }

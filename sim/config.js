// PUBLIC browser configuration for AERO Explorer v6. Never put a server secret or API key in this file.
// aiModelBase: leave empty to download the optional on-device AI models from huggingface.co (pinned revisions),
// or set it to your own mirror, e.g. 'https://huggingface.co/<user>/AERO-models/resolve/main/' or an R2/S3 public URL.
// The mirror must keep the original folder names, e.g. <base>onnx-community/Qwen2.5-0.5B-Instruct/onnx/model_quantized.onnx
// (upload-aero-v6.sh --models does this and can write the value here for you with --set-model-base).
globalThis.AERO_CONFIG = Object.freeze({
  aiModelBase: '',
});

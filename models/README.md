# Crew Lab coach model / Crew Lab 教練模型

The site works without model weights: the simulator and the Crew Lab page answer with a built-in, source-based guide.
Generative answers come from a small GGUF model that runs **inside the viewer's browser** (wllama, CPU, WebAssembly);
questions are never sent to a server.

網站不放模型也能使用（內建導覽）。生成式回答來自在**觀看者瀏覽器內**執行的小型 GGUF 模型，問題不會送到伺服器。

## Published on this site / 本網站發佈的模型

`models/manifest.json` + `models/part-<sha16>-NNN.bin` (format `resilience-gguf-parts-v1`): the GGUF split into parts of
at most 32 MiB, each with its SHA-256, plus the SHA-256 of the whole file. The coach loads `./models/manifest.json`
automatically when it exists, otherwise the pinned official file below.

Publish or replace it from the package root (the manifest is always published last):

```bash
bash upload-rcl-v3.sh --fetch-model          # download + verify the pinned Qwen2.5-0.5B-Instruct Q4_K_M, split, publish
bash upload-rcl-v3.sh --model my-model.gguf  # your own GGUF (≤ 800 MiB, Apache/MIT-compatible licence recommended)
```

## Default model / 預設模型

- **Qwen2.5-0.5B-Instruct Q4_K_M**, official Qwen repository, Apache-2.0 — https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF
- File `qwen2.5-0.5b-instruct-q4_k_m.gguf`, revision `6dd44a1fb35d11b5d1b28902876ce3cc9e882d0e`
- Bytes `491400032` (about 469 MiB), SHA-256 `74a4da8c9fdbcd15bd1f6d01d621410d31c6fc00986f5eb687824e7b93d7a9db`
- Licence: https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/blob/main/LICENSE

A 0.5B model is a compact starter for short explanations; it can be wrong and does not replace reviewed procedures.
Plan about 1.5–2 GB of free memory on laptops; low-memory phones can use the built-in guide.

0.5B 模型適合簡短說明，可能出錯，不能取代審定的程序。筆電建議預留約 1.5–2 GB 可用記憶體；低記憶體手機可使用內建導覽。

## Other weights / 其他權重

Files placed in `weights/` (package root), e.g. the simulator's optional ONNX tutor models, are uploaded to Hugging Face or
Cloudflare R2 / S3 by `upload-rcl-v3.sh --weights-to hf|r2` — never to GitHub Pages. Add `weights/README.md` with each
file's origin, revision and licence first. `--set-model-base` points `sim/config.js` (`aiModelBase`) at the mirror.

# CPU runtime provenance

Pinned @wllama/wllama 3.8.1 and @wllama/wllama-compat 3.8.1. MIT license is included as LICENSE.

index.js and main.wasm were copied from the official npm package; its tarball SHA-1 was checked against npm metadata (e0353359cbfa3d93c844bf5787914bfedc1190cb). compat-worker.js and compat.wasm were downloaded from version-pinned jsDelivr package URLs. runtime-manifest.json records SHA-256 checksums for the delivered assets.

Sources:
https://registry.npmjs.org/@wllama/wllama/-/wllama-3.8.1.tgz
https://cdn.jsdelivr.net/npm/@wllama/wllama-compat@3.8.1/wasm/wllama.js
https://cdn.jsdelivr.net/npm/@wllama/wllama-compat@3.8.1/wasm/wllama.wasm
https://github.com/ngxson/wllama

The application explicitly uses one CPU thread and zero GPU layers. Safari compatibility resources are local, so there is no hidden CDN dependency after installation. This is an integration based on official APIs, not a claim of completed physical-browser compatibility tests.

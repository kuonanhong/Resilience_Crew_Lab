# RESILIENCE CREW LAB 跨域協作訓練中心 v3

**繁體中文** · [English](#english)

公開、非作戰的協作教育網站：學徒以分工（操作者、導航員、觀察員、協調員）在**真實地點**練習觀察、巡檢、運送、環境記錄與資訊安全桌上演練。v3 把 v2 的訓練中心外殼和 AERO v6 的寫實地景引擎合在一起：真實地形、衛星影像、OpenStreetMap 建物與道路、真實天氣與太陽／月亮位置，左右手控制鍵在畫面正下方。手機、平板、筆電、桌機（Windows／macOS／Linux／Android／iOS／iPadOS）都能用。

## v3 新增

| 項目 | 內容 |
|---|---|
| 任務 | **272 項任務 = 49 種任務類型 × 真實地點**（台灣 202 項、世界 32 國 50 項、桌上演練 20 項）：空中 130、陸地 51、海上 39、水下 32、資訊 20。每種類型有自己的簡報、3 個目標、3 個操作前檢查、教官提醒，全部改寫為民用、非作戰內容（搜救觀察、淹水範圍、屋頂巡檢、醫療物資、森林與野火觀察、太陽能板、橋梁、坍方、海岸侵蝕、古蹟記錄、野生動物、農作、燈塔、通訊中繼、航空測量、物資分類、無障礙路線、道路障礙、避難所、車輛出勤、接力運輸、步道巡查、隧道口、市場物流、海洋垃圾、港區、救生圈、水質、碼頭、湖面巡邏、油污、珊瑚礁、海草床、船殼、海纜、湖底，以及 10 種資訊安全桌上演練）。 |
| 代表圖案 | 不再使用軍方照片。每張任務卡是**該任務真實地點的衛星影像**（依領域與地點調整縮放與中心，同一地點的不同任務畫面也不同）＋每種任務類型專屬的原創圖示與顏色；資訊演練是依類型與難度產生的插畫。 |
| 寫實地景 | 點任務即在全螢幕開啟寫實模擬器：台灣或世界真實地點的地形、衛星影像、建物、道路、水域、依影像種下的 3D 樹、海浪與湖面；站點依載具放在屋頂上空、可通行地面、水面或水下。 |
| 時辰／天候／季節 | 下拉選單：現在、清晨日出（太陽在東，依真實地形算出越過山稜的時刻，正對太陽會刺眼、有光暈與鏡頭鬼影）、上午、正午、下午、黃昏（太陽在西）、滿月夜（微弱月光）、無月夜；即時天氣、晴朗無雲、晴朗少雲（雲隨風飄、地面雲影移動）、多雲時晴、多雲、陰天、小雨、大雨、雷雨、霧、強風、下雪；今天、春、夏、秋、冬。後處理：HDR 光暈、眩光、曝光與白平衡、鏡頭雨滴、夜間雜訊、暗角、水下色偏。**預設：上午、晴朗少雲。** |
| 畫面 | 3D 畫面全寬、佔螢幕高度 85% 以上；左手 W A S D（升降與轉向）、右手方向鍵（前後與橫移）與控制鍵在畫面正下方。電腦可用鍵盤或滑鼠按畫面上的鍵；手機、平板用觸控搖桿或方向鍵。 |
| 廣角 | 視野預設 100°（60–130°），可開魚眼；拖曳畫面環顧上下左右，滾輪或兩指縮放。 |
| 預設即飛 | 首頁「立即在台灣飛行」或「AERO」直接到日月潭（2,776 個目的地之一）自由飛行；任務卡直接到任務地點。 |
| 任務流程 | 簡報（目標、檢查表、角色、教官提醒）→ 勾完檢查表才能開始 → 師傅逐步帶領（可朗讀、指出控制位置、隨任務狀態前進）→ 依序完成站點（光環、拍照 F、懸停、投放 G、跟隨）→ 返回起點 → 回顧：站點 60＋安全 20＋時間 15＋巡檢 5＝100 分、事件紀錄、文字回報、匯出 JSON。 |
| 團隊 | 模擬器的進度、分數、事件回傳到 Crew Lab 頁面；主持人在團隊房間自動分享狀態，隊友按「暫停請求」可暫停模擬器。 |
| AI 教練 | 學徒在模擬器問問題時，交給網站本身的 **Crew Lab 教練模型**（wllama＋Qwen2.5‑0.5B GGUF，在瀏覽器裡執行，不送伺服器），問題會附上當下地點、天氣、載具、站點與角色；也可選裝置上的 ONNX 小模型、或自己的 Claude／OpenAI／Gemini 金鑰（只存在該瀏覽器），或不用 AI 的內建導覽。 |
| 語言 | **40 種**，依觀看者瀏覽器語言、其次時區自動選擇；阿拉伯文、波斯文、希伯來文、烏爾都文右至左。任務文字與模擬器 40 種語言完整；訓練中心介面原 16 種＋新增 24 種。 |

## 立即啟動
```bash
bash tools/start-local.sh            # 開啟 http://127.0.0.1:8765
bash tools/start-local.sh 8765 --lan # 讓同一網路的手機、平板也能連（顯示區網網址）
```
macOS 可雙擊 `tools/start.command`；Windows 雙擊 `tools/start.bat`。需要 Python 3。請不要直接雙擊 HTML（ES modules、Worker 會被瀏覽器擋）。

## 上傳更新（`upload-rcl-v3.sh`）
```bash
bash upload-rcl-v3.sh --dry-run            # 只列出會上傳什麼
bash upload-rcl-v3.sh                      # 比對 SHA-256，只上傳新增或修改的檔案，確認一次後分批推送
bash upload-rcl-v3.sh --yes                # 不詢問（排程或 CI）
bash upload-rcl-v3.sh --fetch-model        # 下載固定版本的教練模型（491 MB，SHA-256 驗證、可續傳），切成 32 MiB 分片並發佈
bash upload-rcl-v3.sh --model 我的.gguf     # 用自己的 GGUF（≤ 800 MB）
bash upload-rcl-v3.sh --remove-legacy      # 一併移除 v2 遺留的 aero/ 與 training.js
bash upload-rcl-v3.sh --weights-to hf --hf-repo <帳號>/RCL-weights --set-model-base   # weights/ 內其他權重送 Hugging Face
```
- 使用專用 clone（`~/.cache/rcl-upload/`），每批約 20 MB 各自提交推送（`RCL_BATCH_MB=10` 可調），自動設定 HTTP/1.1 與大緩衝並重試，避免 `RPC failed; HTTP 400 … unexpected disconnect`；中斷後再執行一次即可接續。
- 模型分片每片一個提交，**manifest 最後才發佈**，網站不會指向未傳完的模型；已在網站上的分片不重傳。若倉庫的 `.gitattributes` 把這些檔案交給 Git LFS（GitHub Pages 無法提供），腳本會先停止並說明。
- 網站上已有的 `config.js`（Supabase 網址與公開金鑰）不會被覆蓋；網站裡沒有任何秘密金鑰。
- 需要 git 與 python3；建議先 `gh auth login` 或設定 SSH 金鑰。

## 資料來源與授權
衛星影像 © Esri, Maxar, Earthstar Geographics（Esri World Imagery）；地形 AWS Terrain Tiles；建物、道路、水域 © OpenStreetMap contributors（ODbL）／OpenFreeMap；天氣與海況 Open-Meteo（CC BY 4.0）；照片與條目 Wikimedia Commons／Wikipedia；台灣景點 交通部觀光署（政府資料開放授權）；世界遺產 UNESCO；國界 Natural Earth。程式庫 three.js（MIT）、3d-tiles-renderer（Apache-2.0）、wllama／llama.cpp（MIT）、transformers.js（Apache-2.0）、ONNX Runtime（MIT）；模型 Qwen2.5（Apache-2.0）、SmolLM2（Apache-2.0）。v2 的媒體與照片授權見 `references/MEDIA_CREDITS.md`。

## 誠實說明
任務是原創的教學練習，不是官方程序或現役裝備操作；真實地點只作為地理情境，不含即時或作業資料。地形約 10–30 m 解析度，建物來自 OSM 高度與輪廓，樹依影像推估；天候預設是視覺與物理近似，「即時天氣」才是當地實測；物理為訓練用簡化模型。評分是學習回饋，不是合格證明。AI 小模型可能出錯，回答會提醒區分模擬與真實訓練。

---
<a id="english"></a>
# English

Resilience Crew Lab v3 is a public, **non-combat** teamwork training site. Apprentices take roles (operator, navigator, observer, coordinator) and practise at **real places** with the AERO v6 real-world engine: real terrain, satellite imagery, OpenStreetMap buildings and roads, real weather, sun and moon. Works on phones, tablets, laptops and desktops.

- **272 missions** = 49 civilian mission types × real places (202 in Taiwan, 50 in 32 other countries, 20 desk drills): air 130, land 51, sea 39, underwater 32, digital 20. Every card shows the real place's satellite image plus a distinct per-type pictogram — no military photos.
- Time-of-day, weather and season menus (sunrise with terrain-aware sun glare, dusk, full-moon night, few clouds drifting with the wind, light / heavy rain, storm, fog, snow; four seasons) with cinematic post-processing; default morning with few clouds.
- 3D view ≥ 85 % of the screen height with both hand pads and controls right below it (also clickable on desktop); 100° wide view, fisheye option, drag to look around.
- Briefing → checklist gate → step-by-step mentor (read aloud, points at the control) → stations → return → debrief with the Crew Lab score (stations 60, safety 20, time 15, inspection 5), event log, report and JSON export; progress is shared with the team room.
- The apprentice's questions in the simulator go to the site's own on-device coach (wllama + Qwen2.5-0.5B GGUF), with the live mission context; other options: small ONNX models, your own Claude / OpenAI / Gemini key (kept in your browser), or the built-in guide.
- 40 interface languages chosen from the viewer's browser language, then time zone (RTL for ar, fa, he, ur).
- Run locally with `bash tools/start-local.sh`; publish with `bash upload-rcl-v3.sh` (SHA-256 diff, ~20 MB parts over HTTP/1.1 with retries, resumable; model parts one commit each with the manifest last; the site's config.js is never overwritten).

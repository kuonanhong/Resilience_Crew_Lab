/* Original sequential controls tutor. No external service, microphone or PII.
 * Browser speech is optional and starts only after an explicit button press.
 * Include mentor.css. Destroy the instance before replacing the training page.
 */
const labelKeys = 'title|intro|start|previous|next|replay|pause|resume|stop|skip|show|settings|voice|auto|rate|pitch|device|network|unavailable|speaking|paused|ready|complete|assist|voiceNote|noTarget|runAction|failed'.split('|');
const labelRows = {
 'zh-Hant':'師傅逐步帶領|先閱讀、再操作；按朗讀即可聽本步講解。|開始朗讀|上一步|下一步|重聽本步|暫停語音|繼續語音|停止語音|略過導覽|指出控制位置|聲音設定|裝置聲音|依語言自動選擇|語速|音高|裝置語音|網路語音|沒有相符語音，請閱讀文字。|正在講解|語音已暫停|等候操作|導覽結束；可重新開始。|開啟操作輔助|聲音依系統提供；名稱不代表性別。網路語音可能將講解文字傳送至系統語音服務。設定僅存於本機瀏覽器。|此介面未提供這個控制項。|執行本步操作|操作未完成，請稍後再試。',
 'zh-Hans':'师傅逐步带领|先阅读、再操作；按朗读即可听本步讲解。|开始朗读|上一步|下一步|重听本步|暂停语音|继续语音|停止语音|跳过导览|指出控制位置|声音设置|设备声音|按语言自动选择|语速|音高|设备语音|网络语音|没有匹配的语音，请阅读文字。|正在讲解|语音已暂停|等待操作|导览结束；可重新开始。|开启操作辅助|声音由系统提供；名称不代表性别。网络语音可能将讲解文字发送至系统语音服务。设置仅保存在本机浏览器。|此界面未提供这个控件。|执行本步操作|操作未完成，请稍后再试。',
 en:'Step-by-step mentor|Read, then practise. Choose Read aloud to hear this step.|Read aloud|Previous|Next step|Replay step|Pause voice|Resume voice|Stop voice|Skip guide|Show control|Voice settings|Device voice|Match language automatically|Speed|Pitch|Device voice|Network voice|No matching voice. Read the instructions instead.|Speaking|Voice paused|Ready to practise|Guide finished. You can start again.|Enable assistance|Voices come from your system; names do not identify gender. Network voices may send narration to the system speech provider. Preferences stay in this browser.|This control is unavailable in this view.|Run this step’s action|The action did not finish. Try again.',
 ja:'ステップ別ガイド|説明を読んでから操作します。読み上げでこの手順を聞けます。|読み上げる|前へ|次の手順|もう一度聞く|音声を一時停止|音声を再開|音声を停止|ガイドを省略|操作箇所を表示|音声設定|端末の音声|言語に合わせて自動選択|速度|高さ|端末音声|ネットワーク音声|対応する音声がありません。説明をお読みください。|説明中|音声を一時停止中|操作できます|ガイドが終了しました。再開できます。|操作支援を有効化|音声はシステムが提供します。名前は性別を示しません。ネットワーク音声は説明文を音声サービスへ送る場合があります。設定はこのブラウザに保存されます。|この画面ではこの操作を利用できません。|この手順の操作を実行|操作が完了しませんでした。もう一度お試しください。',
 ko:'단계별 안내|설명을 읽고 연습하세요. 읽어 주기를 누르면 현재 단계의 설명을 들을 수 있습니다.|읽어 주기|이전|다음 단계|다시 듣기|음성 일시 정지|음성 계속|음성 중지|안내 건너뛰기|조작 위치 보기|음성 설정|기기 음성|언어에 맞게 자동 선택|속도|음높이|기기 음성|네트워크 음성|해당 언어 음성이 없습니다. 설명을 읽어 주세요.|설명 중|음성 일시 정지됨|연습 준비 완료|안내가 끝났습니다. 다시 시작할 수 있습니다.|조작 보조 켜기|음성은 시스템에서 제공합니다. 이름은 성별을 나타내지 않습니다. 네트워크 음성은 설명을 시스템 음성 서비스로 전송할 수 있습니다. 설정은 이 브라우저에 저장됩니다.|이 화면에서는 해당 조작을 사용할 수 없습니다.|현재 단계 작업 실행|작업이 완료되지 않았습니다. 다시 시도하세요.',
 fr:'Guide étape par étape|Lisez, puis pratiquez. Lancez la lecture pour écouter cette étape.|Lire à voix haute|Précédent|Étape suivante|Réécouter|Suspendre la voix|Reprendre la voix|Arrêter la voix|Passer le guide|Montrer la commande|Réglages vocaux|Voix de l’appareil|Choisir selon la langue|Vitesse|Hauteur|Voix locale|Voix en réseau|Aucune voix adaptée. Lisez les instructions.|Lecture en cours|Voix en pause|Prêt à pratiquer|Guide terminé. Vous pouvez recommencer.|Activer l’assistance|Les voix sont fournies par le système ; leur nom ne précise pas le genre. Les voix en réseau peuvent envoyer le texte au service vocal du système. Les préférences restent dans ce navigateur.|Cette commande est indisponible dans cette vue.|Exécuter l’action de cette étape|L’action n’a pas abouti. Réessayez.',
 de:'Schrittweiser Mentor|Erst lesen, dann üben. Mit Vorlesen hören Sie diesen Schritt.|Vorlesen|Zurück|Nächster Schritt|Erneut anhören|Sprachausgabe pausieren|Sprachausgabe fortsetzen|Sprachausgabe stoppen|Anleitung überspringen|Bedienelement zeigen|Stimmeinstellungen|Gerätestimme|Sprache automatisch zuordnen|Tempo|Tonhöhe|Gerätestimme|Netzwerkstimme|Keine passende Stimme. Bitte lesen Sie die Anleitung.|Wird vorgelesen|Sprachausgabe pausiert|Bereit zum Üben|Anleitung beendet. Sie können erneut beginnen.|Assistenz aktivieren|Stimmen kommen vom System; Namen kennzeichnen kein Geschlecht. Netzwerkstimmen können den Text an den Sprachdienst des Systems senden. Einstellungen bleiben in diesem Browser.|Dieses Bedienelement ist hier nicht verfügbar.|Aktion dieses Schritts ausführen|Die Aktion wurde nicht abgeschlossen. Versuchen Sie es erneut.',
 es:'Guía paso a paso|Lea y después practique. Pulse Leer para escuchar este paso.|Leer en voz alta|Anterior|Siguiente paso|Volver a escuchar|Pausar voz|Reanudar voz|Detener voz|Omitir guía|Mostrar control|Ajustes de voz|Voz del dispositivo|Elegir según el idioma|Velocidad|Tono|Voz local|Voz de red|No hay una voz compatible. Lea las instrucciones.|Leyendo|Voz en pausa|Listo para practicar|Guía terminada. Puede empezar de nuevo.|Activar asistencia|El sistema proporciona las voces; sus nombres no identifican el género. Las voces de red pueden enviar el texto al servicio de voz del sistema. Las preferencias quedan en este navegador.|Este control no está disponible en esta vista.|Ejecutar la acción de este paso|La acción no se completó. Inténtelo de nuevo.',
 pt:'Guia passo a passo|Leia e depois pratique. Escolha Ler para ouvir esta etapa.|Ler em voz alta|Anterior|Próxima etapa|Ouvir novamente|Pausar voz|Retomar voz|Parar voz|Ignorar guia|Mostrar controle|Configurações de voz|Voz do dispositivo|Escolher pelo idioma|Velocidade|Tom|Voz local|Voz de rede|Nenhuma voz compatível. Leia as instruções.|Lendo|Voz pausada|Pronto para praticar|Guia concluído. Você pode recomeçar.|Ativar assistência|As vozes vêm do sistema; os nomes não identificam gênero. Vozes de rede podem enviar o texto ao serviço de voz do sistema. As preferências ficam neste navegador.|Este controle não está disponível nesta tela.|Executar a ação desta etapa|A ação não foi concluída. Tente novamente.',
 it:'Guida passo per passo|Leggi, poi fai pratica. Premi Leggi per ascoltare questo passaggio.|Leggi ad alta voce|Precedente|Passaggio successivo|Riascolta|Pausa voce|Riprendi voce|Ferma voce|Salta guida|Mostra comando|Impostazioni vocali|Voce del dispositivo|Scegli secondo la lingua|Velocità|Tono|Voce locale|Voce di rete|Nessuna voce compatibile. Leggi le istruzioni.|Lettura in corso|Voce in pausa|Pronto per la pratica|Guida conclusa. Puoi ricominciare.|Attiva assistenza|Le voci provengono dal sistema; i nomi non indicano il genere. Le voci di rete possono inviare il testo al servizio vocale del sistema. Le preferenze restano in questo browser.|Questo comando non è disponibile in questa vista.|Esegui l’azione di questo passaggio|L’azione non è terminata. Riprova.',
 ar:'مرشد خطوة بخطوة|اقرأ ثم تدرّب. اضغط القراءة الصوتية لسماع هذه الخطوة.|قراءة صوتية|السابق|الخطوة التالية|إعادة الاستماع|إيقاف الصوت مؤقتاً|متابعة الصوت|إيقاف الصوت|تخطي الدليل|إظهار أداة التحكم|إعدادات الصوت|صوت الجهاز|اختيار تلقائي حسب اللغة|السرعة|طبقة الصوت|صوت محلي|صوت شبكي|لا يوجد صوت مناسب. اقرأ التعليمات.|جارٍ الشرح|الصوت متوقف مؤقتاً|جاهز للتدريب|انتهى الدليل. يمكنك البدء من جديد.|تفعيل المساعدة|يوفر النظام الأصوات؛ ولا تدل أسماؤها على الجنس. قد ترسل الأصوات الشبكية النص إلى خدمة النطق في النظام. تبقى التفضيلات في هذا المتصفح.|أداة التحكم هذه غير متاحة في هذه الشاشة.|تنفيذ إجراء هذه الخطوة|لم يكتمل الإجراء. حاول مجدداً.',
 hi:'चरणबद्ध मार्गदर्शक|पहले पढ़ें, फिर अभ्यास करें। यह चरण सुनने के लिए पढ़कर सुनाएँ दबाएँ।|पढ़कर सुनाएँ|पिछला|अगला चरण|फिर सुनें|आवाज़ रोकें|आवाज़ जारी रखें|आवाज़ बंद करें|मार्गदर्शक छोड़ें|नियंत्रण दिखाएँ|आवाज़ सेटिंग|डिवाइस की आवाज़|भाषा के अनुसार स्वतः चुनें|गति|स्वर की ऊँचाई|स्थानीय आवाज़|नेटवर्क आवाज़|उपयुक्त आवाज़ नहीं है। निर्देश पढ़ें।|समझाया जा रहा है|आवाज़ रुकी है|अभ्यास के लिए तैयार|मार्गदर्शक पूरा हुआ। फिर शुरू कर सकते हैं।|सहायता चालू करें|आवाज़ें सिस्टम से मिलती हैं; नाम लिंग नहीं बताते। नेटवर्क आवाज़ें पाठ को सिस्टम की वाक् सेवा को भेज सकती हैं। सेटिंग इसी ब्राउज़र में रहती हैं।|इस दृश्य में यह नियंत्रण उपलब्ध नहीं है।|इस चरण की क्रिया करें|क्रिया पूरी नहीं हुई। फिर प्रयास करें।',
 id:'Panduan langkah demi langkah|Baca, lalu berlatih. Pilih Bacakan untuk mendengar langkah ini.|Bacakan|Sebelumnya|Langkah berikutnya|Dengarkan lagi|Jeda suara|Lanjutkan suara|Hentikan suara|Lewati panduan|Tunjukkan kontrol|Pengaturan suara|Suara perangkat|Pilih sesuai bahasa|Kecepatan|Nada|Suara lokal|Suara jaringan|Tidak ada suara yang cocok. Baca petunjuknya.|Sedang menjelaskan|Suara dijeda|Siap berlatih|Panduan selesai. Anda dapat memulai lagi.|Aktifkan bantuan|Suara disediakan sistem; namanya tidak menunjukkan gender. Suara jaringan dapat mengirim teks ke layanan suara sistem. Preferensi tetap di peramban ini.|Kontrol ini tidak tersedia pada tampilan ini.|Jalankan tindakan langkah ini|Tindakan belum selesai. Coba lagi.',
 vi:'Hướng dẫn từng bước|Đọc rồi thực hành. Chọn Đọc thành tiếng để nghe bước này.|Đọc thành tiếng|Trước|Bước tiếp theo|Nghe lại|Tạm dừng giọng nói|Tiếp tục giọng nói|Dừng giọng nói|Bỏ qua hướng dẫn|Chỉ vị trí điều khiển|Cài đặt giọng nói|Giọng của thiết bị|Tự chọn theo ngôn ngữ|Tốc độ|Cao độ|Giọng cục bộ|Giọng qua mạng|Không có giọng phù hợp. Hãy đọc hướng dẫn.|Đang hướng dẫn|Giọng nói đã tạm dừng|Sẵn sàng thực hành|Đã hết hướng dẫn. Bạn có thể bắt đầu lại.|Bật hỗ trợ|Giọng do hệ thống cung cấp; tên không biểu thị giới tính. Giọng qua mạng có thể gửi văn bản đến dịch vụ giọng nói của hệ thống. Tùy chọn chỉ lưu trong trình duyệt này.|Màn hình này không có điều khiển đó.|Thực hiện thao tác của bước này|Thao tác chưa hoàn tất. Hãy thử lại.',
 th:'ผู้สอนทีละขั้นตอน|อ่านแล้วฝึก กดอ่านออกเสียงเพื่อฟังคำอธิบายขั้นตอนนี้|อ่านออกเสียง|ก่อนหน้า|ขั้นตอนถัดไป|ฟังอีกครั้ง|พักเสียง|เล่นเสียงต่อ|หยุดเสียง|ข้ามคำแนะนำ|ชี้ตำแหน่งควบคุม|การตั้งค่าเสียง|เสียงของอุปกรณ์|เลือกตามภาษาอัตโนมัติ|ความเร็ว|ระดับเสียงสูงต่ำ|เสียงในอุปกรณ์|เสียงผ่านเครือข่าย|ไม่มีเสียงที่ตรงภาษา โปรดอ่านคำแนะนำ|กำลังอธิบาย|พักเสียงแล้ว|พร้อมฝึก|จบคำแนะนำแล้ว เริ่มใหม่ได้|เปิดระบบช่วยควบคุม|ระบบเป็นผู้ให้เสียง ชื่อไม่ได้ระบุเพศ เสียงผ่านเครือข่ายอาจส่งข้อความไปยังบริการเสียงของระบบ การตั้งค่าอยู่ในเบราว์เซอร์นี้เท่านั้น|ไม่มีตัวควบคุมนี้ในหน้าจอปัจจุบัน|ทำการกระทำของขั้นตอนนี้|การกระทำยังไม่เสร็จ โปรดลองอีกครั้ง',
 ms:'Panduan langkah demi langkah|Baca, kemudian berlatih. Pilih Bacakan untuk mendengar langkah ini.|Bacakan|Sebelumnya|Langkah seterusnya|Dengar semula|Jeda suara|Sambung suara|Hentikan suara|Langkau panduan|Tunjukkan kawalan|Tetapan suara|Suara peranti|Pilih mengikut bahasa|Kelajuan|Nada|Suara setempat|Suara rangkaian|Tiada suara yang sepadan. Baca arahan.|Sedang menerangkan|Suara dijeda|Sedia untuk berlatih|Panduan selesai. Anda boleh mula semula.|Aktifkan bantuan|Suara disediakan sistem; namanya tidak menunjukkan jantina. Suara rangkaian mungkin menghantar teks kepada perkhidmatan suara sistem. Tetapan kekal dalam pelayar ini.|Kawalan ini tiada dalam paparan ini.|Jalankan tindakan langkah ini|Tindakan belum selesai. Cuba lagi.'
};
const stepRows = {
 'zh-Hant':[
  ['任務簡報','先閱讀任務目標，確認操作員、導航員、觀察員與協調員的分工。這是虛構的教育練習。'],
  ['操作前檢查','逐項閱讀並勾選檢查表。確認環境、通訊與停止條件後，按確認。不要為了快速通過而略過檢查。'],
  ['先開啟操作輔助','建議初學者先開啟操作輔助，以較平順的反應練習。控制區的輔助按鈕可隨時切換；它不會替你完成任務。'],
  ['前進與後退','按開始後，短按 W 或上箭頭前進，S 或下箭頭後退。手機請按畫面下方方向鍵；放開即可停止輸入，載具仍會短暫滑行。'],
  ['左右轉向','A 或左箭頭向左轉；D 或右箭頭向右轉。這是改變朝向，不是側移。先減速再轉彎，注意慣性。'],
  ['升降與側移','R 上升，F 下降；Q 向左側移，E 向右側移。手機使用右側控制鍵。朝向不變的側移和轉向不同。'],
  ['接近檢查點','緩慢接近目前的檢查點，降低速度再按檢查。若太遠或太快，先調整位置。暫停只暫停模擬，並非真實載具煞車。'],
  ['任務回顧','完成後查看事件與分數，討論安全、準確度及分工，再匯出紀錄。分數代表本模擬的表現，不是專業資格。'],
  ['辨識與核對','在資訊工作台閱讀每個情境，核對證據後再選答案。不要輸入真實帳密、個資或機密；向同伴說明判斷理由。'] ],
 'zh-Hans':[
  ['任务简报','先阅读任务目标，确认操作员、导航员、观察员与协调员的分工。这是虚构的教育练习。'],
  ['操作前检查','逐项阅读并勾选检查表。确认环境、通信与停止条件后，按确认。不要为了快速通过而跳过检查。'],
  ['先开启操作辅助','建议初学者先开启操作辅助，以较平顺的响应练习。控制区的辅助按钮可随时切换；它不会替你完成任务。'],
  ['前进与后退','按开始后，短按 W 或上箭头前进，S 或下箭头后退。手机请按画面下方方向键；松开即可停止输入，载具仍会短暂滑行。'],
  ['左右转向','A 或左箭头向左转；D 或右箭头向右转。这是改变朝向，不是侧移。先减速再转弯，注意惯性。'],
  ['升降与侧移','R 上升，F 下降；Q 向左侧移，E 向右侧移。手机使用右侧控制键。朝向不变的侧移和转向不同。'],
  ['接近检查点','缓慢接近当前检查点，降低速度再按检查。如果太远或太快，先调整位置。暂停只暂停模拟，并非真实载具刹车。'],
  ['任务回顾','完成后查看事件与分数，讨论安全、准确度及分工，再导出记录。分数代表本模拟的表现，不是专业资格。'],
  ['识别与核对','在信息工作台阅读每个情境，核对证据后再选答案。不要输入真实账号密码、个人信息或机密；向同伴说明判断理由。'] ],
 en:[
  ['Mission briefing','Read the objectives and agree who operates, navigates, observes and coordinates. This is a fictional educational exercise.'],
  ['Before you operate','Read and tick each checklist item. Confirm the environment, communication and stopping conditions, then press Confirm. Do not skip checks to finish faster.'],
  ['Start with assistance','Beginners can enable assistance for smoother responses. Toggle it using the assistance control whenever needed. It does not complete the mission for you.'],
  ['Move forward and back','Press Start, then briefly hold W or the up arrow to move forward; S or the down arrow moves back. On mobile use the controls below the view. Releasing stops input; momentum can continue briefly.'],
  ['Turn left and right','A or the left arrow turns left; D or the right arrow turns right. This changes heading rather than moving sideways. Slow down before turning and allow for inertia.'],
  ['Climb and move sideways','R climbs and F descends; Q moves left and E moves right sideways. On mobile use the right controls. Sideways movement keeps the heading and differs from turning.'],
  ['Approach a checkpoint','Approach the current checkpoint slowly and press Inspect at low speed. If too far away or too fast, adjust first. Pause stops the simulation; it is not a real vehicle brake.'],
  ['Review the mission','Review events and scores, discuss safety, accuracy and roles, then export your record. The score reflects this simulation, not professional qualification.'],
  ['Identify and verify','Read each situation at the digital desk and check the evidence before answering. Do not enter real credentials, personal data or secrets. Explain your reasoning to your team.'] ],
 ja:[
  ['任務の説明','目標を読み、操縦、航法、観察、調整の担当を決めます。これは架空の教育演習です。'],
  ['操作前の確認','チェック項目を読み、一つずつ選択します。環境、連絡手段、停止条件を確認して確認ボタンを押します。早く終えるために確認を省略しないでください。'],
  ['操作支援を使う','初心者は操作支援を有効にすると、穏やかな応答で練習できます。支援ボタンで切り替えられます。任務を自動で完了する機能ではありません。'],
  ['前進と後退','開始を押し、W または上矢印を短く押して前進、S または下矢印で後退します。携帯端末では画面下の操作キーを使います。離すと入力は止まりますが、慣性は少し残ります。'],
  ['左右に旋回','A または左矢印で左旋回、D または右矢印で右旋回します。横移動ではなく向きを変えます。旋回前に減速し、慣性に注意してください。'],
  ['上昇・下降と横移動','R で上昇、F で下降、Q で左へ、E で右へ横移動します。携帯端末では右側のキーを使います。横移動では向きは変わりません。'],
  ['確認地点へ近づく','現在の確認地点にゆっくり近づき、低速で検査を押します。遠すぎる、または速すぎる場合は調整します。一時停止はシミュレーションを止めるもので、実車のブレーキではありません。'],
  ['任務を振り返る','記録と点数を確認し、安全、正確さ、役割分担を話し合って記録を出力します。点数はこの演習の評価であり、専門資格ではありません。'],
  ['識別と照合','情報作業台の状況を読み、証拠を確かめてから回答します。本物の認証情報、個人情報、機密は入力しないでください。判断の理由を仲間に説明します。'] ],
 ko:[
  ['임무 설명','목표를 읽고 조종, 항법, 관찰, 조정 역할을 정하세요. 가상의 교육용 연습입니다.'],
  ['조작 전 확인','각 점검 항목을 읽고 선택하세요. 환경, 통신, 중단 조건을 확인한 뒤 확인 버튼을 누르세요. 빨리 끝내려고 점검을 생략하지 마세요.'],
  ['보조 기능으로 시작','초보자는 보조 기능을 켜서 부드러운 반응으로 연습할 수 있습니다. 보조 버튼으로 언제든 전환하세요. 임무를 대신 완료하지는 않습니다.'],
  ['전진과 후진','시작을 누른 뒤 W 또는 위 화살표로 잠깐 전진하고 S 또는 아래 화살표로 후진하세요. 모바일에서는 화면 아래 키를 쓰세요. 놓으면 입력은 멈추지만 관성은 잠시 남습니다.'],
  ['좌우 회전','A 또는 왼쪽 화살표는 좌회전, D 또는 오른쪽 화살표는 우회전입니다. 옆으로 이동하는 대신 방향을 바꿉니다. 회전 전 속도를 줄이고 관성을 고려하세요.'],
  ['상하 및 옆 이동','R은 상승, F는 하강, Q는 왼쪽 옆 이동, E는 오른쪽 옆 이동입니다. 모바일에서는 오른쪽 키를 쓰세요. 옆 이동은 방향을 유지합니다.'],
  ['점검 지점 접근','현재 점검 지점에 천천히 접근해 저속에서 점검을 누르세요. 너무 멀거나 빠르면 먼저 조정하세요. 일시 정지는 시뮬레이션을 멈추며 실제 차량의 브레이크가 아닙니다.'],
  ['임무 돌아보기','사건과 점수를 살펴보고 안전, 정확도, 역할 분담을 토의한 뒤 기록을 내보내세요. 점수는 시뮬레이션 평가이며 전문 자격이 아닙니다.'],
  ['식별과 검증','정보 작업대의 상황을 읽고 증거를 확인한 뒤 답하세요. 실제 계정 정보, 개인 정보, 기밀을 입력하지 마세요. 판단 근거를 팀에 설명하세요.'] ],
 fr:[
  ['Briefing de mission','Lisez les objectifs et répartissez pilotage, navigation, observation et coordination. Cet exercice pédagogique est fictif.'],
  ['Vérifications préalables','Lisez et cochez chaque élément. Vérifiez environnement, communication et conditions d’arrêt, puis confirmez. Ne sautez pas de vérification pour gagner du temps.'],
  ['Commencer avec assistance','L’assistance adoucit les réactions pour les débutants. Vous pouvez la basculer avec sa commande. Elle ne réalise pas la mission à votre place.'],
  ['Avancer et reculer','Appuyez sur Démarrer, puis brièvement sur W ou la flèche haut pour avancer, S ou la flèche bas pour reculer. Sur mobile, utilisez les commandes sous la vue. Relâcher coupe la commande, mais l’inertie peut subsister.'],
  ['Tourner à gauche et à droite','A ou la flèche gauche tourne à gauche ; D ou la flèche droite tourne à droite. Cela change le cap sans translation latérale. Ralentissez avant de tourner et prévoyez l’inertie.'],
  ['Monter et se déplacer latéralement','R fait monter et F descendre ; Q déplace à gauche et E à droite. Sur mobile, utilisez les commandes de droite. Le déplacement latéral conserve le cap.'],
  ['Approcher un point de contrôle','Approchez lentement du point actif et appuyez sur Inspecter à faible vitesse. Corrigez une distance ou une vitesse excessive. Pause arrête la simulation, ce n’est pas un frein réel.'],
  ['Bilan de mission','Examinez événements et scores, discutez sécurité, précision et rôles, puis exportez le compte rendu. Le score évalue cette simulation, pas une qualification professionnelle.'],
  ['Identifier et vérifier','Lisez chaque situation du bureau numérique et vérifiez les preuves avant de répondre. Ne saisissez aucun identifiant réel, donnée personnelle ou secret. Expliquez votre raisonnement à l’équipe.'] ],
 de:[
  ['Missionsbesprechung','Lesen Sie die Ziele und verteilen Sie Bedienung, Navigation, Beobachtung und Koordination. Dies ist eine fiktive Lernübung.'],
  ['Vor der Bedienung','Lesen und markieren Sie jeden Prüfpunkt. Prüfen Sie Umgebung, Kommunikation und Abbruchbedingungen und bestätigen Sie dann. Überspringen Sie keine Prüfung, um schneller fertig zu werden.'],
  ['Mit Assistenz beginnen','Die Assistenz ermöglicht Anfängern ruhigere Reaktionen. Sie lässt sich jederzeit am Assistenzschalter umstellen. Sie erledigt die Mission nicht für Sie.'],
  ['Vorwärts und rückwärts','Drücken Sie Start und kurz W oder Pfeil auf für vorwärts; S oder Pfeil ab bewegt rückwärts. Mobil nutzen Sie die Tasten unter der Ansicht. Loslassen beendet die Eingabe, die Trägheit wirkt kurz weiter.'],
  ['Nach links und rechts drehen','A oder Pfeil links dreht nach links, D oder Pfeil rechts nach rechts. Das ändert die Ausrichtung statt seitlich zu verschieben. Bremsen Sie vor Kurven ab und beachten Sie die Trägheit.'],
  ['Steigen und seitlich bewegen','R steigt, F sinkt; Q bewegt seitlich nach links und E nach rechts. Mobil nutzen Sie die rechten Tasten. Seitliche Bewegung behält die Ausrichtung bei.'],
  ['Einen Prüfpunkt anfahren','Nähern Sie sich dem aktiven Prüfpunkt langsam und prüfen Sie bei geringer Geschwindigkeit. Korrigieren Sie zuerst zu großen Abstand oder zu hohes Tempo. Pause stoppt die Simulation und ist keine reale Fahrzeugbremse.'],
  ['Mission auswerten','Prüfen Sie Ereignisse und Punkte, besprechen Sie Sicherheit, Genauigkeit und Rollen und exportieren Sie das Protokoll. Die Wertung betrifft diese Simulation und ist kein Berufsabschluss.'],
  ['Erkennen und überprüfen','Lesen Sie jede Situation am digitalen Arbeitsplatz und prüfen Sie die Belege vor der Antwort. Geben Sie keine echten Zugangsdaten, personenbezogenen Daten oder Geheimnisse ein. Erläutern Sie dem Team Ihre Begründung.'] ],
 es:[
  ['Informe de misión','Lea los objetivos y reparta operación, navegación, observación y coordinación. Es un ejercicio educativo ficticio.'],
  ['Antes de operar','Lea y marque cada comprobación. Verifique el entorno, la comunicación y las condiciones de parada; después confirme. No omita controles para terminar antes.'],
  ['Empezar con asistencia','La asistencia suaviza la respuesta para principiantes. Puede alternarla con su control. No completa la misión por usted.'],
  ['Avanzar y retroceder','Pulse Iniciar y brevemente W o flecha arriba para avanzar; S o flecha abajo para retroceder. En móvil use los controles bajo la vista. Soltar termina la entrada, pero la inercia puede continuar un instante.'],
  ['Girar a izquierda y derecha','A o flecha izquierda gira a la izquierda; D o flecha derecha gira a la derecha. Cambia el rumbo sin desplazamiento lateral. Reduzca la velocidad antes de girar y tenga en cuenta la inercia.'],
  ['Subir y desplazarse lateralmente','R sube y F baja; Q desplaza a la izquierda y E a la derecha. En móvil use los controles derechos. El desplazamiento lateral conserva el rumbo.'],
  ['Acercarse a un punto de control','Acérquese lentamente al punto activo y pulse Inspeccionar a baja velocidad. Corrija primero una distancia o velocidad excesiva. Pausa detiene la simulación; no es un freno real.'],
  ['Revisar la misión','Revise sucesos y puntuación, comente seguridad, precisión y funciones, y exporte el registro. La puntuación corresponde a esta simulación, no a una acreditación profesional.'],
  ['Identificar y verificar','Lea cada situación del escritorio digital y compruebe las pruebas antes de responder. No introduzca credenciales reales, datos personales ni secretos. Explique su razonamiento al equipo.'] ],
 pt:[
  ['Orientação da missão','Leia os objetivos e distribua operação, navegação, observação e coordenação. Este é um exercício educativo fictício.'],
  ['Antes de operar','Leia e marque cada verificação. Confira ambiente, comunicação e condições de parada; depois confirme. Não pule verificações para terminar mais rápido.'],
  ['Começar com assistência','A assistência suaviza as respostas para iniciantes. Você pode alterná-la pelo controle de assistência. Ela não conclui a missão por você.'],
  ['Avançar e recuar','Pressione Iniciar e brevemente W ou seta para cima para avançar; S ou seta para baixo para recuar. No celular, use os controles abaixo da vista. Soltar encerra o comando, mas a inércia pode continuar por um instante.'],
  ['Virar à esquerda e à direita','A ou seta esquerda vira à esquerda; D ou seta direita vira à direita. Isso muda a direção sem deslocamento lateral. Reduza a velocidade antes de virar e considere a inércia.'],
  ['Subir e mover para os lados','R sobe e F desce; Q move para a esquerda e E para a direita. No celular, use os controles direitos. O movimento lateral mantém a direção.'],
  ['Aproximar-se de um ponto de controle','Aproxime-se devagar do ponto ativo e pressione Inspecionar em baixa velocidade. Corrija primeiro distância ou velocidade excessiva. Pausa interrompe a simulação; não é um freio real.'],
  ['Revisar a missão','Reveja eventos e pontuações, discuta segurança, precisão e funções e exporte o registro. A pontuação avalia esta simulação, não uma qualificação profissional.'],
  ['Identificar e verificar','Leia cada situação da mesa digital e verifique as evidências antes de responder. Não insira credenciais reais, dados pessoais ou segredos. Explique seu raciocínio à equipe.'] ],
 it:[
  ['Briefing della missione','Leggi gli obiettivi e distribuisci conduzione, navigazione, osservazione e coordinamento. Questo è un esercizio educativo fittizio.'],
  ['Prima di operare','Leggi e spunta ogni controllo. Verifica ambiente, comunicazione e condizioni di arresto, poi conferma. Non saltare i controlli per finire prima.'],
  ['Inizia con l’assistenza','L’assistenza rende le risposte più dolci per i principianti. Puoi cambiarla con il relativo comando. Non completa la missione al tuo posto.'],
  ['Avanzare e arretrare','Premi Avvia, poi brevemente W o freccia su per avanzare; S o freccia giù per arretrare. Sul cellulare usa i comandi sotto la vista. Rilasciare interrompe il comando, ma l’inerzia può proseguire per poco.'],
  ['Girare a sinistra e a destra','A o freccia sinistra gira a sinistra; D o freccia destra gira a destra. Cambia la direzione senza spostarsi lateralmente. Rallenta prima di girare e considera l’inerzia.'],
  ['Salire e spostarsi lateralmente','R sale e F scende; Q sposta a sinistra ed E a destra. Sul cellulare usa i comandi destri. Lo spostamento laterale mantiene la direzione.'],
  ['Avvicinarsi a un punto di controllo','Avvicinati lentamente al punto attivo e premi Ispeziona a bassa velocità. Correggi prima distanza o velocità eccessive. Pausa ferma la simulazione, non è un freno reale.'],
  ['Rivedere la missione','Esamina eventi e punteggi, discuti sicurezza, precisione e ruoli, poi esporta il registro. Il punteggio riguarda questa simulazione, non una qualifica professionale.'],
  ['Identificare e verificare','Leggi ogni situazione della postazione digitale e verifica le prove prima di rispondere. Non inserire credenziali reali, dati personali o segreti. Spiega il ragionamento alla squadra.'] ],
 ar:[
  ['إحاطة المهمة','اقرأ الأهداف ووزع أدوار التشغيل والملاحة والمراقبة والتنسيق. هذا تدريب تعليمي خيالي.'],
  ['قبل التشغيل','اقرأ كل بند في القائمة وحدده. تحقق من البيئة والتواصل وشروط التوقف ثم اضغط التأكيد. لا تتجاوز الفحوص لإنهاء المهمة بسرعة.'],
  ['ابدأ بالمساعدة','يمكن للمبتدئين تشغيل المساعدة لاستجابة أكثر سلاسة. بدّلها بزر المساعدة عند الحاجة. لن تنجز المهمة نيابة عنك.'],
  ['التقدم والتراجع','اضغط البدء ثم W أو السهم لأعلى لفترة قصيرة للتقدم، وS أو السهم لأسفل للتراجع. على الهاتف استخدم الأزرار أسفل المشهد. رفع الإصبع يوقف الإدخال لكن القصور الذاتي قد يستمر قليلاً.'],
  ['الانعطاف يميناً ويساراً','A أو السهم لليسار ينعطف يساراً؛ D أو السهم لليمين ينعطف يميناً. يتغير الاتجاه دون حركة جانبية. أبطئ قبل الانعطاف وراعِ القصور الذاتي.'],
  ['الصعود والحركة الجانبية','R للصعود وF للنزول؛ Q للحركة جانبياً إلى اليسار وE إلى اليمين. على الهاتف استخدم أزرار اليمين. الحركة الجانبية تحافظ على الاتجاه.'],
  ['الاقتراب من نقطة الفحص','اقترب ببطء من النقطة الحالية واضغط الفحص بسرعة منخفضة. عدّل المسافة أو السرعة أولاً عند الحاجة. الإيقاف المؤقت يوقف المحاكاة وليس مكبحاً لمركبة حقيقية.'],
  ['مراجعة المهمة','راجع الأحداث والدرجات وناقش السلامة والدقة والأدوار ثم صدّر السجل. الدرجة تخص هذه المحاكاة وليست مؤهلاً مهنياً.'],
  ['التعرف والتحقق','اقرأ المواقف في المكتب الرقمي وتحقق من الأدلة قبل الإجابة. لا تدخل بيانات دخول حقيقية أو بيانات شخصية أو أسراراً. اشرح أسباب قرارك للفريق.'] ],
 hi:[
  ['मिशन विवरण','लक्ष्य पढ़ें और संचालन, दिशा-निर्देशन, निरीक्षण तथा समन्वय की भूमिकाएँ बाँटें। यह काल्पनिक शैक्षिक अभ्यास है।'],
  ['संचालन से पहले','हर जाँच बिंदु पढ़कर चिह्नित करें। वातावरण, संचार और रुकने की शर्तें जाँचकर पुष्टि दबाएँ। जल्दी समाप्त करने के लिए जाँच न छोड़ें।'],
  ['सहायता के साथ शुरू करें','शुरुआती उपयोगकर्ता सहज प्रतिक्रिया के लिए सहायता चालू कर सकते हैं। सहायता बटन से इसे बदलें। यह मिशन आपके स्थान पर पूरा नहीं करती।'],
  ['आगे और पीछे चलें','शुरू दबाएँ, फिर आगे के लिए थोड़ी देर W या ऊपर का तीर, पीछे के लिए S या नीचे का तीर दबाएँ। मोबाइल पर दृश्य के नीचे नियंत्रण हैं। छोड़ने पर इनपुट रुकता है, लेकिन जड़त्व थोड़ी देर रह सकता है।'],
  ['बाएँ और दाएँ मुड़ें','A या बायाँ तीर बाएँ मोड़ता है; D या दायाँ तीर दाएँ मोड़ता है। इससे दिशा बदलती है, पार्श्व गति नहीं होती। मुड़ने से पहले गति घटाएँ और जड़त्व का ध्यान रखें।'],
  ['ऊपर और पार्श्व में चलें','R से ऊपर, F से नीचे; Q से बाएँ पार्श्व में और E से दाएँ पार्श्व में चलें। मोबाइल पर दाएँ नियंत्रण इस्तेमाल करें। पार्श्व गति में दिशा बनी रहती है।'],
  ['जाँच बिंदु के पास जाएँ','सक्रिय जाँच बिंदु के पास धीरे जाएँ और कम गति पर निरीक्षण दबाएँ। अधिक दूरी या गति हो तो पहले सुधारें। विराम सिमुलेशन रोकता है; यह वास्तविक वाहन का ब्रेक नहीं है।'],
  ['मिशन की समीक्षा','घटनाएँ और अंक देखें, सुरक्षा, सटीकता और भूमिकाओं पर चर्चा करें, फिर रिकॉर्ड निर्यात करें। अंक केवल इस सिमुलेशन का आकलन हैं, पेशेवर योग्यता नहीं।'],
  ['पहचानें और सत्यापित करें','डिजिटल डेस्क पर हर परिस्थिति पढ़ें और उत्तर से पहले प्रमाण जाँचें। असली पासवर्ड, निजी डेटा या रहस्य न डालें। टीम को निर्णय का कारण बताएँ।'] ],
 id:[
  ['Pengarahan misi','Baca tujuan dan bagi peran operasi, navigasi, pengamatan, serta koordinasi. Ini latihan pendidikan fiktif.'],
  ['Sebelum mengoperasikan','Baca dan centang setiap pemeriksaan. Pastikan lingkungan, komunikasi, dan kondisi berhenti, lalu tekan Konfirmasi. Jangan lewati pemeriksaan demi cepat selesai.'],
  ['Mulai dengan bantuan','Pemula dapat mengaktifkan bantuan untuk respons lebih halus. Alihkan dengan kontrol bantuan kapan saja. Bantuan tidak menyelesaikan misi untuk Anda.'],
  ['Maju dan mundur','Tekan Mulai, lalu tahan sebentar W atau panah atas untuk maju; S atau panah bawah untuk mundur. Di ponsel gunakan tombol di bawah tampilan. Melepas menghentikan masukan, tetapi inersia dapat berlanjut sebentar.'],
  ['Belok kiri dan kanan','A atau panah kiri berbelok ke kiri; D atau panah kanan ke kanan. Ini mengubah arah, bukan bergerak menyamping. Kurangi kecepatan sebelum berbelok dan perhitungkan inersia.'],
  ['Naik dan bergerak menyamping','R naik dan F turun; Q bergerak ke kiri dan E ke kanan secara menyamping. Di ponsel gunakan kontrol kanan. Gerak menyamping mempertahankan arah.'],
  ['Mendekati titik pemeriksaan','Dekati titik aktif perlahan dan tekan Periksa pada kecepatan rendah. Sesuaikan jarak atau kecepatan yang berlebihan dahulu. Jeda menghentikan simulasi, bukan rem kendaraan nyata.'],
  ['Tinjauan misi','Tinjau kejadian dan skor, diskusikan keselamatan, ketepatan, serta peran, lalu ekspor catatan. Skor menilai simulasi ini, bukan kualifikasi profesional.'],
  ['Kenali dan verifikasi','Baca setiap situasi di meja digital dan periksa bukti sebelum menjawab. Jangan masukkan kredensial asli, data pribadi, atau rahasia. Jelaskan alasan Anda kepada tim.'] ],
 vi:[
  ['Phổ biến nhiệm vụ','Đọc mục tiêu và phân công vận hành, dẫn đường, quan sát và điều phối. Đây là bài tập giáo dục giả định.'],
  ['Trước khi vận hành','Đọc và đánh dấu từng mục kiểm tra. Xác nhận môi trường, liên lạc và điều kiện dừng rồi bấm Xác nhận. Không bỏ kiểm tra để hoàn thành nhanh hơn.'],
  ['Bắt đầu với hỗ trợ','Người mới có thể bật hỗ trợ để phản ứng mượt hơn. Dùng nút hỗ trợ để chuyển khi cần. Chức năng này không hoàn thành nhiệm vụ thay bạn.'],
  ['Tiến và lùi','Bấm Bắt đầu rồi giữ ngắn W hoặc mũi tên lên để tiến; S hoặc mũi tên xuống để lùi. Trên điện thoại dùng nút dưới khung nhìn. Thả tay dừng tín hiệu vào, nhưng quán tính có thể còn một lúc.'],
  ['Rẽ trái và phải','A hoặc mũi tên trái để rẽ trái; D hoặc mũi tên phải để rẽ phải. Đây là đổi hướng, không phải dịch ngang. Giảm tốc trước khi rẽ và tính đến quán tính.'],
  ['Lên xuống và dịch ngang','R đi lên, F đi xuống; Q dịch trái và E dịch phải. Trên điện thoại dùng các nút bên phải. Dịch ngang vẫn giữ nguyên hướng.'],
  ['Tiếp cận điểm kiểm tra','Tiếp cận chậm điểm đang hoạt động rồi bấm Kiểm tra ở tốc độ thấp. Nếu quá xa hoặc quá nhanh, điều chỉnh trước. Tạm dừng dừng mô phỏng, không phải phanh của phương tiện thật.'],
  ['Đánh giá nhiệm vụ','Xem sự kiện và điểm số, thảo luận an toàn, độ chính xác và phân công, rồi xuất bản ghi. Điểm chỉ đánh giá mô phỏng này, không phải chứng nhận nghề nghiệp.'],
  ['Nhận diện và xác minh','Đọc từng tình huống ở bàn thông tin và kiểm tra bằng chứng trước khi trả lời. Không nhập tài khoản thật, dữ liệu cá nhân hay bí mật. Giải thích lý do cho đồng đội.'] ],
 th:[
  ['สรุปภารกิจ','อ่านเป้าหมายและแบ่งหน้าที่ควบคุม นำทาง สังเกต และประสานงาน นี่คือแบบฝึกหัดสมมติเพื่อการศึกษา'],
  ['ตรวจสอบก่อนควบคุม','อ่านและเลือกแต่ละรายการ ตรวจสภาพแวดล้อม การสื่อสาร และเงื่อนไขหยุด แล้วกดยืนยัน อย่าข้ามการตรวจเพื่อให้เสร็จเร็ว'],
  ['เริ่มด้วยระบบช่วย','ผู้เริ่มต้นเปิดระบบช่วยเพื่อให้ตอบสนองนุ่มนวลขึ้นได้ สลับด้วยปุ่มช่วยได้ตามต้องการ ระบบนี้ไม่ได้ทำภารกิจแทนคุณ'],
  ['เดินหน้าและถอยหลัง','กดเริ่ม แล้วกด W หรือลูกศรขึ้นสั้น ๆ เพื่อเดินหน้า ใช้ S หรือลูกศรลงเพื่อถอยหลัง มือถือใช้ปุ่มใต้ภาพ เมื่อปล่อยจะหยุดการป้อนคำสั่ง แต่ความเฉื่อยอาจคงอยู่ครู่หนึ่ง'],
  ['เลี้ยวซ้ายและขวา','A หรือลูกศรซ้ายเลี้ยวซ้าย D หรือลูกศรขวาเลี้ยวขวา เป็นการเปลี่ยนทิศ ไม่ใช่เลื่อนไปด้านข้าง ลดความเร็วก่อนเลี้ยวและคำนึงถึงความเฉื่อย'],
  ['ขึ้นลงและเลื่อนด้านข้าง','R ขึ้น F ลง Q เลื่อนไปซ้าย E เลื่อนไปขวา มือถือใช้ปุ่มด้านขวา การเลื่อนด้านข้างยังคงทิศเดิม'],
  ['เข้าใกล้จุดตรวจ','เข้าใกล้จุดตรวจปัจจุบันอย่างช้า ๆ แล้วกดตรวจที่ความเร็วต่ำ หากไกลหรือเร็วเกินไปให้ปรับก่อน พักเป็นการหยุดแบบจำลอง ไม่ใช่เบรกยานพาหนะจริง'],
  ['ทบทวนภารกิจ','ดูเหตุการณ์และคะแนน หารือความปลอดภัย ความแม่นยำ และหน้าที่ แล้วส่งออกบันทึก คะแนนประเมินแบบจำลองนี้ ไม่ใช่คุณวุฒิวิชาชีพ'],
  ['ระบุและตรวจสอบ','อ่านแต่ละสถานการณ์ที่โต๊ะข้อมูลและตรวจหลักฐานก่อนตอบ อย่าป้อนข้อมูลเข้าสู่ระบบจริง ข้อมูลส่วนบุคคล หรือความลับ อธิบายเหตุผลให้ทีมฟัง'] ],
 ms:[
  ['Taklimat misi','Baca objektif dan agihkan tugas operasi, navigasi, pemerhatian dan penyelarasan. Ini latihan pendidikan rekaan.'],
  ['Sebelum mengendalikan','Baca dan tandakan setiap semakan. Sahkan persekitaran, komunikasi dan syarat berhenti, kemudian tekan Sahkan. Jangan langkau semakan untuk cepat selesai.'],
  ['Mulakan dengan bantuan','Pemula boleh mengaktifkan bantuan untuk respons lebih lancar. Tukar melalui kawalan bantuan apabila diperlukan. Bantuan tidak menyelesaikan misi bagi anda.'],
  ['Maju dan undur','Tekan Mula, kemudian tahan sebentar W atau anak panah atas untuk maju; S atau anak panah bawah untuk undur. Pada telefon gunakan butang di bawah paparan. Melepaskan menghentikan input tetapi inersia mungkin berterusan seketika.'],
  ['Belok kiri dan kanan','A atau anak panah kiri membelok ke kiri; D atau anak panah kanan ke kanan. Ini mengubah arah, bukan bergerak ke sisi. Perlahankan sebelum membelok dan ambil kira inersia.'],
  ['Naik dan bergerak ke sisi','R naik dan F turun; Q bergerak ke kiri dan E ke kanan secara sisi. Pada telefon gunakan kawalan kanan. Gerakan sisi mengekalkan arah.'],
  ['Menghampiri titik pemeriksaan','Hampiri titik aktif perlahan-lahan dan tekan Periksa pada kelajuan rendah. Laraskan jarak atau kelajuan yang berlebihan dahulu. Jeda menghentikan simulasi, bukan brek kenderaan sebenar.'],
  ['Ulasan misi','Semak peristiwa dan markah, bincangkan keselamatan, ketepatan dan peranan, kemudian eksport rekod. Markah menilai simulasi ini, bukan kelayakan profesional.'],
  ['Kenal pasti dan sahkan','Baca setiap situasi di meja digital dan semak bukti sebelum menjawab. Jangan masukkan kelayakan log masuk sebenar, data peribadi atau rahsia. Terangkan alasan anda kepada pasukan.'] ]
};

export const mentorLocales = Object.keys(labelRows);
export const mentorStrings = Object.assign({}, Object.fromEntries(Object.entries(labelRows).map(([code,row]) => [code,Object.freeze(Object.fromEntries(row.split('|').map((value,index) => [labelKeys[index],value])))])));
const stepIds = ['briefing','checklist','assist','move','turn','lift','inspect','report','digital'];
const langTags = {'zh-Hant':'zh-TW','zh-Hans':'zh-CN',en:'en-US',ja:'ja-JP',ko:'ko-KR',fr:'fr-FR',de:'de-DE',es:'es-ES',pt:'pt-BR',it:'it-IT',ar:'ar',hi:'hi-IN',id:'id-ID',vi:'vi-VN',th:'th-TH',ms:'ms-MY'};
export function mentorLocale(value) {
 const code=String(value || 'en').replaceAll('_','-');
 if (/^zh/i.test(code)) return /(?:Hans|CN|SG)(?:-|$)/i.test(code) ? 'zh-Hans' : 'zh-Hant';
 const base=code.toLowerCase().split('-')[0];
 return mentorStrings[base] ? base : 'en';
}
export function createMentorSteps(locale='en',domain='air',missionTitle='') {
 const code=mentorLocale(locale), ids=domain==='digital' ? ['briefing','checklist','digital','report'] : ['briefing','checklist','assist','move','turn',...(domain==='air'?['lift']:[]),'inspect','report'];
 return ids.map(id => {
  const [title,text]=stepRows[code][stepIds.indexOf(id)];
  return {id,title,text:id==='briefing'&&missionTitle?`${missionTitle}. ${text}`:text,target:id==='digital'?'digital':id,keys:({move:['W','S','↑','↓'],turn:['A','D','←','→'],lift:['R','F','Q','E']})[id]||[],action:({checklist:'confirm',assist:'assist',inspect:'inspect',report:'export'})[id]||null};
 });
}
export function selectMentorVoice(voices,locale,voiceURI='') {
 if(voiceURI) {const selected=voices.find(v=>v.voiceURI===voiceURI);if(selected)return selected;}
 const requested=langTags[mentorLocale(locale)].toLowerCase();
 const exact=voices.filter(v=>v.lang?.toLowerCase()===requested);
 // Keep simplified/traditional Chinese accents matched when the platform offers them.
 const base=requested.split('-')[0];
 const candidates=exact.length?exact:voices.filter(v=>String(v.lang).toLowerCase().split('-')[0]===base);
 return candidates.find(v=>v.localService)||candidates[0]||null;
}
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bound=(value,min,max,fallback)=>Number.isFinite(Number(value))?Math.max(min,Math.min(max,Number(value))):fallback;
const prefKey='crew-mentor-voice-v2';

/** targets can be selectors or Elements. onAction receives an app action string.
 * Optional environment injection permits tests without a browser or server.
 * Guide progression is a reading aid, never evidence of mission completion.
 */
export function mountMentor(container,options={}) {
 if(!container?.ownerDocument)throw new TypeError('A DOM container is required');
 const doc=container.ownerDocument,env=options.environment||doc.defaultView||globalThis;
 const synth=env.speechSynthesis,Utterance=env.SpeechSynthesisUtterance;
 let locale=mentorLocale(options.locale||env.navigator?.language),steps=createMentorSteps(locale,options.domain,options.missionTitle);
 let index=0,status='ready',destroyed=false,finished=false,activeUtterance=null,generation=0,highlight=null,startTimer=null,busy=false;
 let prefs={voiceURI:'',rate:.9,pitch:1};
 try {const saved=JSON.parse(env.localStorage?.getItem(prefKey)||'null');if(saved&&typeof saved==='object')prefs={voiceURI:typeof saved.voiceURI==='string'?saved.voiceURI:'',rate:bound(saved.rate,.6,1.4,.9),pitch:bound(saved.pitch,.7,1.3,1)};}catch{}
 const words=()=>mentorStrings[locale],q=selector=>container.querySelector(selector);
 const save=()=>{try{env.localStorage?.setItem(prefKey,JSON.stringify(prefs));}catch{}};
 const voices=()=>{try{return synth?.getVoices?.()||[];}catch{return [];}};
 const clearTimer=()=>{if(startTimer!==null){env.clearTimeout(startTimer);startTimer=null;}};
 function clearHighlight(){if(highlight)highlight.classList.remove('crew-mentor-target');highlight=null;}
 function targetElement(){const key=steps[index]?.target;const target=(options.targets||{})[key];try{return typeof target==='string'?doc.querySelector(target):target?.nodeType===1?target:null;}catch{return null;}}
 function pointTo(scroll=false){clearHighlight();const target=targetElement();if(!target||target.closest?.('.viewport'))return false;highlight=target.tagName==='INPUT'?(target.closest('label')||target):target;highlight.classList.add('crew-mentor-target');if(scroll){for(let d=highlight.closest?.('details');d;d=d.parentElement?.closest?.('details'))d.open=true;highlight.scrollIntoView?.({block:'center',inline:'nearest',behavior:'auto'});target.focus?.({preventScroll:true});}return true;}
 function cancelSpeech(){generation++;clearTimer();if(activeUtterance){activeUtterance.onstart=activeUtterance.onend=activeUtterance.onerror=null;activeUtterance=null;try{synth?.cancel();}catch{}}}
 function updateStatus(next=status){status=next;const node=q('[data-mentor-status]');if(node)node.textContent=words()[status]||words().ready;const pause=q('[data-mentor="pause"]');if(pause){pause.disabled=!['speaking','paused'].includes(status);pause.textContent=status==='paused'?words().resume:words().pause;}const stop=q('[data-mentor="stop"]');if(stop)stop.disabled=!activeUtterance;}
 function updateVoices(){const select=q('[data-mentor-pref="voiceURI"]');if(!select)return;const list=voices(),w=words();select.innerHTML=`<option value="">${escapeHtml(w.auto)}</option>${list.map(v=>`<option value="${escapeHtml(v.voiceURI)}">${escapeHtml(v.name)} · ${escapeHtml(v.lang)} · ${escapeHtml(v.localService?w.device:w.network)}</option>`).join('')}`;select.value=list.some(v=>v.voiceURI===prefs.voiceURI)?prefs.voiceURI:'';}
 function render(){
  if(destroyed)return;const w=words(),step=steps[index];container.classList.add('crew-mentor');container.lang=langTags[locale];container.dir=locale==='ar'?'rtl':'ltr';
  const button=(id,label,extra='')=>`<button type="button" data-mentor="${id}" ${extra}>${escapeHtml(label)}</button>`;
  container.innerHTML=`<div class="crew-mentor-head"><div><span class="crew-mentor-eyebrow">${escapeHtml(w.title)}</span><h3>${escapeHtml(step.title)}</h3></div><span class="crew-mentor-count">${index+1} / ${steps.length}</span></div><progress max="${steps.length}" value="${finished?steps.length:index}" aria-label="${escapeHtml(w.title)}"></progress><p class="crew-mentor-intro">${escapeHtml(w.intro)}</p><p class="crew-mentor-text" aria-live="polite" aria-atomic="true">${escapeHtml(step.text)}</p>${step.keys.length?`<div class="crew-mentor-keys" aria-hidden="true">${step.keys.map(k=>`<kbd>${k}</kbd>`).join('')}</div>`:''}<div class="crew-mentor-actions">${button('speak',w.start,'class="crew-mentor-primary"')}${button('pause',w.pause,'disabled')}${button('replay',w.replay)}${button('stop',w.stop,'disabled')}</div><p class="crew-mentor-status" data-mentor-status role="status"></p><div class="crew-mentor-step-actions">${button('show',w.show)}${step.action?button('action',step.id==='assist'?w.assist:w.runAction,'class="crew-mentor-action"'):''}</div><nav class="crew-mentor-navigation" aria-label="${escapeHtml(w.title)}">${button('previous',w.previous,index===0?'disabled':'')}${button('next',w.next,'class="crew-mentor-primary"')}${button('skip',w.skip)}</nav><details class="crew-mentor-settings"><summary>${escapeHtml(w.settings)}</summary><label>${escapeHtml(w.voice)}<select data-mentor-pref="voiceURI"></select></label><div class="crew-mentor-sliders"><label>${escapeHtml(w.rate)} <output data-mentor-output="rate">${prefs.rate.toFixed(2)}</output><input data-mentor-pref="rate" type="range" min="0.6" max="1.4" step="0.05" value="${prefs.rate}"></label><label>${escapeHtml(w.pitch)} <output data-mentor-output="pitch">${prefs.pitch.toFixed(2)}</output><input data-mentor-pref="pitch" type="range" min="0.7" max="1.3" step="0.05" value="${prefs.pitch}"></label></div><p>${escapeHtml(w.voiceNote)}</p></details>`;
  updateVoices();updateStatus();if(!finished)pointTo();
 }
 function speak(){
  if(destroyed)return;cancelSpeech();finished=false;pointTo();
  const voice=selectMentorVoice(voices(),locale,prefs.voiceURI);
  if(!synth||!Utterance||!voice){updateStatus('unavailable');return;}
  const token=generation;let utterance;
  try{utterance=new Utterance(steps[index].text);utterance.lang=voice.lang||langTags[locale];utterance.voice=voice;utterance.rate=prefs.rate;utterance.pitch=prefs.pitch;activeUtterance=utterance;
   utterance.onstart=()=>{if(destroyed||token!==generation)return;clearTimer();updateStatus('speaking');};
   utterance.onend=()=>{if(destroyed||token!==generation)return;clearTimer();activeUtterance=null;updateStatus('ready');};
   utterance.onerror=()=>{if(destroyed||token!==generation)return;clearTimer();activeUtterance=null;updateStatus('unavailable');};
   updateStatus('speaking');synth.speak(utterance);
   startTimer=env.setTimeout(()=>{if(activeUtterance===utterance&&token===generation&&!synth.speaking){cancelSpeech();updateStatus('unavailable');}},7000);
  }catch{cancelSpeech();updateStatus('unavailable');}
 }
 async function click(event){
  const button=event.target.closest?.('[data-mentor]');if(!button||!container.contains(button)||button.disabled)return;event.stopPropagation();const action=button.dataset.mentor;
  if(action==='speak'||action==='replay'){speak();return;}
  if(action==='pause'){try{if(status==='paused'){synth?.resume();updateStatus('speaking');}else if(activeUtterance){synth?.pause();updateStatus('paused');}}catch{cancelSpeech();updateStatus('unavailable');}return;}
  if(action==='stop'){cancelSpeech();updateStatus('ready');return;}
  if(action==='show'){if(!pointTo(true))updateStatus('noTarget');return;}
  if(action==='action'){
   if(busy)return;const appAction=steps[index].action;if(!appAction||!options.onAction){updateStatus('noTarget');return;}busy=true;button.disabled=true;
   try{await options.onAction(appAction);if(!destroyed)updateStatus('ready');}catch{if(!destroyed)updateStatus('failed');}finally{busy=false;if(!destroyed&&button.isConnected)button.disabled=false;}return;
  }
  cancelSpeech();clearHighlight();
  if(action==='skip'){finished=true;updateStatus('complete');return;}
  if(action==='previous'){index=Math.max(0,index-1);finished=false;status='ready';render();return;}
  if(action==='next'){if(index===steps.length-1&&!finished){finished=true;updateStatus('complete');q('progress').value=steps.length;}else{index=finished?0:Math.min(index+1,steps.length-1);finished=false;status='ready';render();}}
 }
 function input(event){const target=event.target;if(!target.matches?.('[data-mentor-pref]'))return;const key=target.dataset.mentorPref;if(key==='voiceURI')prefs.voiceURI=target.value;else if(key==='rate')prefs.rate=bound(target.value,.6,1.4,.9);else if(key==='pitch')prefs.pitch=bound(target.value,.7,1.3,1);save();const output=q(`[data-mentor-output="${key}"]`);if(output)output.textContent=Number(prefs[key]).toFixed(2);}
 container.addEventListener('click',click);container.addEventListener('input',input);synth?.addEventListener?.('voiceschanged',updateVoices);render();
 return {
  destroy(){if(destroyed)return;destroyed=true;cancelSpeech();clearHighlight();container.removeEventListener('click',click);container.removeEventListener('input',input);synth?.removeEventListener?.('voiceschanged',updateVoices);container.replaceChildren();container.classList.remove('crew-mentor');},
  stop(){if(destroyed)return;cancelSpeech();clearHighlight();updateStatus('ready');},
  setLocale(next){if(destroyed)return;cancelSpeech();locale=mentorLocale(next);steps=createMentorSteps(locale,options.domain,options.missionTitle);status=finished?'complete':'ready';render();},
  state(){return {index,total:steps.length,step:steps[index].id,locale,status,finished};}
 };
}

/* v3: register one more interface language at run time (labels object, [[title,text],...] steps, speech tag) */
export function registerMentorLocale(code, labels, steps, tag) {
 if (!code || !labels) return; mentorStrings[code] = Object.freeze({ ...mentorStrings.en, ...labels });
 if (Array.isArray(steps) && steps.length === stepRows.en.length) stepRows[code] = steps;
 langTags[code] = tag || code; if (!mentorLocales.includes(code)) mentorLocales.push(code);
}

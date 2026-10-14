// Locally bundled, source-checked editorial photographs and official video embeds.
// Each photograph retains its own license. Videos are linked, never downloaded.
const text = (zh, en) => ({ 'zh-Hant': zh, en });
const youtubeNote = text('由原發佈者的 YouTube 播放器提供；需連網，不包含離線影片。字幕依原影片提供。', 'Streamed by the original publisher through YouTube; internet required. No offline video is bundled. Captions depend on the source video.');
export const mediaItems = [
  {
    id: 'astronaut-training', kind: 'youtube', videoId: 'gk0ijHIP3hw',
    title: text('360° 太空人協作訓練', '360° astronaut team training'),
    originalTitle: "NASA's Commercial Crew Program VR 360 Tour: Train Like an Astronaut",
    sourceUrl: 'https://www.youtube.com/watch?v=gk0ijHIP3hw',
    referenceUrl: 'https://www.nasa.gov/stem-content/commercial-crew-program-virtual-reality-tours/',
    channel: "NASA's Kennedy Space Center", channelUrl: 'https://www.youtube.com/@NASAKennedy',
    description: text('觀察多角色訓練環境、模擬艙及任務準備，討論互相覆核與溝通。', 'Observe team preparation and simulator environments; discuss cross-checking and communication.'),
    photo: 'assets/cockpit-crew.webp', licenseNote: youtubeNote, verified: '2026-10-14'
  },
  {
    id: 'dragon-tour', kind: 'youtube', videoId: 'Rc5D2Jb7qXQ',
    title: text('360° Crew Dragon 艙內導覽', '360° Crew Dragon tour'),
    originalTitle: "NASA's Commercial Crew Program VR 360 Tour: SpaceX Crew Dragon",
    sourceUrl: 'https://www.youtube.com/watch?v=Rc5D2Jb7qXQ',
    referenceUrl: 'https://www.nasa.gov/stem-content/commercial-crew-program-virtual-reality-tours/',
    channel: "NASA's Kennedy Space Center", channelUrl: 'https://www.youtube.com/@NASAKennedy',
    description: text('以真實艙體與地面設施了解介面分工；此影片不是本模擬器的即時視角。', 'Explore real spacecraft and ground facilities; this film is not a live view from this simulator.'),
    photo: 'assets/cockpit-crew.webp', licenseNote: youtubeNote, verified: '2026-10-14'
  },
  {
    id: 'starliner-tour', kind: 'youtube', videoId: '9rY_xecfMyc',
    title: text('360° Starliner 工程導覽', '360° Starliner engineering tour'),
    originalTitle: "NASA's Commercial Crew Program VR 360 Tour: Boeing CST-100 Starliner",
    sourceUrl: 'https://www.youtube.com/watch?v=9rY_xecfMyc',
    referenceUrl: 'https://www.nasa.gov/stem-content/commercial-crew-program-virtual-reality-tours/',
    channel: "NASA's Kennedy Space Center", channelUrl: 'https://www.youtube.com/@NASAKennedy',
    description: text('比較不同載具的人因介面與訓練場景。以影片發佈時的歷史介紹為準。', 'Compare human interfaces and training settings across vehicles. The film reflects its original publication period.'),
    photo: 'assets/groundcontrol-crew.webp', licenseNote: youtubeNote, verified: '2026-10-14'
  },
  {
    id: 'hubble-training', kind: 'youtube', videoId: 'qipdcWHjOFA',
    title: text('太空維修：團隊與工具訓練', 'Space servicing: team and tool training'),
    originalTitle: 'Hubble Tool Time Episode 1: Astronaut Training',
    sourceUrl: 'https://www.youtube.com/watch?v=qipdcWHjOFA',
    referenceUrl: 'https://svs.gsfc.nasa.gov/13175/',
    channel: 'NASA Goddard', channelUrl: 'https://www.youtube.com/@NASAGoddard',
    description: text('認識太空人維修訓練與任務準備；練習如何用簡短回報維持共同理解。', 'Learn about astronaut servicing preparation and discuss concise team updates.'),
    photo: 'assets/groundcontrol-crew.webp', licenseNote: youtubeNote, verified: '2026-10-14'
  },
  {
    id: 'aviation-stress', kind: 'youtube', videoId: 'aeOlBs-XVYU',
    title: text('航空人因：壓力與溝通', 'Aviation human factors: stress and communication'),
    originalTitle: 'Stress in Aviation',
    sourceUrl: 'https://www.youtube.com/watch?v=aeOlBs-XVYU',
    referenceUrl: 'https://www.faa.gov/pilots/training/airman_education/hf_videos',
    channel: 'Federal Aviation Administration', channelUrl: 'https://www.youtube.com/@FAAnews',
    description: text('討論工作負荷、壓力與團隊溝通，適合作為模擬前後的反思素材。', 'Discuss workload, stress and team communication before or after a simulation.'),
    photo: 'assets/cockpit-crew.webp', licenseNote: youtubeNote, verified: '2026-10-14'
  },
  {
    id: 'vehicle-check', kind: 'youtube', videoId: 'd1Ln_VvgeCo',
    title: text('消防車出發前檢查', 'Fire apparatus pre-trip inspection'),
    originalTitle: 'Pre Trip Inspection Video',
    sourceUrl: 'https://www.youtube.com/watch?v=d1Ln_VvgeCo',
    referenceUrl: 'https://www.sandiego.gov/fire/training/driver-training?page=1',
    channel: 'SDFD Driver Operator', channelUrl: 'https://www.youtube.com/@sdfddriveroperator2066',
    description: text('官方消防訓練選用的車輛檢查影片，用於說明檢查表與交接；不是戰車操作教學。', 'A vehicle inspection film selected by official fire training, illustrating checklists and handovers.'),
    photo: 'assets/firetruck-training.webp', licenseNote: youtubeNote, verified: '2026-10-14'
  }
];

// Optional official maritime player. Keep an external-open link beside the embed.
export const maritimeMedia = {
  id: 'bridge-tour', kind: 'dvids', videoId: '791142',
  title: text('海巡船艦：駕駛臺團隊導覽', 'Coast Guard bridge team tour'),
  sourceUrl: 'https://www.dvidshub.net/video/791142/coast-guard-cutter-midgett-gives-virtual-tour-bridge',
  embedUrl: 'https://www.dvidshub.net/video/embed/791142',
  channel: 'U.S. Coast Guard Oceania',
  description: text('Midgett 艦公開介紹駕駛臺各角色的日常工作。2021 年官方紀錄，長度 1:45。', 'An official 2021 introduction to daily bridge roles aboard Midgett. Duration: 1:45.'),
  photo: 'assets/bridge-crew.webp',
  licenseNote: text('原站提供內嵌播放器；本套件不含影片檔，不表示官方背書。', 'Official embedded player; no video file is bundled and no endorsement is implied.'),
  verified: '2026-10-14'
};

export const photos = [
  {
    id: 'taiwan-coast', path: 'assets/taiwan-coast.webp',
    title: text('臺灣花蓮・清水斷崖', 'Qingshui Cliffs, Hualien, Taiwan'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Taiwan_Qingshui_Cliffs_1.jpg',
    author: 'Zairon', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    credit: 'Taiwan Qingshui Cliffs 1 — Zairon / Wikimedia Commons / CC BY-SA 4.0',
    changes: 'Resized and converted to WebP; CSS display may crop. Adapted image remains CC BY-SA 4.0.'
  },
  {
    id: 'cockpit-crew', path: 'assets/cockpit-crew.webp',
    title: text('STS-51G 四人模擬艙訓練（1985）', 'STS-51G four-person simulator training (1985)'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Crew_in_cockpit_STS_51-G_training.jpg',
    author: 'NASA (S85-31933)', license: 'Public domain in the United States; NASA media guidelines',
    licenseUrl: 'https://www.nasa.gov/nasa-brand-center/images-and-media/',
    credit: 'NASA / S85-31933 — editorial training reference; no endorsement',
    changes: 'Resized and converted to WebP. Historical photograph, not a live scene.'
  },
  {
    id: 'bridge-crew', path: 'assets/bridge-crew.webp',
    title: text('Mako 海巡艦駕駛臺兩名成員（2014）', 'Two crew on the Coast Guard cutter Mako bridge (2014)'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Commander_and_XO_on_the_bridge_of_the_USCGC_Mako.jpg',
    author: 'U.S. Coast Guard / Petty Officer 3rd Class Cynthia Oldham', license: 'Public domain in the United States (U.S. Coast Guard work)',
    licenseUrl: 'https://www.dvidshub.net/about/copyright',
    credit: 'U.S. Coast Guard / Cynthia Oldham — editorial training reference; no endorsement',
    changes: 'Resized and converted to WebP.'
  },
  {
    id: 'firetruck-training', path: 'assets/firetruck-training.webp',
    title: text('消防車駕駛與操作員訓練（2019）', 'Firetruck driver/operator training (2019)'),
    sourceUrl: 'https://www.dvidshub.net/image/5823106/firefighter-training-fort-mccoy',
    author: 'U.S. Army / Scott T. Sturkol, Fort McCoy Public Affairs Office', license: 'Public domain in the United States (U.S. government work)',
    licenseUrl: 'https://www.dvidshub.net/about/copyright',
    credit: 'Scott T. Sturkol / U.S. Army / DVIDS 5823106 — editorial reference; no endorsement',
    changes: 'Publicly displayed 1000-pixel image converted to WebP.'
  },
  {
    id: 'groundcontrol-crew', path: 'assets/groundcontrol-crew.webp',
    title: text('NASA X-56A 雙人地面駕駛臺（2018）', 'NASA X-56A two-pilot ground cockpit (2018)'),
    sourceUrl: 'https://www.nasa.gov/image-article/x-56a-has-busy-control-room-10/',
    author: 'NASA / Ken Ulbrich (AFRC2018-0222-04)', license: 'Public domain in the United States; NASA media guidelines',
    licenseUrl: 'https://www.nasa.gov/nasa-brand-center/images-and-media/',
    credit: 'NASA / Ken Ulbrich — editorial training reference; no endorsement',
    changes: 'Resized and converted to WebP.'
  }
];

export const mapCredit = {
  path: 'assets/world-countries.geojson',
  sourceUrl: 'https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson',
  licenseUrl: 'https://www.naturalearthdata.com/about/terms-of-use/',
  author: 'Natural Earth contributors', license: 'Public domain',
  features: 177,
  note: text('Natural Earth 1:110m 概覽圖，177 個面要素；小型島嶼可能省略，非導航或領土主張依據。', 'Natural Earth 1:110m overview with 177 polygon features. Small islands may be omitted; not for navigation or territorial claims.')
};

// Media UI is localized into the same 16 languages as the application.
// Publisher names, original titles and license identifiers remain verbatim metadata.
const translatedTitles = {
 'zh-Hans': '360° 宇航员协作训练|360° Crew Dragon 舱内导览|360° Starliner 工程导览|太空维修：团队与工具训练|航空人因：压力与沟通|消防车出发前检查|海巡船舰：驾驶台团队导览|台湾花莲・清水断崖|STS-51G 四人模拟舱训练（1985）|Mako 海巡舰驾驶台两名成员（2014）|消防车驾驶与操作员训练（2019）|NASA X-56A 双人地面驾驶台（2018）',
 ja: '360° 宇宙飛行士のチーム訓練|360° Crew Dragon 見学|360° Starliner 技術見学|宇宙での整備：チームと工具の訓練|航空のヒューマンファクター：ストレスと対話|消防車の出発前点検|沿岸警備艇の船橋チーム見学|台湾・花蓮の清水断崖|STS-51G：4人のシミュレーター訓練（1985年）|巡視艇 Mako の船橋に立つ2人の乗員（2014年）|消防車の運転・操作訓練（2019年）|NASA X-56A：2人用地上操縦席（2018年）',
 ko: '360° 우주비행사 팀 훈련|360° Crew Dragon 둘러보기|360° Starliner 공학 견학|우주 정비: 팀과 도구 훈련|항공 인적 요인: 스트레스와 소통|소방차 출발 전 점검|해안경비대 함교 팀 둘러보기|대만 화롄 칭수이 절벽|STS-51G 4인 시뮬레이터 훈련(1985)|해안경비정 Mako 함교의 승무원 2명(2014)|소방차 운전·조작 훈련(2019)|NASA X-56A 2인 지상 조종석(2018)',
 fr: 'Entraînement des astronautes en équipe à 360°|Visite de Crew Dragon à 360°|Visite technique de Starliner à 360°|Maintenance spatiale : équipe et outils|Facteurs humains en aviation : stress et communication|Inspection du véhicule de pompiers avant départ|Visite de la passerelle des garde-côtes|Falaises de Qingshui, Hualien, Taïwan|STS-51G : quatre équipiers en simulateur (1985)|Deux membres à la passerelle du Mako (2014)|Formation des conducteurs de véhicules de pompiers (2019)|NASA X-56A : poste de pilotage au sol à deux (2018)',
 de: '360°-Teamtraining für Astronauten|360°-Rundgang durch Crew Dragon|360°-Technikrundgang durch Starliner|Wartung im All: Team- und Werkzeugtraining|Menschliche Faktoren in der Luftfahrt: Stress und Kommunikation|Abfahrtskontrolle am Feuerwehrfahrzeug|Rundgang auf der Brücke der Küstenwache|Qingshui-Klippen, Hualien, Taiwan|STS-51G: Viererteam im Simulator (1985)|Zwei Besatzungsmitglieder auf der Mako-Brücke (2014)|Fahr- und Bedienausbildung am Feuerwehrfahrzeug (2019)|NASA X-56A: Boden-Cockpit für zwei Piloten (2018)',
 es: 'Entrenamiento de astronautas en equipo en 360°|Visita a Crew Dragon en 360°|Visita técnica a Starliner en 360°|Mantenimiento espacial: equipo y herramientas|Factores humanos en aviación: estrés y comunicación|Inspección del vehículo de bomberos antes de salir|Visita al equipo del puente de la Guardia Costera|Acantilados de Qingshui, Hualien, Taiwán|STS-51G: cuatro tripulantes en el simulador (1985)|Dos tripulantes en el puente del Mako (2014)|Formación de conductores y operadores de bomberos (2019)|NASA X-56A: cabina terrestre para dos pilotos (2018)',
 pt: 'Treino de astronautas em equipa a 360°|Visita ao Crew Dragon a 360°|Visita técnica ao Starliner a 360°|Manutenção espacial: equipa e ferramentas|Fatores humanos na aviação: stress e comunicação|Inspeção do veículo de bombeiros antes da partida|Visita à equipa da ponte da Guarda Costeira|Falésias de Qingshui, Hualien, Taiwan|STS-51G: quatro tripulantes no simulador (1985)|Dois tripulantes na ponte do Mako (2014)|Formação de condutores e operadores de bombeiros (2019)|NASA X-56A: posto de pilotagem em terra para dois (2018)',
 it: 'Addestramento di squadra degli astronauti a 360°|Visita di Crew Dragon a 360°|Visita tecnica di Starliner a 360°|Manutenzione spaziale: squadra e strumenti|Fattori umani in aviazione: stress e comunicazione|Controllo del mezzo antincendio prima della partenza|Visita alla squadra di plancia della Guardia Costiera|Scogliere di Qingshui, Hualien, Taiwan|STS-51G: quattro membri nel simulatore (1985)|Due membri sulla plancia del Mako (2014)|Formazione alla guida e all’uso dei mezzi antincendio (2019)|NASA X-56A: cabina di pilotaggio a terra per due (2018)',
 ar: 'تدريب فريق رواد الفضاء بزاوية 360°|جولة داخل Crew Dragon بزاوية 360°|جولة هندسية في Starliner بزاوية 360°|الصيانة الفضائية: تدريب الفريق والأدوات|العوامل البشرية في الطيران: الضغط والتواصل|فحص مركبة الإطفاء قبل الانطلاق|جولة مع فريق جسر قيادة خفر السواحل|منحدرات تشينغشوي، هوالين، تايوان|تدريب أربعة أفراد بمحاكي STS-51G عام 1985|فردان من الطاقم على جسر Mako عام 2014|تدريب قيادة مركبات الإطفاء وتشغيلها عام 2019|قمرة NASA X-56A الأرضية لطيارين عام 2018',
 hi: '360° अंतरिक्ष यात्री दल प्रशिक्षण|360° Crew Dragon भ्रमण|360° Starliner इंजीनियरिंग भ्रमण|अंतरिक्ष में रखरखाव: दल और उपकरण प्रशिक्षण|विमानन में मानवीय कारक: तनाव और संवाद|रवाना होने से पहले दमकल वाहन की जाँच|तटरक्षक पोत के संचालन दल का परिचय|छिंगशुई चट्टानें, हुआलिएन, ताइवान|STS-51G: चार सदस्यों का सिम्युलेटर प्रशिक्षण (1985)|Mako पोत के संचालन कक्ष में दो सदस्य (2014)|दमकल वाहन चालक और संचालक प्रशिक्षण (2019)|NASA X-56A: दो पायलटों का जमीनी नियंत्रण कक्ष (2018)',
 id: 'Pelatihan tim astronaut 360°|Tur Crew Dragon 360°|Tur rekayasa Starliner 360°|Perawatan antariksa: pelatihan tim dan alat|Faktor manusia dalam penerbangan: stres dan komunikasi|Pemeriksaan kendaraan pemadam sebelum berangkat|Tur tim anjungan Penjaga Pantai|Tebing Qingshui, Hualien, Taiwan|STS-51G: empat awak berlatih di simulator (1985)|Dua awak di anjungan kapal Mako (2014)|Pelatihan pengemudi dan operator kendaraan pemadam (2019)|NASA X-56A: kokpit darat dua pilot (2018)',
 vi: 'Huấn luyện nhóm phi hành gia 360°|Tham quan Crew Dragon 360°|Tham quan kỹ thuật Starliner 360°|Bảo dưỡng ngoài không gian: nhóm và công cụ|Yếu tố con người trong hàng không: áp lực và giao tiếp|Kiểm tra xe cứu hỏa trước khi khởi hành|Tham quan nhóm buồng lái tàu Tuần duyên|Vách đá Thanh Thủy, Hoa Liên, Đài Loan|STS-51G: bốn thành viên tập mô phỏng (1985)|Hai thành viên trên buồng lái tàu Mako (2014)|Huấn luyện lái và vận hành xe cứu hỏa (2019)|NASA X-56A: buồng điều khiển mặt đất cho hai phi công (2018)',
 th: 'การฝึกทีมมนุษย์อวกาศแบบ 360°|ชม Crew Dragon แบบ 360°|ชมวิศวกรรม Starliner แบบ 360°|ซ่อมบำรุงในอวกาศ: ฝึกทีมและเครื่องมือ|ปัจจัยมนุษย์ในการบิน: ความเครียดและการสื่อสาร|ตรวจรถดับเพลิงก่อนออกเดินทาง|ชมทีมสะพานเดินเรือของหน่วยยามฝั่ง|หน้าผาชิงสุ่ย ฮวาเหลียน ไต้หวัน|STS-51G: ฝึกจำลองร่วมกันสี่คน (1985)|ลูกเรือสองคนบนสะพานเดินเรือ Mako (2014)|ฝึกขับและควบคุมรถดับเพลิง (2019)|NASA X-56A: ห้องควบคุมภาคพื้นสำหรับนักบินสองคน (2018)',
 ms: 'Latihan pasukan angkasawan 360°|Lawatan Crew Dragon 360°|Lawatan kejuruteraan Starliner 360°|Penyelenggaraan angkasa: latihan pasukan dan alat|Faktor manusia dalam penerbangan: tekanan dan komunikasi|Pemeriksaan kenderaan bomba sebelum bertolak|Lawatan pasukan anjungan Pengawal Pantai|Tebing Qingshui, Hualien, Taiwan|STS-51G: latihan simulator empat kru (1985)|Dua kru di anjungan kapal Mako (2014)|Latihan pemandu dan pengendali kenderaan bomba (2019)|NASA X-56A: kokpit darat dua juruterbang (2018)'
};
const translatedDescriptions = {
 'zh-Hans': '观察多角色训练环境、模拟舱及任务准备，讨论相互复核与沟通。|通过真实舱体和地面设施了解界面分工；影片不是本模拟器的实时视角。|比较不同载具的人因界面与训练场景，以影片发布时的历史介绍为准。|认识宇航员维修训练与任务准备，练习简短明确的团队汇报。|在模拟前后讨论工作负荷、压力和团队沟通。|官方消防训练选用的车辆检查影片，用于说明检查表和交接，不是战车操作教学。|Midgett 舰公开介绍驾驶台各角色的日常工作；2021 年官方记录，长 1:45。',
 ja: '複数の役割による訓練環境と準備を見学し、相互確認と対話について考えます。|実際の宇宙船と地上施設を見学します。本シミュレーターのライブ映像ではありません。|機体ごとの人間中心の操作画面と訓練環境を比較します。内容は公開当時の紹介です。|宇宙飛行士の整備訓練を学び、簡潔な状況報告を練習します。|模擬演習の前後に、仕事量、ストレス、チームの対話を振り返ります。|公式消防訓練で採用された車両点検映像です。点検表と引き継ぎを学ぶもので、戦車の操作訓練ではありません。|Midgett の船橋での日常的な役割を紹介する2021年の公式映像です。長さは1分45秒です。',
 ko: '여러 역할의 훈련 환경과 준비 과정을 살펴보고 상호 확인과 소통을 토론합니다.|실제 우주선과 지상 시설을 살펴봅니다. 이 시뮬레이터의 실시간 영상은 아닙니다.|기체별 인적 요인 인터페이스와 훈련 환경을 비교합니다. 내용은 영상 공개 당시를 기준으로 합니다.|우주비행사의 정비 훈련을 알아보고 간결한 팀 상황 보고를 연습합니다.|시뮬레이션 전후에 작업량, 스트레스, 팀 소통을 되돌아봅니다.|공식 소방 훈련에 선정된 차량 점검 영상으로 점검표와 인계를 설명합니다. 전차 조작 교육이 아닙니다.|Midgett 함교의 일상 업무를 소개하는 2021년 공식 영상입니다. 길이는 1분 45초입니다.',
 fr: 'Observez les rôles, les simulateurs et la préparation ; échangez sur la vérification mutuelle et la communication.|Découvrez de vrais engins et installations au sol. Ce film ne montre pas une vue en direct de notre simulateur.|Comparez les interfaces humaines et les environnements de formation. Le film reflète sa date de publication.|Découvrez la préparation à la maintenance spatiale et entraînez-vous aux comptes rendus concis.|Discutez de la charge de travail, du stress et des échanges avant ou après la simulation.|Film d’inspection sélectionné par la formation officielle des pompiers : listes de contrôle et passation, pas conduite de char.|Présentation officielle de 2021 des rôles quotidiens sur la passerelle du Midgett. Durée : 1 min 45 s.',
 de: 'Beobachten Sie Rollen, Simulatoren und Vorbereitung; besprechen Sie gegenseitige Kontrollen und Kommunikation.|Sehen Sie echte Raumfahrzeuge und Bodenanlagen. Der Film ist keine Liveansicht dieses Simulators.|Vergleichen Sie menschzentrierte Bedienoberflächen und Trainingsumgebungen. Der Film zeigt den Stand seiner Veröffentlichung.|Lernen Sie die Vorbereitung auf Wartungsarbeiten im All kennen und üben Sie kurze Teamberichte.|Besprechen Sie Arbeitsbelastung, Stress und Teamkommunikation vor oder nach der Simulation.|Offiziell ausgewählter Feuerwehr-Schulungsfilm zu Fahrzeugkontrollen, Checklisten und Übergaben; keine Panzer-Fahrausbildung.|Offizielle Einführung von 2021 in die täglichen Aufgaben auf der Midgett-Brücke. Dauer: 1:45.',
 es: 'Observe roles, simuladores y preparación; comente la verificación mutua y la comunicación.|Explore naves e instalaciones terrestres reales. La película no es una vista en directo de este simulador.|Compare interfaces humanas y entornos de formación. El contenido corresponde a la fecha de publicación.|Conozca la preparación para el mantenimiento espacial y practique informes breves al equipo.|Comente la carga de trabajo, el estrés y la comunicación antes o después de la simulación.|Vídeo de inspección seleccionado por la formación oficial de bomberos: listas y relevos; no enseña a manejar tanques.|Presentación oficial de 2021 de las funciones diarias en el puente del Midgett. Duración: 1:45.',
 pt: 'Observe funções, simuladores e preparação; discuta a verificação mútua e a comunicação.|Explore veículos espaciais e instalações terrestres reais. O filme não é uma vista ao vivo deste simulador.|Compare interfaces humanas e ambientes de treino. O conteúdo corresponde à época da publicação.|Conheça a preparação para a manutenção espacial e pratique relatos breves à equipa.|Discuta carga de trabalho, stress e comunicação antes ou depois da simulação.|Vídeo de inspeção selecionado pela formação oficial dos bombeiros: listas de verificação e passagem de serviço; não ensina a operar carros de combate.|Apresentação oficial de 2021 das funções diárias na ponte do Midgett. Duração: 1:45.',
 it: 'Osserva ruoli, simulatori e preparazione; discuti verifiche reciproche e comunicazione.|Esplora veicoli spaziali e strutture a terra reali. Il filmato non è una vista in diretta di questo simulatore.|Confronta interfacce umane e ambienti di addestramento. Il contenuto risale al periodo di pubblicazione.|Scopri la preparazione alla manutenzione spaziale ed esercitati con brevi aggiornamenti alla squadra.|Discuti carico di lavoro, stress e comunicazione prima o dopo la simulazione.|Filmato di controllo scelto dalla formazione ufficiale dei vigili del fuoco: liste e consegne; non insegna a guidare carri armati.|Presentazione ufficiale del 2021 sui ruoli quotidiani nella plancia del Midgett. Durata: 1:45.',
 ar: 'شاهد أدوار الفريق والمحاكيات والاستعداد، وناقش المراجعة المتبادلة والتواصل.|استكشف مركبات فضائية ومرافق أرضية حقيقية. هذا الفيلم ليس بثاً حياً من المحاكي.|قارن واجهات الاستخدام وبيئات التدريب. يعكس المحتوى وقت نشر الفيلم.|تعرّف إلى إعداد رواد الفضاء للصيانة وتدرّب على تقديم تحديثات موجزة للفريق.|ناقش عبء العمل والضغط والتواصل قبل المحاكاة أو بعدها.|فيلم فحص مركبات تختاره جهة تدريب الإطفاء الرسمية لشرح قوائم التحقق والتسليم، وليس قيادة الدبابات.|فيلم رسمي من عام 2021 يعرّف بالأدوار اليومية على جسر Midgett. المدة دقيقة و45 ثانية.',
 hi: 'दल की भूमिकाएँ, सिम्युलेटर और तैयारी देखें; आपसी जाँच और संवाद पर चर्चा करें।|वास्तविक अंतरिक्षयान और जमीनी सुविधाएँ देखें। यह इस सिम्युलेटर का लाइव दृश्य नहीं है।|अलग यानों के मानवीय इंटरफ़ेस और प्रशिक्षण वातावरण की तुलना करें। जानकारी फिल्म के प्रकाशन काल की है।|अंतरिक्ष रखरखाव की तैयारी जानें और दल को संक्षिप्त जानकारी देना सीखें।|सिम्युलेशन से पहले या बाद में कार्यभार, तनाव और दल के संवाद पर चर्चा करें।|आधिकारिक अग्निशमन प्रशिक्षण में चुना गया निरीक्षण वीडियो जाँच-सूची और कार्य हस्तांतरण समझाता है; यह टैंक चलाने का प्रशिक्षण नहीं है।|Midgett पोत के संचालन कक्ष की दैनिक भूमिकाओं पर 2021 का आधिकारिक परिचय। अवधि: 1 मिनट 45 सेकंड।',
 id: 'Amati peran tim, simulator, dan persiapan; diskusikan pemeriksaan silang serta komunikasi.|Jelajahi wahana dan fasilitas darat nyata. Film ini bukan tampilan langsung dari simulator ini.|Bandingkan antarmuka manusia dan lingkungan pelatihan. Isi mencerminkan waktu penerbitan film.|Pelajari persiapan perawatan antariksa dan latih laporan singkat kepada tim.|Diskusikan beban kerja, stres, dan komunikasi sebelum atau sesudah simulasi.|Video pemeriksaan yang dipilih pelatihan resmi pemadam menjelaskan daftar periksa dan serah terima, bukan cara mengoperasikan tank.|Pengenalan resmi tahun 2021 mengenai tugas sehari-hari di anjungan Midgett. Durasi: 1:45.',
 vi: 'Quan sát vai trò, buồng mô phỏng và công tác chuẩn bị; thảo luận về kiểm tra chéo và giao tiếp.|Khám phá tàu vũ trụ và cơ sở mặt đất thật. Đây không phải hình ảnh trực tiếp từ trình mô phỏng này.|So sánh giao diện con người và môi trường huấn luyện. Nội dung phản ánh thời điểm công bố phim.|Tìm hiểu việc chuẩn bị bảo dưỡng ngoài không gian và luyện báo cáo ngắn gọn cho nhóm.|Thảo luận về khối lượng công việc, áp lực và giao tiếp trước hoặc sau mô phỏng.|Video kiểm tra xe do đơn vị huấn luyện cứu hỏa chính thức lựa chọn, minh họa danh sách kiểm tra và bàn giao; không dạy lái xe tăng.|Phim chính thức năm 2021 giới thiệu công việc hằng ngày tại buồng lái Midgett. Thời lượng: 1 phút 45 giây.',
 th: 'ชมบทบาททีม ห้องจำลอง และการเตรียมพร้อม แล้วอภิปรายการตรวจทานร่วมกันและการสื่อสาร|ชมยานอวกาศและสถานที่ภาคพื้นจริง วิดีโอนี้ไม่ใช่ภาพสดจากเครื่องจำลองนี้|เปรียบเทียบส่วนควบคุมและสภาพแวดล้อมการฝึกของยานต่าง ๆ เนื้อหาอ้างอิงช่วงเวลาที่เผยแพร่|เรียนรู้การเตรียมซ่อมบำรุงในอวกาศ และฝึกรายงานสถานการณ์ให้ทีมอย่างกระชับ|อภิปรายภาระงาน ความเครียด และการสื่อสาร ก่อนหรือหลังการจำลอง|วิดีโอตรวจรถที่หน่วยฝึกดับเพลิงทางการคัดเลือก เพื่ออธิบายรายการตรวจและการส่งมอบ ไม่ใช่การฝึกขับรถถัง|วิดีโอทางการปี 2021 แนะนำหน้าที่ประจำวันบนสะพานเดินเรือ Midgett ความยาว 1 นาที 45 วินาที',
 ms: 'Perhatikan peranan pasukan, simulator dan persediaan; bincangkan semakan silang serta komunikasi.|Terokai kapal angkasa dan kemudahan darat sebenar. Filem ini bukan paparan langsung simulator ini.|Bandingkan antara muka manusia dan persekitaran latihan. Kandungannya mencerminkan waktu penerbitan filem.|Pelajari persediaan penyelenggaraan angkasa dan berlatih memberi laporan ringkas kepada pasukan.|Bincangkan beban kerja, tekanan dan komunikasi sebelum atau selepas simulasi.|Video pemeriksaan pilihan latihan bomba rasmi menerangkan senarai semak dan serah tugas, bukan pengendalian kereta kebal.|Pengenalan rasmi tahun 2021 tentang tugas harian di anjungan Midgett. Tempoh: 1:45.'
};
const translatedVideoNotes = {
 'zh-Hans': '由原发布者的 YouTube 播放器提供，需联网，不含离线影片。字幕依原影片提供。',
 ja: '原配信者の YouTube プレーヤーで再生します。通信が必要で、オフライン動画は含みません。字幕は原動画に依存します。',
 ko: '원 게시자의 YouTube 플레이어로 재생합니다. 인터넷이 필요하며 오프라인 영상은 없습니다. 자막은 원 영상에 따라 제공됩니다.',
 fr: 'Diffusion via le lecteur YouTube de l’éditeur. Internet requis ; aucune vidéo hors ligne incluse. Les sous-titres dépendent de la source.',
 de: 'Wiedergabe im YouTube-Player des Herausgebers. Internet erforderlich; kein Offlinevideo enthalten. Untertitel hängen vom Original ab.',
 es: 'Reproducción mediante YouTube del editor original. Requiere internet; no incluye vídeo sin conexión. Los subtítulos dependen de la fuente.',
 pt: 'Reprodução no YouTube do editor original. Requer internet; não inclui vídeo offline. As legendas dependem da fonte.',
 it: 'Riproduzione tramite YouTube dell’editore originale. Serve internet; nessun video offline incluso. I sottotitoli dipendono dalla fonte.',
 ar: 'يُعرض عبر مشغّل YouTube للناشر الأصلي. يلزم الإنترنت ولا يتضمن نسخة بلا اتصال. تتوقف الترجمة على الفيديو الأصلي.',
 hi: 'मूल प्रकाशक के YouTube प्लेयर से प्रसारण। इंटरनेट आवश्यक है; ऑफलाइन वीडियो शामिल नहीं है। उपशीर्षक मूल वीडियो पर निर्भर हैं।',
 id: 'Diputar melalui YouTube penerbit asli. Internet diperlukan; video luring tidak disertakan. Takarir bergantung pada sumber.',
 vi: 'Phát qua YouTube của nhà xuất bản gốc. Cần internet; không kèm video ngoại tuyến. Phụ đề tùy thuộc video gốc.',
 th: 'เล่นผ่าน YouTube ของผู้เผยแพร่ต้นฉบับ ต้องใช้อินเทอร์เน็ต ไม่มีวิดีโอออฟไลน์ คำบรรยายขึ้นอยู่กับต้นฉบับ',
 ms: 'Dimainkan melalui YouTube penerbit asal. Internet diperlukan; video luar talian tidak disertakan. Sari kata bergantung pada sumber.'
};
const translatedMaritimeNotes = {
 'zh-Hans': '由原站提供内嵌播放器，不含影片文件，也不表示官方背书。',
 ja: '公式サイトの埋め込みプレーヤーです。動画ファイルは含まず、公式の推薦を意味しません。',
 ko: '공식 사이트의 내장 플레이어입니다. 영상 파일은 포함하지 않으며 공식 보증을 뜻하지 않습니다.',
 fr: 'Lecteur intégré officiel ; aucun fichier vidéo inclus et aucune approbation officielle implicite.',
 de: 'Offizieller eingebetteter Player; keine Videodatei enthalten und keine behördliche Empfehlung.',
 es: 'Reproductor integrado oficial; no incluye archivo de vídeo ni implica respaldo oficial.',
 pt: 'Leitor incorporado oficial; não inclui ficheiro de vídeo nem implica apoio oficial.',
 it: 'Lettore incorporato ufficiale; nessun file incluso e nessun avallo ufficiale implicito.',
 ar: 'مشغّل مضمّن من المصدر الرسمي؛ لا يتضمن ملف فيديو ولا يدل على تأييد رسمي.',
 hi: 'आधिकारिक एम्बेडेड प्लेयर; वीडियो फ़ाइल शामिल नहीं है और आधिकारिक समर्थन का दावा नहीं है।',
 id: 'Pemutar tertanam resmi; berkas video tidak disertakan dan bukan dukungan resmi.',
 vi: 'Trình phát nhúng chính thức; không kèm tệp video và không hàm ý được cơ quan bảo chứng.',
 th: 'เครื่องเล่นฝังจากแหล่งทางการ ไม่มีไฟล์วิดีโอแนบ และไม่ได้หมายถึงการรับรองจากหน่วยงาน',
 ms: 'Pemain terbenam rasmi; fail video tidak disertakan dan bukan pengesahan rasmi.'
};
const translatedMapNotes = {
 'zh-Hans': 'Natural Earth 1:110m 概览图，177 个面要素；小型岛屿可能省略，不能用于导航或领土主张。',
 ja: 'Natural Earth の1:110m概略図、177面要素。小島が省略される場合があり、航行や領土主張の根拠には使えません。',
 ko: 'Natural Earth 1:110m 개요 지도, 면 요소 177개. 작은 섬이 생략될 수 있으며 항법이나 영유권 주장의 근거가 아닙니다.',
 fr: 'Aperçu Natural Earth à 1:110m : 177 polygones. De petites îles peuvent manquer ; ni navigation ni revendications territoriales.',
 de: 'Natural Earth, Übersicht 1:110m mit 177 Polygonen. Kleine Inseln können fehlen; nicht für Navigation oder Gebietsansprüche.',
 es: 'Mapa general Natural Earth 1:110m con 177 polígonos. Puede omitir islas pequeñas; no sirve para navegación ni reclamaciones territoriales.',
 pt: 'Mapa geral Natural Earth 1:110m com 177 polígonos. Pode omitir pequenas ilhas; não serve para navegação ou reivindicações territoriais.',
 it: 'Mappa generale Natural Earth 1:110m con 177 poligoni. Alcune piccole isole sono omesse; non adatta a navigazione o rivendicazioni territoriali.',
 ar: 'خريطة Natural Earth عامة بمقياس 1:110m و177 مضلعاً. قد تغيب جزر صغيرة؛ ليست للملاحة أو المطالبات الإقليمية.',
 hi: 'Natural Earth 1:110m मानचित्र में 177 बहुभुज हैं। छोटे द्वीप छूट सकते हैं; यह नेविगेशन या क्षेत्रीय दावों के लिए नहीं है।',
 id: 'Peta ringkas Natural Earth 1:110m dengan 177 poligon. Pulau kecil dapat terlewat; bukan untuk navigasi atau klaim wilayah.',
 vi: 'Bản đồ tổng quan Natural Earth 1:110m có 177 đa giác. Có thể thiếu đảo nhỏ; không dùng để dẫn đường hoặc khẳng định lãnh thổ.',
 th: 'แผนที่ภาพรวม Natural Earth 1:110m มี 177 รูปหลายเหลี่ยม อาจไม่แสดงเกาะเล็ก ไม่ใช้เดินเรือหรืออ้างสิทธิ์ดินแดน',
 ms: 'Peta ringkas Natural Earth 1:110m dengan 177 poligon. Pulau kecil mungkin tiada; bukan untuk navigasi atau tuntutan wilayah.'
};
const titleTargets = [...mediaItems, maritimeMedia, ...photos];
const descriptionTargets = [...mediaItems, maritimeMedia];
for (const [locale, row] of Object.entries(translatedTitles)) {
  const values = row.split('|');
  if (values.length !== titleTargets.length) throw new Error(`Media title count: ${locale}`);
  titleTargets.forEach((item, i) => { item.title[locale] = values[i]; });
  const descriptions = translatedDescriptions[locale].split('|');
  if (descriptions.length !== descriptionTargets.length) throw new Error(`Media description count: ${locale}`);
  descriptionTargets.forEach((item, i) => { item.description[locale] = descriptions[i]; });
  youtubeNote[locale] = translatedVideoNotes[locale];
  maritimeMedia.licenseNote[locale] = translatedMaritimeNotes[locale];
  mapCredit.note[locale] = translatedMapNotes[locale];
}

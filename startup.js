/* Startup help remains usable when file:// prevents module imports. */
(function(){
 const notices={
 'zh-Hant':'請用本地伺服器或 HTTPS 網址開啟。解壓縮後，在套件資料夾執行下方指令，再開啟 http://localhost:8765 。直接雙擊 HTML 會阻擋部分功能。',
 'zh-Hans':'请用本地服务器或 HTTPS 网址打开。解压后，在套件文件夹执行下方命令，再打开 http://localhost:8765 。直接双击 HTML 会阻止部分功能。',
 en:'Open with the included local server or HTTPS. After extracting, run this command in the package folder and visit http://localhost:8765. Opening HTML directly blocks some features.',
 ja:'付属のローカルサーバーまたはHTTPSで開いてください。展開後、パッケージフォルダーで次のコマンドを実行し、http://localhost:8765 を開きます。HTMLを直接開くと一部の機能が動きません。',
 ko:'포함된 로컬 서버 또는 HTTPS로 여세요. 압축을 푼 폴더에서 아래 명령을 실행한 뒤 http://localhost:8765 로 접속하세요. HTML을 직접 열면 일부 기능이 차단됩니다.',
 fr:'Ouvrez avec le serveur local fourni ou HTTPS. Après extraction, exécutez cette commande dans le dossier et ouvrez http://localhost:8765. Un fichier HTML ouvert directement bloque certaines fonctions.',
 de:'Öffnen Sie die App über den lokalen Server oder HTTPS. Führen Sie nach dem Entpacken diesen Befehl im Paketordner aus und öffnen Sie http://localhost:8765. Direktes Öffnen der HTML-Datei blockiert Funktionen.',
 es:'Abre con el servidor local incluido o HTTPS. Tras extraer, ejecuta este comando en la carpeta y abre http://localhost:8765. Abrir HTML directamente bloquea algunas funciones.',
 pt:'Abra com o servidor local incluído ou HTTPS. Após extrair, execute este comando na pasta e abra http://localhost:8765. Abrir o HTML diretamente bloqueia algumas funções.',
 it:'Apri con il server locale incluso o HTTPS. Dopo aver estratto, esegui questo comando nella cartella e apri http://localhost:8765. Aprire direttamente HTML blocca alcune funzioni.',
 ar:'افتح التطبيق بالخادم المحلي المرفق أو عبر HTTPS. بعد فك الضغط شغّل الأمر التالي في مجلد الحزمة وافتح http://localhost:8765. فتح HTML مباشرة يمنع بعض الوظائف.',
 hi:'दिए स्थानीय सर्वर या HTTPS से खोलें। फ़ाइलें निकालने के बाद पैकेज फ़ोल्डर में यह कमांड चलाएँ और http://localhost:8765 खोलें। HTML सीधे खोलने पर कुछ सुविधाएँ रुकती हैं।',
 id:'Buka dengan server lokal yang disertakan atau HTTPS. Setelah ekstraksi, jalankan perintah ini di folder paket dan buka http://localhost:8765. Membuka HTML langsung memblokir beberapa fitur.',
 vi:'Mở bằng máy chủ cục bộ đi kèm hoặc HTTPS. Sau khi giải nén, chạy lệnh dưới đây trong thư mục gói và mở http://localhost:8765. Mở HTML trực tiếp sẽ chặn một số chức năng.',
 th:'เปิดผ่านเซิร์ฟเวอร์ภายในที่ให้มาหรือ HTTPS หลังแตกไฟล์ให้รันคำสั่งนี้ในโฟลเดอร์แพ็กเกจแล้วเปิด http://localhost:8765 การเปิด HTML โดยตรงจะบล็อกบางฟังก์ชัน',
 ms:'Buka menggunakan pelayan setempat yang disertakan atau HTTPS. Selepas diekstrak, jalankan arahan ini dalam folder pakej dan buka http://localhost:8765. Membuka HTML terus menyekat beberapa fungsi.'
 };
 let language=navigator.language||'en';language=/^zh/i.test(language)?(/TW|HK|MO|Hant/i.test(language)?'zh-Hant':'zh-Hans'):language.split('-')[0];
 function help(){const boot=document.querySelector('#app .boot');if(!boot)return;boot.replaceChildren();const title=document.createElement('b');title.textContent='RESILIENCE / CREW LAB';const info=document.createElement('p');info.textContent=notices[language]||notices.en;info.style.maxWidth='600px';const code=document.createElement('pre');code.textContent='bash tools/start-local.sh';boot.append(title,info,code);}
 if(location.protocol==='file:')help();else setTimeout(help,12000);
})();

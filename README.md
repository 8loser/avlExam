# AVL 考試

- 考試題目 https://avancevl.github.io/recruit/sample_backenddev.html

# 資料庫

- 使用 firebase cloud firestore
- 新版本 cloud firestore 在 firebase init 的時候會有 `Error: Error fetching Firestore indexes` 錯誤，要到 https://console.cloud.google.com/datastore/ 轉換成原生版本，這是 bug https://github.com/firebase/firebase-tools/issues/1988

* 資料另存成 CSV 檔後，使用線上 CSV2JSON 轉換為 JSON 格式
* 使用 `dataprepare/regulation.js` 整理資料內容
* `dataprepare/data.json` 為整理過得資料內容
* 使用 `dataprepare/upload.js` 上傳到 firebase 資料庫

# 後端程式

- 資料夾 `functions`
- 先執行 `npm install` 安裝需要套件
- 設置 `config.js`，設置內容參考 `config.js` 內部註解
- `.runtimeconfig.json` 與 `utility/firebaseConnection.js` 兩個檔案搭配，決定連接資料庫方法，在本地端與 firebase 端連接方式不同
- 啟動模擬器方法
  - 於 `functions` 資料夾執行 `npm run serve`
  - 或者 `firebase emulators:start --only functions`
- 佈署到 firebase
  - 於 `functions` 資料夾執行 `npm run deploy`
  - 或者 `firebase deploy --only functions`

# 前端程式

- 資料夾 `vue`
- 先執行 `npm install` 安裝需要套件
- 環境變數設置
  - `.env` 本機環境
  - `.env.production` 正式環境
- 發布
  - 於 `vue` 資料夾執行 `npm run build`，程式碼會打包到 `public` 資料夾
- 佈署到 firebase
  - 執行 `firebase deploy --only hosting`
  - 會把 `public` 資料夾內容佈署到 `firebase hosting` 內

# 備註

- 更換 node 版本時，firebase-tools 要重新安裝
  - 執行 `npm install -g firebase-tools`
- firebase 免費版本有每日限制額度，如果撈資料庫失敗可以查看是否配額已達每日上線
  - 參考 https://console.cloud.google.com/appengine/quotadetails
- firebase functions 有 cold start 機制
  - 佈署到 firebase 上後，如果有一段時間沒有存取會釋放物件，等收到新的請求時才會重新建立物件 (cold start)，這中間可能會有好幾秒延遲，所以前端請求 API 的 timeout 時間設定為 10 秒。
  - 改善方法
    - minimizing cold start time https://firebase.google.com/docs/functions/tips#performance
    - 使用自己的 server

# AVL 考試

- 考試題目 https://avancevl.github.io/recruit/sample_backenddev.html

# 資料庫

- 使用 firebase cloud firestore
- 新版本 cloud firestore 在 firebase init 的時候會有 `Error: Error fetching Firestore indexes` 錯誤，要到 https://console.cloud.google.com/datastore/ 轉換成原生版本，這是 bug https://github.com/firebase/firebase-tools/issues/1988

* 資料庫內容為 `data.json` 請匯入到 cloud firestore

# 後端程式

- 資料夾 `functions`
- 先執行 `npm install` 安裝需要套件
- 執行前先設置 `config.js`，設置內容參考 `config.js` 內部註解
- 啟動模擬器方法
  - 於 `functions` 資料夾執行 `npm run serve`
  - 或者 `firebase emulators:start --only functions`
- 佈署到 firebase
  - 於 `functions` 資料夾執行 `npm run deploy`
  - 或者 `firebase deploy --only functions`

# 前端程式

- 資料夾 `vue`
- 環境變數設置
  - `.env` 本機環境
  - `.env.production` 正式環境
- 發布
  - 於 `vue` 資料夾執行 `npm run build`，程式碼會打包到 `public` 資料夾
- 佈署到 firebase
  - 執行 `firebase deploy --only hosting`
  - 會把 `public` 資料夾內容佈署到 `firebase hosting` 內

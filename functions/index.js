const functions = require("firebase-functions");
const express = require("express");
const app = express();

// 設定CORS
const cors = require("cors");
app.use(cors({ origin: true }));

// 設定路由路徑
app.use("/demo", require("./routes/demoRoute"));

/**
 * 使用 firebase
 * api 會是 function 的名稱
 * 如 https://project.cloudfunctions.net/api/
 */
// const functions = require("firebase-functions");
// const api = functions.https.onRequest(app);
// module.exports = { api };

app.listen(3000);

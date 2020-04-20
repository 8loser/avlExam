const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");

// 設定CORS
app.use(cors({ origin: true }));

// 設定路由路徑
app.use("/Mail", require("./routes/mailRoute"));

// api 會是 function 的名稱
// 如 https://project.cloudfunctions.net/api/
const api = functions.https.onRequest(app);

module.exports = { api };

const { google } = require("googleapis");
const { googleSecret } = require("../config");

const oauth2 = google.oauth2("v2");

/**
 * google OAuth 設置
 * https://console.developers.google.com/apis/credentials
 */
const oauth2Client = new google.auth.OAuth2(
  googleSecret.web.client_id,
  googleSecret.web.client_secret,
  googleSecret.web.redirect_uris
);

// 產生授權網址
exports.generateAuthUrl = () => {
  // 要取得授權的資源
  // 參考 https://developers.google.com/identity/protocols/oauth2/scopes
  const scopes = [
    // 檢視電子郵件地址權限
    "https://www.googleapis.com/auth/userinfo.email",
    // 查看個人資訊權限
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
};

// 使用 code 呼叫 google API 取得使用者資料
exports.getUserDetails = async (code, res, callback) => {
  // 使用 code 取得token
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  // 使用 token 取得使用者資訊
  const userInfo = await oauth2.userinfo.get({ auth: oauth2Client });
  callback(userInfo);
};

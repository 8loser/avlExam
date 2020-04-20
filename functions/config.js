/**
 * 全域設定檔案
 */
const config = {
  // 發信接收的收件者
  recipient: "",
};

/**
 * nodeMailer 使用的設定檔
 * 從這裡產生應用程式密碼，避免直接使用Email密碼
 * https://myaccount.google.com/security
 */
const nodeMailerSetting = {
  service: "Gmail",
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
};

module.exports = { config, nodeMailerSetting };

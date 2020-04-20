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

/**
 * firebase 連接設定
 * 從 Firebase/專案設定/服務帳戶/產生新的私密金鑰 下載
 */
const firebaseAccount = {
  type: "",
  project_id: "",
  private_key_id: "",
  private_key: "",
  client_email: "",
  client_id: "",
  auth_uri: "",
  token_uri: "",
  auth_provider_x509_cert_url: "",
  client_x509_cert_url: "",
};

module.exports = { config, nodeMailerSetting, firebaseAccount };

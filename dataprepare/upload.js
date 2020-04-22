/**
 * 上傳 JSON 資料到 firebase 使用
 */
const firestoreService = require("firestore-export-import");
// firebase連接設定，從 Firebase/專案設定/服務帳戶/產生新的私密金鑰 下載
const serviceAccount = require("./serviceAccount.json");
// 專案網址 參考 Firebase/專案設定/服務帳戶/Firebase Admin SDK
const databaseURL = "https://專案ID.firebaseio.com";
// 要上傳的 JSON 檔
const data = "./data.json";

const jsonToFirestore = async () => {
  try {
    // 初始化，參考 Firebase/專案設定/服務帳戶/Firebase Admin SDK
    console.log("init");
    firestoreService.initializeApp(serviceAccount, databaseURL);
    // 上傳 JSON 檔
    console.log("上傳 JSON 檔");
    await firestoreService.restore(data);
    console.log("上傳成功");
  } catch (error) {
    console.log(error);
  }
};

jsonToFirestore();

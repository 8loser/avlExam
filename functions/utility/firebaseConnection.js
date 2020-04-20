const functions = require("firebase-functions");
// https://firebase.google.com/docs/firestore/quickstart

const admin = require("firebase-admin");

// 判斷目前環境是否在firebase，使用不同連接firestore方式
if (
  typeof functions.config().variable !== "undefined" &&
  functions.config().variable.env !== "develop"
) {
  // 佈署在 Cloud Functions
  admin.initializeApp(functions.config().firebase);
} else {
  // 佈署在其他主機
  const { firebaseAccount } = require("../config");
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAccount),
    databaseURL: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
  });
}

module.exports = admin.firestore();

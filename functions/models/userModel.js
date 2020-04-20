const firebase = require("../utility/firebaseConnection");

const collection = firebase.collection("user");
module.exports = {
  // 使用UserId查詢使用者資料
  get: (res, userId, callback) => {
    collection
      .doc(userId)
      .get()
      .then((doc) => {
        var data = null;
        if (doc.exists) {
          data = doc.data();
        }
        res.status(200);
        callback(data);
        return;
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // 儲存使用者資料
  put: function (data) {
    collection.doc(data.id).set(data);
  },
};

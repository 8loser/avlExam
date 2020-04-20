const firebase = require("../utility/firebaseConnection");

const collection = firebase.collection("problem");
module.exports = {
  /**
   * 查詢problem API
   * @param {*} req
   *  req.query.hashtags[] 要查詢的 hashtags，最多 10 個
   *  req.query.after 查詢第幾個 id 後的資料
   * @param {*} res
   * @param {function} callback 查詢完成要執行的 callback
   */
  list: function (req, res, callback) {
    var filter = collection.orderBy("id").limit(20);
    /**
     * 如果有 hashtags 參數，加上 hashtags 查詢條件
     * https://firebase.google.com/docs/firestore/query-data/queries#in_and_array-contains-any
     * array-cotains-any 參數 req.query.hashtags 長度最大只到10
     */
    if (req.query.hashtags) {
      filter = filter.where(
        "hashtags",
        "array-contains-any",
        req.query.hashtags
      );
    }
    /**
     * 如果有 after 參數，則 id 從 after 之後開始查詢
     */
    if (req.query.after) {
      filter = filter.startAfter(Number(req.query.after));
    }
    filter
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          if (doc.exists) {
            // 建構回傳的資料
            var problem = {};
            problem["id"] = doc.data().id;
            problem["question_id"] = doc.data().question_id;
            problem["question_text"] = doc.data().question_text;
            problem["question_title"] = doc.data().question_title;
            problem["hashtags"] = doc.data().hashtags;
            data.push(problem);
          }
        });
        res.status(200);
        callback(res, data);
        return;
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  /**
   * 使用 questiondId 取得對應 problem
   * @param {*} res
   * @param {array} questionId problem.question_id 欄位，最大長度 10
   * @param {*} callback 查詢完成執行 callback
   */
  get: function (res, questionId, callback) {
    collection
      /**
       * 加上 question_id array 查詢條件，長度最大只到10
       * https://firebase.google.com/docs/firestore/query-data/queries#in_and_array-contains-any
       */
      .where("question_id", "in", questionId)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          if (doc.exists) {
            data.push(doc.data());
          }
        });
        res.status(200);
        callback(data);
        return;
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};

const model = require("../models/problemModel");

// 回傳成功訊息的架構
const success = (data) => {
  return {
    result: "success",
    data: data,
  };
};
// 回傳錯誤訊息的架構
const failed = (message) => {
  return {
    result: "failed",
    message: message,
  };
};

// 查詢 problem
exports.list = function (req, res) {
  model.list(req, res, (res, data) => {
    res.json(success(data));
  });
};

// 使用 question_id 取得 problem
exports.get = function (req, res) {
  var questionId = req.params.question_id;
  model.get(res, [questionId], (data) => {
    res.json(data);
  });
};

// 計算答案結果
exports.result = function (req, res) {
  const answers = req.query;
  // 取出所有的 key，查詢資料庫
  const keys = Object.keys(req.query);
  if (keys.length <= 0) {
    res.json(failed("請輸入答案"));
    return;
  }
  if (keys.length > 10) {
    res.json(failed("firestore IN 查詢限制 10 個"));
    return;
  }
  // 取出 problem.question_id 符合 keys 的資料
  model.get(res, keys, (data) => {
    // 答題數量
    const completed = keys.length;
    var check = {};
    data.forEach((problem) => {
      // 檢查答案
      check[problem.question_id] =
        parseInt(answers[problem.question_id]) === problem.answer
          ? true
          : false;
    });
    // 答對題數
    const correct = Object.values(check).filter((e) => e === true).length;
    // 準確率
    const accuracy = correct / completed;
    const result = {
      completed: completed,
      correct: correct,
      accuracy: accuracy,
    };
    res.json(success(result));
  });
};

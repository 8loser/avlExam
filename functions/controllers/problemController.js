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

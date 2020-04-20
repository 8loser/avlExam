const OAuth = require("../utility/OAuth");

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

// 取得 OAuth 授權網址
exports.getAuthURL = function (req, res) {
  var url = OAuth.generateAuthUrl();
  if (url) {
    res.json(success({ url: url }));
  } else {
    res.json(failed("網址產生失敗"));
  }
};

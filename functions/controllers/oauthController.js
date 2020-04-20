const OAuth = require("../utility/OAuth");
const model = require("../models/userModel");

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

/**
 * 使用 code 呼叫 google API 取得使用者資料
 * @param {string} req.body.code 授權完成後取得的 code
 */
exports.handler = (req, res) => {
  var code = req.body.code;
  if (code) {
    OAuth.getUserDetails(code, res, (userInfo) => {
      // 取得名稱及email
      var data = {
        id: userInfo.data.id,
        name: userInfo.data.name,
        email: userInfo.data.email,
      };
      // 儲存到資料庫 user collection
      try {
        model.put(data);
      } catch (err) {
        res.json(failed("寫入資料庫失敗: " + err));
        return;
      }
      res.json(success(data));
    });
  } else {
    res.json(failed("代碼為空"));
  }
};

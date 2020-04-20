const mailerTransport = require("../utility/Mailer");
const { config } = require("../config");

// 回傳的訊息格式
const returnJSON = (result, message) => {
  var obj = {};
  obj.result = result; //發送結果
  obj.message = message; //訊息
  return obj;
};

// 發送Email
exports.send = function (req, res) {
  // 主旨
  const subject = req.body.subject;
  // 內文
  const body = req.body.body;
  // 參數檢查
  if (!subject) {
    res.json(returnJSON("failed", "沒有標題"));
    return;
  }
  if (!body) {
    res.json(returnJSON("failed", "沒有內容"));
    return;
  }
  // 發送email
  mailerTransport.sendMail(
    {
      to: config.recipient,
      subject: subject,
      text: body,
    },
    (err) => {
      if (err) {
        // 發送失敗
        res.json(returnJSON("failed", err));
      } else {
        // 發送成功
        res.json(returnJSON("success"));
      }
    }
  );
};

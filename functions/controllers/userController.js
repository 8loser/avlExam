const model = require("../models/userModel");

// 取得使用者資料
exports.get = function (req, res) {
  var userId = req.params.userId;
  if (userId) {
    model.get(res, userId, (data) => {
      if (data) {
        res.json(data);
      } else {
        res.send("查無UserId");
      }
    });
  } else {
    res.send("查無UserId");
  }
};

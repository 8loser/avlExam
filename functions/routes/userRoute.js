const router = require("express").Router();
const controller = require("../controllers/userController");

// 使用 userId 取得使用者資訊 user collection
router.get("/", controller.get); //沒有 userId 參數回傳錯誤訊息
router.get("/:userId", controller.get);

module.exports = router;

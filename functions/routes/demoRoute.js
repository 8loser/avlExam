const router = require("express").Router();
const controller = require("../controllers/demoController");

// 設定路徑執行動作
router.get("/", controller.get);
// 帶參數
router.get("/:param", controller.get);

module.exports = router;

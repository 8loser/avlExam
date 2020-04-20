const router = require("express").Router();
const controller = require("../controllers/oauthController");

// 取得 OAuth 授權網址
router.get("/", controller.getAuthURL);

module.exports = router;

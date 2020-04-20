const router = require("express").Router();
const controller = require("../controllers/oauthController");

// 取得 OAuth 授權網址
router.get("/", controller.getAuthURL);

/**
 * 使用 code 取得使用者資訊
 * @param {string} req.body.code 授權完成後取得的 token code
 */
router.post("/handler", controller.handler);

module.exports = router;

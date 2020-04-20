const router = require("express").Router();
const controller = require("../controllers/mailController");

/**
 * 發送Email
 * @param req.body.subject 主旨
 * @param req.body.body 內文
 */
router.post("/", controller.send);

module.exports = router;

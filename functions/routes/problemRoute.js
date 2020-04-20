const router = require("express").Router();
const controller = require("../controllers/problemController");

/**
 * 查詢problem API
 * @param query.hashtags[] 要查詢的 hashtags 最多 10 個
 * @param query.after 查詢第幾個 id 後的資料
 */
router.get("/", controller.list);

/**
 * 使用question_id取得problem資料
 * @param question_id problem.question_id
 */
router.get("/:question_id", controller.get);

/**
 * 計算答案結果
 * @param query.answer{[question_id: 答案]} 所有已作答的題目跟答案
 */
router.get("/result", controller.result);

module.exports = router;

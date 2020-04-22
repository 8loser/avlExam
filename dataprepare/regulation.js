/**
 * 整理 JSON 檔案使用
 */
const fs = require("fs");
// 載入原始 JSON 檔案
var data = require("./原始檔案.json");
// 輸出的 JSON 檔案名稱
var newDataName = "data.json";

var problem = data["problem"];

problem.forEach((item) => {
  // 產生 Number 型態的 id，不然使用 文字型態 id 排序會怪怪的
  item.id = Number(item.question_id.replace("problem", ""));
  // hashtags 切割為 array
  item.hashtags = item.hashtags.split(",");
});

// 物件轉為 JSON
const newdata = JSON.stringify({ problem: problem }, null, 2);

// 寫入 JSON 檔
fs.writeFile(newDataName, newdata, (err) => {
  if (err) throw err;
  console.log("寫入完成" + newDataName);
});

const nodemailer = require("nodemailer");
// 載入設定檔
const { nodeMailerSetting } = require("../config");

const mailTransport = nodemailer.createTransport(nodeMailerSetting);

module.exports = mailTransport;

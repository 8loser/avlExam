const model = require("../models/demoModel");

/**
 * DEMO Controller
 */
exports.get = function (req, res) {
  model.get(res, req, (data) => {
    res.send(data);
  });
};

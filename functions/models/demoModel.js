/**
 * DEMO model
 */
module.exports = {
  get: (res, req, callback) => {
    const data = {
      title: "demo",
    };
    if (req.params.param) {
      data["param"] = req.params.param;
    }
    callback(data);
  },
};

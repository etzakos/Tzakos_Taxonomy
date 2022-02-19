const logger = require("../services/logging");

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(400).send("Bad Request");
};

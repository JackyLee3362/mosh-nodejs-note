const winston = require("winston");

module.exports = function (err, req, res, next) {
  // Log the exception
  // 11.6
  // winston.log('error', err,message);
  winston.error("err.message", err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("error.js: Something failed."); // 11.2 500表示服务器内部错误
};

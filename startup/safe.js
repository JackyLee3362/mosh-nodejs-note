const helmet = require("helmet"); // 中间件：安全相关

module.exports = function (app) {
  app.use(helmet());
};

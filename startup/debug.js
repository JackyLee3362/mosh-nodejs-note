const morgan = require("morgan"); // 中间件：日志
// 调试中间件
const startupDebugger = require("debug")("app:startup"); // debug返回的是一个函数，后面跟上变量（命名空间）
const dbDebugger = require("debug")("app:db"); // 调试中间件

module.exports = function (app) {
  // 配置环境测试
  console.log(app.get("env"));
  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("Morgan enabled...");
  }

  // startupDebugger
  // 需要在环境变量中设置 DEBUG=app:startup
  startupDebugger("start up debugging...");
  // dbDebugger
  dbDebugger("database debugging...");
};

const express = require("express");
const winston = require("winston");

const app = express();

require("./startup/logging")(); // 11.13 优化日志逻辑
require("./startup/cors")(app); // react课程中的8.23内容
require("./startup/route")(app); // 11.11 优化路由逻辑
require("./startup/db")(); // 11.12 优化数据库逻辑
require("./startup/config")(); // 11.14 优化配置逻辑
require("./startup/validation")(); // 11.15 优化验证逻辑
require("./startup/debug")(app); // 自己加的：优化调试逻辑
require("./startup/safe")(app); // 自己加的：优化安全逻辑
require("./startup/static")(app); // 自己加的：优化静态资源逻辑

// 启动服务器
const port = process.env.PORT || 3000; // 4.6 设置环境变量PORT

const server = app.listen(port, () =>
  winston.info(`listening on port ${port}...`)
);

module.exports = server;

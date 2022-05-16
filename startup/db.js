const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db)
    // .then("connect to MongoDB/courses") // 11.12 优化为winston
    .then(() => winston.info(`Connected to ${db}`));
  // .catch("can't connect to MongoDB"); // 11.12 优化掉，因为如果有错误，“11.9 👆上面的简化版，Mosh推荐这个”下面的代码会处理
};

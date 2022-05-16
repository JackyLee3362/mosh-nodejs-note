const express = require("express");

module.exports = function (app) {
  app.use(express.urlencoded({ extended: true })); // 解析url（比如key=value&key=value)
  app.use(express.static("public")); // 静态资源目录
  // 模板引擎
  app.set("view engine", "pug"); // express会自动帮我们导入
};

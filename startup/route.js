const express = require("express");
// 路由
const home = require("../routes/home"); // 自定义路由
const courses = require("../routes/courses"); // 自定义路由
const customers = require("../routes/customers"); // 自定义路由
// const urls = require("../routes/hostname"); // 自定义关注up主
const users = require("../routes/user");
const auth = require("../routes/auth");
const error = require("../middleware/error"); // 11.3

const genres = require("../routes/genres");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const returns = require("../routes/returns");

module.exports = function (app) {
  // 路由配置
  app.use(express.json()); // 添加json中间件
  app.use("/", home);
  app.use("/api/courses", courses);
  app.use("/api/customers", customers);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/returns", returns);
  app.use(error); // 11.3 处理异常的中间件（一定要放在路由配置后面）
};

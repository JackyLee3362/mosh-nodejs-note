// 框架
const express = require("express"); // 框架：express

// 中间件
const config = require("config"); // 中间件：配置
const helmet = require("helmet"); // 中间件：安全相关
const morgan = require("morgan"); // 中间件：日志
const logger = require("./middleware/logger"); // 自定义中间件：
// const error = require("./middleware/error"); // 11.3 => startup/route.js
require("express-async-errors"); // 11.4 express的模块（可以不用11.3了），建议使用这个，如果无效，可以使用上面这个函数
const winston = require("winston"); // 11.6 记录错误日志
require("winston-mongodb"); // 11.7 记录日志到MongoDB

// 调试中间件
const startupDebugger = require("debug")("app:startup"); // debug返回的是一个函数，后面跟上变量（命名空间）
const dbDebugger = require("debug")("app:db"); // 调试中间件

// 数据库 => 移动至 startup/db.js
const mongoose = require("mongoose");

// 路由 => 移动至 startup/route.js
const home = require("./routes/home"); // 自定义路由
const courses = require("./routes/courses"); // 自定义路由
const customers = require("./routes/customers"); // 自定义路由
const urls = require("./routes/favoriteurls"); // 自定义收藏夹
const users = require("./routes/user");
const auth = require("./routes/auth");

// 框架
const app = express();

// 11.11 优化路由逻辑
require("./startup/route")(app);

// 11.12 优化数据库逻辑
require("./startup/db")();

// 11.8 未捕捉的错误
// process.on("uncaughtException", (ex) => {
//   console.log("WE GOT AN UNCAUGHT EXCEPTION");
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

// 11.9 👆上面的简化版，Mosh推荐这个
winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);
// 11.9 处理被拒的Promise
process.on("unhandledRejection", (ex) => {
  console.log("WE GOT AN UNHANDLED REJECTION");
  winston.error(ex.message, ex);
  // process.exit(1);
});

// 11.6 记录错误日志
// winston.add(winston.transports.File, { filename: "logfile.log" }); // 会产生错误
winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/courses",
    level: "info",
  })
);

// 11.8 测试未捕捉错误（在Express外的错误）
// throw new Error("Something failed during startup.");

// 11.9 未处理的被拒的Promise
const p = Promise.reject(new Error("Something failed miserably!(Promise)"));

p.then(() => console.log("Done"));
// 中间件

app.use(express.urlencoded({ extended: true })); // 解析url（比如key=value&key=value)
app.use(express.static("public")); // 静态资源目录
app.use(helmet());

// 路由配置  => 移动至 startup/route.js
app.use(express.json()); // 添加json中间件
app.use("/", home);
app.use("/api/courses", courses);
app.use("/api/customers", customers);
app.use("/api/urls", urls);
app.use("/api/users/", users);
app.use("/api/auth", auth);
app.use(error); // 11.3 处理异常的中间件（一定要放在路由配置后面）

// Configuration 配置
// windows运行前设置环境变量$env:NODE_ENV="development"
console.log("Application Name: " + config.get("name"));
console.log("Mail Server Name: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password")); // 这里要使用环境变量，不能将密码写入配置文件中
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
} // $env:jwtPrivateKey="hello, world"

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

// 模板引擎
app.set("view engine", "pug"); // express会自动帮我们导入
// app.set('views', './views')  // 这是可选项，保存模板的路径默认是views

app.use(logger);

// 自定义中间件
app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

// 连接数据库  => 移动至 startup/db.js
mongoose
  .connect("mongodb://localhost/courses", {
    useNewUrlParser: true,
    useUnifiedTopology: true, // 11.7 在 MongoDB 中记录日志
  })
  .then("connect to MongoDB/courses")
  .catch("can't connect to MongoDB");
app.post("/post/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
// 启动服务器
const port = process.env.PORT || 3000; // 4.6 设置环境变量PORT

app.listen(port, () => console.log(`listening on port ${port}...`));

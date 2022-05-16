// 框架
const express = require("express"); // 框架：express

// 中间件
const config = require("config"); // 中间件：配置
const helmet = require("helmet"); // 中间件：安全相关
const morgan = require("morgan"); // 中间件：日志
const logger = require("./middleware/logger"); // 自定义中间件：

// 调试中间件
const startupDebugger = require("debug")("app:startup"); // debug返回的是一个函数，后面跟上变量（命名空间）
const dbDebugger = require("debug")("app:db"); // 调试中间件

// 数据库
const mongoose = require("mongoose");

// 路由
const home = require("./routes/home"); // 自定义路由
const courses = require("./routes/courses"); // 自定义路由
const customers = require("./routes/customers"); // 自定义路由
const urls = require("./routes/favoriteurls"); // 自定义收藏夹

// 框架
const app = express();

// 中间件
app.use(express.json()); // 添加json中间件
app.use(express.urlencoded({ extended: true })); // 解析url（比如key=value&key=value)
app.use(express.static("public")); // 静态资源目录
app.use(helmet());

// 路由配置
app.use("/", home);
app.use("/api/courses", courses);
app.use("/api/customers", customers);
app.use("/api/urls", urls);

// Configuration 配置
// windows运行前设置环境变量$env:NODE_ENV="development"
console.log("Application Name: " + config.get("name"));
console.log("Mail Server Name: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password")); // 这里要使用环境变量，不能将密码写入配置文件中

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

// 连接数据库
mongoose
  .connect("mongodb://localhost/courses")
  .then("connect to MongoDB/courses")
  .catch("can't connect to MongoDB");
app.post("/post/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
// 启动服务器
const port = process.env.PORT || 3000; // 4.6 设置环境变量PORT

app.listen(port, () => console.log(`listening on port ${port}...`));

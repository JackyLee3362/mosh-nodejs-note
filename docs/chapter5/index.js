const config = require("config");
const express = require("express");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const helmet = require("helmet");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup"); // debug返回的是一个函数，后面跟上变量（命名空间）
const dbDebugger = require("debug")("app:db");
const app = express();

app.use(express.json()); // 添加中间件
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static("public")); // 从根路径开始的，或者用 static(./doc/chapter5/public)
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

// Configuration
// windows运行前设置环境变量$env:NODE_ENV="development"
console.log("Application Name: " + config.get("name"));
console.log("Mail Server Name: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

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

app.set("view engine", "pug"); // express会自动帮我们导入
// app.set('views', './views')  // 这是可选项，保存模板的路径默认是views

app.use(logger);

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

// 启动服务器
const port = process.env.PORT || 3000; // 4.6 设置环境变量PORT

app.listen(port, () => console.log(`listening on port ${port}...`));

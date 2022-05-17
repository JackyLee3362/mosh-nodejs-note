[Main](../../README.md) | [Previous](../chapter4/README.md) | [Next](../chapter6/README.md)

# Chapter 5 Middleware

## 5.1 Introduction

- Middleware
- Configuration
- Debugging
- Templating Engines

## 5.2 Middleware 中间件

Request processing pipeline 请求处理管道

--------------< Middleware > -------------  
request =>| json() => route() |=> response

## 5.3 Building Custom Middleware 创建自定义中间件

```javascript
app.use(function (req, res, next) {
  console.log("Logging...");
  next();
});
```

## 5.4 Built-in Middleware 内置中间件

```javascript
app.use(express.json()); // 添加中间件
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static("public")); // 从根路径开始的，或者用 static(./doc/chapter5/public)
```

## 5.5 Third-party Middleware 第三方中间件

[地址](http://expressjs.com/en/resources/middleware.html)

```javascript
const helmet = require("helmet");
var morgan = require("morgan"); // 记录HTTP请求的日志记录

app.use(helmet());
app.use(morgan("tiny"));
```

任何中间件的使用都会对性能造成影响，所以一般在生产环境中不使用（如 morgan）

## 5.6 Environments 环境

Development/Production Environment 开发/生产环境

```javascript
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);
// 设置不同环境下的中间件
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}
```

## 5.7 Configuration 配置

npm rc
npm config

```javascript
// Configuration
// windows运行前设置环境变量$env:NODE_ENV="development"
// linux/unix 运行前设置 export NODE_ENV="development"
console.log("Application Name: " + config.get("name"));
console.log("Mail Server Name: " + config.get("mail.host"));
```

当涉及敏感信息时，我们不能保存在配置文件中
此时创建配置文件 custom-development-variables.json
同时，在 shell 中配置环境变量 app_password

```javascript
console.log("Mail Password: " + config.get("mail.password"));
```

## 5.8 Debugging 调试

npm i [-g] debug

```javascript
// debug返回的是一个函数，后面跟上变量（命名空间）
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

// startupDebugger
// 需要在环境变量中设置 DEBUG=app:startup
startupDebugger("start up debugging...");
// dbDebugger
dbDebugger("database debugging...");
```

多个 Debugger，环境变量中设置 export DEBUG=app:startup,app:db 或者 app:\*

linux 中也可以 `DEBUG=db node index.js`这样的方式快速启动

## 5.9 Templating Engines 模板引擎

比较有名的有 Pug，Mustache，EJS ，这次我们用 Pug 来练习

npm -i pug

```javascript
app.set("view engine", "pug"); // express会自动帮我们导入
// app.set('views', './views')  // 这是可选项，保存模板的路径默认是views
```

在 views 的 index.pug 文件下，可以这样写

```
html
    head
        title= title
    body
        h1= message
```

然后在代码中写下，就可以使用模板引擎了

```javascript
app.get("/", (req, res) => {
  res.render("index", { title: "My Express App - pug", message: "Hello" });
});
```

## 5.10 Database Integration 数据库集成

[express 官方参考文档](http://expressjs.com/en/guide/database-integration.html)

## 5.11 Autnentication 验证

## 5.12 Build Maintainable Routes 构建结构型路由

如何结构化？（重构后的代码放在 index 中）

1. 首先将所有/api/courses 的路由都放入同一个文件./routes/course.js 中
2. 然后在主函数中导入`const courses = require("./routes/courses");`
3. 然后在主函数中设置路由`app.use("/api/courses", courses);`
4. 因为前一个阶段已经设置过`/api/courses`，所以在 courses.js 的文件夹中将所有`/api/courses`全部替换为`/`

最好将所有自定义的中间件放入文件夹`middleware`中

```

```

[Main](../../README.md) | [Previous](../chapter4/README.md) | [Next](../chapter6/README.md)

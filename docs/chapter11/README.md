[Main](../../README.md) | [Previous](../chapter10/README.md) | [Next](../chapter12/README.md)

# Chapter 11

Handing and LOgging Errors

处理和记录异常

## 11.1 Introduction 介绍

Handing Errors

1. Sending a friendly error
2. Log the exception

## 11.2 Handing Rejected Promises 处理被拒绝的 Promise

router/courses.js 中 GET 使用 try-catch 包裹起来

## 11.3 Express Error Middleware Express 中的异常处理中间件

middleware/error.js 文件

## 11.4 Removing Try/Catch Blocks 去掉 try-catch 代码块

原先的代码块：

```javascript
router.get("/", auth, async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (ex) {
    next(ex);
  }
});
```

变成了

```javascript
// 放到middleware/async.js中
function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
}

// 新写的GET
router.get(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const courses = await Course.find();
    res.send(courses);
  })
);
```

## 11.5 Express Async Errors Express 异步错误处理模块

npm i express-async-errors

在 index.js 中加入 `require("express-async-errors");`即可

## 11.6 Logging Errors 记录错误日志

在 middleware/error.js 中展示

npm i winston

在 index.js 中

```javascript
// winston.add(winston.transports.File, { filename: "logfile.log" }); // 会产生错误
winston.add(new winston.transports.File({ filename: "logfile.log" }));
```

## 11.7 Logging to MongoDB 在 MongoDB 中记录日志

npm i winston-mongodb

在 index.js 中输入

```javascript
require("winston-mongodb");

winston.add(
  new winston.transports.MongoDB({ db: "mongodb://localhost/courses" })
);
```

## 11.8 Uncaught Exceptions 未捕捉的异常

在 index.js 中写了

## 11.9 Unhandled Promise Rejections 未处理的被拒的 Promise

上面的方法只作用于同步方式的代码，如果代码中有被拒的 Promise

## 11.10 Recap 回顾

index.js 太冗长了，接下来将进行重构和优化逻辑

## 11.11 Extracting the Routes 封装路由逻辑

startup/route.js

## 11.12 Extracting the DB Logic 封装数据库连接逻辑

startup/db.js

## 11.13 Extracting the Logging Logic 封装日志逻辑

startup/logging.js

## 11.14 Extracting the Config Logic 封装配置逻辑

startup/config.js

## 11.15 Extracting the Validation Logic 封装验证逻辑

startup/validation.js

## 11.16 Showing Unhandled Exceptions on the Console 在 Console 中显示未处理异常

startup/logging.js 中添加 winston.transports.Console 的相关配置

不仅可以在日志文件中显示，还可以在控制台显示

[Main](../../README.md) | [Previous](../chapter10/README.md) | [Next](../chapter12/README.md)

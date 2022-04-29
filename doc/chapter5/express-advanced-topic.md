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
app.use(function(req, res, next){
    console.log('Logging...');
    next();
});
```

## 5.4 Built-in Middleware 内置中间件

```javascript
app.use(express.json()); // 添加中间件
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static('public')); // 从根路径开始的，或者用 static(./doc/chapter5/public) 
```

## 5.5 Third-party Middleware 第三方中间件

[地址](http://expressjs.com/en/resources/middleware.html)

```javascript
const helmet = require("helmet");
var morgan = require('morgan');  // 记录HTTP请求的日志记录

app.use(helmet()); 
app.use(morgan('tiny'));
```

任何中间件的使用都会对性能造成影响，所以一般在生产环境中不使用（如morgan）

## 5.6 Environments 环境

Development/Production Environment 开发/生产环境

```javascript
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);
// 设置不同环境下的中间件
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
}
```

## 5.7 Configuration 配置

npm rc
npm config 

## 5.8

## 5.9

## 5.10

## 5.11

## 5.12
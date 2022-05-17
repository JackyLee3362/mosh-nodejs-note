[Main](../../README.md) | [Previous](../chapter9/README.md) | [Next](../chapter11/README.md)

# Chapter 10

Authentication and Authorization 认证与授权

## 10.1 Introduction

Register: POST /api/users {name, email, password}
Login: POST /api/logins

## 10.2 Creating the User Model

[文件 models/user.js](../../models/user.js)

## 10.3 Signing up Users 注册新用户

[文件 routes/user.js](../../routes/user.js)

## 10.4 Using Lodash 使用 lodash 库

当 `res.send(user)` 时， 我们不想显示密码，我们可以改为

```javascript
res.send({
  name: user.name,
  email: user.email,
});
```

但是有更加好的解决方案 —— [lodash](https://lodash.com/)

接下来将介绍如何使用它

npm i lodash

密码太简单怎么办？搜索 joi-password-complexity

## 10.5 Hashing Passwords 哈希密码

新库 bcrypt

```javascript
const bcrypt = require("bcrypt");

// 1234 -> abcd
async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash("1234", salt);
  console.log(salt);
  console.log(hashed);
}

run();
```

## 10.6 Authenticating Users 验证用户

[文件 routes/auth.js](../../routes/auth.js)

## 10.7 Testing the Authentication 测试验证功能

postman

POST http://localhost:3000/api/auth

{
"email": "123@456.com",
"password": "123456"
}

## 10.8 JSON Web Tokens JSON 网络令牌

本来返回的是`res.send(true)`，现在要返回一个 Json 网络令牌（JWT）：https://jwt.io/

## 10.9 Generating Authentication Tokens 创建用于验证的令牌

npm i jsonwebtoken

```javascript
// 10.9 生成jwt令牌
const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
```

## 10.10 Storing Secrets 保存机密

放到环境变量的 config 中

## 10.11 Setting Response Headers 设置反馈包的头部

将 jwt 放在 response 的 body 中返回，不是很好看，最好放在头部

```javascript
res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
```

## 10.12 Encapsulating Logic in Models 在模型中封装逻辑

在 auth.js 和 user.js 中都有相同部分的逻辑（生成 jwt 令牌）

在 OOP 中有个原则，叫做信息专精原则（源自软件工程学中的 GRASP）Information Expert Principle

## 10.13 Authorization Middleware 用于验证的中间函数

[文件 middleware/auth.js](../../middleware/auth.js)

## 10.14 Protecting Routes 保护路由

在 router/courses.js 中，在 req.post 中加入可选参数

## 10.15 Getting the Current User 获取当前用户对象

routes\user.js 中的 GET 逻辑

## 10.16 Logging Out a User 用户的登出

！不要将令牌放在数据库中（真的需要，一定要加密），将令牌存放在客户端

## 10.17 Role-based Authorization 基于角色的授权

models/user.js 中加入 isAdmin
models/user.js 中生成令牌方法中加入 isAdmin
middleware/admin.js 创建

## 10.18 Testing the Authorization 测试验证功能

[Main](../../README.md) | [Previous](../chapter9/README.md) | [Next](../chapter11/README.md)
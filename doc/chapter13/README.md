# Chapter 13

Integration Testing 集成测试

## 13.1

## 13.2 Preparing the App 学习前的准备

package.json -> scripts -> test: jest --watchAll --verbose

注释掉 logging.js 中的 winston-mongoose 模块（会发生错误）

## 13.3 Setting Up the Test Database 设置测试数据库

在 default.json 的配置中添加 db

## 13.4 Your First Integration Test 第一集成测试

npm i supertest --save-dev

## 13.5 Populating the Test Database 填充测试数据库

course.test.js

## 13.6 Testing the Routes with Parameters 测试带参数的路由

course.test.js

## 13.7 Validating ObjectIDs 验证 ObjectID

course.test.js

## 13.8 Refactoring with Confidence 更可靠的重构

增加中间件 文件 middleware/validateObjectId， 并在 router/course.js 中使用

## 13.9 Testing the Authorization 测试授权

course.test.js

## 13.10 Testing Invalid Inputs 测试非法输入

course.test.js

## 13.11 Testing the Happy Path 测试主要路径

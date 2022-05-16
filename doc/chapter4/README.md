# Chapter 4 Building RESTful Service with Express

使用Express创建RESTful服务

## 4.2 RESTful Services RESTful服务

Client-Server 客户端服务器模式

**Re**presentational **S**tate **T**ransfer

CRUD Operation 增删改查操作
- **C**reate
- **R**ead
- **U**pdate
- **D**elete

😀
HTTP METHODS HTTP方法
- GET 
  - `GET /api/customers`
  - `GET /api/customers/1`
- PUT
  - `PUT /api/customers/1`
- DELETE
  - `DELETE /api/customers/1`
- POST 
  - `POST /api/customers`

## 4.3 Introducing Express Express简介

npm项目地址：https://www.npmjs.com/package/express

官网：http://expressjs.com/

## 4.4 Building Your First Web Server

```javascript
const express = require('express');
const app = express();

const courses = [
    {id: 1, name: 'math'},
    {id: 2, name: 'art'},
    {id: 3, name: 'chemistry'}
]

app.get('/', (req, res) => res.send('hello, world! this is homepage'));
app.get('/api/courses',(req, res) =>res.send(courses));
```

## 4.5 Nodemon Node监视器

```bash
npm i -g nodemon // 全局安装
nodemon 
```
## 4.6 Environment Variables 环境变量

```bash
// 设置环境变量（unix/linux使用export，win使用set）
export PORT=5000
set PORT=5000 // windows CMD模式
$env:NODE_ENV="production" // powershell下使用
```

```javascript
// 启动服务器
const port = process.env.PORT || 3000; // 4.6 设置环境变量PORT 
app.listen(port, () => console.log(`listening on port ${port}...`));
```

## 4.7 Route Parameters 路由参数

```javascript
app.get('/api/courses/:id', (req, res)=>{ // 4.7 路由设置
    res.send(req.params.id);
});
app.get('/api/posts/:year/:month', (req, res)=>{ // 4.7 路由设置
    // res.send(req.params);
    res.send(req.query)
});
```

## 4.8 Handing GET Requests 处理get请求

假设我们有一组数据
```javascript
const courses = [
    {id: 1, name: 'math'},
    {id: 2, name: 'art'},
    {id: 3, name: 'chemistry'}
]
app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given id was not found');
    res.send(course);
})
```

## 4.9 Handling POST Requests 处理post请求

```javascript
const courses = [
    {id: 1, name: 'math'},
    {id: 2, name: 'art'},
    {id: 3, name: 'chemistry'}
]
app.post('/api/courses', (req, res)=>{
    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(courses);
    res.send(course);
})
```

## 4.10 Postman (一个插件/软件)

POST http://localhost:3000/api/courses/

```json
{
    "name": "new course"
}
```

## 4.11 Input Validation 输入验证

在post中插入以下代码用来验证name

```javascript
if(!req.body.name || req.body.name.length < 3){
    res.status(400).send('Name is required and should be minimum 3');
    return;
}
```

验证逻辑简单时这样写没问题，但是验证逻辑复杂起来就不太方便后期维护了

此时加入[joi模块](https://www.npmjs.com/package/joi)，[api文档](https://joi.dev/api/)

```bash
npm install joi
```

在app的函数体中插入以下代码来验证
```javascript
const schema = Joi.object({
    name: Joi.string().min(3).required()
});
const result = schema.validate(req.body);
if (result.error) return res.status(400).send(result.error.details[0].message); 
```

## 4.12 Handling PUT Requests 处理put请求

```javascript
const Joi = require('joi');
app.put('/api/courses/:id', (req, res) => {
    // 查找课程，如果不存在，返回404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('不存在该课程');
    // 验证，如果非法，返回400
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message)
    // 更新课程数据
    course.name = req.body.name;
    res.send(course);
})
```

验证逻辑可以提取出来

```javascript
function validateCourse(course){
  const schema = Joi.object({
        name: Joi.string().min(3).required()
  });

  return schema.validate(course);
}
// object destruction 对象析构
const result = validateCourse(req.body);
const { error } = validateCourse(req.body); // result.error
```

## 4.13 Handling DELETE Requests 处理delete请求

```javascript
app.delete('/api/courses/:id', (req, res) =>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('not found');
    
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})
```

## 4.14 Project Build the Genres API 项目：构造通用API

作业：搭建一个vilid.js后台服务器
[源码答案](vidly.js)
[Main](../../README.md) | [Previous](../chapter6/README.md) | [Next](../chapter8/README.md)

# Chapter 7

## 7.1 MongoDB

MongoDB 是非关系型数据库，储存 json 对象

## 7.2 Install MongoDB on Mac

## 7.3 Install MongoDB on Windows

- 下载 mongoDB Community 和 mongoCompass
- 找到 `C:\Program\MongoDB\5.0\mongod.exe`(这是 mongo demo，运行在后台的服务器，5.0 更改成你的版本)
- 将 `C:\Program\MongoDB\5.0\` 设置为系统路径变量
- 在命令行中运行 mongod
- 如果想直接在命令行中运行 mongoDB，输入 mongo

## 7.4 Conncecting to MongoDB 连接到 MongoDB

`npm i mongoose`

```javascript
const mongoose = require("mongoose");

// 没有不要紧，MongoDB会自动创建，返回一个Promise
mongoose
  .connect("mongodb://localhost/playgroud")
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("can not connect to MongoDB...", err));
```

## 7.5 Schema Schema 模板

```javascript
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
```

我们可以用以下几种格式来规范

String, Number, Date, Buffer, Boolean, ObjectID, Array

## 7.6 Models 模型

```javascript
const Course = mongoose.model("course", courseSchema);
const course = new Course({
  name: "Node.js",
  author: "jacky",
  tags: ["node", "backend"],
  isPublished: true,
});
```

## 7.7 Saving a Document 保存一个文档

```javascript
async function createCourse() {
  const course = new Course({
    name: "Angular.js",
    author: "jacky",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
```

## 7.8 Querying Document 查询文档

```javascript
async function getCourses() {
  // 返回一个列表，包含所有对象
  // const courses = await Course.find();

  const courses = await Course.find({ author: "jacky", isPublished: true }) // 添加过滤
    .limit(10)
    .sort({ name: 1 }) // 按照name排序，1代表升序，-1代表降序
    .select({ name: 1, tags: 1 }); // 表示输出哪些属性
  console.log(courses);
}

getCourses();
```

## 7.9 Comprasion Query Operations 比较查询操作符

```yaml
eq: equal
ne: not equal
gt: great than
gte: great than or equal to
ls: less than
lse: less than or equal to
in:
nin: not in
```

如果需要课程单价大于 10 且小于等于 20 的课程，该如何写 query 呢

```javascript
const course = await Course.find(price: { $gt: 10, $lse: 20 }) // $代表这是一个操作符
```

如果需要课程单价等于 10，25，20 的课程，该如何写 query 呢

```javascript
const course = await Course.find(price: { $in: [10, 15, 20] })
```

## 7.10 Logical Query Operations 逻辑查询操作符

```javascript
const courses = await Course.find()
  .or([{ author: "jacky" }, { isPublished: true }])
  .and([{ author: "jacky" }, { isPublished: true }]);
```

## 7.11 Regular Expressions 正则表达式

```javascript
const courses = await Course.find({ author: /^jack/i }); // i代表忽略大小写
```

## 7.12 Counting 计数

```javascript
const courses = await Course.find().count();
```

## 7.13 Pagination 分页

```javascript
const courses = await Course.find({ author: "jacky", isPublished: true })
  .skip((pageNumber - 1) * pageSize)
  .limit(pageSize);
```

## 7.14 Exercise 练习

新版的 MongoDB 没有集成 MongoDB Tools，需要去官方手动下载，并将 exe 文件添加到 mongoDB 目录

## 7.15 第二个练习

## 7.16 第三个练习

## 7.17 Updating a Document - Query First 更新文档-查询优先

尽量不要使用 UpdateOne 或者 UpdateMany，这样会绕过 Schema 的验证，用 findOneAndUpdate 代替

- Approach: Query First
- findById()
- Modify its properties
- save()

## 7.18

Approach: Update First
Update directly
Optionally: get the updated document

search mongodb update operators:
https://www.mongodb.com/docs/manual/reference/operator/update/

## 7.19 Removing a Document

[Main](../../README.md) | [Previous](../chapter6/README.md) | [Next](../chapter8/README.md)

[Main](../../README.md) | [Previous](../chapter7/README.md) | [Next](../chapter9/README.md)
# Chapter 8 验证

[返回主界面](../../README.md) [上一章节](../chapter9/README.md)

## 8.1 Validation 验证

```javascript
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 必填的行改为required
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      // 不能用lambda表达式
      return this.isPublished;
    },
  },
});
```

## 8.2 Build-in Validators 内置验证器

```javascript
const courseSchema = new mongoose.Schema({
  // ...
  price: {
    type: Number,
    required: function () {
      // 不能用lambda表达式
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
  // ...
});
```

## 8.3 Custom Validators 自定义验证器

```javascript
const courseSchema = new mongoose.Schema({
//...
  tags: {
    type: Array,
    validate: {
      // 自定义验证
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "a course should have at least one tag",
    },
//...
})
```

## 8.4 Async Validation 异步验证器

```javascript
tags: {
    type: Array,
    validate: {
      // 异步验证器
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          // do some async work
          console.log("done!");
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "a course should have at least one tag",
    },
  },
```

## 8.5 Validation Errors 验证错误

```javascript
try {
  let result = course.validate();
  console.log(result);
} catch (ex) {
  for (field in ex.errors) console.log(ex.errors[field].message);
}
```

## 8.6 Schema Type Options schema 类型选项

```javascript

  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    // lowercase: true,  <------ 该成小写，下面是大写
    // uppercase: true,
  },
//...
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),  // 读取数据库的数据时四舍五入
    set: (v) => Math.round(v),  // 写入数据时四舍五入
  },
```

## 8.7 Project 工程一

## 8.8 Project 工程二

## 8.9
[Main](../../README.md) | [Previous](../chapter7/README.md) | [Next](../chapter9/README.md)
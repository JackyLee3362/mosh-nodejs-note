# Chapter 9

Modeling Relationships between Connected Data 数据间的模型关系

## 9.1 Modelling Relationships 模型关系

Using Reference (Normalization，范式化) 使用引用

Using Embedded Documents（Denormaliztion）使用嵌入文档

```javascript
// Trade off between query performance vs consistency

// Using Reference (Normalization，范式化) 使用引用  -> CONSISTENCY
// 注重数据的一致性
// 如果要更改作者姓名，只要更改一处地方，但是每新建一个课程，都需要额外查询一次作者（损失性能）
let author = { name: "Mosh" };
let course1 = {
  author: "id",
  // authors: ["id1", "id2"],
};
// Using Embedded Documents（Denormaliztion，反范式化）使用嵌入文档  -> PERFORMANCE
// 注重性能
// 只需要查一次即可
let course2 = {
  author: {
    name: "Mosh",
  },
};
// 混合方案
// 比如author有50个属性，我们可以单独保存，并在course中部分嵌入

let author3 = { name: "Mosh" };
let course3 = {
  author: {
    id: "ref",
    name: "Mosh",
  },
};
```

## 9.2 Reference Documents 链接文档

[具体代码](./9.2-%20Referencing%20Documents/population.js)

## 9.3 Population 构建属性

[具体代码](./9.2-%20Referencing%20Documents/population.js)

## 9.4 Embedded Documents 嵌入文档

## 9.5 Array of Sub-Documents 子文档数组

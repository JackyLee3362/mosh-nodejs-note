# Chapter 6 callback

## 6.1 Asynchronous Javascript 异步 js

先做一个小实验

```javascript
console.log("Before");
setTimeout(() => {
  console.log("Reading a user form a database...");
}, 2000); // 模拟从数据库中读取用户信息，需要2秒
console.log("After");
```

原因就是 setTimeout 是一个异步函数（或者说非阻塞函数）

重要：异步机制不是多线程！！！（实际上这里是单线程）

## 6.2 Asynchronous Patterns 异步标签

小实验

```javascript
console.log("Before");
const user = getUser(1);
console.log(user);
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user form a database...");
    return { id: id, githubUsername: "mosh" };
  }, 2000); // 模拟从数据库中读取用户信息，需要2秒
}
```

接下来将讨论 Callbacks | Promises | Async/await

## 6.3 Callback 回调

```javascript
console.log("Before");
getUser(1, function (user) {
  console.log("User", user);
});
console.log("After");

function getUser(id, callback) {
  //这里callback可以换成任意名字
  setTimeout(() => {
    console.log("Reading a user form a database...");
    callback({ id: id, githubUsername: "mosh" });
  }, 2000); // 模拟从数据库中读取用户信息，需要2秒
}
```

这里用了回调函数

小练习

```javascript
console.log("Before");
getUser(1, (user) => {
  console.log("User", user);
  // 从Github获取仓库信息
  getRepositories(user.githubUsername, (userName) => console.log(userName));
});
console.log("After");

function getUser(id, callback) {
  //这里callback可以换成任意名字
  setTimeout(() => {
    console.log("Reading a user form a database...");
    callback({ id: id, githubUsername: "mosh" });
  }, 2000); // 模拟从数据库中读取用户信息，需要2秒
}

function getRepositories(userName, callback) {
  setTimeout(() => {
    console.log(`Calling ${userName}'s Github Api...`);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
```

## 6.4 Callback Hell 回调地狱

嵌套会特别深

## 6.5 Named Functions 命名函数

```javascript
console.log("Before");
getUser(1, displayUser);
console.log("After");
function displayUser(user) {
  console.log("User", user);
  // 从Github获取仓库信息
  getRepositories(user.githubUsername, displayGithubAPI);
}
function displayGithubAPI(userName) {
  console.log(userName);
}
function getUser(id, callback) {
  //这里callback可以换成任意名字
  setTimeout(() => {
    console.log("Reading a user form a database...");
    callback({ id: id, githubUsername: "mosh" });
  }, 2000); // 模拟从数据库中读取用户信息，需要2秒
}

function getRepositories(userName, callback) {
  setTimeout(() => {
    console.log(`Calling ${userName}'s Github Api...`);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
```

[下半部分笔记](promises.md)

## 6.6 Promises 承诺

Promise holds the eventual result of an asynchronous operation.

Promise 有三个状态 Pending（挂起） --> FulFilled（）/ Rejected（）

最简单的实践

```javascript
const p = new Promise((resolve, reject) => {
  resolve(1);
  reject(new Error("Error happened"));
});

p.then((result) => console.log("result", result));
```

p 可以使用两个方法，then 和 catch

```javascript
p.then((result) => console.log("result", result)).catch((err) =>
  console.log("Error:", err.message)
);
```

## 6.7 Replacing Callbacks with Promises 用 Promises 取代回调函数

可以将之前讲的回调函数修改成如下

```javascript
// function getUser(id, callback) {
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user form a database...");
      // callback({ id: id, githubUsername: "mosh" });
      resolve({ id: id, githubUsername: "mosh" });
    }, 2000);
  });
}
```

## 6.8 Consuming Promises 使用 Promises

```javascript
console.log("Before");
getUser(1)
  .then((user) => getRepositories(user.githubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log(commits))
  .catch((err) => console.log(err.message));
console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user form a database...");
      resolve({ id: id, githubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Calling ${userName}'s Github Api...`);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const message = repo + " versoin 1.0.0 ";
      resolve(message);
    }, 2000);
  });
}
```

## 6.9 Creating Settled Promises 创建已完成的 Promise

```javascript
const p = Promise.resolve({ id: 1 });
p.then((id) => console.log(id));

const p2 = Promise.reject(new Error("some error"));
p2.catch((err) => console.log(err.message));
```

## 6.10 Parallel Promises 并行 promise 操作

```javascript
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("async1...");
    // resolve(1);
    reject(new Error("because something failed."));
  }, 2000);
});
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("async2...");
    resolve(2);
  }, 1999);
});

// 如果等两个异步操作都完成以后，再执行一些操作

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));

// 如果想让任意一个完成就执行，用race替代all

Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
```

## 6.11 Async/Await

```javascript
// await
async function dispalyCommits() {
  const user = await getUser(1);
  const repos = await getRepositories(user);
  const commits = await getCommits(repos[0]);
  console.log(commits);
}
dispalyCommits();

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user form a database...");
      resolve({ id: id, githubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Calling ${userName}'s Github Api...`);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const message = repo + " versoin 1.0.0 ";
      resolve(message);
    }, 2000);
  });
}
```

await 和 async 并没有 promise 的 catch 选项，所有我们用 try-catch 语句

```javascript
// await
async function dispalyCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (error) {
    console.log(error.message);
  }
}
dispalyCommits();

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user form a database...");
      resolve({ id: id, githubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Calling ${userName}'s Github Api...`);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const message = repo + " versoin 1.0.0 ";
      // resolve(message);
      reject(new Error("can't get commits"));
    }, 2000);
  });
}
```

## 6.12 Exercise 练习

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("async1...");
    resolve(1);
    // reject(new Error("because something failed."));
  }, 2000);
});
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("async2...");
    resolve(2);
  }, 1000);
});

// 如果等两个异步操作都完成以后，再执行一些操作

// Promise.all([p1, p2])
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error.message));

// 如果想让任意一个完成就执行，用race替代all

Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));

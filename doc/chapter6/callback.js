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

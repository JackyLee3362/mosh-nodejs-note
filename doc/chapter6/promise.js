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

const config = require("config"); // 中间件：配置

module.exports = function () {
  // Configuration 配置
  console.log("Application Name: " + config.get("name"));
  console.log("Mail Server Name: " + config.get("mail.host"));

  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};

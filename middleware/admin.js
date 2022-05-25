module.exports = function (req, res, next) {
  // 10.17 基于角色的认证
  // 401 表示无法验证 unauthorized，用户想访问一个受保护的资源，给他一个机会发jwt
  // 403 没有权限 Forbidden，禁止访问
  if (!config.get("requiresAuth")) return next();

  if (!req.user.isAdmin) return res.status(403).send("access denied.");
  next();
};

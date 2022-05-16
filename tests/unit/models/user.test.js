// 12.20
const { User, validate } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey")); // 这里需要在配置中添加test.json，因为环境变为test了
    expect(decoded).toMatchObject(payload);

    expect(1).toBe(1);
  });
});

const _ = require("lodash");
const bcrypt = require("bcrypt"); // 用来加密的库
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

// POST
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 保证用户在数据库中
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  // 验证密码
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  await user.save();

  // 10.9 生成jwt令牌
  // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  const token = user.generateAuthToken(); // 10.12 封装逻辑

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}

module.exports = router;

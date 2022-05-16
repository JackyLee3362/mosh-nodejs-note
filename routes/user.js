const _ = require("lodash");
const bcrypt = require("bcrypt"); // 用来加密的库
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

// 10.15 获取当前用户

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// POST
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 保证用户没用重复注册
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered");

  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  const token = user.generateAuthToken(); // 10.12 封装逻辑
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;

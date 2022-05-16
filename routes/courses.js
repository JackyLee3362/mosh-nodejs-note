const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Course, validate } = require("../models/courses");
const mongoose = require("mongoose");
const auth = require("../middleware/auth"); // 10.14 保护路由
const admin = require("../middleware/admin"); // 10.17 基于角色认证
const asyncMiddleware = require("../middleware/async"); // 11.4 去掉try-catch块
const validateObjectId = require("../middleware/validateObjectId"); // 13.8

// GET
router.get("/", async (req, res, next) => {
  // 11.6 测试winston
  // throw new Error("Could not get the courses.");
  const courses = await Course.find();
  res.send(courses);
});

// GET id请求
router.get("/:id", validateObjectId, async (req, res) => {
  const courses = await Course.findById(req.params.id);
  if (!courses)
    return res.status(404).send("The course with the given Id is not found");
  res.send(courses);
});

// POST
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course({
    name: req.body.name,
  });
  course = await course.save();
  res.send(course);
});

// 处理PUT请求
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!course) return res.status(404).send("not found");
  res.send(course);
});

// 处理DELETE请求
router.delete("/:id", [auth, admin], async (req, res) => {
  const courses = await Course.findByIdAndRemove(req.params.id);
  if (!courses)
    return res.status(404).send("The course with the given id is not found");
  res.send(courses);
});

module.exports = router;

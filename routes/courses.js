const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Course, validate } = require("../models/courses");
const mongoose = require("mongoose");

// 新写的POST
router.post("/", async (req, res) => {
  console.log("req.body=", req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course({
    name: req.body.name,
  });
  course = await course.save();
  res.send(course);
});

// 新写的GET
router.get("/", async (req, res) => {
  const courses = await Course.find();
  console.log("over");
  res.send(courses);
});

// 新的GET id请求
router.get("/:id", async (req, res) => {
  const courses = await Course.findById(req.params.id);
  console.log("over");
  res.send(courses);
});

// 处理PUT请求
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  const courses = await Course.findByIdAndRemove(req.params.id);
  if (!courses) return res.status(404).send("not found");
  res.send(courses);
});

module.exports = router;

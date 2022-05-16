const Joi = require("joi");
const mongoose = require("mongoose");

// 创建模型
const Course = mongoose.model(
  "course",
  new mongoose.Schema({
    // id: Number,
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    // price: Number,
  })
);

// 验证逻辑函数
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(course);
}

exports.Course = Course;
exports.validate = validateCourse;

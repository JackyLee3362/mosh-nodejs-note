const mongoose = require("mongoose");
const Joi = require("joi");
// 验证逻辑函数
function validateUrl(url) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    url: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(url);
}
// 创建范式
const urlSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  description: {
    type: String,
    default: "This is a description",
  },
  url: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  tags: {
    type: [String],
    required: true,
  },
  date: { type: Date, default: Date.now },
});
// 创建模型
const urlModel = mongoose.model("favoriteUrls", urlSchema);

module.exports.urlModel = urlModel;
exports.validate = validateUrl;

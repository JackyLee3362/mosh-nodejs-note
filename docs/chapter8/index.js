const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playgroud")
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("can not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    // lowercase: true,
    // uppercase: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      // 自定义验证
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "a course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v), // 四舍五入
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular.js",
    category: "-",
    author: "jacky",
    // tags: ["angular", "frontend"],
    isPublished: false,
    // price: 15
  });
  try {
    let result = course.validate();
    console.log(result);
    // const result = await course.save();
    // console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field]);
  }
}

createCourse();

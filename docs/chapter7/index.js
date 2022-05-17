const mongoose = require("mongoose");

// 没有不要紧，MongoDB会自动创建，返回一个Promise
mongoose
  .connect("mongodb://localhost/playgroud")
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("can not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular.js",
    author: "jacky",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// createCourse();

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course.find({ author: "jacky", isPublished: true }) // 添加过滤
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) // 按照name排序，1代表升序，-1代表降序
    .select({ name: 1, tags: 1 }) // 表示输出哪些属性
    .count();
  console.log(courses);
}

// getCourses();

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  // course.isPublished = true;
  course.set({
    isPublished: true,
    author: "another author",
  });

  const result = await course.save();
  console.log(result);
}

// updateCourse("626d8a75f6fad283a9788f0d");

async function updateCourse2(id) {
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "mosh",
        isPublished: false,
      },
    }
  );
  // 如果想直接得到更新后的文档，使用下面的方法
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "jacky",
        isPublished: true,
      },
    },
    { new: true } // 返回的是更新后的对象，否则是更新前的
  );
  console.log(result);
  console.log(course);
}
// updateCourse2("626d8a75f6fad283a9788f0d");
async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id });
  const result = Course.findByIdAndRemove(id);
  console.log(result);
}

removeCourse("626d8a75f6fad283a9788f0d");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("connect to Database"))
  .catch((err) => console.error("can't connect to db" + err.message));

const infoSchema = mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Info = mongoose.model("course", infoSchema);

async function getInfo() {
  return await Info.find({
    isPublished: true,
    tags: "backend",
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}
async function getInfo2() {
  return await Info.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    // .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort({ price: -1 }) // sort('-price')
    .select({ author: 1, name: 1, price: 1 }); // select('author name')
}

async function getInfo3() {
  return await Info.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i },
  ]);
}
async function run() {
  const courses = await getInfo3();
  console.log(courses);
}
run();

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "My Express App - pug", message: "Hello" });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.send("post hello, this is a test");
});

module.exports = router;

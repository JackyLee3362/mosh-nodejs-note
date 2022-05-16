const express = require("express");
const router = express.Router();
const { urlModel, validate } = require("../models/favoriteurls");
// GET
router.get("/", async (req, res) => {
  const urls = await urlModel.find();
  res.send(urls);
});

module.exports = router;

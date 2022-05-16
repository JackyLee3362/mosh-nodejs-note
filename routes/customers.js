const { Customer, validate } = require("../models/customer");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// 新写的POST
router.post("/", async (req, res) => {
  console.log("req.body=", req.body);
  // 验证发送过来的数据是否正确
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

// 新写的GET
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

// 新的GET id请求
router.get("/:id", async (req, res) => {
  const courses = await Customer.findById(req.params.id);
  res.send(courses);
});

// 处理PUT请求
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    { new: true }
  );
  if (!customer) return res.status(404).send("not found");
  res.send(customer);
});

// 处理DELETE请求
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("not found");
  res.send(customer);
});

module.exports = router;

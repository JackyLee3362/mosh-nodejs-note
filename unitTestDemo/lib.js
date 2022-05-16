module.exports.absolute = function (number) {
  if (number > 0) return number;
  if (number < 0) return -number;
  return 0;
};

module.exports.greet = function (name) {
  return "Welcome " + name;
};

module.exports.getCurrencies = function () {
  return ["USD", "AUD", "EUR"];
};

module.exports.getProduct = function (productId) {
  return { id: productId, price: 10 };
};

module.exports.registerUser = function (username) {
  if (!username) throw new Error("Username is required.");

  return { id: new Date().getTime(), username: username };
};

module.exports.fizzBuzz = function (input) {
  if (typeof input !== "number") throw new Error("Input should be a number.");

  if (input % 3 === 0 && input % 5 === 0) return "FizzBuzz";

  if (input % 3 === 0) return "Fizz";

  if (input % 5 === 0) return "Buzz";

  return input;
};

const db = require("./db");
module.exports.applyDiscount = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  if (customer.points > 10) order.totalPrice *= 0.9;
};
const mail = require("./mail");
module.exports.notifyCustomer = function (order) {
  const customer = db.getCustomerSync(order.customerId);

  mail.send(customer.email, "Your order was palced successfully.");
};

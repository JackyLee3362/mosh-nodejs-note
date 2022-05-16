var express = require("express");
var app = express();
var PORT = 3001;

app.use(express.json());

app.post("/", function (req, res) {
  console.log(req.body);
  res.send(req.body);
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

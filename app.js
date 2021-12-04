const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cors = require("cors");

//db connection
require("./models/db");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router

app.use("/auth", require("./router/user"));
app.use("/auth", require("./router/post"));
app.use("/auth", require("./router/announcement"));
app.use("/auth", require("./router/profile"));

app.listen(PORT, (req, res) => {
  console.log("Server connected");
});

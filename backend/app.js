require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/users");

const app = express();

const publicPath = path.join(__dirname, "./server/frontend/build");
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(express.static(publicPath));

app.use("/users", userRouter);

app.use("*", (req, res) => {
  res.status(500).send("route is not found");
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});

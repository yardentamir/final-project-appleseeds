require("dotenv").config();
require("./database/mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

const userRouter = require("./routes/users");
const productRouter = require("./routes/products");

const app = express();

const publicPath = path.join(__dirname, "../frontend/build");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/products", productRouter);

app.use("*", (req, res) => {
  res.status(500).send("route is not found");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

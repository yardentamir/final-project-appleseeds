const express = require("express");
const rootRouter = express.Router();
const imgUpload = require("../middleware/img-upload");
const auth = require("../middleware/auth");

const {
  loadProducts,
  addProduct,
  uploadProductImg,
} = require("../controllers/products");

rootRouter.get("/loadProducts", loadProducts);

rootRouter.post("/addProduct", addProduct);

rootRouter.post(
  "/me/uploadProductImg",
  auth,
  imgUpload.single("product"),
  uploadProductImg
);

module.exports = rootRouter;

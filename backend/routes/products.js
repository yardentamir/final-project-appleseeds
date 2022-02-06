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

rootRouter.post("/addProduct", auth, addProduct);

rootRouter.post(
  "/me/uploadProductImg/:id",
  auth,
  imgUpload.single("product"),
  uploadProductImg
);

rootRouter.get("/loadProductsByUserId");

module.exports = rootRouter;

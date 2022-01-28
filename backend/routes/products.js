const express = require("express");
const rootRouter = express.Router();
const auth = require("../middleware/auth");

const {
  loadProducts,
  addProduct,
  uploadProductImg,
} = require("../controllers/products/controllers");

rootRouter.get("/loadProducts", loadProducts);

rootRouter.post("/addProduct", auth, addProduct);

rootRouter.post(
  "/me/:id/uploadProductImg",
  auth,
  imgUpload.single("product"),
  uploadAvatar
);

const express = require("express");
const rootRouter = express.Router();
const imgUpload = require("../middleware/img-upload");
const auth = require("../middleware/auth");

const {
  loadProducts,
  addProduct,
  uploadProductImg,
  loadProductsByUserId,
  deleteProduct,
  loadProductById,
} = require("../controllers/products");

rootRouter.get("/loadProducts", loadProducts);

rootRouter.get("/loadProductsByUserId", auth, loadProductsByUserId);

rootRouter.get("/loadProductById/:id", auth, loadProductById);

rootRouter.post("/addProduct", auth, addProduct);

rootRouter.post(
  "/me/uploadProductImg/:id",
  auth,
  imgUpload.single("product"),
  uploadProductImg
);

rootRouter.delete("/deleteProduct/:id", auth, deleteProduct);

module.exports = rootRouter;

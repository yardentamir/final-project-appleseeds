const express = require("express");
const rootRouter = express.Router();
const imgUpload = require("../middleware/imgUpload");
const auth = require("../middleware/auth");

const {
  loadProducts,
  addProduct,
  uploadProductImg,
  loadProductsByUserId,
  deleteProduct,
  loadProductById,
  updateProduct,
  searchProduct,
} = require("../controllers/products");

rootRouter.get("/loadProducts", loadProducts);

rootRouter.get("/loadProductsByUserId", auth, loadProductsByUserId);

rootRouter.get("/loadProductById/:id", auth, loadProductById);

rootRouter.get("/search", searchProduct);

rootRouter.post("/addProduct", auth, addProduct);

rootRouter.post(
  "/uploadProductImg/:id",
  auth,
  imgUpload.single("product"),
  uploadProductImg
);

rootRouter.put("/updateProduct/:id", auth, updateProduct);

rootRouter.delete("/deleteProduct/:id", auth, deleteProduct);

module.exports = rootRouter;

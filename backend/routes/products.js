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
  updateProduct,
  freeSearchProduct,
  searchProduct,
} = require("../controllers/products");

rootRouter.get("/loadProducts", loadProducts);

rootRouter.get("/loadProductsByUserId", auth, loadProductsByUserId);

rootRouter.get("/loadProductById/:id", auth, loadProductById);

rootRouter.get("/search", searchProduct);
rootRouter.get("/search/:searchInput", freeSearchProduct);

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

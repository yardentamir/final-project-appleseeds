const sharp = require("sharp");
const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { id } = req.user;

    const product = new Product({
      ...req.body,
      user: id,
    });

    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

const loadProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadProductImg = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) throw new Error("no picture");

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const product = await Product.findById(id);
    product.picture = buffer;

    await product.save();
    res.status(201).send("upload successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

// const loadPicture = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findById(id);
//     if (!product.picture) res.status(201).send("no image found");
//     res.set("Content-Type", "image/png");

//     const pictureToBase64 = product.picture.toString("base64");

//     res.status(201).send(pictureToBase64);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// };

const loadProductsByUserId = async (req, res) => {
  try {
    await req.user.populate("products");
    res.status(201).send(req.user.products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;

    const product = await Product.findOneAndDelete({
      _id,
      user: req.user._id,
    });

    if (!product) throw new Error("There is no product with id ");

    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loadProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) throw new Error("There is no product with id ");

    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addProduct,
  loadProducts,
  uploadProductImg,
  loadProductsByUserId,
  deleteProduct,
  loadProductById,
};

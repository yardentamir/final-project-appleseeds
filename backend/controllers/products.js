const sharp = require("sharp");
const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      user: req.user._id,
    });
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const loadProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).send(products);
  } catch (error) {
    res.status(500).send(error.message);
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
    res.status(500).send(error.message);
  }
};

const loadProductsByUserId = async (req, res) => {
  try {
    await req.user.populate("products");
    res.status(201).send(req.user.products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!product) {
      res.status(404).send("There is no product with id ");
    }

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
};

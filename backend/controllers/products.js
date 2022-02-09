const sharp = require("sharp");
const Product = require("../models/product.cjs");
// const { searchProductFunc } = require("../services/products.services.cjs");

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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productBody = req.body;

    const product = await Product.findById(id);
    if (!product) throw new Error("Product Not Found");

    Object.keys(productBody).forEach((key) => {
      product[key] = productBody[key];
    });

    await product.save();
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

const searchProduct = async (req, res) => {
  try {
    const allQueries = req.query;
    let args = [];

    for (key in allQueries) {
      if (req.query[key] === "all") continue;
      args.push({ [key]: req.query[key] });
    }

    const searchProductFunc = async (args) => {
      let products = [];
      if (!args.length) products = await Product.find();
      if (args.length === 1) products = await Product.find(args[0]);
      if (args.length >= 2) products = await Product.find({ $and: [...args] });

      return products;
    };

    const response = await searchProductFunc(args);
    res.status(200).send(response);
  } catch (error) {
    console.log("Error: ", error);
    res.send(error);
  }
};

module.exports = {
  addProduct,
  loadProducts,
  uploadProductImg,
  loadProductsByUserId,
  deleteProduct,
  loadProductById,
  updateProduct,
  searchProduct,
};

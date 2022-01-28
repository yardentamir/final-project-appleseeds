const sharp = require("sharp");
const Product = require("../../models/product");

const addProduct = async (req, res) => {
  try {
    const productBody = req.body;

    const product = new Product(productBody);
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

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const product = await Product.findById(id);
    product.picture = buffer;

    await product.save();
    res.status(201).send("upload successfully");
  } catch (err) {
    res.status(500).send(error.message);
  }
};

module.exports = { addProduct, loadProducts, uploadProductImg };

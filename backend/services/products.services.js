const Product = require("../models/product");

const searchProductFunc = async (args) => {
  let products = [];
  if (!args.length) products = await Product.find();
  if (args.length === 1) products = await Product.find(args[0]);
  if (args.length >= 2) products = await Product.find({ $and: [...args] });

  return products;
};

module.exports = { searchProductFunc };

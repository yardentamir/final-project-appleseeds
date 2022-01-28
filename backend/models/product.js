const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  picture: {
    type: Buffer,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

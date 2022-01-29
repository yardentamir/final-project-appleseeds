const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [6, "Price cannot exceed 6 characters"],
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

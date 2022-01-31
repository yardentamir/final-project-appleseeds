const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
      required: [true, "Please Enter Product Type"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please Enter Location"],
    },
    picture: {
      type: Buffer,
    },
    founder: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

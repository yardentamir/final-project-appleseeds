const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please choose Title"],
    },
    type: {
      type: String,
      required: [true, "Please Enter Product Type"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    city: {
      type: String,
      required: [true, "Please Enter City"],
    },
    phone: {
      type: String,
      validate(value) {
        if (!validator.isMobilePhone(value, ["he-IL"])) {
          throw new Error("Invalid Phone Number");
        }
      },
    },
    picture: {
      type: Buffer,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

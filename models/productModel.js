import mongoose from "mongoose";
import Image from "./imageModel";
import Category from "./categoryModel";
import Size from "./sizeModel";
import Color from "./colorModel";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store", // Reference to the User model
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
    },
    sizeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size", // Reference to the Size model
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    images: {
      type: [Image.schema],
      required: true,
    },
    description: {
      type: String,
      default: "Product description",
    },
    stock: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;

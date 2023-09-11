import mongoose from "mongoose";
import Billboard from './billboardModel'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store", // Reference to the User model
      required: true,
    },
    billboardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Billboard", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;

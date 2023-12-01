import mongoose from "mongoose";
import Image from "./imageModel";
import Category from "./categoryModel";
import Size from "./sizeModel";
import Color from "./colorModel";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

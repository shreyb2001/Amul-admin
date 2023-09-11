import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Color = mongoose.models.Color || mongoose.model("Color", colorSchema);

export default Color;

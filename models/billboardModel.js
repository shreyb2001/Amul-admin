import mongoose from "mongoose";

const billboardSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    imageUrl: {
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

const Billboard =
  mongoose.models.Billboard || mongoose.model("Billboard", billboardSchema);

export default Billboard;

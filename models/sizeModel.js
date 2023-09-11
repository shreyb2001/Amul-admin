import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
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

const Size = mongoose.models.Size || mongoose.model("Size", sizeSchema);

export default Size;

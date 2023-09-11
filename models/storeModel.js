// db/MyModel.js

import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    // Define your schema here

    name: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;

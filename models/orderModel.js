import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    isPaid: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store", // Reference to the User model
      required: true,
    },
    phone: {
      type: String,
      default: "+91-XXXXXXXXXX",
    },
    address: {
      type: String,
      default: "",
    },
    orderItems: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;

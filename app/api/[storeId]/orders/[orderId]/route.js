import { NextResponse } from "next/server";
import Order from "../../../../../models/orderModel";
import dbConnect from "../../../../../lib/mongodb";

export async function GET(req, { params }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.orderId) {
      return new NextResponse("Order ID is required", { status: 400 });
    }

    await dbConnect();
    const orders = await Order.find({
      email: params.orderId,
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("ORDERS_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

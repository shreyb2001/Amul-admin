import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import User from "../../../../../models/userModel";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    if (!params.userId)
      return new NextResponse("User ID is required", { status: 400 });

    const userOrders = await User.find({
      owner: params.storeId,
      email: params.userId,
    });

    return NextResponse.json(userOrders);
  } catch (error) {
    console.log("USER_ORDERS_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

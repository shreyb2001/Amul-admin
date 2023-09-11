 import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Color from "../../../../models/colorModel";
import Store from "../../../../models/storeModel";
import dbConnect from "../../../../lib/mongodb";

export async function POST(req, { params }) {
  await dbConnect();

  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!value)
      return new NextResponse("Value is required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await Color.create({
      name,
      value,
      owner: params.storeId,
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLORS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  await dbConnect();

  try {
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const colors = await Color.find({
      owner: params.storeId,
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("COLORS_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

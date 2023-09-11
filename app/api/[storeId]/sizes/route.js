import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Size from "../../../../models/sizeModel";
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

    const size = await Size.create({
      name,
      value,
      owner: params.storeId,
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZES_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  await dbConnect();

  try {
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const sizes = await Size.find({
      owner: params.storeId,
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("SIZES_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Billboard from "../../../../models/billboardModel";
import Store from "../../../../models/storeModel";
import dbConnect from "../../../../lib/mongodb";

export async function POST(req, { params }) {
  await dbConnect();

  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!label) return new NextResponse("Label is required", { status: 400 });

    if (!imageUrl)
      return new NextResponse("Image URL is required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await Billboard.create({
      label,
      imageUrl,
      owner: params.storeId,
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARDS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  await dbConnect();

  try {
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const billboards = await Billboard.find({
      owner: params.storeId,
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("BILLBOARDS_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

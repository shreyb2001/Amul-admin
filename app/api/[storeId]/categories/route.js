import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Category from "../../../../models/categoryModel";
import Store from "../../../../models/storeModel";
import dbConnect from "../../../../lib/mongodb";

export async function POST(req, { params }) {
  await dbConnect();
  console.log(req.body);

  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!billboardId)
      return new NextResponse("Billboard ID is required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await Category.create({
      name,
      billboardId,
      owner: params.storeId,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORIES_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  await dbConnect();

  try {
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const categories = await Category.find({
      owner: params.storeId,
    }).populate("owner");

    return NextResponse.json(categories);
  } catch (error) {
    console.log("CATEGORIES_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

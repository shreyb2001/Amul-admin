import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import dbConnect from "../../../../../lib/mongodb";
import Store from "../../../../../models/storeModel";
import Billboard from "../../../../../models/billboardModel";
import Category from "../../../../../models/categoryModel";

export async function GET(req, { params }) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    await dbConnect();
    const category = await Category.findOne({
      _id: params.categoryId,
    }).populate('billboardId')

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  await dbConnect();
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

    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await Category.findOneAndUpdate(
      {
        _id: params.categoryId,
      },
      {
        name,
        billboardId,
      }
    );

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await dbConnect();
    const category = await Category.findOneAndDelete({
      _id: params.categoryId,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

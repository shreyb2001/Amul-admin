import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import dbConnect from "../../../../../lib/mongodb";
import Store from "../../../../../models/storeModel";
import Product from "../../../../../models/productModel";

export async function GET(req, { params }) {
  try {
    if (!params.productId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    await dbConnect();
    const product = await Product.findOne({
      _id: params.productId,
    })
      .populate("categoryId")
      .populate("sizeId");

    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  await dbConnect();
  const body = await req.json();
  const { userId } = auth();

  try {
    const {
      name,
      price,
      categoryId,
      sizeId,
      images,
      description,
      stock,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!price) return new NextResponse("Prices is required", { status: 400 });

    if (!categoryId)
      return new NextResponse("Category ID is required", { status: 400 });

    if (!sizeId)
      return new NextResponse("Size ID is required", { status: 400 });

    if (!images || !images.length)
      return new NextResponse("Images are required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await Product.findOneAndUpdate(
      {
        _id: params.productId,
      },
      {
        name,
        price,
        owner: params.storeId,
        categoryId,
        sizeId,
        isFeatured,
        isArchived,
        description,
        stock,
        images,
      }
    );

    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await dbConnect();
    const product = await Product.findOneAndDelete({
      _id: params.productId,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

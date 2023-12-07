import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Product from "../../../../models/productModel";
import Store from "../../../../models/storeModel";
import dbConnect from "../../../../lib/mongodb";

export async function POST(req, { params }) {
  await dbConnect();
  console.log(req.body);

  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      sizeId,
      images,
      isFeatured,
      isArchived,
      description,
      stock,
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

    const product = await Product.create({
      name,
      price,
      owner: params.storeId,
      categoryId,
      sizeId,
      isFeatured,
      isArchived,
      images,
      stock,
      description,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCTS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const query = {};

    query.owner = params.storeId;

    if (categoryId !== undefined) {
      query.categoryId = categoryId;
    }

    if (sizeId !== undefined) {
      query.sizeId = sizeId;
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured;
    }

    const products = await Product.find(query)
      .populate("categoryId")
      .populate("sizeId")
      .sort({ createdAt: 1 });

    return NextResponse.json(products);
  } catch (error) {
    console.log("PRODUCTS_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

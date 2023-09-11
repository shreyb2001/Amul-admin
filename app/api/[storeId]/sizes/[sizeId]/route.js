import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import dbConnect from "../../../../../lib/mongodb";
import Store from "../../../../../models/storeModel";
import Billboard from "../../../../../models/billboardModel";
import Size from "../../../../../models/sizeModel";

export async function GET(req, { params }) {
  try {

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    await dbConnect();
    const size = await Size.findOne({
      _id: params.sizeId,
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
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

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await Size.findOneAndUpdate(
      {
        _id: params.sizeId,
      },
      {
        name,
        value
      }
    );

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await dbConnect();
    const size = await Size.findOneAndDelete({
      _id: params.sizeId,
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import dbConnect from "../../../../../lib/mongodb";
import Store from "../../../../../models/storeModel";
import Color from "../../../../../models/colorModel";

export async function GET(req, { params }) {
  try {

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    await dbConnect();
    const color = await Color.findOne({
      _id: params.colorId,
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_GET", error);
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

    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await Color.findOneAndUpdate(
      {
        _id: params.colorId,
      },
      {
        name,
        value
      }
    );

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await dbConnect();
    const color = await Color.findOneAndDelete({
      _id: params.colorId,
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

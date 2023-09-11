import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import dbConnect from "../../../../../lib/mongodb";
import Store from "../../../../../models/storeModel";
import Billboard from "../../../../../models/billboardModel";

export async function GET(req, { params }) {
  try {

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    await dbConnect();
    const billboard = await Billboard.findOne({
      _id: params.billboardId,
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
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

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await Billboard.findOneAndUpdate(
      {
        _id: params.billboardId,
      },
      {
        label,
        imageUrl
      }
    );

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    const storeByUserId = await Store.findOne({
      _id: params.storeId,
      userId,
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await dbConnect();
    const billboard = await Billboard.findOneAndDelete({
      _id: params.billboardId,
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

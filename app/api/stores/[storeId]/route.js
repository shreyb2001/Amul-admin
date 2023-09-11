import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import dbConnect from "../../../../lib/mongodb";
import Store from "../../../../models/storeModel";

export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    await dbConnect();
    const store = await Store.findOneAndUpdate(
      {
        _id: params.storeId,
        userId,
      },
      {
        name,
      }
    );

    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    await dbConnect();
    const store = await Store.findOneAndDelete({
      _id: params.storeId,
      userId,
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

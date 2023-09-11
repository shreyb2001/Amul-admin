import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Store from "../../../models/storeModel";
import dbConnect from "../../../lib/mongodb";

export async function POST(req) {
  await dbConnect();

  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await Store.create({
      name,
      userId,
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("STORES_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


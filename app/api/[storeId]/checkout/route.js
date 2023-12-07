import Stripe from "stripe";
import { NextResponse } from "next/server";
import Order from "../../../../models/orderModel";
import Product from "../../../../models/productModel";
import { stripe } from "../../../../lib/stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req, { params }) {
  const { productIds, items, data } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = await Product.find({
    _id: { $in: productIds },
  });

  for (const item of items) {
    let updatedStock = item.stock - item.quantity;
    const product = await Product.findOneAndUpdate(
      {
        _id: item._id,
      },
      {
        stock: updatedStock,
      }
    );
  }

  const line_items = [];

  items.forEach((product) => {
    line_items.push({
      quantity: product.quantity,
      price_data: {
        currency: "INR",
        product_data: {
          name: product.name,
        },
        unit_amount: Number(product.price * 100),
      },
    });
  });
  const order = await Order.create({
    owner: params.storeId,
    isPaid: false,
    orderItems: items,
    email: data.user.email,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order._id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}

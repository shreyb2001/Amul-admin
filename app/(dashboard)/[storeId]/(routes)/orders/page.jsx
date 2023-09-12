import React from "react";
import dbConnect from "../../../../../lib/mongodb";
import Order from "../../../../../models/orderModel";
import { format } from "date-fns";
import OrderClient from "./components/client";
import { formatter } from "../../../../../lib/utils";

const OrdersPage = async ({ params }) => {
  const orders = await Order.find({
    owner: params.storeId,
  }).sort({ createdAt: 1 });

  const formattedOrders = orders.map((item) => ({
    _id: item._id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.name).join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const plainOrders = JSON.parse(JSON.stringify(formattedOrders));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={plainOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;

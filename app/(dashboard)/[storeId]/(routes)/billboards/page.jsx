import React from "react";
import BillboardClient from "./components/client";
import dbConnect from "../../../../../lib/mongodb";
import Billboard from "../../../../../models/billboardModel";
import { format } from "date-fns";

const BillboardsPage = async ({ params }) => {
  await dbConnect();
  const billboards = await Billboard.find({
    owner: params.storeId,
  }).sort({ createdAt: 1 });

  const formattedBillboards = billboards.map((item) => ({
    _id: item._id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;

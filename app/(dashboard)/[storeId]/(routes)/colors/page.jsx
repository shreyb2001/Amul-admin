import React from "react";
import SizeClient from "./components/client";
import dbConnect from "../../../../../lib/mongodb";
import Color from "../../../../../models/colorModel";
import { format } from "date-fns";

const ColorsPage = async ({ params }) => {
  const colors = await Color.find({
    owner: params.storeId,
  }).sort({ createdAt: 1 });

  const formattedColors = colors.map((item) => ({
    _id: item._id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;

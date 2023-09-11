import React from "react";
import SizeClient from "./components/client";
import dbConnect from "../../../../../lib/mongodb";
import Size from "../../../../../models/sizeModel";
import { format } from "date-fns";

const SizesPage = async ({ params }) => {
  const sizes = await Size.find({
    owner: params.storeId,
  }).sort({ createdAt: 1 });

  const formattedSizes = sizes.map((item) => ({
    _id: item._id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;

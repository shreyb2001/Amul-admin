import React from "react";
import CategoryClient from "./components/client";
import dbConnect from "../../../../../lib/mongodb";
import Category from "../../../../../models/categoryModel";
import { format } from "date-fns";

const CategoriesPage = async ({ params }) => {
  const categories = await Category.find({
    owner: params.storeId,
  })
    .populate("billboardId")
    .sort({ createdAt: 1 });
    
  const formattedCategories = categories.map((item) => ({
    _id: item._id,
    name: item.name,
    billboardLabel: item.billboardId.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;

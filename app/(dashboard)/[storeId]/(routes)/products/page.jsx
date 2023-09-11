import React from "react";
import dbConnect from "../../../../../lib/mongodb";
import Product from "../../../../../models/productModel";
import { format } from "date-fns";
import { formatter } from "../../../../../lib/utils";
import ProductClient from "./components/client";

const ProductsPage = async ({ params }) => {
  await dbConnect();
  const products = await Product.find({
    owner: params.storeId,
  })
    .populate("categoryId")
    .populate("sizeId")
    .populate("colorId")
    .sort({ createdAt: 1 });

  const formattedProducts = products.map((item) => ({
    _id: item._id,
    name: item.name,
    images: item.images,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: item.price,
    category: item.categoryId.name,
    size: item.sizeId.name,
    color: item.colorId.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const plainProducts = JSON.parse(JSON.stringify(formattedProducts));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient
          data={plainProducts}
        />
      </div>
    </div>
  );
};

export default ProductsPage;

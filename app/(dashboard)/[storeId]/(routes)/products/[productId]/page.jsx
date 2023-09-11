import React from "react";
import dbConnect from "../../../../../../lib/mongodb";
import ProductForm from "./components/product-form";
import Product from "../../../../../../models/productModel";
import Category from "../../../../../../models/categoryModel";
import Size from "../../../../../../models/sizeModel";
import Color from "../../../../../../models/colorModel";
import Image from "../../../../../../models/imageModel";

const ProductPage = async ({ params }) => {
  await dbConnect();
  const product = await Product.findOne({
    _id: params.productId,
  });

  const plainProduct = JSON.parse(JSON.stringify(product))

  const categories = await Category.find({
    owner: params.storeId,
  });

  const sizes = await Size.find({
    owner: params.storeId,
  });

  const colors = await Color.find({
    owner: params.storeId,
  });


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={plainProduct}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;

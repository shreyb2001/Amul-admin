import Product from "../models/productModel";

export const getStockCount = async (storeId) => {
  const products = await Product.find({
    isArchived: true,
    owner: storeId,
  });

  return products.length;
};

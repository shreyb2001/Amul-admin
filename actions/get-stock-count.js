import Order from "../models/orderModel";

export const getStockCount = async (storeId) => {
  const orders = await Order.find({
    owner: storeId,
    isArchived: true,
  });

  return orders.length;
};

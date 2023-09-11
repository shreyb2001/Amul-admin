import Order from "../models/orderModel";

export const getSalesCount = async (storeId) => {
  const orders = await Order.find({
    owner: storeId,
    isPaid: false,
  });

  return orders.length;
};

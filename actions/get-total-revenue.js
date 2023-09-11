import Order from "../models/orderModel";

export const getTotalRevenue = async (storeId) => {
  const paidOrders = await Order.find({
    owner: storeId,
    isPaid: false,
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.price;
    }, 0);

    return total + orderTotal;
  }, 0);

  return totalRevenue;
};

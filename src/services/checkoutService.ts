/* eslint-disable @typescript-eslint/no-explicit-any */
const checkoutService = {
  placeOrder: async (order: any) => {
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 1000));
    // Get existing orders
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      ...order,
      id: Date.now(),
      status: order.paymentMethod === "cod" ? "Pending (COD)" : "Paid",
      date: new Date().toISOString(),
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    return newOrder;
  },
  getOrders: () => {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  },
};

export default checkoutService; 
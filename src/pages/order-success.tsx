/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Order {
  id: number;
  items: any[];
  shippingInfo: {
    name: string;
    address: string;
    phone: string;
  };
  paymentMethod: string;
  status: string;
  date: string;
}

const OrderSuccess: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    if (orders.length > 0) {
      setOrder(orders[orders.length - 1]);
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No recent order found</h2>
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="mb-4 text-gray-600">Thank you for your purchase. Your order has been placed and is being processed.</p>
        <div className="text-left mb-4">
          <div className="mb-2"><span className="font-semibold">Order ID:</span> {order.id}</div>
          <div className="mb-2"><span className="font-semibold">Date:</span> {new Date(order.date).toLocaleString()}</div>
          <div className="mb-2"><span className="font-semibold">Status:</span> {order.status}</div>
          <div className="mb-2"><span className="font-semibold">Payment Method:</span> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</div>
          <div className="mb-2"><span className="font-semibold">Shipping Info:</span> {order.shippingInfo.name}, {order.shippingInfo.address}, {order.shippingInfo.phone}</div>
          <div className="mb-2 font-semibold">Items:</div>
          <ul className="mb-2 pl-4 list-disc">
            {order.items.map((item: any) => (
              <li key={item.id}>
                {item.name} x {item.quantity} (${item.price * item.quantity})
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/orders")}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 
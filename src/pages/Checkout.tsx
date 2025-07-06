/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { clearCart } from "../store/slices/cartSlice";
import checkoutService from "../services/checkoutService";

const Checkout: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await checkoutService.placeOrder({
        items: cart.items,
        shippingInfo: shipping,
        paymentMethod: payment,
      });
      dispatch(clearCart());
      navigate("/order-success");
    } catch (err) {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            value={shipping.name}
            onChange={handleInput}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            name="address"
            value={shipping.address}
            onChange={handleInput}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Phone</label>
          <input
            name="phone"
            value={shipping.phone}
            onChange={handleInput}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Payment Method</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
                className="mr-2"
              />
              Cash on Delivery
            </label>
            {/* Future: Add more payment methods here */}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <ul className="mb-2">
            {cart.items.map((item: any) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold text-right">
            Total: ${cart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)}
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout; 
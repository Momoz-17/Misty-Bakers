import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { firebaseUser } = useAuth();
  const { request } = useApi();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!firebaseUser) {
      toast.error("Please login to place an order");
      return;
    }
    if (!address || !phone || !date) {
      toast.error("Please fill delivery address, phone and date");
      return;
    }
    setPlacing(true);
    try {
      await request("/orders", {
        method: "POST",
        body: JSON.stringify({
          items: items.map((i) => ({
            cake: i.cake._id,
            name: i.cake.name,
            quantity: i.quantity,
            weight: i.weight,
            price: i.cake.price,
          })),
          totalAmount: total,
          deliveryAddress: address,
          deliveryDate: date,
          contactPhone: phone,
        }),
      });
      toast.success("Order placed! We'll start baking soon 🎂");
      clearCart();
      navigate("/orders");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">🧺</p>
        <h2 className="font-display text-2xl font-bold text-cocoa mb-2">Your cart is empty</h2>
        <p className="text-cocoa/60 mb-6">Browse our menu and add some delicious cakes!</p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-blush-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blush-600 transition-colors"
        >
          Explore Cakes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-bold text-cocoa mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.cake._id + item.weight}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm"
              >
                <img
                  src={item.cake.imageUrl}
                  alt={item.cake.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-cocoa truncate">{item.cake.name}</h3>
                  <p className="text-xs text-cocoa/50 mb-2">{item.weight}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.cake._id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-blush-50 flex items-center justify-center text-cocoa hover:bg-blush-100"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cake._id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-blush-50 flex items-center justify-center text-cocoa hover:bg-blush-100"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="font-semibold text-blush-600">
                    ₹{item.cake.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.cake._id)}
                    className="text-cocoa/40 hover:text-red-500 transition-colors"
                    aria-label="Remove"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24">
          <h3 className="font-display font-semibold text-lg text-cocoa mb-4">Delivery Details</h3>
          <div className="space-y-3 mb-5">
            <input
              type="text"
              placeholder="Delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-blush-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-300"
            />
            <input
              type="tel"
              placeholder="Contact phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-blush-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-300"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-blush-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-300"
            />
          </div>

          <div className="flex justify-between text-sm text-cocoa/60 mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between font-semibold text-cocoa text-lg mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handlePlaceOrder}
            disabled={placing}
            className="w-full bg-blush-500 text-white py-3 rounded-full font-semibold hover:bg-blush-600 disabled:opacity-60 transition-colors"
          >
            {placing ? "Placing order..." : "Place Order"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

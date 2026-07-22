import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Order } from "../types";
import { useApi } from "../hooks/useApi";

const statusColor: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-purple-100 text-purple-700",
  "out-for-delivery": "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { request } = useApi();

  useEffect(() => {
    request("/orders/mine")
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-10 h-10 border-4 border-blush-300 border-t-blush-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-bold text-cocoa mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-cocoa/50">
          <p className="text-lg mb-2">No orders yet 🍰</p>
          <p className="text-sm">Once you place an order, it'll show up here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-cocoa/40">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[order.status]}`}>
                  {order.status.replace(/-/g, " ")}
                </span>
              </div>
              <div className="space-y-1 mb-3">
                {order.items.map((it, idx) => (
                  <p key={idx} className="text-sm text-cocoa/70">
                    {it.quantity} × {it.name} ({it.weight})
                  </p>
                ))}
              </div>
              <div className="flex justify-between items-center border-t border-blush-50 pt-3">
                <span className="text-xs text-cocoa/50">
                  Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                </span>
                <span className="font-semibold text-blush-600">₹{order.totalAmount}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

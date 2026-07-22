import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useApi } from "../../hooks/useApi";
import { Order } from "../../types";

const statuses: Order["status"][] = [
  "pending",
  "confirmed",
  "preparing",
  "out-for-delivery",
  "delivered",
  "cancelled",
];

const statusColor: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-purple-100 text-purple-700",
  "out-for-delivery": "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const ManageOrders = () => {
  const { request } = useApi();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    request("/orders")
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(loadOrders, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await request(`/orders/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      toast.success("Order status updated");
      loadOrders();
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-blush-300 border-t-blush-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 && (
        <p className="text-center text-cocoa/50 py-16">No orders yet.</p>
      )}
      {orders.map((order, i) => (
        <motion.div
          key={order._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <div className="flex flex-wrap justify-between gap-3 mb-3">
            <div>
              <p className="text-xs text-cocoa/40">{new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-sm text-cocoa/70">{order.contactPhone}</p>
            </div>
            <span className={`h-fit text-xs font-semibold px-3 py-1 rounded-full ${statusColor[order.status]}`}>
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

          <p className="text-xs text-cocoa/50 mb-3">📍 {order.deliveryAddress}</p>

          <div className="flex flex-wrap justify-between items-center gap-3 border-t border-blush-50 pt-3">
            <span className="font-semibold text-blush-600">₹{order.totalAmount}</span>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="text-xs border border-blush-200 rounded-full px-3 py-1.5 bg-blush-50 focus:outline-none focus:ring-2 focus:ring-blush-300"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s.replace(/-/g, " ")}</option>
              ))}
            </select>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ManageOrders;

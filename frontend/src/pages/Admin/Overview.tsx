import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPackage, FiClipboard, FiTrendingUp } from "react-icons/fi";
import { useApi } from "../../hooks/useApi";
import { Order } from "../../types";

const Overview = () => {
  const { request } = useApi();
  const [orders, setOrders] = useState<Order[]>([]);
  const [cakeCount, setCakeCount] = useState(0);

  useEffect(() => {
    request("/orders").then(setOrders).catch(() => {});
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/cakes`)
      .then((res) => res.json())
      .then((data) => setCakeCount(Array.isArray(data) ? data.length : 0))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;

  const stats = [
    { label: "Total Orders", value: orders.length, icon: <FiClipboard />, color: "bg-blush-100 text-blush-600" },
    { label: "Pending Orders", value: pendingCount, icon: <FiClipboard />, color: "bg-yellow-100 text-yellow-700" },
    { label: "Cakes on Menu", value: cakeCount, icon: <FiPackage />, color: "bg-purple-100 text-purple-700" },
    { label: "Total Revenue", value: `₹${totalRevenue}`, icon: <FiTrendingUp />, color: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
            {s.icon}
          </div>
          <p className="text-2xl font-bold text-cocoa">{s.value}</p>
          <p className="text-sm text-cocoa/50">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Overview;

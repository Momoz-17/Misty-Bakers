import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cake } from "../types";
import CakeCard from "../components/CakeCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const categories = [
  { value: "", label: "All" },
  { value: "birthday", label: "Birthday" },
  { value: "wedding", label: "Wedding" },
  { value: "cupcake", label: "Cupcakes" },
  { value: "custom", label: "Custom" },
  { value: "seasonal", label: "Seasonal" },
];

const Menu = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = category ? `?category=${category}` : "";
    fetch(`${API_URL}/cakes${query}`)
      .then((res) => res.json())
      .then((data) => setCakes(Array.isArray(data) ? data : []))
      .catch(() => setCakes([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-cocoa mb-3">Our Cakes</h1>
        <p className="text-cocoa/60 max-w-xl mx-auto">
          Freshly baked, made to order. Pick your favourite and we'll take care of the rest.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              category === c.value
                ? "bg-blush-500 text-white"
                : "bg-blush-50 text-cocoa hover:bg-blush-100"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blush-300 border-t-blush-600 rounded-full animate-spin" />
        </div>
      ) : cakes.length === 0 ? (
        <div className="text-center py-20 text-cocoa/50">
          <p className="text-lg mb-2">No cakes here yet 🍰</p>
          <p className="text-sm">The admin hasn't added cakes in this category. Check back soon!</p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cakes.map((cake) => (
            <motion.div
              key={cake._id}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            >
              <CakeCard cake={cake} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Menu;

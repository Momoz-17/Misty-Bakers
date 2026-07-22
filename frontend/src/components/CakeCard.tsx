import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Cake } from "../types";
import { useCart } from "../context/CartContext";

const CakeCard = ({ cake }: { cake: Cake }) => {
  // Use the first weight option as default, or fallback to "500g"
  const [weight, setWeight] = useState(cake.weightOptions?.[0] || "500g");
  const { addToCart } = useCart();

  // Directly look up the price using the selected weight key from priceOptions
  const displayPrice = cake.priceOptions?.[weight] ?? cake.price;

  const handleAddToCart = () => {
    addToCart({ ...cake, price: displayPrice }, weight);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-blush-100/40 border border-blush-50 flex flex-col justify-between group transition-shadow duration-300"
    >
      <div>
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden bg-cream/30">
          <motion.img
            src={cake.imageUrl}
            alt={cake.name}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
          {cake.isEggless && (
            <span className="absolute top-4 left-4 bg-green-500/90 text-white px-3 py-1 text-[10px] font-bold tracking-wider rounded-lg uppercase shadow-sm">
              Eggless
            </span>
          )}
        </div>

        {/* Info Section */}
        <div className="p-5">
          <span className="text-[10px] font-bold tracking-wider text-blush-500 uppercase">
            {cake.category}
          </span>
          <h3 className="font-display font-bold text-cocoa text-lg mt-0.5 line-clamp-1 group-hover:text-blush-600 transition-colors">
            {cake.name}
          </h3>
          <p className="text-xs text-cocoa/60 mt-1 line-clamp-2 min-h-[2rem]">
            {cake.description}
          </p>

          {/* Weight Selection Badges */}
          {cake.weightOptions && cake.weightOptions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {cake.weightOptions.map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all duration-200 ${
                    weight === w
                      ? "bg-blush-500 border-blush-500 text-white shadow-sm"
                      : "bg-white border-blush-200 text-cocoa/70 hover:border-blush-400"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Pricing Section */}
      <div className="p-5 pt-0 flex items-center justify-between border-t border-blush-50/50 mt-2">
        <div>
          <span className="text-[10px] font-bold text-cocoa/40 uppercase tracking-wider block">
            Price
          </span>
          <span className="text-xl font-extrabold text-cocoa">
            ₹{displayPrice}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="flex items-center gap-1.5 bg-blush-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blush-600 shadow-md shadow-blush-500/10 transition-colors"
        >
          <FiPlus size={14} className="stroke-[3]" /> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CakeCard;
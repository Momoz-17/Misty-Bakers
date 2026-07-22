import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 to-cream pt-10 sm:pt-16 pb-20">
      {/* Decorative blobs */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-blush-200/50 animate-blob animate-float blur-2xl" />
      <div className="absolute top-1/3 -right-16 w-72 h-72 bg-gold/30 animate-blob animate-float blur-2xl" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block bg-blush-100 text-blush-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            🍰 Homemade &amp; Baked Fresh
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cocoa leading-tight mb-6">
            Cakes made with <span className="text-blush-500">love</span>,
            baked at home
          </h1>
          <p className="text-cocoa/70 text-base sm:text-lg mb-8 max-w-xl">
            Welcome to The Misty Bakers — a home bakery crafting birthday,
            wedding, and custom cakes with fresh ingredients and a whole lot
            of heart. Every order is baked just for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blush-500 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-blush-300/50 hover:bg-blush-600 transition-colors"
              >
                Order a Cake
              </motion.button>
            </Link>
            <a
              href="https://www.instagram.com/mistybakers_66/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 border-2 border-blush-300 text-blush-600 px-8 py-3.5 rounded-full font-semibold hover:bg-blush-50 transition-colors"
              >
                <FaInstagram /> Follow Us
              </motion.button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square sm:aspect-[4/5] bg-blush-100">
            <img
              src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80"
              alt="Freshly baked homemade cake by The Misty Bakers"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 hidden sm:block"
          >
            <p className="text-2xl font-display font-bold text-blush-500">100%</p>
            <p className="text-xs text-cocoa/60">Homemade &amp; Eggless options</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

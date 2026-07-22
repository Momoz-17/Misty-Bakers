import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { GiCakeSlice, GiFlour, GiWheat } from "react-icons/gi";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const features = [
  { icon: <GiCakeSlice size={28} />, title: "Handcrafted Cakes", desc: "Every cake is baked fresh, to order — never mass-produced." },
  { icon: <GiFlour size={28} />, title: "Quality Ingredients", desc: "Real butter, fresh cream, and premium chocolate, always." },
  { icon: <GiWheat size={28} />, title: "Eggless Options", desc: "Most of our cakes come in delicious eggless versions too." },
];

const Home = () => {
  return (
    <div>
      <Hero />

      {/* About the baker */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <span className="text-blush-500 font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cocoa mt-2 mb-5">
              Meet the baker behind The Misty Bakers
            </h2>
            <p className="text-cocoa/70 leading-relaxed mb-4">
              The Misty Bakers began with a simple wish to be independent —
              our founder taught herself to bake, and the very first cakes
              she shared with family turned out to be genuinely, deliciously
              good.
            </p>
            <p className="text-cocoa/70 leading-relaxed mb-6">
              Every cake since has been homemade, eggless, and made from
              family recipes — mixed, baked, and decorated entirely by hand.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-blush-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-blush-600 transition-colors"
              >
                Read Our Full Story
              </Link>

              <a
                href="https://www.instagram.com/mistybakers_66/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blush-600 font-semibold hover:text-blush-700 transition-colors"
              >
                <FaInstagram size={20} /> @mistybakers_66
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2 rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/3]"
          >
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
              alt="Homemade cake baking process"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-blush-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl font-bold text-cocoa text-center mb-12"
          >
            Why people love our cakes
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-blush-100 text-blush-500 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-cocoa text-lg mb-2">{f.title}</h3>
                <p className="text-cocoa/60 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cocoa mb-4">
            Ready to order your dream cake?
          </h2>
          <p className="text-cocoa/60 mb-8 max-w-xl mx-auto">
            Browse our menu and place your order — we'll bake it fresh and
            deliver it right on time for your celebration.
          </p>
          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blush-500 text-white px-10 py-4 rounded-full font-semibold shadow-lg shadow-blush-300/50 hover:bg-blush-600 transition-colors"
            >
              View Our Cakes 🍰
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
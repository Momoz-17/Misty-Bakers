import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { GiCakeSlice, GiWheat, GiChocolateBar } from "react-icons/gi";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const highlights = [
  {
    icon: <GiCakeSlice size={26} />,
    title: "100% Homemade",
    desc: "Every cake is baked, filled, and decorated by hand in a real home kitchen — never mass-produced.",
  },
  {
    icon: <GiWheat size={26} />,
    title: "Eggless & Family Recipes",
    desc: "All our cakes are eggless, made using family recipes that have been tasted, tweaked, and perfected.",
  },
  {
    icon: <GiChocolateBar size={26} />,
    title: "Custom Designs",
    desc: "From classic birthday cakes to our newest chocolate truffle, every order can be customised to what you're celebrating.",
  },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 to-cream pt-14 sm:pt-20 pb-16">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blush-200/50 animate-blob blur-2xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-blush-100 text-blush-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              🍰 Our Story
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-cocoa leading-tight mb-5">
              The story behind <span className="text-blush-500">The Misty Bakers</span>
            </h1>
            <p className="text-cocoa/70 text-base sm:text-lg max-w-2xl mx-auto">
              A home baker's journey to independence, one cake at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold text-cocoa mb-5">
              From learning to baking, to baking with love
            </h2>
            <p className="text-cocoa/70 leading-relaxed mb-4">
              The Misty Bakers started with one simple wish — to be
              independent. Our founder began teaching herself how to bake,
              wanting something that was truly her own rather than relying
              on anyone else for it.
            </p>
            <p className="text-cocoa/70 leading-relaxed mb-4">
              What started as quiet practice in the kitchen quickly turned
              into something special. The first cakes she made were shared
              with family to taste — and they were genuinely, surprisingly
              good. That moment of "wait, you made this yourself?" is really
              where The Misty Bakers began.
            </p>
            <p className="text-cocoa/70 leading-relaxed mb-6">
              Since then, every cake has been made the same way: at home,
              from scratch, using family recipes — all completely eggless.
              Her newest creation, a rich chocolate truffle cake, is already
              a favourite. Every order can also be customised, so your cake
              is made exactly the way you imagined it for your celebration.
            </p>
            
            <a href="https://www.instagram.com/mistybakers_66/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blush-600 font-semibold hover:text-blush-700 transition-colors"
            >
              <FaInstagram size={20} /> @mistybakers_66
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/5]"
          >
            <img
              src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80"
              alt="Homemade chocolate cake by The Misty Bakers"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-blush-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl font-bold text-cocoa text-center mb-12"
          >
            What makes our cakes different
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-blush-100 text-blush-500 flex items-center justify-center mb-4">
                  {h.icon}
                </div>
                <h3 className="font-semibold text-cocoa text-lg mb-2">{h.title}</h3>
                <p className="text-cocoa/60 text-sm">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery note + CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cocoa mb-4">
            Currently delivering around Sakinaka
          </h2>
          <p className="text-cocoa/60 mb-8 max-w-xl mx-auto">
            We deliver fresh across the Sakinaka area and a few nearby
            locations. Not sure if we deliver to you? Reach out on our{" "}
            <Link to="/contact" className="text-blush-600 font-semibold hover:text-blush-700">
              Contact page
            </Link>{" "}
            and we'll let you know.
          </p>
          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blush-500 text-white px-10 py-4 rounded-full font-semibold shadow-lg shadow-blush-300/50 hover:bg-blush-600 transition-colors"
            >
              Order Your Cake 🍰
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
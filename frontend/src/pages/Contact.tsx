import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// TODO: replace with the real business WhatsApp number (with country code,
// no + or spaces, e.g. "919876543210")
const WHATSAPP_NUMBER = "911234567890";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Failed to send message" }));
        throw new Error(err.message);
      }
      toast.success("Message sent! We'll get back to you soon 🎂");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-cocoa mb-3">Get in Touch</h1>
        <p className="text-cocoa/60 max-w-xl mx-auto">
          Have a question, or want to place a custom order? Send us a message
          or reach out directly — we'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Info panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 bg-cocoa text-cream rounded-3xl p-8 flex flex-col justify-between"
        >
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">The Misty Bakers</h2>
            <p className="text-cream/70 text-sm leading-relaxed mb-8">
              Homemade, eggless cakes baked fresh to order. Reach out and
              we'll help you plan the perfect cake for your celebration.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blush-300 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Delivery area</p>
                  <p className="text-cream/60 text-sm">Sakinaka &amp; nearby areas</p>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-green-300 transition-colors"
              >
                <FaWhatsapp className="text-blush-300 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">WhatsApp</p>
                  <p className="text-cream/60 text-sm">Message us for quick replies</p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/mistybakers_66/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-blush-300 transition-colors"
              >
                <FaInstagram className="text-blush-300 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Instagram</p>
                  <p className="text-cream/60 text-sm">@mistybakers_66</p>
                </div>
              </a>
            </div>
          </div>

          <p className="text-cream/40 text-xs mt-10">
            We recommend placing custom cake orders at least a couple of days
            in advance so we have time to bake it fresh for you.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="md:col-span-3 bg-white rounded-3xl p-8 shadow-sm space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-cocoa/60 mb-1 block">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full border border-blush-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-300"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-cocoa/60 mb-1 block">Phone (optional)</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Your phone number"
                className="w-full border border-blush-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-300"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-cocoa/60 mb-1 block">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full border border-blush-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-300"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-cocoa/60 mb-1 block">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about the cake you have in mind..."
              className="w-full border border-blush-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-300 resize-none"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 bg-blush-500 text-white py-3 rounded-full font-semibold hover:bg-blush-600 disabled:opacity-60 transition-colors"
          >
            <FaPaperPlane size={14} />
            {sending ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
import { FaInstagram, FaWhatsapp, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="contact" className="bg-cocoa text-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl mb-3">The Misty Bakers</h3>
          <p className="text-cream/70 text-sm leading-relaxed">
            Homemade cakes baked with love, one order at a time. Every cake is
            handcrafted fresh for your special moments.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><a href="/menu" className="hover:text-blush-300 transition-colors">Our Cakes</a></li>
            <li><a href="/about" className="hover:text-blush-300 transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-blush-300 transition-colors">Contact</a></li>
            <li><a href="/cart" className="hover:text-blush-300 transition-colors">Cart</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gold">Get in Touch</h4>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/mistybakers_66/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-blush-500 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
          <p className="text-cream/50 text-xs mt-4">@mistybakers_66 on Instagram</p>
        </div>
      </div>

      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50 flex items-center justify-center gap-1">
        Made with <FaHeart className="text-blush-400" /> for The Misty Bakers · {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
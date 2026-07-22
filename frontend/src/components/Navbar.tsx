import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FiShoppingBag, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthModal from "./AuthModal";

// Import your brand new logo image asset
import logoImg from "../assets/logo.jpeg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Our Cakes" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [imgFailed, setImgFailed] = useState(false);
  const { profile, firebaseUser, signOut } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const getInitial = () => {
    if (firebaseUser?.displayName) {
      return firebaseUser.displayName.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur-md border-b border-blush-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo Wrapper Container */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoImg} 
              alt="The Misty Bakers Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-blush-200 shadow-sm group-hover:rotate-6 transition-transform duration-300"
            />
            <span className="font-display text-xl sm:text-2xl font-bold text-blush-600 group-hover:text-blush-500 transition-colors">
              The Misty Bakers
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors hover:text-blush-500 ${
                    isActive ? "text-blush-600" : "text-cocoa"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 text-cocoa hover:text-blush-500 transition-colors"
              aria-label="Cart"
            >
              <FiShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blush-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {firebaseUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(profile?.role === "admin" ? "/admin" : "/orders")}
                  className="flex items-center gap-2 text-sm font-medium text-cocoa hover:text-blush-500 transition-colors"
                >
                  {firebaseUser.photoURL && !imgFailed ? (
                    <img
                      src={firebaseUser.photoURL}
                      alt={firebaseUser.displayName ?? "User"}
                      className="w-8 h-8 rounded-full border-2 border-blush-300 object-cover"
                      onError={() => setImgFailed(true)}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blush-500 text-white flex items-center justify-center font-bold text-xs shadow-sm border border-blush-600">
                      {getInitial()}
                    </div>
                  )}
                  <span>{profile?.role === "admin" ? "Dashboard" : "My Orders"}</span>
                </button>
                <button
                  onClick={signOut}
                  className="p-2 text-cocoa hover:text-blush-500 transition-colors"
                  aria-label="Sign out"
                >
                  <FiLogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <motion.button
                  layoutId="auth-trigger"
                  onClick={() => openAuth("login")}
                  className="px-5 py-2 rounded-full text-sm font-semibold text-blush-600 border-2 border-blush-300 hover:bg-blush-50 transition-colors"
                >
                  Login
                </motion.button>
                <button
                  onClick={() => openAuth("signup")}
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-blush-500 text-white hover:bg-blush-600 shadow-md shadow-blush-200 hover:shadow-lg hover:shadow-blush-300 active:scale-95 transition-all"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-cocoa"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-blush-100 bg-cream"
            >
              <div className="px-4 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-cocoa font-medium"
                  >
                    {link.label}
                  </NavLink>
                ))}
                <button
                  onClick={() => navigate("/cart")}
                  className="flex items-center gap-2 text-cocoa font-medium"
                >
                  <FiShoppingBag size={18} /> Cart ({cartCount})
                </button>

                {firebaseUser ? (
                  <>
                    <button
                      onClick={() => navigate(profile?.role === "admin" ? "/admin" : "/orders")}
                      className="text-cocoa font-medium text-left"
                    >
                      {profile?.role === "admin" ? "Dashboard" : "My Orders"}
                    </button>
                    <button
                      onClick={signOut}
                      className="text-blush-600 font-medium text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => openAuth("login")}
                      className="flex-1 px-4 py-2 rounded-full text-sm font-semibold text-blush-600 border-2 border-blush-300"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => openAuth("signup")}
                      className="flex-1 px-4 py-2 rounded-full text-sm font-semibold bg-blush-500 text-white"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={setAuthMode}
      />
    </>
  );
};

export default Navbar;
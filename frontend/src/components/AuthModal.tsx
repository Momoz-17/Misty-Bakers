import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";
import logoImg from "../assets/logo.jpeg";

const AuthModal = () => {
  const { signInWithGoogle } = useAuth();
  const { isOpen, closeAuthModal } = useAuthModal();

  const handleGoogle = async () => {
    await signInWithGoogle();
    closeAuthModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-cocoa/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeAuthModal}
          />

          {/* Centering wrapper — flex-centers the panel and, if the viewport
              is too short for the full card, allows scrolling within this
              layer instead of clipping the bottom of the card off-screen. */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              className="w-full max-w-md my-auto bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="relative p-8 sm:p-10 text-center">
                <button
                  onClick={closeAuthModal}
                  aria-label="Close"
                  className="absolute top-4 right-4 text-cocoa/50 hover:text-blush-500 transition-colors"
                >
                  <IoClose size={24} />
                </button>

                <img
                  src={logoImg}
                  alt="The Misty Bakers"
                  className="w-16 h-16 rounded-full object-cover border-2 border-blush-200 shadow-sm mx-auto mb-3"
                />
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-cocoa mb-2">
                  Welcome to The Misty Bakers
                </h2>
                <p className="text-cocoa/70 mb-8 text-sm sm:text-base">
                  Sign in with Google to add cakes to your cart, place orders,
                  and track them — takes one tap, no password needed.
                </p>

                <button
                  onClick={handleGoogle}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-blush-300
                             rounded-full py-3 px-6 font-semibold text-cocoa hover:border-blush-500 hover:bg-blush-50
                             active:scale-95 transition-all duration-150"
                >
                  <FcGoogle size={22} />
                  Continue with Google
                </button>

                <p className="text-xs text-cocoa/50 mt-6">
                  We only use Google Sign-In to keep your account safe & spam-free.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
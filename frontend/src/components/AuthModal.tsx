import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  open: boolean;
  mode: "login" | "signup";
  onClose: () => void;
  onSwitchMode: (mode: "login" | "signup") => void;
}

/**
 * The nav "Login" / "Sign Up" buttons carry layoutId="auth-trigger".
 * When this modal opens, framer-motion morphs that button's shape/position
 * into this panel with a shared-element (layout) animation, then the panel
 * content fades/scales in. Closing reverses the morph back into the button.
 */
const AuthModal = ({ open, mode, onClose, onSwitchMode }: AuthModalProps) => {
  const { signInWithGoogle } = useAuth();

  const handleGoogle = async () => {
    await signInWithGoogle();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-cocoa/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Morphing panel */}
          <motion.div
            layoutId="auth-trigger"
            className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2
                       bg-cream rounded-3xl shadow-2xl overflow-hidden border border-blush-200"
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="relative p-8 sm:p-10">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 text-cocoa/60 hover:text-blush-500 transition-colors"
              >
                <IoClose size={24} />
              </button>

              {/* Tabs */}
              <div className="flex gap-2 bg-blush-100 rounded-full p-1 mb-8">
                {(["login", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => onSwitchMode(m)}
                    className="relative flex-1 py-2 rounded-full text-sm font-semibold z-10 transition-colors"
                  >
                    {mode === m && (
                      <motion.div
                        layoutId="auth-tab-pill"
                        className="absolute inset-0 bg-blush-500 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={mode === m ? "text-white" : "text-cocoa"}>
                      {m === "login" ? "Login" : "Sign Up"}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
                  transition={{ duration: 0.25 }}
                  className="text-center"
                >
                  <h2 className="font-display text-2xl sm:text-3xl text-cocoa mb-2">
                    {mode === "login" ? "Welcome back!" : "Join The Misty Bakers"}
                  </h2>
                  <p className="text-cocoa/60 mb-8 text-sm sm:text-base">
                    {mode === "login"
                      ? "Sign in to track orders and order your favourite cakes again."
                      : "Create your account in one tap and start ordering homemade goodness."}
                  </p>

                  <button
                    onClick={handleGoogle}
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-blush-200
                               rounded-full py-3 px-6 font-semibold text-cocoa hover:border-blush-400
                               hover:shadow-lg hover:shadow-blush-200/50 active:scale-95 transition-all duration-200"
                  >
                    <FcGoogle size={22} />
                    {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
                  </button>

                  <p className="text-xs text-cocoa/40 mt-6">
                    We only use Google Sign-In to keep your account safe & spam-free.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;

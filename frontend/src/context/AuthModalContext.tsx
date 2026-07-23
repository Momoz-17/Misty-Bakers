import { createContext, useContext, useState, ReactNode } from "react";

interface AuthModalContextType {
  isOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

// Lets any component (Navbar, CakeCard "Add to Cart", Cart "Place Order",
// etc.) open the single global login modal without needing to lift state
// through props — e.g. clicking "Add to Cart" while logged out calls
// openAuthModal() directly.
export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        openAuthModal: () => setIsOpen(true),
        closeAuthModal: () => setIsOpen(false),
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = (): AuthModalContextType => {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
};
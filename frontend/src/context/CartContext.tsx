import { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { Cake, CartItem } from "../types";

interface CartContextType {
  items: CartItem[];
  addToCart: (cake: Cake, weight: string) => void;
  removeFromCart: (cakeId: string) => void;
  updateQuantity: (cakeId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (cake: Cake, weight: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.cake._id === cake._id && i.weight === weight);
      if (existing) {
        return prev.map((i) =>
          i.cake._id === cake._id && i.weight === weight
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { cake, quantity: 1, weight }];
    });
    toast.success(`${cake.name} added to cart 🧁`);
  };

  const removeFromCart = (cakeId: string) => {
    setItems((prev) => prev.filter((i) => i.cake._id !== cakeId));
  };

  const updateQuantity = (cakeId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.cake._id === cakeId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.cake.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getFood, getPrice } from "./foods";

export interface CartItem {
  id: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add: CartContextValue["add"] = (id, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });

  const remove: CartContextValue["remove"] = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const setQty: CartContextValue["setQty"] = (id, qty) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );

  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => {
    const food = getFood(i.id);
    if (!food) return s;
    return s + getPrice(i.id) * i.qty;
  }, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

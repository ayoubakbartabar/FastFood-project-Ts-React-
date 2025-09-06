import { create } from "zustand";
import { persist } from "zustand/middleware";

// Base product type
export type Product = {
  id: number;
  image: string;
  title: string;
  paragraph: string;
  star: number;
  price: number;
  count: number;
  category: string;
  sku: string;
};

// Cart item extends Product with quantity
export type CartItem = Product & {
  quantity: number;
};

// Zustand store type
interface CartState {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// Helper to calculate totals
const calculateTotals = (cart: CartItem[]) => ({
  totalItems: cart.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
});

// Zustand store with persist
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],  
      totalItems: 0,
      totalPrice: 0,

      addToCart: (product, quantity = 1) => {
        const existing = get().cart.find((item) => item.id === product.id);
        const newCart = existing
          ? get().cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          : [...get().cart, { ...product, quantity }];

        set({ cart: newCart, ...calculateTotals(newCart) });
      },

      updateQuantity: (id, quantity) => {
        const newCart = get()
          .cart.map((item) => (item.id === id ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0);

        set({ cart: newCart, ...calculateTotals(newCart) });
      },

      removeFromCart: (id) => {
        const newCart = get().cart.filter((item) => item.id !== id);
        set({ cart: newCart, ...calculateTotals(newCart) });
      },

      clearCart: () => set({ cart: [], totalItems: 0, totalPrice: 0 }),
    }),
    { name: "cart" } // localStorage key
  )
);

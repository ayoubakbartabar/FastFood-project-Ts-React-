import { create } from "zustand";
import { useAuthStore } from "./authStore";


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

export type CartItem = Product & { quantity: number };

interface CartState {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  loadUserCart: (userId: string) => void;
  saveUserCart: (userId: string) => void;
}

// Helper to calculate totals
const calculateTotals = (cart: CartItem[]) => ({
  totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
});

// Custom storage for localStorage per user
const createStorage = (key: string) => ({
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value ? Promise.resolve(JSON.parse(value)) : Promise.resolve(null);
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
    return Promise.resolve();
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
    return Promise.resolve();
  },
});

// Cart Store
export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,


  // Add product to cart

  addToCart: (product, quantity = 1) => {
    const existing = get().cart.find((i) => i.id === product.id);
    const newCart = existing
      ? get().cart.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      : [...get().cart, { ...product, quantity }];

    set({ cart: newCart, ...calculateTotals(newCart) });

    // Save to current user's cart if logged in
    const userId = useAuthStore.getState().currentUser?.id;
    if (userId) get().saveUserCart(userId.toString());
  },


  // Update quantity of a product

  updateQuantity: (id, quantity) => {
    const newCart = get()
      .cart.map((i) => (i.id === id ? { ...i, quantity } : i))
      .filter((i) => i.quantity > 0);

    set({ cart: newCart, ...calculateTotals(newCart) });

    const userId = useAuthStore.getState().currentUser?.id;
    if (userId) get().saveUserCart(userId.toString());
  },


  // Remove product from cart

  removeFromCart: (id) => {
    const newCart = get().cart.filter((i) => i.id !== id);
    set({ cart: newCart, ...calculateTotals(newCart) });

    const userId = useAuthStore.getState().currentUser?.id;
    if (userId) get().saveUserCart(userId.toString());
  },


  // Clear entire cart

  clearCart: () => set({ cart: [], totalItems: 0, totalPrice: 0 }),


  // Load cart for a specific user

  loadUserCart: (userId: string) => {
    const key = `cart-${userId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      set({
        cart: parsed.cart || [],
        totalItems: parsed.totalItems || 0,
        totalPrice: parsed.totalPrice || 0,
      });
    } else {
      set({ cart: [], totalItems: 0, totalPrice: 0 });
    }
  },


  // Save current cart to localStorage for user

  saveUserCart: (userId: string) => {
    const key = `cart-${userId}`;
    const { cart, totalItems, totalPrice } = get();
    localStorage.setItem(key, JSON.stringify({ cart, totalItems, totalPrice }));
  },
}));

// Sync cart when user changes
useAuthStore.subscribe((state) => {
  const cartStore = useCartStore.getState();
  const userId = state.currentUser?.id;

  if (userId) {
    // Load the user's cart from localStorage
    cartStore.loadUserCart(userId.toString());
  } else {
    // Clear cart for guest
    cartStore.clearCart();
  }
});

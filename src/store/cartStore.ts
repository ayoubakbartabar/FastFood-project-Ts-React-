// store/cartStore.ts
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
  totalPrice: Number(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  ),
});

// Helper to save cart for current user
const saveCartForUser = (cart: CartItem[]) => {
  const userId = useAuthStore.getState().currentUser?.id;
  if (!userId) return;
  const totals = calculateTotals(cart);
  try {
    localStorage.setItem(
      `cart-${userId.toString()}`,
      JSON.stringify({ cart, ...totals })
    );
  } catch (e) {
    console.warn("Failed to save cart to localStorage", e);
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,

  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existing = state.cart.find((i) => i.id === product.id);
      const newCart = existing
        ? state.cart.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [...state.cart, { ...product, quantity }];
      saveCartForUser(newCart);
      return { cart: newCart, ...calculateTotals(newCart) };
    });
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      const newCart = state.cart
        .map((i) => (i.id === id ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0);
      saveCartForUser(newCart);
      return { cart: newCart, ...calculateTotals(newCart) };
    });
  },

  removeFromCart: (id) => {
    set((state) => {
      const newCart = state.cart.filter((i) => i.id !== id);
      saveCartForUser(newCart);
      return { cart: newCart, ...calculateTotals(newCart) };
    });
  },

  clearCart: () => {
    const userId = useAuthStore.getState().currentUser?.id;
    if (userId) {
      try {
        localStorage.removeItem(`cart-${userId.toString()}`);
      } catch (e) {
        console.warn("Failed to remove cart from localStorage", e);
      }
    }
    set({ cart: [], totalItems: 0, totalPrice: 0 });
  },

  loadUserCart: (userId: string) => {
    try {
      const saved = localStorage.getItem(`cart-${userId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        set({
          cart: parsed.cart || [],
          totalItems: parsed.totalItems || 0,
          totalPrice: parsed.totalPrice || 0,
        });
        return;
      }
    } catch (e) {
      console.warn("Failed to load cart from localStorage", e);
    }
    set({ cart: [], totalItems: 0, totalPrice: 0 });
  },

  saveUserCart: (userId: string) => {
    const { cart } = get();
    saveCartForUser(cart);
  },
}));

/**
 * Sync cart when user changes
 */
useAuthStore.subscribe((state) => {
  const userId = state.currentUser?.id;
  const cartStore = useCartStore.getState();
  if (userId != null) {
    cartStore.loadUserCart(userId.toString());
  } else {
    cartStore.cart = [];
    cartStore.totalItems = 0;
    cartStore.totalPrice = 0;
  }
});

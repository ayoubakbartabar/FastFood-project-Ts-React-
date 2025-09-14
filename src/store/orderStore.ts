// store/orderStore.ts
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { CartItem } from "./cartStore";

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  date: string;
};

interface OrderState {
  orders: Order[];
  addOrder: (items: CartItem[]) => void;
  loadUserOrders: (userId: string) => void;
  clearOrders: (userId: string) => void;
}

// Helper function for localStorage key generation
const getUserOrdersKey = (userId: string) => `orders-${userId}`;

// Safe JSON parse function
const safeJSONParse = <T>(data: string | null): T | null => {
  try {
    return data ? (JSON.parse(data) as T) : null;
  } catch {
    return null;
  }
};

/**
 * Generate a short, human-readable and unique Order ID
 * Combines timestamp (base36) + 4 random alphanumeric chars
 * Example: ORD-lmopq1-9x7k
 */
const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36); // compact time-based string
  const random = Math.random().toString(36).substring(2, 6); // 4 random chars
  return `ORD-${timestamp}-${random}`;
};

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],

  /**
   * Add a new order for the currently logged-in user
   */
  addOrder: (items) => {
    const userId = useAuthStore.getState().currentUser?.id;
    if (!userId) {
      console.warn("No user logged in, cannot save order");
      return;
    }

    // Calculate subtotal
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Apply tax and shipping rules
    const tax = subtotal * 0.09; // Example: 9% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + tax + shipping;

    const newOrder: Order = {
      id: generateOrderId(), // shorter + readable unique ID
      items,
      subtotal,
      total,
      date: new Date().toLocaleString(),
    };

    const key = getUserOrdersKey(userId.toString());

    // Load existing orders from localStorage
    const existingOrders =
      safeJSONParse<Order[]>(localStorage.getItem(key)) || [];

    const updatedOrders = [newOrder, ...existingOrders];

    // Save to state and localStorage
    set({ orders: updatedOrders });
    try {
      localStorage.setItem(key, JSON.stringify(updatedOrders));
    } catch (e) {
      console.warn("Failed to save orders to localStorage", e);
    }
  },

  /**
   * Load orders for a specific user from localStorage
   */
  loadUserOrders: (userId: string) => {
    const key = getUserOrdersKey(userId);
    const saved = safeJSONParse<Order[]>(localStorage.getItem(key));
    set({ orders: saved || [] });
  },

  /**
   * Clear orders for a specific user
   */
  clearOrders: (userId: string) => {
    const key = getUserOrdersKey(userId);
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Failed to clear orders from localStorage", e);
    }
    set({ orders: [] });
  },
}));

/**
 * Sync orders when the current user changes
 * Ensures that orders are user-specific and type-safe
 */
useAuthStore.subscribe((state) => {
  const rawUserId = state.currentUser?.id;
  const orderStore = useOrderStore.getState();

  if (rawUserId) {
    // Load user-specific orders
    orderStore.loadUserOrders(rawUserId.toString());
  } else {
    // On logout: clear state safely (without direct mutation)
    useOrderStore.setState({ orders: [] });
  }
});

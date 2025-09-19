import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { CartItem } from "./cartStore";
import axios from "axios";

// Types
export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  date: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (items: CartItem[]) => Promise<void>;
  loadUserOrders: () => Promise<void>;
  clearOrders: () => void;
}

// API Setup
const API_BASE_URL = "http://localhost:3001";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Helpers

// Generate a short unique order ID
const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `ORD-${timestamp}-${random}`;
};

// LocalStorage key helper
const getUserOrdersKey = (userId: string) => `orders-${userId}`;

// Safe JSON parse utility
const safeJSONParse = <T>(data: string | null): T | null => {
  try {
    return data ? (JSON.parse(data) as T) : null;
  } catch {
    return null;
  }
};

// Zustand Store
export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],

  /**
   * Add a new order for the currently logged-in user
   * This method preserves all previous orders and saves them in db.json
   */
  addOrder: async (items) => {
    const currentUser = useAuthStore.getState().currentUser;
    if (!currentUser?.id) return;

    // Calculate subtotal, tax, shipping, total
    const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const tax = subtotal * 0.09;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    // Create the new order object
    const newOrder: Order = {
      id: generateOrderId(),
      items,
      subtotal,
      total,
      date: new Date().toISOString(),
    };

    try {
      // Fetch the latest user object from db.json
      const { data: userFromDB } = await api.get(`/users/${currentUser.id}`);
      const allOrders = userFromDB.orders || [];

      // Add the new order to the front of the array
      const updatedOrders = [newOrder, ...allOrders];

      // Patch the user object in db.json with updated orders
      const updatedUser = { ...userFromDB, orders: updatedOrders };
      await api.patch(`/users/${currentUser.id}`, updatedUser);

      // Update authStore and Zustand store state
      useAuthStore.setState({ currentUser: updatedUser });
      set({ orders: updatedOrders });

      // Save orders in localStorage for offline usage
      localStorage.setItem(
        getUserOrdersKey(currentUser.id.toString()),
        JSON.stringify(updatedOrders)
      );
    } catch (err) {
      console.error("Failed to save order in user object:", err);
    }
  },

  /**
   * Load all orders for the currently logged-in user
   * This method first checks localStorage, then falls back to authStore
   */
  loadUserOrders: async () => {
    const currentUser = useAuthStore.getState().currentUser;
    if (!currentUser?.id) return;

    // Try loading from localStorage first
    const saved = safeJSONParse<Order[]>(
      localStorage.getItem(getUserOrdersKey(currentUser.id.toString()))
    );

    if (saved) {
      set({ orders: saved });
    } else {
      // Fallback: load from authStore (already fetched from db.json)
      set({ orders: currentUser.orders || [] });
    }
  },

  /**
   * Clear all orders in state
   * Does not delete orders in db.json
   */
  clearOrders: () => set({ orders: [] }),
}));

// Sync with Auth Store
useAuthStore.subscribe((state: any) => {
  const userId = state.currentUser?.id;
  const store = useOrderStore.getState();

  if (userId) {
    // Load user orders on login or user change
    store.loadUserOrders();
  } else {
    // Clear orders on logout
    store.clearOrders();
  }
});

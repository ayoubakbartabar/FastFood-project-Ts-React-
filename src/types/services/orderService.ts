import axios from "axios";
import { CartItem } from "../../store/cartStore";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  date: string;
}

const API_BASE_URL = "http://localhost:3001";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Save a new order for a user
 */
export const saveOrder = async (order: Order): Promise<Order | null> => {
  try {
    const res = await api.post<Order>("/orders", order);
    return res.data;
  } catch (e) {
    console.error("Failed to save order to DB", e);
    return null;
  }
};

/**
 * Get all orders for a specific user
 */
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const res = await api.get<Order[]>("/orders", { params: { userId } });
    return res.data;
  } catch (e) {
    console.error("Failed to fetch user orders", e);
    return [];
  }
};

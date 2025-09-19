import { create } from "zustand";
import {
  User,
  signUp,
  fetchUsers,
  updateUser,
} from "../types/services/authService";

// Extend User to include orders
export interface UserWithOrders extends User {
  orders: any[];
}

// Auth state interface
interface AuthState {
  currentUser: UserWithOrders | null;
  register: (user: Omit<User, "id">) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loadUser: () => void;
  logout: () => void;
  updateProfile: (data: Partial<UserWithOrders>) => Promise<void>;
  addOrder: (order: any) => Promise<void>;
}

// Helper function to save user to localStorage
const saveUserToLocalStorage = (user: UserWithOrders) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

// Zustand auth store
export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,

  // Register a new user
  register: async (user) => {
    // Fetch all existing users
    const users = await fetchUsers();

    // Check if email is already registered
    if (users.some((u) => u.email === user.email)) {
      throw new Error("This email is already registered ❌");
    }

    // Sign up the new user
    const savedUser = await signUp(user);
    if (!savedUser) throw new Error("Failed to register user");

    // Add empty orders array
    const userWithOrders: UserWithOrders = { ...savedUser, orders: [] };

    // Save to localStorage and set state
    saveUserToLocalStorage(userWithOrders);
    set({ currentUser: userWithOrders });
  },

  // Login an existing user
  login: async (email, password) => {
    // Fetch all users
    const users = await fetchUsers();

    // Find user with matching email and password
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!foundUser) throw new Error("Invalid email or password ❌");

    // Ensure orders array exists
    const userWithOrders: UserWithOrders = {
      ...foundUser,
      orders: foundUser.orders || [],
    };

    // Save to localStorage and set state
    saveUserToLocalStorage(userWithOrders);
    set({ currentUser: userWithOrders });
  },

  // Load user from localStorage (persistent login)
  loadUser: () => {
    try {
      const user = localStorage.getItem("currentUser");
      if (user) set({ currentUser: JSON.parse(user) });
    } catch {
      // Clear corrupted localStorage and reset state
      localStorage.removeItem("currentUser");
      set({ currentUser: null });
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("currentUser");
    set({ currentUser: null });
  },

  // Update the profile of the logged-in user
  updateProfile: async (data) => {
    const { currentUser } = get();
    if (!currentUser) throw new Error("No user logged in");

    // Update user via API
    const updatedUser = await updateUser(currentUser.id!, data);
    if (!updatedUser) throw new Error("Failed to update user");

    // Preserve previous orders array
    const userWithOrders: UserWithOrders = {
      ...updatedUser,
      orders: currentUser.orders,
    };

    // Save to localStorage and set state
    saveUserToLocalStorage(userWithOrders);
    set({ currentUser: userWithOrders });
  },

  // Add a new order for the logged-in user
  addOrder: async (order) => {
    const { currentUser } = get();
    if (!currentUser) throw new Error("No user logged in");

    // Add new order to existing orders
    const updatedOrders = [...currentUser.orders, order];

    // Update user with new orders via API
    const updatedUser = await updateUser(currentUser.id!, {
      orders: updatedOrders,
    });
    if (!updatedUser) throw new Error("Failed to add order");

    // Update state and localStorage
    const userWithOrders: UserWithOrders = {
      ...updatedUser,
      orders: updatedOrders,
    };
    saveUserToLocalStorage(userWithOrders);
    set({ currentUser: userWithOrders });
  },
}));

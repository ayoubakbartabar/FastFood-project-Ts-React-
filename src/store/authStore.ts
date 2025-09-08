// Zustand store for authentication management
import { create } from "zustand";
import { NewUser, signUp, fetchUsers } from "../types/services/authService";

interface AuthState {
  currentUser: NewUser | null; // Currently logged-in user
  register: (user: NewUser) => Promise<void>; // Register a new user
  login: (email: string, password: string) => Promise<void>; // Login existing user
  loadUser: () => void; // Load user from localStorage
  logout: () => void; // Logout user
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null, // Initial state

  // Register a new user
  register: async (user) => {
    try {
      // Fetch all users to prevent duplicate emails
      const users = await fetchUsers();
      const emailExists = users.some((u) => u.email === user.email);

      if (emailExists) {
        throw new Error("This email is already registered ❌");
      }

      // Call API to create new user
      const savedUser = await signUp(user);

      // Persist user in localStorage and Zustand store
      localStorage.setItem("currentUser", JSON.stringify(savedUser));
      set({ currentUser: savedUser });
    } catch (error: any) {
      throw new Error(error.message || "Failed to register user");
    }
  },

  // Login existing user
  login: async (email, password) => {
    try {
      const users = await fetchUsers();
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) throw new Error("Invalid email or password ❌");

      // Save user to localStorage and Zustand store
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      set({ currentUser: foundUser });
    } catch (error: any) {
      throw new Error(error.message || "Failed to login");
    }
  },

  // Load user from localStorage (persistent login)
  loadUser: () => {
    try {
      const user = localStorage.getItem("currentUser");
      if (user) {
        const parsedUser: NewUser = JSON.parse(user);
        set({ currentUser: parsedUser });
      }
    } catch {
      // Clear corrupted data
      localStorage.removeItem("currentUser");
      set({ currentUser: null });
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("currentUser");
    set({ currentUser: null });
  },
}));

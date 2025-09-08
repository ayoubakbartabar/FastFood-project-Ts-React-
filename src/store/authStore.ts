import { create } from "zustand";
import { NewUser, signUp, fetchUsers } from "../types/services/authService";

interface AuthState {
  currentUser: NewUser | null;
  register: (user: NewUser) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loadUser: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,

  // Register a new user
  register: async (user) => {
    try {
      // Call API to create new user
      const savedUser = await signUp(user);

      // Persist in localStorage and store
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

  // Load user from localStorage
  loadUser: () => {
    try {
      const user = localStorage.getItem("currentUser");
      if (user) {
        const parsedUser: NewUser = JSON.parse(user);
        set({ currentUser: parsedUser });
      }
    } catch {
      // If parsing fails, clear corrupted data
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

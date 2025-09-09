import { create } from "zustand";
import {
  NewUser,
  signUp,
  fetchUsers,
  updateUser,
} from "../types/services/authService";

// -------------------------------
// Auth state interface
interface AuthState {
  currentUser: NewUser | null; // Currently logged-in user
  register: (user: NewUser) => Promise<void>; // Register a new user
  login: (email: string, password: string) => Promise<void>; // Login existing user
  loadUser: () => void; // Load user from localStorage
  logout: () => void; // Logout user
  updateProfile: (data: Partial<NewUser>) => Promise<void>; // Update logged-in user's profile
}

// -------------------------------
// Zustand auth store
export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null, // Initial state

  // Register a new user
  register: async (user) => {
    try {
      const users = await fetchUsers();
      if (users.some((u) => u.email === user.email)) {
        throw new Error("This email is already registered ❌");
      }

      const savedUser = await signUp(user);
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
      if (user) set({ currentUser: JSON.parse(user) });
    } catch {
      localStorage.removeItem("currentUser");
      set({ currentUser: null });
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("currentUser");
    set({ currentUser: null });
  },

  // Update profile of logged-in user
  updateProfile: async (data: Partial<NewUser>) => {
    const { currentUser } = get();
    if (!currentUser) throw new Error("No user logged in");

    try {
      const updatedUser = await updateUser(currentUser.id!, data);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      set({ currentUser: updatedUser });
    } catch (error: any) {
      throw new Error(error.message || "Failed to update profile");
    }
  },
}));

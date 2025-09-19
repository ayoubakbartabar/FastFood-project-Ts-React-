import axios from "axios";

// User interface
export interface User {
  id?: number | string;
  name: string;
  email: string;
  password: string;
  role?: string;
  avatar?: string;
  profileUrl?: string;
  orders?: any[]; // Add optional orders array
}

export const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

// Sign up a new user
export const signUp = async (newUser: User): Promise<User | null> => {
  try {
    // Ensure orders array exists
    const userWithOrders = { ...newUser, orders: [] };
    const res = await api.post<User>("/users", userWithOrders);
    return res.data;
  } catch (error) {
    console.error("Sign Up Error:", error);
    return null;
  }
};

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await api.get<User[]>("/users");
    // Ensure every user has an orders array
    return res.data.map((u) => ({ ...u, orders: u.orders || [] }));
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return [];
  }
};

// Update user
export const updateUser = async (
  id: number | string,
  data: Partial<User>
): Promise<User | null> => {
  try {
    const res = await api.patch<User>(`/users/${id}`, data);
    return { ...res.data, orders: res.data.orders || [] };
  } catch (error) {
    console.error("Update User Error:", error);
    return null;
  }
};

// Delete user
export const deleteUser = async (id: number | string): Promise<boolean> => {
  try {
    await api.delete(`/users/${id}`);
    return true;
  } catch (error) {
    console.error("Delete User Error:", error);
    return false;
  }
};

// Login user
export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const res = await api.get<User[]>("/users", {
      params: { email, password },
    });
    if (res.data.length === 0) return null;
    return { ...res.data[0], orders: res.data[0].orders || [] };
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
};

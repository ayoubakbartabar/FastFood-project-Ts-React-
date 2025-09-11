// User model interface
export interface NewUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

// Create a new user (Sign Up)
export const signUp = async (newUser: NewUser): Promise<NewUser> => {
  try {
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      throw new Error(`Sign up failed: ${res.statusText}`);
    }

    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Unknown error during sign up");
  }
};

// Fetch all users
export const fetchUsers = async (): Promise<NewUser[]> => {
  try {
    const res = await fetch("http://localhost:5000/users");

    if (!res.ok) {
      throw new Error(`Fetch users failed: ${res.statusText}`);
    }

    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Unknown error while fetching users");
  }
};

// Update an existing user
export const updateUser = async (
  id: number | string,
  data: Partial<NewUser>
): Promise<NewUser> => {
  try {
    const res = await fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Update failed: ${res.statusText}`);
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Unknown error while updating user");
  }
};

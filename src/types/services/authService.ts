// User model
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
      // Throw error with status text
      throw new Error(`Sign up failed: ${res.statusText}`);
    }

    // Return created user
    return res.json();
  } catch (error: any) {
    // Catch network or parsing errors
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

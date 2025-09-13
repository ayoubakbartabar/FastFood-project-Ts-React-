export interface NewUser {
  id?: number | string;
  name: string;
  email: string;
  password: string;
  role?: string;
  avatar?: string;
  profileUrl?: string;
}

// A small helper to reduce repetition
const apiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
};

// Create a new user (Sign Up)
export const signUp = (newUser: NewUser): Promise<NewUser> =>
  apiRequest<NewUser>("http://localhost:5000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

// Fetch all users
export const fetchUsers = (): Promise<NewUser[]> =>
  apiRequest<NewUser[]>("http://localhost:5000/users");

// Update an existing user
export const updateUser = (
  id: number | string,
  data: Partial<NewUser>
): Promise<NewUser> =>
  apiRequest<NewUser>(`http://localhost:5000/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

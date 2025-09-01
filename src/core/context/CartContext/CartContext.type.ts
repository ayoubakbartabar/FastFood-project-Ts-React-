// Base type for a product
export type Product = {
  id: number; // Unique identifier for the product
  image: string; // URL or path to the product image
  title: string; // Product title/name
  paragraph: string; // Description or details about the product
  star: number; // Rating of the product (e.g., 1-5 stars)
  price: number; // Price of a single unit of the product
  count: number; // Total available stock for the product
  category: string; // Category of the product (e.g., "pasta")
  sku: string; // Stock Keeping Unit, unique product code
};

// Represents a single item in the shopping cart
export type CartItem = Product & {
  quantity: number; // Quantity of this product currently in the cart
};

// Defines the possible actions for the cart reducer
export type CartAction =
  | { type: "ADD"; product: Product; quantity: number } // Add a product to the cart with a specific quantity
  | { type: "UPDATE"; id: number; quantity: number } // Update the quantity of a product in the cart
  | { type: "REMOVE"; id: number }; // Remove a product from the cart

// Defines the shape of the CartContext that will be provided via React Context
export type CartContextType = {
  cart: CartItem[]; // Array of all items currently in the cart
  addToCart: (product: Product, quantity?: number) => void; // Function to add a product to the cart
  updateQuantity: (id: number, quantity: number) => void; // Function to update the quantity of a cart item
  removeFromCart: (id: number) => void; // Function to remove an item from the cart
  totalItems: number; // Total number of items in the cart (sum of quantities)
  totalPrice: number; // Total price of all items in the cart
};

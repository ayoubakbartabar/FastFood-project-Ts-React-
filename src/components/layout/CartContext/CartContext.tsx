import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { CartItem, CartAction, CartContextType } from "./CartContext.type";

// Reducer
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        // Update quantity if item exists
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
      }
      // Add new item
      return [...state, { ...action.product, quantity: action.quantity }];
    }

    case "UPDATE": {
      // Update or remove if quantity <= 0
      return state
        .map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        )
        .filter((item) => item.quantity > 0);
    }

    case "REMOVE":
      // Remove product completely
      return state.filter((item) => item.id !== action.id);

    default:
      return state;
  }
}

// Context
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Initialize cart from localStorage safely
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Actions
  const addToCart = useCallback(
    (product: Omit<CartItem, "quantity">, quantity = 1) =>
      dispatch({ type: "ADD", product, quantity }),
    []
  );

  const updateQuantity = useCallback(
    (id: number, quantity: number) =>
      dispatch({ type: "UPDATE", id, quantity }),
    []
  );

  const removeFromCart = useCallback(
    (id: number) => dispatch({ type: "REMOVE", id }),
    []
  );

  // Derived Values
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

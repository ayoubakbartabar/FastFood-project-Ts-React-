import React, { useMemo } from "react";
import { useCartStore } from "../../../store/cartStore";
import "./ShoppingBasketSection.css";

const ShoppingBasketSection: React.FC = () => {
  // Access cart state and updateQuantity action from Zustand store
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  // Calculate subtotal using useMemo for performance
  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <section className="shopping-basket-section">
      {/* Header */}
      <div className="basket-header">
        <h2>Your Cart</h2>
      </div>

      {/* Empty basket */}
      {cart.length === 0 ? (
        <p className="empty-cart">Your basket is empty</p>
      ) : (
        <>
          {/* Render all cart items */}
          {cart.map((item) => (
            <div key={item.id} className="basket-item">
              {/* Product image */}
              <div className="basket-image-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="basket-product-image"
                />
              </div>

              {/* Product info */}
              <div className="basket-product-info">
                <h3 className="basket-product-name">{item.title}</h3>
                <p className="basket-product-price">
                  ${item.price.toFixed(2)} <span className="currency">USD</span>
                </p>
              </div>

              {/* Quantity input */}
              <input
                type="number"
                min={0}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="basket-quantity-input"
                aria-label={`Quantity of ${item.title}`}
              />
            </div>
          ))}

          {/* Subtotal */}
          <div className="basket-subtotal">
            <span className="subtotal-text">Subtotal</span>
            <span className="subtotal-price">${subtotal.toFixed(2)} USD</span>
          </div>

          {/* Checkout button */}
          <button className="checkout-btn">Continue to Checkout</button>
        </>
      )}
    </section>
  );
};

export default ShoppingBasketSection;

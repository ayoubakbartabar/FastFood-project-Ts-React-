import React, { useMemo, useState } from "react";
import { useCartStore } from "../../../store/cartStore";
import { useOrderStore } from "../../../store/orderStore";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import "./ShoppingBasketSection.css";

const ShoppingBasketSection: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);
  const currentUser = useAuthStore((state) => state.currentUser);

  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const handleCheckout = () => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    addOrder(cart);
    clearCart();
    alert("Payment confirmed! Order placed successfully!");
  };

  return (
    <section className="shopping-basket-section">
      <div className="basket-header">
        <h2>Your Cart</h2>
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Your basket is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="basket-item">
              <div className="basket-image-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="basket-product-image"
                />
              </div>
              <div className="basket-product-info">
                <h3 className="basket-product-name">{item.title}</h3>
                <p className="basket-product-price">
                  ${item.price.toFixed(2)} <span className="currency">USD</span>
                </p>
              </div>
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

          <div className="basket-subtotal">
            <span className="subtotal-text">Subtotal</span>
            <span className="subtotal-price">${subtotal.toFixed(2)} USD</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Continue to Checkout
          </button>
        </>
      )}

      {/* Modal for login prompt */}
      {showLoginModal && (
        <div className="login-modal-backdrop">
          <div className="login-modal">
            <h2>Login Required</h2>
            <p>You need to login or register before making a purchase.</p>
            <div className="login-modal-buttons">
              <button
                onClick={() => {
                  navigate("/login");
                  setShowLoginModal(false);
                }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setShowLoginModal(false);
                }}
              >
                Register
              </button>
              <button onClick={() => setShowLoginModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShoppingBasketSection;

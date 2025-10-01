import React, { useState, useRef, useCallback, useEffect, JSX } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

import OrderNowBtn from "../OrderNowBtn/OrderNowBtn";
import useClickOutside from "../../../core/hooks/useClickOutSide/useClickOutSide";
import ShoppingBasketSection from "../ShoppingBasketSection/ShoppingBasketSection";

import { LuShoppingBasket } from "react-icons/lu";
import { FaHamburger, FaUserCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

import { useCartStore } from "../../../store/cartStore";
import { useAuthStore } from "../../../store/authStore";
import { useNavBarData } from "../../../core/hooks/useNavBarData/useNavBarData";

// icons map
const iconMap: Record<string, JSX.Element> = {
  LuShoppingBasket: <LuShoppingBasket className="shop-basket-btn" />,
  FaUserCircle: <FaUserCircle size={26} />,
  FaHamburger: <FaHamburger />,
  IoCloseCircle: <IoCloseCircle />,
};

const NavBar: React.FC = () => {

  const cart = useCartStore((state) => state.cart);
  const totalItems = useCartStore((state) => state.totalItems);
  const { currentUser, logout, loadUser } = useAuthStore();
  const navigate = useNavigate();

  // UI states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Refs
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const basketRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // API Data
  const { data, isLoading, isError } = useNavBarData();

  // Handlers
  const openBasket = useCallback(() => setIsBasketOpen(true), []);
  const closeBasket = useCallback(() => setIsBasketOpen(false), []);
  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleUserMenu = useCallback(
    () => setIsUserMenuOpen((prev) => !prev),
    []
  );

  // Click outside handlers
  useClickOutside(mobileMenuRef, closeMobileMenu, isMobileMenuOpen);
  useClickOutside(basketRef, closeBasket, isBasketOpen);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isLoading) return <div>Loading Navbar...</div>;
  if (isError) return <div>Failed to load Navbar</div>;

  return (
    <div className="navbar-bg">
      <section className="navbar-section">
        {/* Logo */}
        <img className="navbar-logo" src={data?.logo[0]} alt="logo" />

        {/* Desktop Menu */}
        <ul className="menu-list desktop-menu">
          {data?.Menu.map((item) => (
            <li key={item.id} className="menu-item">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "menu-item active" : "menu-item"
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="navbar-btn-section">
          {/* User Menu */}
          <div className="user-menu-container" ref={userMenuRef}>
            <button
              className="user-icon-btn"
              onClick={toggleUserMenu}
              aria-label="User menu"
            >
              {iconMap["FaUserCircle"]}
            </button>

            <div className={`user-dropdown ${isUserMenuOpen ? "open" : ""}`}>
              {!currentUser ? (
                <>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/login");
                      setIsUserMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/signup");
                      setIsUserMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/userprofile"
                    className="dropdown-item user-name-link"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    👋 {currentUser.name}
                  </NavLink>

                  <button
                    className="dropdown-item logout-btn"
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Basket */}
          <button
            className="shop-basket-btn"
            aria-label="Shopping basket"
            onClick={openBasket}
          >
            {iconMap["LuShoppingBasket"]}
            {totalItems > 0 && <span className="basket-badge"></span>}
          </button>

          {/* Order Now */}
          <OrderNowBtn variant="desktop" className="order-now-desktop" />

          {/* Mobile Menu Toggle */}
          <button
            className="hamburger-btn"
            onClick={openMobileMenu}
            aria-label="Open menu"
          >
            {iconMap["FaHamburger"]}
          </button>
        </div>
      </section>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <section className="mobile-menu-section" ref={mobileMenuRef}>
          <div className="mobile-btn-section">
            <button
              className="mobile-close-btn"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              {iconMap["IoCloseCircle"]}
            </button>
          </div>
          <ul className="menu-list mobile-menu">
            {data?.Menu.map((item) => (
              <li key={item.id} className="menu-item">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                  }
                  onClick={closeMobileMenu}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <OrderNowBtn variant="mobile" />
        </section>
      )}

      {/* Basket Panel */}
      <div
        className={`basket-panel ${isBasketOpen ? "open" : ""}`}
        ref={basketRef}
      >
        <button
          className="basket-close-btn"
          onClick={closeBasket}
          aria-label="Close basket"
        >
          {iconMap["IoCloseCircle"]}
        </button>
        <ShoppingBasketSection />
      </div>

      {/* Basket Overlay */}
      {isBasketOpen && <div className="basket-overlay" onClick={closeBasket} />}
    </div>
  );
};

export default NavBar;

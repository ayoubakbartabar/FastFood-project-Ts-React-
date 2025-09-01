import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "react";
import "./NavBar.css";

import OrderNowBtn from "../OrderNowBtn/OrderNowBtn";
import useClickOutside from "../../../core/hooks/useClickOutSide/useClickOutSide";
import { CartContext } from "../../../core/context/CartContext/CartContext";
import logo from "../../../assets/images/661caca505c900f7a61a73ce_logo (1).png";

import { LuSearch, LuShoppingBasket } from "react-icons/lu";
import { FaHamburger } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  // Access cart context
  const cartContext = useContext(CartContext);
  if (!cartContext)
    throw new Error("CartContext must be used within a CartProvider");
  const { cart } = cartContext;

  // State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  // Refs for click outside detection
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const basketRef = useRef<HTMLDivElement>(null);

  // Derived values
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // Menu items
  const navbarMenus = useMemo(
    () => [
      { id: 1, title: "Home", href: "/" },
      { id: 2, title: "About", href: "/about" },
      { id: 3, title: "Shop", href: "/shop" },
      { id: 4, title: "Service", href: "/service" },
      { id: 5, title: "Blog", href: "/blogs" },
      { id: 6, title: "Menu", href: "/menu" },
      { id: 7, title: "Contact Us", href: "/contact-us" },
    ],
    []
  );

  // Handlers
  const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);
  const openBasket = useCallback(() => setIsBasketOpen(true), []);
  const closeBasket = useCallback(() => setIsBasketOpen(false), []);
  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // Close mobile menu when clicking outside
  useClickOutside(mobileMenuRef, closeMobileMenu, isMobileMenuOpen);

  // Close basket panel when clicking outside
  useClickOutside(basketRef, closeBasket, isBasketOpen);

  // Close search input when clicking outside
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (!event.target.closest(".search-container")) setIsSearchOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className="navbar-bg">
      <section className="navbar-section">
        {/* Logo */}
        <img className="navbar-logo" src={logo} alt="logo" />

        {/* Desktop menu */}
        <ul className="menu-list desktop-menu">
          {navbarMenus.map((item) => (
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

        {/* Buttons Section */}
        <div className="navbar-btn-section">
          {/* Search */}
          <div className={`search-container ${isSearchOpen ? "open" : ""}`}>
            <button
              className="search-btn"
              aria-label="Search"
              onClick={toggleSearch}
            >
              <LuSearch className="nav-search-icon" />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="search-input-box"
              autoFocus
            />
          </div>

          {/* Basket */}
          <button
            className="shop-basket-btn"
            aria-label="Shopping basket"
            onClick={openBasket}
          >
            <LuShoppingBasket className="shop-basket-icon" />
            {totalItems > 0 && (
              <span className="basket-badge">{totalItems}</span>
            )}
          </button>

          {/* Order Now button */}
          <OrderNowBtn variant="desktop" className="order-now-desktop" />

          {/* Mobile menu toggle */}
          <button
            className="hamburger-btn"
            onClick={openMobileMenu}
            aria-label="Open menu"
          >
            <FaHamburger />
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
              <IoCloseCircle />
            </button>
          </div>

          <ul className="menu-list mobile-menu">
            {navbarMenus.map((item) => (
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

          {/* Mobile order now button */}
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
          <IoCloseCircle size={28} />
        </button>
      </div>

      {/* Overlay */}
      {isBasketOpen && (
        <div className="basket-overlay" onClick={closeBasket}></div>
      )}
    </div>
  );
}

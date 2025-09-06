import React from "react";
import "./OrderNowBtn.css"; // Component-specific styles
import { MdArrowRightAlt } from "react-icons/md"; // Right arrow icon
import { useNavigate } from "react-router-dom"; // React Router hook for navigation

// Props for OrderNowBtn component
interface OrderNowBtnProps {
  variant?: "desktop" | "mobile"; // Button style variant
  className?: string; // Optional additional class names
}

const OrderNowBtn: React.FC<OrderNowBtnProps> = ({
  variant = "desktop", // Default is desktop
  className = "", // Default no extra class
}) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Compute final className
  const btnClassName = `order-now-btn ${
    variant === "mobile" ? "mobile-order-now" : "desktop-order-now"
  } ${className}`.trim();

  return (
    <button
      className={btnClassName} // Apply computed className
      onClick={() => navigate("/menu")} // Navigate to /menu on click
      aria-label="Order Now Button"
    >
      order now <MdArrowRightAlt aria-hidden="true" />
    </button>
  );
};

export default OrderNowBtn;

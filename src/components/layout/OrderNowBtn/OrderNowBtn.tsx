import React from "react";
import "./OrderNowBtn.css"; // Import component-specific styles
import { MdArrowRightAlt } from "react-icons/md"; // Import right arrow icon
import { useNavigate } from "react-router-dom"; // React Router hook for navigation

// Props for OrderNowBtn component
type OrderNowBtnProps = {
  variant?: "desktop" | "mobile"; // Determines the button style variant
  className?: string; // Optional additional class names
};

export default function OrderNowBtn({
  variant = "desktop", // Default variant is "desktop"
  className = "", // Default no extra class
}: OrderNowBtnProps) {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Compose the final className based on variant and any extra classes
  const btnClassName = `order-now-btn ${
    variant === "mobile" ? "mobile-order-now" : "desktop-order-now"
  } ${className}`.trim();

  return (
    <button
      className={btnClassName} // Apply computed className
      onClick={() => navigate("/menu")} // Navigate to /menu on click
    >
      order now
      <MdArrowRightAlt /> 
    </button>
  );
}

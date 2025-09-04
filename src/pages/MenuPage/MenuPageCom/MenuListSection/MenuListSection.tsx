import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MenuListSection.css";

import ProductsData from "../../../../data/ProductsData";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";
import type { Product } from "../../../../core/context/CartContext/CartContext.type";

export default function MenuListSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const navigate = useNavigate();

  // Custom hooks
  useDynamicNavigate();
  const { renderStars } = useRenderStars();

  // Pass a valid selector or ref to intersection hook
  useIntersectionAnimation(".menu-card"); // یا sectionRef

  // Navigate to product detail page
  const goToProductPage = (product: Product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div className="menu-list-bg">
      <section ref={sectionRef} className="menu-list-section">
        <div className="menu-list-grid">
          {ProductsData.map((item, index) => (
            <div
              key={item.id}
              className={`menu-card ${
                visibleCards.includes(index) ? "show" : ""
              }`}
            >
              {/* Product image - clickable */}
              <div
                className="menu-card-image"
                style={{ cursor: "pointer" }}
                onClick={() => goToProductPage(item)}
              >
                <img src={item.image} alt={item.title} />
              </div>

              {/* Product content */}
              <div className="menu-card-content">
                {/* Rating stars */}
                <div className="menu-stars">
                  {renderStars(item.star)} <span>({item.count})</span>
                </div>

                {/* Product title - clickable */}
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => goToProductPage(item)}
                >
                  {item.title}
                </h3>

                {/* Short description */}
                <p>
                  Pizza ipsum dolor meat lovers buffalo. Sausage large wing bell
                  NY olives pan. Spinach pan string pan
                </p>

                {/* Footer: price & button */}
                <div className="menu-card-footer">
                  <span className="menu-item-price">
                    ${item.price.toFixed(2)} USD
                  </span>
                  <button
                    className="add-to-cart"
                    onClick={() => goToProductPage(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

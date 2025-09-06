// MenuListSection.tsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuListSection.css";

import ProductsData from "../../../../data/ProductsData";
import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import type { Product } from "../../../../store/cartStore";

export default function MenuListSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { renderStars } = useRenderStars();
  const navigate = useNavigate();

  // Intersection animation for cards
  useIntersectionAnimation(".menu-card");

  const goToProductPage = (product: Product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div className="menu-list-bg">
      <section ref={sectionRef} className="menu-list-section">
        <div className="menu-list-grid">
          {ProductsData.map((item) => (
            <div key={item.id} className="menu-card animate-entry">
              <div
                className="menu-card-image"
                style={{ cursor: "pointer" }}
                onClick={() => goToProductPage(item)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>

              <div className="menu-card-content">
                <div className="menu-stars">
                  {renderStars(item.star)} <span>({item.count})</span>
                </div>

                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => goToProductPage(item)}
                >
                  {item.title}
                </h3>

                <p>
                  Pizza ipsum dolor meat lovers buffalo. Sausage large wing bell
                  NY olives pan. Spinach pan string pan
                </p>

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

// MenuListSection.tsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuListSection.css";
import type { Product } from "../../../../store/cartStore";
import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import { useProductData } from "../../../../core/hooks/useProductData/useProductData";

export default function MenuListSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { renderStars } = useRenderStars();
  const navigate = useNavigate();
  const { products, loading, error } = useProductData();

  // Intersection animation for cards
  useIntersectionAnimation(".menu-card");

  const goToProductPage = (product: Product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="menu-list-bg">
      <section ref={sectionRef} className="menu-list-section">
        <div className="menu-list-grid">
          {products.map((item) => (
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

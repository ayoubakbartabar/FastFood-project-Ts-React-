// components/BestSellingSection.tsx
import React, { useState, useEffect } from "react";
import ProductData from "../../../../data/ProductsData";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../../core/context/CartContext/CartContext.type";
import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import "./BestSellingSection.css";

export default function BestSellingSection() {
  // State to track current carousel index
  const [index, setIndex] = useState<number>(0);

  // State to detect if viewport is mobile size
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1024);

  const total: number = ProductData.length;

  // Number of cards visible at once: all for mobile, 4 for desktop
  const visibleCards: number = isMobile ? total : 4;

  const navigate = useNavigate();
  const { renderStars } = useRenderStars();

  // Custom hook to add "show" class when cards enter viewport
  // This triggers the CSS animation for smooth appearance
  useIntersectionAnimation(".product-card");

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      setIndex(0); // Reset carousel index on resize
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Move to next set of cards in carousel (desktop only)
  const next = () => {
    if (isMobile) return;
    setIndex((prev) =>
      prev + visibleCards >= total ? 0 : prev + visibleCards
    );
  };

  // Move to previous set of cards in carousel (desktop only)
  const prev = () => {
    if (isMobile) return;
    setIndex((prev) =>
      prev - visibleCards < 0 ? total - visibleCards : prev - visibleCards
    );
  };

  // Get currently visible products for the carousel
  const getVisibleData = (): Product[] => {
    if (isMobile) return ProductData; // Show all on mobile
    if (index + visibleCards > total) {
      // Wrap around if reaching the end of the array
      return [
        ...ProductData.slice(index),
        ...ProductData.slice(0, visibleCards - (total - index)),
      ];
    }
    return ProductData.slice(index, index + visibleCards);
  };

  // Navigate to product details page with state
  const goToProductPage = (item: Product) => {
    navigate(`/product/${item.id}`, { state: item });
  };

  return (
    <div className="best-selling-bg">
      <section className="best-selling-section">
        {/* Top section with title and description */}
        <div className="best-selling-top">
          <h1 className="best-selling-title">Best Selling Items</h1>
          <p className="best-selling-paragraph">
            Inspect background group content align export move. Background
            prototype arrange team inspect clip.
          </p>
        </div>

        {/* Carousel wrapper */}
        <div className="carousel-wrapper">
          {/* Left arrow button (desktop only) */}
          {!isMobile && (
            <button className="carousel-button left" onClick={prev}>
              <IoChevronBack />
            </button>
          )}

          {/* Carousel track */}
          <div
            className={`carousel-track ${
              isMobile ? "grid-view" : "carousel-view"
            }`}
          >
            {/* Render visible product cards */}
            {getVisibleData().map((item) => (
              <div key={item.id} className="product-card animate-entry">
                {/* Product image */}
                <div
                  className="product-image"
                  style={{ cursor: "pointer" }}
                  onClick={() => goToProductPage(item)}
                >
                  <img src={item.image} alt={item.title} />
                </div>

                {/* Product title */}
                <h3
                  className="product-title"
                  style={{ cursor: "pointer" }}
                  onClick={() => goToProductPage(item)}
                >
                  {item.title}
                </h3>

                {/* Product star rating */}
                <div className="product-stars">{renderStars(item.star)}</div>

                {/* Product price */}
                <p className="product-price">${item.price.toFixed(2)} USD</p>
              </div>
            ))}
          </div>

          {/* Right arrow button (desktop only) */}
          {!isMobile && (
            <button className="carousel-button right" onClick={next}>
              <IoChevronForward />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

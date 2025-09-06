// components/BestSellingSection.tsx
import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductData from "../../../../data/ProductsData";
import type { Product } from "../../../../store/cartStore";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import "./BestSellingSection.css";

const BestSellingSection: FC = () => {
  // Carousel state
  const [index, setIndex] = useState<number>(0);

  // Detect if the viewport is mobile
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1024);

  const total: number = ProductData.length;
  const visibleCards: number = isMobile ? total : 4; // Show all on mobile

  const navigate = useNavigate();
  const { renderStars } = useRenderStars();

  // Animate product cards when entering viewport
  useIntersectionAnimation(".product-card");

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      setIndex(0); // Reset index when resizing
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigate carousel forward (desktop only)
  const next = () => {
    if (isMobile) return;
    setIndex((prev) =>
      prev + visibleCards >= total ? 0 : prev + visibleCards
    );
  };

  // Navigate carousel backward (desktop only)
  const prev = () => {
    if (isMobile) return;
    setIndex((prev) =>
      prev - visibleCards < 0 ? total - visibleCards : prev - visibleCards
    );
  };

  // Get products currently visible in the carousel
  const getVisibleData = (): Product[] => {
    if (isMobile) return ProductData;
    if (index + visibleCards > total) {
      // Wrap around at the end
      return [
        ...ProductData.slice(index),
        ...ProductData.slice(0, visibleCards - (total - index)),
      ];
    }
    return ProductData.slice(index, index + visibleCards);
  };

  // Navigate to product details page
  const goToProductPage = (item: Product) => {
    navigate(`/product/${item.id}`, { state: item });
  };

  return (
    <div className="best-selling-bg">
      <section className="best-selling-section">
        {/* Top section */}
        <div className="best-selling-top">
          <h1 className="best-selling-title">Best Selling Items</h1>
          <p className="best-selling-paragraph">
            Inspect background group content align export move. Background
            prototype arrange team inspect clip.
          </p>
        </div>

        {/* Carousel */}
        <div className="carousel-wrapper">
          {/* Left arrow */}
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
            {getVisibleData().map((item) => (
              <div key={item.id} className="product-card animate-entry">
                <div
                  className="product-image"
                  style={{ cursor: "pointer" }}
                  onClick={() => goToProductPage(item)}
                >
                  <img src={item.image} alt={item.title} />
                </div>

                <h3
                  className="product-title"
                  style={{ cursor: "pointer" }}
                  onClick={() => goToProductPage(item)}
                >
                  {item.title}
                </h3>

                <div className="product-stars">{renderStars(item.star)}</div>
                <p className="product-price">${item.price.toFixed(2)} USD</p>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          {!isMobile && (
            <button className="carousel-button right" onClick={next}>
              <IoChevronForward />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default BestSellingSection;

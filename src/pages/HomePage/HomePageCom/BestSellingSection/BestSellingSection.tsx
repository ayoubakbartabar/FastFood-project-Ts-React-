// BestSellingSection.tsx
import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../../store/cartStore";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import { useProductData } from "../../../../core/hooks/useProductData/useProductData";
import "./BestSellingSection.css";

const BestSellingSection: FC = () => {
  const { products, loading, error } = useProductData(); 
  const [index, setIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1024);

  const navigate = useNavigate();
  const { renderStars } = useRenderStars();

  useIntersectionAnimation(".product-card");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      setIndex(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total: number = products.length;
  const visibleCards: number = isMobile ? total : 4;

  const next = () => {
    if (isMobile) return;
    setIndex((prev) =>
      prev + visibleCards >= total ? 0 : prev + visibleCards
    );
  };

  const prev = () => {
    if (isMobile) return;
    setIndex((prev) =>
      prev - visibleCards < 0 ? total - visibleCards : prev - visibleCards
    );
  };

  const getVisibleData = (): Product[] => {
    if (isMobile) return products;
    if (index + visibleCards > total) {
      return [
        ...products.slice(index),
        ...products.slice(0, visibleCards - (total - index)),
      ];
    }
    return products.slice(index, index + visibleCards);
  };

  const goToProductPage = (item: Product) => {
    navigate(`/product/${item.id}`, { state: item });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="best-selling-bg">
      <section className="best-selling-section">
        <div className="best-selling-top">
          <h1 className="best-selling-title">Best Selling Items</h1>
          <p className="best-selling-paragraph">
            Inspect background group content align export move. Background
            prototype arrange team inspect clip.
          </p>
        </div>

        <div className="carousel-wrapper">
          {!isMobile && (
            <button className="carousel-button left" onClick={prev}>
              <IoChevronBack />
            </button>
          )}

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
                  className="best-selling-product-title"
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

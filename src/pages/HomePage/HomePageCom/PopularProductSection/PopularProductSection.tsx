import React, { useRef, useState } from "react";
import "./PopularProductSection.css";
import ProductsData from "../../../../data/ProductsData";

import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation.ts";

function PopularProductSection() {
    
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { renderStars } = useRenderStars();

  return (
    <div className="popular-items-bg">
      <section
        className={`popular-items-section ${
          isVisible ? "animate-popular" : ""
        }`}
        ref={sectionRef}
      >
        <div className="popular-items-top">
          <h1 className="popular-items-title">Our Popular Items</h1>
          <p className="popular-items-paragraph">
            Inspect background group content align export move. Background
            prototype arrange team inspect clip. Vector comment link frame link
            group.
          </p>
        </div>

        {/* Grid container for popular item cards */}
        <div className="popular-items-grid">
          {ProductsData.map((item) => (
            <div key={item.id} className="popular-item-card">
              <img
                src={item.image}
                alt={item.title}
                className="popular-item-image"
              />
              <h3 className="popular-item-title">{item.title}</h3>
              <div className="popular-item-stars">{renderStars(item.star)}</div>
              <p className="popular-item-price">${item.price.toFixed(2)} USD</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PopularProductSection;

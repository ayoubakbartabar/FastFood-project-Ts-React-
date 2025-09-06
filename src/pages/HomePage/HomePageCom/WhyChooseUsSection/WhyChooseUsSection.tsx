// WhyChooseUsSection.tsx
import React from "react";
import "./WhyChooseUsSection.css";
import WhyChooseUsData from "../../../../data/WhyChooseUsData";
import type { WhyChooseUsItem } from "../../../../data/WhyChooseUsData";

import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

export default function WhyChooseUsSection() {
  // Animate boxes when they enter viewport
  useIntersectionAnimation(".why-choose-us-box");

  return (
    <div className="why-choose-us-bg">
      <section className="why-choose-us-section">
        <div className="why-choose-us-top">
          <h1 className="why-choose-us-title">Why Choose Fastfood TNC?</h1>
          <p className="why-choose-us-paragraph">
            Unmatched Flavors, Quality, and Community Connection.
          </p>
        </div>

        <div className="why-choose-us-grid">
          {WhyChooseUsData.map((item: WhyChooseUsItem) => (
            <div key={item.id} className="why-choose-us-box">
              <img
                className="why-choose-us-image"
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <h3 className="why-choose-us-box-title">{item.title}</h3>
              <p className="why-choose-us-box-paragraph">{item.paragraph}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

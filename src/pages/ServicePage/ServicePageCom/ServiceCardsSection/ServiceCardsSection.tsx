import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

import ServiceData from "../../../../data/ServiceData";
import type { ServiceItem } from "../../../../data/ServiceData";

import "./ServiceCardsSection.css";

import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";

const ServiceCardsSection: React.FC = (): React.JSX.Element => {
  // Trigger intersection animation for card appearance
  useIntersectionAnimation(".service-card");

  // Custom hook to handle dynamic navigation
  const { navigateTo } = useDynamicNavigate();

  return (
    <div className="service-bg">
      <section className="service-section">
        <div className="service-grid">
          {ServiceData.map((item: ServiceItem) => (
            <div key={item.id} className="service-card">
              {/* Service icon/image */}
              <div className="service-icon">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>

              {/* Service title */}
              <h3 className="service-title">{item.title}</h3>

              {/* Service short description */}
              <p className="service-paragraph">{item.paragraph}</p>

              {/* Navigate to detailed service page */}
              <button
                className="service-button"
                onClick={() => navigateTo(`/service/${item.id}`)}
              >
                View Details <FaLongArrowAltRight />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServiceCardsSection;

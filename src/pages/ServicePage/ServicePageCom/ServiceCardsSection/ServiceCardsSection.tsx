import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

import ServiceData from "../../../../data/ServiceData";
import type { ServiceItem } from "../../../../data/ServiceData";

import "./ServiceCardsSection.css";

import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";

const ServiceCardsSection: React.FC = (): React.JSX.Element => {
  
  useIntersectionAnimation(".service-card");
  const { navigateTo } = useDynamicNavigate();

  return (
    <div className="service-bg">
      <section className="service-section">
        <div className="service-grid">
          {ServiceData.map((item: ServiceItem) => (
            <div key={item.id} className="service-card">
              <div className="service-icon">
                <img src={item.image} alt={item.title} />
              </div>
              <h3 className="service-title">{item.title}</h3>
              <p className="service-paragraph">{item.paragraph}</p>
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

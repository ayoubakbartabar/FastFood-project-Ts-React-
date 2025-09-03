import React, { useRef } from "react";
import "./SocialSection.css";

import { FaInstagram } from "react-icons/fa";
import SocialData from "../../../data/SocialData";
import type { SocialDataProps } from "../../../data/SocialData";
import useIntersectionAnimation from "../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

const SocialSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Add "show" class to section when it enters viewport
  useIntersectionAnimation(".social-section");

  return (
    <div className="social-bg">
      <section ref={sectionRef} className="social-section">
        {SocialData.map(({ id, image, alt }: SocialDataProps, index) => (
          <figure
            key={id}
            className="social-image"
           
          >
            <img src={image} alt={alt} loading="lazy" />
          </figure>
        ))}

        <a
          href="#"
          className="social-icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </section>
    </div>
  );
};

export default SocialSection;

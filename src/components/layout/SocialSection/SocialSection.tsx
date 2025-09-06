import React, { useRef } from "react";
import "./SocialSection.css";

import { FaInstagram } from "react-icons/fa";
import SocialData from "../../../data/SocialData";
import type { SocialDataProps } from "../../../data/SocialData";
import useIntersectionAnimation from "../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

const SocialSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Trigger fade-in animation when section enters viewport
  useIntersectionAnimation(".social-section");

  return (
    <div className="social-bg">
      <section
        ref={sectionRef}
        className="social-section"
        aria-label="Social media"
      >
        {/* Render social images */}
        {SocialData.map(({ id, image, alt }: SocialDataProps) => (
          <figure key={id} className="social-image">
            <img src={image} alt={alt} loading="lazy" />
          </figure>
        ))}

        {/* Instagram link */}
        <a
          href="#"
          className="social-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Instagram"
        >
          <FaInstagram aria-hidden="true" />
        </a>
      </section>
    </div>
  );
};

export default SocialSection;

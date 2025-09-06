import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import OurChefData from "../../../../data/OurChefData";
import type { Chef } from "../../../../data/OurChefData";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

import "./OurChefSection.css";

// Type for slide direction
type SlideDirection = "left" | "right";

// Number of chef cards visible per page
const ITEMS_PER_PAGE = 3;

const OurChefSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [animationClass, setAnimationClass] = useState<string>("");

  const totalItems = OurChefData.length;
  const visibleChefs: Chef[] = OurChefData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Trigger intersection animation for cards and top section
  useIntersectionAnimation(".chef-card");
  useIntersectionAnimation(".our-chef-top");

  // Handle carousel slide
  const handleSlide = (direction: SlideDirection) => {
    // Add slide-out animation
    setAnimationClass(`slide-out-${direction}`);

    // Wait for slide-out animation to finish before updating items
    setTimeout(() => {
      let newIndex: number;
      if (direction === "left") {
        newIndex =
          startIndex - ITEMS_PER_PAGE < 0
            ? totalItems - ITEMS_PER_PAGE
            : startIndex - ITEMS_PER_PAGE;
      } else {
        newIndex =
          startIndex + ITEMS_PER_PAGE >= totalItems
            ? 0
            : startIndex + ITEMS_PER_PAGE;
      }

      setStartIndex(newIndex);
      // Add slide-in animation
      setAnimationClass(`slide-in-${direction}`);
    }, 300);

    // Remove animation class after animation completes
    setTimeout(() => setAnimationClass(""), 600);
  };

  return (
    <div className="our-chef-bg">
      <section className="our-chef-section">
        {/* Top section */}
        <div className="our-chef-top">
          <h1 className="our-chef-title">Our Expert Chef</h1>
          <p className="our-chef-paragraph">
            Invite edit component vertical rectangle component follower asset
            share. Main select community connection opacity share device.
          </p>
        </div>

        {/* Carousel */}
        <div className="carousel-container">
          {/* Left arrow */}
          <button
            className="arrow-btn left"
            onClick={() => handleSlide("left")}
            aria-label="Slide Left"
          >
            <IoIosArrowBack />
          </button>

          {/* Chef cards */}
          <div className={`chef-cards ${animationClass}`}>
            {visibleChefs.map((chef: Chef, index: number) => (
              <div
                key={chef.id}
                className="chef-card scroll-fade"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="chef-image-container">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="chef-image"
                  />
                </div>
                <div className="chef-info">
                  <h3>{chef.name}</h3>
                  <p>{chef.role}</p>
                  {/* Social media icons */}
                  <div className="social-icons">
                    <FaFacebookF className="facebook" />
                    <FaInstagram className="instagram" />
                    <FaPinterestP className="pinterest" />
                    <FaTwitter className="twitter" />
                    <FaYoutube className="youtube" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            className="arrow-btn right"
            onClick={() => handleSlide("right")}
            aria-label="Slide Right"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </section>
    </div>
  );
};

export default OurChefSection;

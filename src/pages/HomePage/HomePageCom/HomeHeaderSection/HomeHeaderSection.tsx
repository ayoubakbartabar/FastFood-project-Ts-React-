import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import "./HomeHeaderSection.css";

// Import slides data and type
import HomeHeaderSectionData from "../../../../data/HomeHeaderSectionData";
import type { Slide } from "../../../../data/HomeHeaderSectionData";

// Shared "Order Now" button component
import OrderNowBtn from "../../../../components/layout/OrderNowBtn/OrderNowBtn";

// Social media icons
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const HomeHeaderSection: React.FC = () => {
  // State to track currently active slide
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /**
   * Handle pagination button click
   * Prevents selecting the same slide again
   */
  const handleSelectItem = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setCurrentIndex(newIndex);
  };

  // Destructure current slide data
  const { header, title, description, image }: Slide =
    HomeHeaderSectionData[currentIndex];

  // Animation variants for text content (fade in + slide)
  const fadeSlideVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" } },
  };

  return (
    <div className="home-header-bg">
      <div className="home-header-container">
        <section className="home-header-section">
          <div className="home-header-section-box">
            {/* Left side: slide text content */}
            <div className="header-left-side">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={fadeSlideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="header-left-content-wrapper"
                >
                  {/* Slide header */}
                  <h3 className="header-left-sub-title">{header}</h3>

                  {/* Slide main title */}
                  <h1 className="header-left-title">{title}</h1>

                  {/* Slide description */}
                  <p className="header-left-paragraph">{description}</p>

                  {/* Call-to-action button */}
                  <OrderNowBtn />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right side: slide image + pagination */}
            <div className="header-right-wrapper">
              {/* Pagination buttons */}
              <div className="header-pagination-buttons">
                {HomeHeaderSectionData.map((_, index) => (
                  <button
                    key={index}
                    className={`header-pagination-btn ${
                      currentIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleSelectItem(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slide image */}
              <div className="header-img-wrapper">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={image}
                    alt={`Slide ${currentIndex + 1} image`}
                    className="header-img"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: currentIndex === 0 ? -6 : 0, // Example of dynamic rotation for first slide
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Social media icons */}
        <div className="home-header-social-local">
          <a href="#" aria-label="Facebook" className="home-header-social-icon">
            <FaFacebookF />
          </a>
          <a
            href="#"
            aria-label="Pinterest"
            className="home-header-social-icon"
          >
            <FaPinterestP />
          </a>
          <a href="#" aria-label="Twitter" className="home-header-social-icon">
            <FaTwitter />
          </a>
          <a href="#" aria-label="YouTube" className="home-header-social-icon">
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeHeaderSection;

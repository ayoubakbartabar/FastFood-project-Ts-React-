import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import "./HomeHeaderSection.css";

import OrderNowBtn from "../../../../components/layout/OrderNowBtn/OrderNowBtn";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  useHomeHeaderData,
  Slide,
} from "../../../../core/hooks/useHomePaginationData/useHomePaginationData";

const HomeHeaderSection: React.FC = () => {
  
  const { data: slides, isLoading, isError } = useHomeHeaderData();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleSelectItem = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setCurrentIndex(newIndex);
  };

  if (isLoading) return <div>Loading slides...</div>;
  if (isError || !slides) return <div>Failed to load slides</div>;

  const { header, title, description, image }: Slide = slides[currentIndex];

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
                  <h3 className="header-left-sub-title">{header}</h3>
                  <h1 className="header-left-title">{title}</h1>
                  <p className="header-left-paragraph">{description}</p>
                  <OrderNowBtn />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="header-right-wrapper">
              <div className="header-pagination-buttons">
                {slides.map((_, index) => (
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
                      rotate: currentIndex === 0 ? -6 : 0,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

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

import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./TestimonialCarouselSection.css";

import TestimonialCarouselData from "../../../../data/TestimonialCarouselData";
import type { TestimonialItem } from "../../../../data/TestimonialCarouselData";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

import {
  getCardsPerView,
  buildVisible,
  goNextIndex,
  goPrevIndex,
  startAutoScroll,
  clearAutoScroll,
} from "../../../../core/utils/carouselUtils";

export default function TestimonialCarouselSection() {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [cardsPerView, setCardsPerView] = useState<number>(getCardsPerView());
  const [visible, setVisible] = useState<boolean>(false);

  const topRef = useRef<HTMLElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  const TOTAL = TestimonialCarouselData.length;

  /** Move carousel to next group of cards */
  const goNext = () =>
    setStartIndex((prev) => goNextIndex(prev, cardsPerView, TOTAL));

  /** Move carousel to previous group of cards */
  const goPrev = () =>
    setStartIndex((prev) => goPrevIndex(prev, cardsPerView, TOTAL));

  /** Update cardsPerView dynamically on window resize */
  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /** Auto-scroll carousel every 8 seconds */
  useEffect(() => {
    intervalRef.current = startAutoScroll(goNext, 8000);
    return () => clearAutoScroll(intervalRef.current);
  }, [cardsPerView]);

  /** Intersection animation when section enters viewport */
  useIntersectionAnimation(".testimonial-carousel-section");

  return (
    <div className="testimonial-carousel-bg">
      <section
        className={`testimonial-carousel-section ${
          visible ? "slide-up-fade-in" : ""
        }`}
        ref={topRef}
      >
        {/* Section Header */}
        <div className="testimonial-top">
          <h1 className="testimonial-title">Testimonials</h1>
          <p className="testimonial-paragraph">
            Elevating Your Dining Experience
          </p>
        </div>

        {/* Carousel */}
        <div className="testimonial-carousel-wrapper">
          {/* Previous Button */}
          <button
            className="carousel-btn prev"
            aria-label="Previous"
            onClick={goPrev}
          >
            <FaArrowRight />
          </button>

          {/* Cards Container */}
          <div
            className="testimonial-carousel"
            style={{ "--cards": cardsPerView } as React.CSSProperties}
          >
            {buildVisible(
              TestimonialCarouselData,
              startIndex,
              cardsPerView
            ).map((item: TestimonialItem) => (
              <div className="testimonial-box" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="testimonial-img"
                  loading="lazy"
                />
                <h3 className="testimonial-name">{item.name}</h3>
                <p className="testimonial-job">{item.job}</p>
                <p className="testimonial-text">{item.paragraph}</p>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            className="carousel-btn next"
            aria-label="Next"
            onClick={goNext}
          >
            <FaArrowLeft />
          </button>
        </div>
      </section>
    </div>
  );
}

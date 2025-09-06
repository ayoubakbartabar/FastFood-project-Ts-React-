import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "./SwiperSliderSection.css";

import SwiperSliderData from "../../../data/SwiperSliderData";
import type { SliderItem } from "../../../data/SwiperSliderData";

const SwiperSliderSection: React.FC = () => {
  return (
    <div className="swiper-container">
      {/* Desktop Swiper Section */}
      <section className="swiper-section desktop-swiper">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={5}
          slidesPerView={6}
          speed={2000}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          freeMode={false}
          breakpoints={{
            0: { slidesPerView: "auto" },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {SwiperSliderData.map((item: SliderItem) => (
            <SwiperSlide key={item.id}>
              <a
                href={item.href}
                className="fade-slide"
                aria-label={item.title}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <h4>{item.title}</h4>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Mobile Grid Section */}
      <section className="mobile-grid">
        <div className="grid-wrapper">
          {SwiperSliderData.map((item: SliderItem) => (
            <a
              href={item.href}
              className="fade-slide"
              key={item.id}
              aria-label={item.title}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <h4>{item.title}</h4>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SwiperSliderSection;

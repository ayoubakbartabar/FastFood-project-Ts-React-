import React, { useEffect } from "react";
import "./HomeBannerSection.css";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

export default function HomeBannerSection() {
  const banners = [
    {
      src: "/images/66226fc288dda9a8fa1a7f39_Quality food.png",
      alt: "High quality food banner",
    },
    {
      src: "/images/66226fc923b3c14c36a37f6b_30 min delivery Guaraantee.png",
      alt: "30-minute delivery guarantee banner",
    },
    {
      src: "/images/66226fc1870a95f9e2133e43_Free Delivery (1).png",
      alt: "Free delivery banner",
    },
  ];

  useIntersectionAnimation(".banner-image");

  return (
    <section className="home-banner-section">
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner.src}
          alt={banner.alt}
          className="banner-image"
          loading="lazy"
        />
      ))}
    </section>
  );
}

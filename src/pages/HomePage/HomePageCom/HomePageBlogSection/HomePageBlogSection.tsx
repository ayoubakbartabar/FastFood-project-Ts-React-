import React, { useRef } from "react";
import "./HomePageBlogSection.css";

import BlogData from "../../../../data/BlogData";
import type { BlogDataProps } from "../../../../data/BlogData";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

import { MdOutlineArrowRightAlt } from "react-icons/md";

const HomePageBlogSection: React.FC = () => {
  const topRef = useRef<HTMLElement | null>(null);

  // Animate section when it comes into view
  useIntersectionAnimation(".home-page-blog-section");

  return (
    <div className="home-page-blog-bg">
      <section className="home-page-blog-section" ref={topRef}>
        <div className="home-page-blog-top">
          <h1 className="home-page-blog-title">Fastfood TNC Blog</h1>
          <p className="home-page-blog-paragraph">
            Delve into Our Culinary Stories, Tips, and Behind-the-Scenes
            Delights.
          </p>
        </div>

        <div className="home-page-blog-grid">
          {BlogData.map((item: BlogDataProps) => {
            const firstParagraph = item.content.find(
              (c) => c.type === "paragraph"
            );
            return (
              <div className="blog-card" key={item.id}>
                <img src={item.image} alt={item.title} className="blog-image" />
                <div className="blog-content">
                  <span className="blog-category">{item.categories}</span>
                  <h3 className="blog-title">{item.title}</h3>
                  {firstParagraph && (
                    <p className="blog-paragraph">{firstParagraph.text}</p>
                  )}
                  <a href="/blogs" className="read-more">
                    Read more <MdOutlineArrowRightAlt className="arrow" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePageBlogSection;

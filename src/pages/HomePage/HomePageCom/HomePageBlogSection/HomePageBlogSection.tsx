import React, { useRef, useMemo } from "react";
import "./HomePageBlogSection.css";

import { MdOutlineArrowRightAlt } from "react-icons/md";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import type { BlogDataProps } from "../../../../types/models/BlogTypes";
import { useBlogData } from "../../../../core/hooks/useBlogData/useBlogData";

const HomePageBlogSection: React.FC = () => {
  const topRef = useRef<HTMLElement | null>(null);

  // Fetch blogs from hook
  const { blogs, loading } = useBlogData();

  // Add firstParagraph property to each blog for easy access
  const blogsWithFirstParagraph: (BlogDataProps & {
    firstParagraph?: string;
  })[] = useMemo(() => {
    if (!blogs) return [];
    return blogs.map((item) => ({
      ...item,
      firstParagraph: item.content.find((c) => c.type === "paragraph")?.text,
    }));
  }, [blogs]);

  // Intersection animation for the section
  useIntersectionAnimation(".home-page-blog-section");

  if (loading) return <p>Loading...</p>;

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
          {blogsWithFirstParagraph.map((item) => (
            <div className="blog-card" key={item.id}>
              <img src={item.image} alt={item.title} className="blog-image" />
              <div className="blog-content">
                <span className="blog-category">{item.categories}</span>
                <h3 className="blog-title">{item.title}</h3>
                {item.firstParagraph && (
                  <p className="blog-paragraph">{item.firstParagraph}</p>
                )}
                <a href="/blogs" className="read-more">
                  Read more <MdOutlineArrowRightAlt className="arrow" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePageBlogSection;

import React, { useRef } from "react";
import type { FC } from "react";

import "./BlogsContentSection.css";

// Blog data import
import BlogData from "../../../../data/BlogData";

// Icons
import { MdOutlineArrowRightAlt } from "react-icons/md";

// Custom hooks
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";

const BlogsContentSection: FC = () => {
  // Reference to the section for intersection animation
  const sectionRef = useRef<HTMLElement | null>(null);

  // Apply scroll/fade animation to all blog cards inside this section
  useIntersectionAnimation(".blog-content-card");

  // Custom navigation hook for dynamic routing
  const { navigateTo } = useDynamicNavigate();

  // Navigate to single blog page
  const handleReadMore = (post: typeof BlogData[number]) => {
    navigateTo(`/blog/${post.id}`, { post });
  };

  return (
    <section className="blog-content-section" ref={sectionRef}>
      <div className="blog-content-grid">
        {BlogData.map((post) => (
          <article className="blog-content-card" key={post.id}>
            {/* Blog featured image */}
            <img
              src={post.image}
              alt={post.title}
              className="blog-content-image"
            />

            {/* Blog content */}
            <div className="blog-content-content">
              <span className="blog-content-category">{post.categories}</span>
              <h3 className="blog-content-title">{post.title}</h3>

              {/* Read more button with icon */}
              <button
                className="read-more"
                onClick={() => handleReadMore(post)}
                aria-label={`Read more about ${post.title}`}
              >
                Read more <MdOutlineArrowRightAlt />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogsContentSection;

import React, { useRef } from "react";
import "./BlogsContentSection.css";

// Import your blog data (array of posts)
import BlogData from "../../../../data/BlogData";

// Icons
import { MdOutlineArrowRightAlt } from "react-icons/md";

// Custom hooks
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";

export default function BlogsContentSection() {
  // Create a reference to the section for animation
  const sectionRef = useRef<HTMLElement | null>(null);

  // Apply intersection animation to cards inside this section
  useIntersectionAnimation(".blog-content-card");

  // Custom navigation hook
  const { navigateTo } = useDynamicNavigate();

  const handleReadMore = (post: (typeof BlogData)[number]) => {
    navigateTo(`/blog/${post.id}`, { post });
  };

  return (
    <section className="blog-content-section" ref={sectionRef}>
      <div className="blog-content-grid">
        {BlogData.map((item) => (
          <div className="blog-content-card" key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              className="blog-content-image"
            />
            <div className="blog-content-content">
              <span className="blog-content-category">{item.categories}</span>
              <h3 className="blog-content-title">{item.title}</h3>
              <button
                className="read-more"
                onClick={() => handleReadMore(item)}
              >
                Read more <MdOutlineArrowRightAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

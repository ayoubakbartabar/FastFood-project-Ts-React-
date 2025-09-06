import React, { useRef, useMemo } from "react";
import type { FC } from "react";

import "./TagsSection.css";

// Custom hooks
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";

// Blog data
import BlogData from "../../../../data/BlogData";

const TagsSection: FC = () => {
  // Reference for aside section to trigger animations
  const sectionRef = useRef<HTMLElement | null>(null);

  // Trigger intersection animation for each tag button
  useIntersectionAnimation(".tag-item");

  // Custom navigation hook
  const { navigateTo } = useDynamicNavigate();

  // Extract unique tags from all blog posts
  const tags = useMemo(() => {
    const allTags = BlogData.flatMap((blog) => blog.tags);
    return Array.from(new Set(allTags)); // Remove duplicates
  }, []);

  // Navigate to selected tag page
  const handleTagsBlog = (tag: string) => {
    navigateTo(`/blog/tags/${tag}`, { tag });
  };

  return (
    <aside className="tags-aside" ref={sectionRef}>
      {/* Section Title */}
      <h3 className="tags-title">Tags</h3>

      {/* Tags Container */}
      <div className="tags-container">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagsBlog(tag)}
            className="tag-item"
            aria-label={`View posts tagged with ${tag}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default TagsSection;

import React, { useRef, useMemo } from "react";
import "./TagsSection.css";

import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";
import BlogData from "../../../../data/BlogData";

export default function TagsSection() {
  // Reference for the section (to trigger animations if needed)
  const sectionRef = useRef<HTMLElement | null>(null);

  // Initialize intersection animation on each tag button
  useIntersectionAnimation(".tag-item");

  // Custom navigate hook
  const { navigateTo } = useDynamicNavigate();

  // Extract unique tags from BlogData
  const tags = useMemo(() => {
    const allTags = BlogData.flatMap((blog) => blog.tags);
    return Array.from(new Set(allTags)); // remove duplicates
  }, []);

  const handleTagsBlog = (tag: string) => {
    navigateTo(`/blog/tags/${tag}`, { tag });
  };

  return (
    <aside className="tags-aside" ref={sectionRef}>
      <h3 className="tags-title">Tags</h3>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagsBlog(tag)}
            className="tag-item"
          >
            {tag}
          </button>
        ))}
      </div>
    </aside>
  );
}

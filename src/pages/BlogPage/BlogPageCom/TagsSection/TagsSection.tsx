import React, { useRef, useMemo } from "react";
import type { FC } from "react";

// Styles
import "./TagsSection.css";

// Custom hooks
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";
import { useBlogData } from "../../../../core/hooks/useBlogData/useBlogData";

// Types
import type { BlogDataProps } from "../../../../types/models/BlogTypes";

const TagsSection: FC = () => {
  // Ref for the aside container (used for animation)
  const sectionRef = useRef<HTMLElement | null>(null);

  // Apply reveal animation to each tag button
  useIntersectionAnimation(".tag-item");

  // Navigation hook for dynamic routing
  const { navigateTo } = useDynamicNavigate();

  // Fetch blogs from state or API
  const { blogs, loading } = useBlogData();

  // Extract unique tags using useMemo for performance optimization
  const tags: string[] = useMemo(() => {
    if (!blogs || !blogs.length) return [];
    // Flatten all blog tags and remove duplicates using Set
    return Array.from(
      new Set(blogs.flatMap((blog: BlogDataProps) => blog.tags))
    );
  }, [blogs]);

  // Navigate to tag-specific page with optional state
  const handleTagsBlog = (tag: string) => {
    navigateTo(`/blog/tags/${tag}`, { state: { tag } });
  };

  // Loading or fallback states
  if (loading) return <p>Loading tags...</p>;
  if (!tags.length) return <p>No tags available.</p>;

  return (
    <aside className="tags-aside" ref={sectionRef}>
      {/* Section Title */}
      <h3 className="tags-title">Tags</h3>

      {/* Tags container */}
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

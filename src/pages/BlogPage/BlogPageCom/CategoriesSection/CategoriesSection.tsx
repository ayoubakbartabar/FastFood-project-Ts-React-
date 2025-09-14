import React, { useRef, useMemo } from "react";
import type { FC } from "react";

// Icons
import { FiChevronRight } from "react-icons/fi";

// Styles
import "./CategoriesSection.css";

// Custom hooks
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";
import { useBlogData } from "../../../../core/hooks/useBlogData/useBlogData";

// Types
import type { BlogDataProps } from "../../../../types/models/BlogTypes";

const CategoriesSection: FC = () => {
  // Reference for the aside section (used for IntersectionObserver animation)
  const sectionRef = useRef<HTMLElement | null>(null);

  // Trigger scroll/fade animation for each category item
  useIntersectionAnimation(".category-item");

  // Custom navigation hook for dynamic routing
  const { navigateTo } = useDynamicNavigate();

  // Fetch all blogs
  const { blogs, loading } = useBlogData();

  // Extract unique categories for sidebar using useMemo (performance optimization)
  const categories: string[] = useMemo(() => {
    if (!blogs || !blogs.length) return [];
    // Use Set to filter unique categories
    return Array.from(
      new Set(blogs.map((blog: BlogDataProps) => blog.categories))
    );
  }, [blogs]);

  // Navigate to selected category page with optional state
  const handleCategoriesBlog = (category: string) => {
    navigateTo(`/blog/category/${category}`, { state: { category } });
  };

  // Loading & fallback states
  if (loading) return <p>Loading categories...</p>;
  if (!categories.length) return <p>No categories found.</p>;

  return (
    <aside className="categories-aside" ref={sectionRef}>
      {/* Section Title */}
      <h3 className="categories-title">Categories</h3>
      <div className="categories-underline"></div>

      {/* Categories List */}
      <ul className="categories-list">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleCategoriesBlog(category)}
            className="category-item"
          >
            {/* Chevron Icon */}
            <FiChevronRight className="category-icon" />
            {/* Category Name */}
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoriesSection;

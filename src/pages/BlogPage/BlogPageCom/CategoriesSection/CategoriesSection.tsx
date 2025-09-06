import React, { useRef } from "react";
import type { FC } from "react";

import { FiChevronRight } from "react-icons/fi";
import "./CategoriesSection.css";

// Custom hooks
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";

// Blog data
import BlogData from "../../../../data/BlogData";

const CategoriesSection: FC = () => {
  // Reference for the aside section (used for animations)
  const sectionRef = useRef<HTMLElement | null>(null);

  // Trigger scroll/fade animation for each category item
  useIntersectionAnimation(".category-item");

  // Custom navigation hook for dynamic routing
  const { navigateTo } = useDynamicNavigate();

  // Extract unique categories from BlogData
  const categories: string[] = Array.from(
    new Set(BlogData.map((blog) => blog.categories))
  );

  // Navigate to selected category page
  const handleCategoriesBlog = (category: string) => {
    navigateTo(`/blog/category/${category}`, { category });
  };

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
            {/* Icon */}
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

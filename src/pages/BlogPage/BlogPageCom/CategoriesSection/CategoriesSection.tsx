import React, { useRef } from "react";
import type { FC } from "react";

import { FiChevronRight } from "react-icons/fi";
import "./CategoriesSection.css";

import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";
import BlogData from "../../../../data/BlogData";

const CategoriesSection: FC = () => {
  // Reference for the section (to trigger animations if needed)
  const sectionRef = useRef<HTMLElement | null>(null);

  // Initialize intersection animation on each category item
  useIntersectionAnimation(".category-item");

  // Custom navigate hook
  const { navigateTo } = useDynamicNavigate();

  // Extract unique categories from BlogData
  const categories: string[] = Array.from(
    new Set(BlogData.map((blog) => blog.categories))
  );

  // Handle category click -> navigate to category page
  const handleCategoriesBlog = (category: string) => {
    navigateTo(`/blog/category/${category}`, { category });
  };

  return (
    <aside className="categories-aside" ref={sectionRef}>
      <h3 className="categories-title">Categories</h3>
      <div className="categories-underline"></div>
      <ul className="categories-list">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleCategoriesBlog(category)}
            className="category-item"
          >
            <FiChevronRight className="category-icon" />
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoriesSection;

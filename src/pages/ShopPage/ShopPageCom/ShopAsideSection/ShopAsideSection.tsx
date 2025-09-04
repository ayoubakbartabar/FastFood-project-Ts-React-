import React, { useRef } from "react";
import "./ShopAsideSection.css";
import ProductsData from "../../../../data/ProductsData";
import type { Product } from "../../../../core/context/CartContext/CartContext.type";
import { FaSearch } from "react-icons/fa";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

// Props type for ShopAsideSection
interface ShopAsideSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ShopAsideSection: React.FC<ShopAsideSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
}) => {
  const asideRef = useRef<HTMLElement | null>(null);

  // Use custom hook for fade-in animation
  useIntersectionAnimation(".shop-aside");

  // Extract unique categories from products
  const categories: string[] = [
    "all",
    ...Array.from(
      new Set(
        ProductsData.map((item: Product) => item.category.trim().toLowerCase())
      )
    ),
  ];

  return (
    <aside ref={asideRef} className="shop-aside show">
      {/* Search box for filtering products */}
      <div className="shop-search-box">
        <input
          type="text"
          placeholder="Search products..."
          className="shop-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="shop-search-btn">
          <FaSearch />
        </button>
      </div>

      {/* Categories list */}
      <div className="shop-aside-container">
        <div className="shop-categories-box">
          <h3 className="shop-categories-title">Categories</h3>
          <ul className="shop-categories-list">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`shop-category-item ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ShopAsideSection;

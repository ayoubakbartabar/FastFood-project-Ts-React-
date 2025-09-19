import React, { useRef, useMemo } from "react";
import "./ShopAsideSection.css";
import type { Product } from "../../../../store/cartStore";
import { FaSearch } from "react-icons/fa";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import { useProductData } from "../../../../core/hooks/useProductData/useProductData"

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
  const { products, loading, error } = useProductData(); 

  useIntersectionAnimation(".shop-aside");

  const categories = useMemo(() => {
    if (!products) return ["all"];
    const uniqueCategories = Array.from(
      new Set(
        products.map((item: Product) => item.category.trim().toLowerCase())
      )
    );
    return ["all", ...uniqueCategories];
  }, [products]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error}</p>;

  return (
    <aside ref={asideRef} className="shop-aside show">
      <div className="shop-search-box">
        <input
          type="text"
          placeholder="Search products..."
          className="shop-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="shop-search-btn" aria-label="Search">
          <FaSearch />
        </button>
      </div>

      <div className="shop-aside-container">
        <div className="shop-categories-box">
          <h3 className="shop-categories-title">Categories</h3>
          <ul className="shop-categories-list">
            {categories.map((category) => (
              <li
                key={category}
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

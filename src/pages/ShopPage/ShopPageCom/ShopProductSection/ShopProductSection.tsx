import React, { useRef, useMemo } from "react";
import "./ShopProductSection.css";

import type { Product } from "../../../../store/cartStore";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";
import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";
import { useProductData } from "../../../../core/hooks/useProductData/useProductData";

interface ShopProductSectionProps {
  selectedCategory: string;
  searchTerm: string;
}

const ShopProductSection: React.FC<ShopProductSectionProps> = ({
  selectedCategory,
  searchTerm,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { navigateTo } = useDynamicNavigate();
  const { renderStars } = useRenderStars();


  const { products, loading, error } = useProductData();

  // Memoize filtered products to optimize re-renders
  const filteredProducts: Product[] = useMemo(
    () =>
      products.filter(
        (product) =>
          product.image &&
          product.title &&
          (selectedCategory === "all" ||
            product.category.trim().toLowerCase() === selectedCategory) &&
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, selectedCategory, searchTerm]
  );

  // Apply fade-in animation for product cards when they enter viewport
  useIntersectionAnimation(".shop-product-card");

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section ref={sectionRef} className="shop-product-section">
      <div className="shop-product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="shop-product-card">
            {/* Product image clickable to navigate to product details */}
            <div
              className="shop-product-image clickable"
              onClick={() => navigateTo(`/product/${product.id}`, product)}
            >
              <img src={product.image} alt={product.title} />
            </div>

            {/* Product title clickable to navigate to product details */}
            <h3
              className="shop-product-name clickable"
              onClick={() => navigateTo(`/product/${product.id}`, product)}
            >
              {product.title}
            </h3>

            {/* Product rating stars */}
            <div className="shop-product-stars">
              {renderStars(product.star)}
            </div>

            {/* Product price */}
            <div className="shop-product-price">
              ${product.price.toFixed(2)} USD
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopProductSection;

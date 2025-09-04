import React, { useRef } from "react";
import "./ShopProductSection.css";
import ProductsData from "../../../../data/ProductsData";
import type { Product } from "../../../../core/context/CartContext/CartContext.type";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";
import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";

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

  // Filter products based on category AND search term
  const filteredProducts: Product[] = ProductsData.filter(
    (product) =>
      product.image &&
      product.title &&
      (selectedCategory === "all" ||
        product.category.trim().toLowerCase() === selectedCategory) &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useIntersectionAnimation(".shop-product-card");

  return (
    <section ref={sectionRef} className="shop-product-section">
      <div className="shop-product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="shop-product-card">
            <div
              className="shop-product-image"
              onClick={() => navigateTo(`/product/${product.id}`, product)}
              style={{ cursor: "pointer" }}
            >
              <img src={product.image} alt={product.title} />
            </div>
            <h3
              className="shop-product-name"
              onClick={() => navigateTo(`/product/${product.id}`, product)}
              style={{ cursor: "pointer" }}
            >
              {product.title}
            </h3>
            <div className="shop-product-stars">
              {renderStars(product.star)}
            </div>
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

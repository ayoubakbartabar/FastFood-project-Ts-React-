import React, { useState } from "react";
import type { FC } from "react";

import { useCartStore } from "../../../../store/cartStore";
import type { Product } from "../../../../store/cartStore";

// Product images
import ProductListImg1 from "/images/661cbeea84a87bb38b64302e_image 2.png";
import ProductListImg2 from "/images/661cbeeaefc1a1ed7fef7c08_default image-p-800.png";
import ProductListImg3 from "/images/661cbee88858c3a3e86734a1_image 1.png";
import ProductListImg4 from "/images/661cbefcf5f19d80c4e02f48_image 3.png";

// Icons
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

// Custom hook to render stars
import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";

import "./ProductListSection.css";

interface ProductListSectionProps {
  product: Product | null;
}

const ProductListSection: FC<ProductListSectionProps> = ({ product }) => {
  // Zustand store function
  const addToCart = useCartStore((state) => state.addToCart);

  // Local state for quantity
  const [quantity, setQuantity] = useState<number>(1);

  // Additional thumbnails
  const imagesArr = [
    ProductListImg1,
    ProductListImg2,
    ProductListImg3,
    ProductListImg4,
  ];

  const { renderStars } = useRenderStars();

  if (!product) return <p>No product data available.</p>;

  return (
    <div className="product-list-bg">
      <section className="product-list-section">
        <div className="product-detail-container">
          {/* Left Column: Main Image + Thumbnails */}
          <div className="left-column">
            <div className="product-main-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="another-product-images-container">
              {imagesArr.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`thumb-${index + 1}`}
                  className="another-product-image"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="product-info">
            <h2 className="price">${product.price.toFixed(2)} USD</h2>

            {/* Rating */}
            <div className="rating">
              {renderStars(product.star)}
              <span className="review-count">({product.count})</span>
            </div>

            {/* Title & Description */}
            <h3 className="product-title">{product.title}</h3>
            <p className="product-paragraph">{product.paragraph}</p>

            {/* Quantity Input & Add to Cart */}
            <div className="cart-actions">
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
              />
              <button
                className="add-to-cart"
                onClick={() => {
                  addToCart(product, quantity);
                  setQuantity(1); // reset input to 1 after adding
                }}
              >
                Add to Cart
              </button>
            </div>

            {/* Product Meta Info */}
            <div className="product-meta">
              <p>
                <strong>Categories:</strong> {product.category}
              </p>
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
              <p className="share-icons">
                <strong>Share:</strong>{" "}
                <a href="#" aria-label="Share on Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" aria-label="Share on Twitter">
                  <FaTwitter />
                </a>
                <a href="#" aria-label="Share on Pinterest">
                  <FaPinterestP />
                </a>
                <a href="#" aria-label="Share on YouTube">
                  <FaYoutube />
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListSection;

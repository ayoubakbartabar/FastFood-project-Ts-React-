import React, { useContext, useState } from "react";
import { CartContext } from "../../../../core/context/CartContext/CartContext";
import type {
  CartContextType,
  Product,
} from "../../../../core/context/CartContext/CartContext.type";

import ProductListImg1 from "../../../../assets/images/661cbeea84a87bb38b64302e_image 2.png";
import ProductListImg2 from "../../../../assets/images/661cbeeaefc1a1ed7fef7c08_default image-p-800.png";
import ProductListImg3 from "../../../../assets/images/661cbee88858c3a3e86734a1_image 1.png";
import ProductListImg4 from "../../../../assets/images/661cbefcf5f19d80c4e02f48_image 3.png";

import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { useRenderStars } from "../../../../core/hooks/useRenderStars/useRenderStars";

import "./ProductListSection.css";

interface ProductListSectionProps {
  product: Product | null;
}

const ProductListSection: React.FC<ProductListSectionProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext) as CartContextType;
  const [quantity, setQuantity] = useState<number>(1);

  const imagesArr = [
    { id: 1, src: ProductListImg1 },
    { id: 2, src: ProductListImg2 },
    { id: 3, src: ProductListImg3 },
    { id: 4, src: ProductListImg4 },
  ];

  const { renderStars } = useRenderStars();

  return (
    <div className="product-list-bg">
      <section className="product-list-section">
        {product ? (
          <div className="product-detail-container">
            {/* Left: Product Image & Thumbnails */}
            <div className="left-column">
              <div className="product-main-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="another-product-images-container">
                {imagesArr.map((item) => (
                  <img
                    key={item.id}
                    src={item.src}
                    alt={`thumb-${item.id}`}
                    className="another-product-image"
                  />
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="product-info">
              <h2 className="price">${product.price.toFixed(2)} USD</h2>
              <div className="rating">
                {renderStars(product.star)}
                <span className="review-count">({product.count})</span>
              </div>
              <h3 className="product-title">{product.title}</h3>
              <p className="product-paragraph">{product.paragraph}</p>

              {/* Quantity and Add to Cart */}
              <div className="cart-actions">
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </button>
              </div>

              <div className="product-meta">
                <p>
                  <strong>Categories:</strong> {product.category}
                </p>
                <p>
                  <strong>SKU:</strong> {product.sku}
                </p>
                <p className="share-icons">
                  <strong>Share:</strong>{" "}
                  <a href="#">
                    <FaFacebookF />
                  </a>
                  <a href="#">
                    <FaTwitter />
                  </a>
                  <a href="#">
                    <FaPinterestP />
                  </a>
                  <a href="#">
                    <FaYoutube />
                  </a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>No product data available.</p>
        )}
      </section>
    </div>
  );
};

export default ProductListSection;

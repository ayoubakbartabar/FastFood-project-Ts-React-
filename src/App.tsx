import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ServicesPage from "./pages/ServicePage/ServicePage";
import ServiceCardDetails from "./pages/ServicePage/ServicePageCom/ServiceCardDetails/ServiceCardDetails";
import BlogPage from "./pages/BlogPage/BlogPage";
import BlogDetailsSection from "./pages/BlogPage/BlogPageCom/BlogDetailsSection/BlogDetailsSection";
import BlogCategoryTagsSection from "./pages/BlogPage/BlogPageCom/BlogCategoryTagsSection/BlogCategoryTagsSection";

import { CartProvider } from "./core/context/CartContext/CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/service" element={<ServicesPage />} />
        <Route path="/service/:id" element={<ServiceCardDetails />} />

        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailsSection />} />
        <Route
          path="/blog/:type/:value"
          element={<BlogCategoryTagsSection />}
        />
      </Routes>
    </CartProvider>
  );
}

export default App;

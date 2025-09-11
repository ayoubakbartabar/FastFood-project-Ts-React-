import React from "react";
import { Routes, Route } from "react-router-dom";

// Import all pages
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ServicesPage from "./pages/ServicePage/ServicePage";
import ServiceCardDetails from "./pages/ServicePage/ServicePageCom/ServiceCardDetails/ServiceCardDetails";
import BlogPage from "./pages/BlogPage/BlogPage";
import BlogDetailsSection from "./pages/BlogPage/BlogPageCom/BlogDetailsSection/BlogDetailsSection";
import BlogCategoryTagsSection from "./pages/BlogPage/BlogPageCom/BlogCategoryTagsSection/BlogCategoryTagsSection";
import MenuPage from "./pages/MenuPage/MenuPage";
import CheckOutPage from "./pages/CheckOutPage/CheckOutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignInPage from "./pages/SingInPage/SignInPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";



const App: React.FC = () => {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/service" element={<ServicesPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignInPage />} />
      <Route path="/userprofile" element={<UserProfilePage />} />

      {/* Dynamic / details pages */}
      <Route path="/service/:id" element={<ServiceCardDetails />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetailsSection />} />
      <Route path="/blog/:type/:value" element={<BlogCategoryTagsSection />} />
      <Route path="/product/:id" element={<CheckOutPage />} />
    </Routes>
  );
};

export default App;

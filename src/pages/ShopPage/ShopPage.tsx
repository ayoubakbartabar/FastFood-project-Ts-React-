import React, { useState } from "react";
import "./ShopPage.css";

// Shared layout components
import Navbar from "../../components/layout/NavBar/NavBar";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import SocialSection from "../../components/layout/SocialSection/SocialSection";
import Footer from "../../components/layout/Footer/Footer";

// Shop page specific components
import ShopAsideSection from "./ShopPageCom/ShopAsideSection/ShopAsideSection";
import ShopProductSection from "./ShopPageCom/ShopProductSection/ShopProductSection";

// Type alias for selected category state
type Category = string;

const ShopPage: React.FC = (): React.JSX.Element => {
  // State to track currently selected product category
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  // State to track current search input for filtering products
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <>
      {/* Main navigation bar */}
      <Navbar />

      {/* Page header with title */}
      <PageHeader title="Shop" />

      {/* Main shop content wrapper */}
      <div className="shop-main-wrapper">
        {/* Sidebar for category selection and search */}
        <ShopAsideSection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Product listing based on selected category and search term */}
        <ShopProductSection
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
        />
      </div>

      {/* Social media links section */}
      <SocialSection />

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default ShopPage;

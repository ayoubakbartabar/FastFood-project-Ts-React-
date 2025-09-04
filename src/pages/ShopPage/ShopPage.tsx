import React, { useState } from "react";
import "./ShopPage.css";

// Shared components
import Navbar from "../../components/layout/NavBar/NavBar";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import SocialSection from "../../components/layout/SocialSection/SocialSection";
import Footer from "../../components/layout/Footer/Footer";

// Shop page components
import ShopAsideSection from "./ShopPageCom/ShopAsideSection/ShopAsideSection";
import ShopProductSection from "./ShopPageCom/ShopProductSection/ShopProductSection";

// Type for category state
type Category = string;

const ShopPage: React.FC = (): React.JSX.Element => {
  // State to track selected category
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  // State to track search term for products
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <>
      <Navbar />
      <PageHeader title="Shop" />
      <div className="shop-main-wrapper">
        <ShopAsideSection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ShopProductSection
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
        />
      </div>
      <SocialSection />
      <Footer />
    </>
  );
};

export default ShopPage;

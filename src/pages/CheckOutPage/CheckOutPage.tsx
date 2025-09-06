import React from "react";
import type { FC } from "react";
import { useLocation } from "react-router-dom";
import "./CheckOutPage.css";

// Layout components
import NavBar from "../../components/layout/NavBar/NavBar";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import SocialSection from "../../components/layout/SocialSection/SocialSection";
import Footer from "../../components/layout/Footer/Footer";

// Checkout components
import ProductListSection from "./CheckOutPageCom/ProductListSection/ProductListSection";
import type { Product } from "../../store/cartStore";

const CheckOutPage: FC = () => {
  // Get product data passed via navigation state
  const location = useLocation();
  const productData = location.state as Product | null;

  return (
    <>
      <NavBar />
      <PageHeader title="Shop Details" />
      <ProductListSection product={productData} />
      <SocialSection />
      <Footer />
    </>
  );
};

export default CheckOutPage;

import React from "react";
import { useLocation } from "react-router-dom";
import "./CheckOutPage.css";
import NavBar from "../../components/layout/NavBar/NavBar";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import SocialSection from "../../components/layout/SocialSection/SocialSection";
import Footer from "../../components/layout/Footer/Footer";
import ProductListSection from "./CheckOutPageCom/ProductListSection";

export default function CheckOutPage() {
  const location = useLocation();
  const productData = location.state;

  return (
    <>
      <NavBar />
      <PageHeader title={"Shop Details"} />
      <ProductListSection product={productData} />
      <SocialSection />
      <Footer />
    </>
  );
}

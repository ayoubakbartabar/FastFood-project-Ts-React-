import React from "react";
import "./MenuPage.css";
import NavBar from "../../components/layout/NavBar/NavBar";
import Footer from "../../components/layout/Footer/Footer";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import SocialSection from "../../components/layout/SocialSection/SocialSection";
import SwiperSliderSection from "../../components/layout/SwiperSliderSection/SwiperSliderSection";

import MenuListSection from "./MenuPageCom/MenuListSection/MenuListSection";

export default function MenuPage() {
  return (
    <>
      <NavBar />
      <PageHeader title={"Menu"} />
      <SwiperSliderSection />
      <MenuListSection />
      <SocialSection />
      <Footer />
    </>
  );
}

import React from "react";
import "./HomePage.css";
import NavBar from "../../components/layout/NavBar/NavBar";
import HomeBannerSection from "./HomePageCom/HomeBannerSection/HomeBannerSection";
import HomeHeaderSection from "./HomePageCom/HomeHeaderSection/HomeHeaderSection";
import SwiperSliderSection from "../../components/layout/SwiperSliderSection/SwiperSliderSection";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <HomeHeaderSection />
      <SwiperSliderSection />
      <HomeBannerSection />
    </>
  );
}

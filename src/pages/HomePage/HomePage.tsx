import React from "react";
import "./HomePage.css";
import NavBar from "../../components/layout/NavBar/NavBar";
import HomeBannerSection from "./HomePageCom/HomeBannerSection/HomeBannerSection";
import HomeHeaderSection from "./HomePageCom/HomeHeaderSection/HomeHeaderSection";
import SwiperSliderSection from "../../components/layout/SwiperSliderSection/SwiperSliderSection";
import BestSellingSection from "./HomePageCom/BestSellingSection/BestSellingSection";
import PopularProductSection from "./HomePageCom/PopularProductSection/PopularProductSection";
import RequestReservationSection from "./HomePageCom/RequestReservationSection/RequestReservationSection";
import WhyChooseUsSection from "./HomePageCom/WhyChooseUsSection/WhyChooseUsSection";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <HomeHeaderSection />
      <SwiperSliderSection />
      <BestSellingSection />
      <HomeBannerSection />
      <PopularProductSection />
      <RequestReservationSection />
      <WhyChooseUsSection />
    </>
  );
}

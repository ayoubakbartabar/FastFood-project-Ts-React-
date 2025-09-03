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
import TestimonialCarouselSection from "./HomePageCom/TestimonialCarouselSection/TestimonialCarouselSection";
import HomePageBlogSection from "./HomePageCom/HomePageBlogSection/HomePageBlogSection";
import SocialSection from "../../components/layout/SocialSection/SocialSection";
import Footer from "../../components/layout/Footer/Footer";


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
      <TestimonialCarouselSection />
      <HomePageBlogSection />
      <SocialSection />
      <Footer />
    </>
  );
}

import React from "react";
import NavBar from "../../components/layout/NavBar/NavBar";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import BrandIntroSection from "./AboutPageCom/BrandIntroSection/BrandIntroSection";
import TestimonialCarouselSection from "../HomePage/HomePageCom/TestimonialCarouselSection/TestimonialCarouselSection";
import SocialSection from "../../components/layout/SocialSection/SocialSection";
import Footer from "../../components/layout/Footer/Footer";
import VideoSection from "./AboutPageCom/VideoSection/VideoSection";
import OurCommitmentsSection from "./AboutPageCom/OurCommitmentsSection/OurCommitmentsSection";
import QuickStatsSection from "./AboutPageCom/QuickStatsSection/QuickStatsSection";
import OurChefSection from "./AboutPageCom/OurChefSection/OurChefSection";
import FAQSection from "./AboutPageCom/FAQSection/FAQSection";

function AboutPage() {
  return (
    <>
      <NavBar />
      <PageHeader title="About" />
      <BrandIntroSection />
      <VideoSection />
      <OurCommitmentsSection />
      <QuickStatsSection />
      <OurChefSection />
      <FAQSection />
      <TestimonialCarouselSection />
      <SocialSection />
      <Footer />
    </>
  );
}

export default AboutPage;

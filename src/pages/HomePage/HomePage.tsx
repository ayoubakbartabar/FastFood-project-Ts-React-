import React from "react";
import "./HomePage.css";
import NavBar from "../../components/layout/NavBar/NavBar";
import HomeBannerSection from "./HomePageCom/HomeBannerSection/HomeBannerSection";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <HomeBannerSection />
    </>
  );
}

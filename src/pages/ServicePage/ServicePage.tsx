import React from "react";

// Shared components
import Navbar from "../../components/layout/NavBar/NavBar";
import SocialSection from "../../components/layout/SocialSection/SocialSection";
import Footer from "../../components/layout/Footer/Footer";
import PageHeader from "../../components/layout/PageHeader/PageHeader";

// Services page components
import ServiceCardsSection from "./ServicePageCom/ServiceCardsSection/ServiceCardsSection";
import FeedbackSupportSection from "./ServicePageCom/FeedbackSupportSection/FeedbackSupportSection";


const ServicesPage: React.FC = (): React.JSX.Element => {
  return (
    <>
      {/* Page header with title */}
      <PageHeader title="Service" />

      {/* Navigation bar */}
      <Navbar />

      {/* Services section */}
      <ServiceCardsSection />

      {/* Feedback & Support section */}
      <FeedbackSupportSection />

      {/* Social media links section */}
      <SocialSection />

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default ServicesPage;

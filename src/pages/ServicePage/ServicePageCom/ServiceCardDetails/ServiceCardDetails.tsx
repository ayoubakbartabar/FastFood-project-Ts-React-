import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Layout components
import NavBar from "../../../../components/layout/NavBar/NavBar";
import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import SocialSection from "../../../../components/layout/SocialSection/SocialSection";
import Footer from "../../../../components/layout/Footer/Footer";

// Section components
import FeedbackSupportSection from "../FeedbackSupportSection/FeedbackSupportSection";
import ServiceFormSection from "../ServiceFormSection/ServiceFormSection";

// Data and types
import ServiceData from "../../../../data/ServiceData";
import type { ServiceItem, ServiceContent } from "../../../../data/ServiceData";

import "./ServiceCardDetails.css";

/**
 * ServiceCardDetails Component
 * Displays detailed information for a single service, including:
 * - Service content (titles & paragraphs)
 * - Service booking form
 * - Feedback & social sections
 */
const ServiceCardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the service item based on the URL param
  const service: ServiceItem | undefined = ServiceData.find(
    (item) => String(item.id) === id
  );

  // Redirect to service list if service is not found
  if (!service) {
    navigate("/service");
    return null;
  }

  return (
    <>
      {/* Navigation bar */}
      <NavBar />

      {/* Page header with service title */}
      <PageHeader title={service.title} />

      {/* Main service content section */}
      <section className="service-card-section">
        <div className="service-card-content">
          {service.content.map((item: ServiceContent, index: number) => {
            switch (item.type) {
              case "title":
                return (
                  <h2 className="service-card-content-title" key={index}>
                    {item.value}
                  </h2>
                );
              case "paragraph":
                return (
                  <p className="service-card-content-paragraph" key={index}>
                    {item.value}
                  </p>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Service reservation/booking form */}
        <ServiceFormSection service={service} />
      </section>

      {/* Additional sections: feedback, social, footer */}
      <FeedbackSupportSection />
      <SocialSection />
      <Footer />
    </>
  );
};

export default ServiceCardDetails;

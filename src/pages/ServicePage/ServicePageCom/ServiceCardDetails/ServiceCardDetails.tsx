import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../../../../components/layout/NavBar/NavBar";
import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import FeedbackSupportSection from "../FeedbackSupportSection/FeedbackSupportSection";
import SocialSection from "../../../../components/layout/SocialSection/SocialSection";
import Footer from "../../../../components/layout/Footer/Footer";
import ServiceFormSection from "../ServiceFormSection/ServiceFormSection";

import ServiceData from "../../../../data/ServiceData";
import type { ServiceItem, ServiceContent } from "../../../../data/ServiceData";

import "./ServiceCardDetails.css";

const ServiceCardDetails: React.FC = (): React.JSX.Element | null => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const service: ServiceItem | undefined = ServiceData.find(
    (item) => String(item.id) === id
  );

  if (!service) {
    navigate("/service");
    return null;
  }

  return (
    <>
      <NavBar />
      <PageHeader title={service.title} />

      <section className="service-card-section">
        <div className="service-card-content">
          {service.content.map((item: ServiceContent, index: number) => {
            if (item.type === "title") {
              return (
                <h2 className="service-card-content-title" key={index}>
                  {item.value}
                </h2>
              );
            } else if (item.type === "paragraph") {
              return (
                <p className="service-card-content-paragraph" key={index}>
                  {item.value}
                </p>
              );
            }
            return null;
          })}
        </div>

        <ServiceFormSection service={service} />
      </section>

      <FeedbackSupportSection />
      <SocialSection />
      <Footer />
    </>
  );
};

export default ServiceCardDetails;

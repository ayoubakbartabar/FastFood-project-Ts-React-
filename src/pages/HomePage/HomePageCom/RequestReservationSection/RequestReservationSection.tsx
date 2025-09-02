import React from "react";
import RequestReservationForm from "./RequestReservationForm";
import "./RequestReservationSection.css";

import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

export default function RequestReservationSection() {
  // Trigger intersection animations for both elements
  useIntersectionAnimation(".reservation-form, .reservation-info");

  return (
    <div className="request-reservation-bg">
      <section className="request-reservation">
        <div className="reservation-container">
          {/* Left side: Reservation form */}
          <div className="reservation-form animate-slide-in-left">
            <RequestReservationForm />
          </div>

          {/* Right side: Reservation info */}
          <div className="reservation-info animate-slide-in-right">
            <span className="reservation-subtitle">Reserve your table</span>
            <h2 className="reservation-title">
              Elevate Your Dining <br />
              Experience with a Reserved <br />
              Table at FastFood TNC
            </h2>
            <p className="reservation-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <div className="reservation-image-wrapper">
              <img
                className="reservation-image"
                src="src/assets/images/661ccbf8ce5a04ced085a82f_image.png"
                alt="Restaurant table"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

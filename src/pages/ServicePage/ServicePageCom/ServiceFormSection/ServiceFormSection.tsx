import React, { FormEvent } from "react";
import type { ServiceItem } from "../../../../data/ServiceData";
import "./ServiceFormSection.css";

interface ServiceFormSectionProps {
  service: ServiceItem;
}


const ServiceFormSection: React.FC<ServiceFormSectionProps> = ({ service }) => {
  /**
   * Handle form submission
   * Currently logs form submission to console (replace with API call as needed)
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted for service:", service.title);
  };

  return (
    <div className="service-form-container">
      {/* Form Header */}
      <h2 className="service-form-title">Get in touch about {service.title}</h2>
      <p className="service-form-description">
        Auto content inspect stroke opacity draft stroke invite. Rectangle frame
        export background clip image figjam image.
      </p>

      {/* Contact Form */}
      <form className="service-form" onSubmit={handleSubmit}>
        {/* Row: Name & Email */}
        <div className="service-form-row">
          <div className="service-form-group">
            <label className="service-form-label" htmlFor="name">
              Name
            </label>
            <input
              className="service-form-input"
              type="text"
              id="name"
              placeholder="Your name"
              required
            />
          </div>
          <div className="service-form-group">
            <label className="service-form-label" htmlFor="email">
              Email Address
            </label>
            <input
              className="service-form-input"
              type="email"
              id="email"
              placeholder="Your email"
              required
            />
          </div>
        </div>

        {/* Row: Phone & Subject */}
        <div className="service-form-row">
          <div className="service-form-group">
            <label className="service-form-label" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="service-form-input"
              type="text"
              id="phone"
              placeholder="Your phone number"
            />
          </div>
          <div className="service-form-group">
            <label className="service-form-label" htmlFor="subject">
              Subject
            </label>
            <input
              className="service-form-input"
              type="text"
              id="subject"
              placeholder="Subject"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="service-form-group">
          <label className="service-form-label" htmlFor="notes">
            Notes*
          </label>
          <textarea
            className="service-form-textarea"
            id="notes"
            placeholder="Your message"
            required
          />
        </div>

        {/* Submit Button */}
        <button className="service-form-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ServiceFormSection;

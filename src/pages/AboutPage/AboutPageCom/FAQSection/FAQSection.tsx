import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdOutlineArrowRightAlt } from "react-icons/md";

import FAQData from "../../../../data/FAQData";
import type { FAQDataProps } from "../../../../data/FAQData";

import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

import "./FAQSection.css";

export default function FAQSection(): React.JSX.Element {
  // State to keep track of which FAQ item is currently open
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Toggle the open/close state of an FAQ item
  const toggleAccordion = (index: number): void => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Trigger intersection animations when FAQ header or items enter viewport
  useIntersectionAnimation(".faq-header");
  useIntersectionAnimation(".faq-item");

  return (
    <div className="faq-bg">
      {/* FAQ Header */}
      <div className="faq-header container">
        <h2 className="faq-header-title">Frequently Asked Questions</h2>
        <p className="faq-header-text">
          Dictumst vel enim massa neque lacus eu lorem suscipit. Habitant
          aliquet elit ultricies in facilisi.
        </p>
      </div>

      {/* FAQ Section */}
      <section className="faq-section container">
        {/* Left Column - Accordion */}
        <div className="faq-left">
          <div className="faq-items">
            {FAQData.map((item: FAQDataProps, index: number) => (
              <div key={item.id} className="faq-item">
                <button
                  className={`faq-question ${
                    activeIndex === index ? "faq-question-active" : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span className="faq-question-text">{item.title}</span>
                  <span className="faq-icon">
                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>

                {activeIndex === index && (
                  <div className="faq-answer">
                    <p className="faq-answer-text">{item.paragraph}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Contact Box */}
        <div
          className="faq-right"
          style={{
            backgroundImage:
              "url('src/assets/images/661e0da93587e5adbe8d8031_bg (1).png')",
          }}
        >
          <img
            src="src/assets/svg/661e0d75b08a6673bc59fb4a_messaging 1.svg"
            alt="Messaging Icon"
            className="faq-right-icon"
          />
          <h3 className="faq-right-title">You have different Questions?</h3>
          <p className="faq-right-text">
            Amet donec risus elementum sollicitudin. Odio dui cum arcu
            vestibulum nunc massa.
          </p>
          <button className="faq-contact-btn">
            Contact us <MdOutlineArrowRightAlt className="faq-contact-arrow" />
          </button>
        </div>
      </section>
    </div>
  );
}

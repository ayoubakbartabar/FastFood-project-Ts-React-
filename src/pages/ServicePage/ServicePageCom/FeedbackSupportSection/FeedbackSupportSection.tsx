import React, { useRef } from "react";
import "./FeedbackSupportSection.css";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

// Import images
import FeedbackImg1 from "../../../../assets/images/6620ae10f9fb43094b9427e9_image 1-p-500.png";
import FeedbackImg2 from "../../../../assets/images/6620ae1075f767e21dad441e_image 2-p-500.png";
import FeedbackImg3 from "../../../../assets/images/6620ae10531cab63f6d441d6_image 3-p-500.png";

const FeedbackSupportSection: React.FC = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLDivElement | null>(null); // Reference to the container

  // Apply intersection animation
  useIntersectionAnimation(".feedback-section-container");

  return (
    <div ref={sectionRef} className="feedback-section-container">
      {/* Images section */}
      <div className="feedback-images">
        <div className="top-images">
          <img
            src={FeedbackImg1}
            alt="Feedback image 1"
            className="image image-1"
          />
          <img
            src={FeedbackImg2}
            alt="Feedback image 2"
            className="image image-2"
          />
        </div>
        <img
          src={FeedbackImg3}
          alt="Feedback image 3"
          className="image image-3"
        />
      </div>

      {/* Text section */}
      <div className="feedback-text">
        <h2>Online Feedback and Support</h2>
        <p>
          Our satisfaction matters. Use our online platform to provide feedback,
          share your experiences, and seek support. We value your insights and
          are here to ensure your Fastfood TNC experience exceeds expectations.
          Explore our services and discover the convenience, quality, and
          community connection that make Fastfood TNC more than just a
          restaurant. Join us in celebrating food, flavors, and the joy of
          exceptional dining!
        </p>
      </div>
    </div>
  );
};

export default FeedbackSupportSection;

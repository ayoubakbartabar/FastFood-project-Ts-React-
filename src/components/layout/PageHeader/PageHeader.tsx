import React from "react";
import "./PageHeader.css"; // Component-specific styles
import { FaLongArrowAltRight } from "react-icons/fa";
import headerBg from "../../../assets/images/661caddb2719d5ff96cc1ab4_bg.png";

// Props for PageHeader component
interface PageHeaderProps {
  title: string; // Page title to display
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div
      className="page-header-bg"
      style={{ backgroundImage: `url(${headerBg})` }} // Inline background image
    >
      <section className="page-header-section">
        {/* Page Title */}
        <h1 className="page-header-title">{title}</h1>

        {/* Breadcrumb Navigation */}
        <nav className="page-header-menu" aria-label="breadcrumb">
          <a href="/" className="page-header-link">
            HOME
          </a>
          <FaLongArrowAltRight aria-hidden="true" />
          <span className="page-header-paragraph">{title}</span>
        </nav>
      </section>
    </div>
  );
};

export default PageHeader;

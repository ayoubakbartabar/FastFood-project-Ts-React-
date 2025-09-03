import React from "react";
import "./PageHeader.css";
import { FaLongArrowAltRight } from "react-icons/fa";

// Props type
interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="page-header-bg">
      <section className="page-header-section">
        <h1 className="page-header-title">{title}</h1>
        <span className="page-header-menu">
          <a href="/" className="page-header-link">
            HOME
          </a>
          <FaLongArrowAltRight />
          <p className="page-header-paragraph">{title}</p>
        </span>
      </section>
    </div>
  );
};

export default PageHeader;

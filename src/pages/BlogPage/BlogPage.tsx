import React from "react";
import "./BlogPage.css";
import NavBar from "../../components/layout/NavBar/NavBar";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import SocialSection from "../../components/layout/SocialSection/SocialSection";
import Footer from "../../components/layout/Footer/Footer";


import BlogAsideSection from "./BlogPageCom/BlogAsideSection/BlogAsideSection";
import BlogsContentSection from "./BlogPageCom/BlogsContentSection/BlogsContentSection";

export default function BlogPage() {
  return (
    <>
      <NavBar />
      <PageHeader title={"Blog"} />
      <div className="blog-main-wrapper">
        <div className="blog-aside-section">
          <BlogAsideSection />
        </div>

        <div className="blogs-content-section">
          <BlogsContentSection />
        </div>
      </div>

      <SocialSection />
      <Footer />
    </>
  );
}

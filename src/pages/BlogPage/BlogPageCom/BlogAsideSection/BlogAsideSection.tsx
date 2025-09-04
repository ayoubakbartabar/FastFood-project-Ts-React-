import React from "react";
import "./BlogAsideSection.css";
import PopularPostSection from "../PopularPostSection/PopularPostSection";
import CategoriesSection from "../CategoriesSection/CategoriesSection";
import TagsSection from "../TagsSection/TagsSection";

export default function BlogAsideSection() {
  return (
    <div className="blog-layout-container">
      <PopularPostSection />
      <CategoriesSection />
      <TagsSection />
    </div>
  );
}

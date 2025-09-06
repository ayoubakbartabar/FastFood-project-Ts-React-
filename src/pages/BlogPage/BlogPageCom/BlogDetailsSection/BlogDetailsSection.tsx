import React, { useRef } from "react";
import type { FC } from "react";
import { useLocation } from "react-router-dom";

import NavBar from "../../../../components/layout/NavBar/NavBar";
import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import SocialSection from "../../../../components/layout/SocialSection/SocialSection";
import Footer from "../../../../components/layout/Footer/Footer";
import BlogAsideSection from "../BlogAsideSection/BlogAsideSection";

import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";

import blogSectionImg from "../../../../assets/images/661cabff491ead7e40ea57ec_image.png";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import type { BlogDataProps } from "../../../../data/BlogData";

import "./BlogDetailsSection.css";

const BlogDetailsSection: FC = () => {
  // Access the post data passed via navigation state
  const location = useLocation();
  const post = location.state?.post as BlogDataProps | undefined;

  // Ref for main content to trigger scroll animations
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Initialize intersection animation for elements with class "reveal-item"
  useIntersectionAnimation(".reveal-item");

  // If post data is missing, show fallback
  if (!post) return <p>Post not found</p>;

  return (
    <section className="blog-section">
      {/* Navbar */}
      <NavBar />

      {/* Page Header */}
      <PageHeader title={post.title} />

      <div className="blog-main-wrapper">
        {/* Sidebar */}
        <aside className="blog-aside-section">
          <BlogAsideSection />
        </aside>

        {/* Blog Main Content */}
        <div className="blog-section-content" ref={contentRef}>
          {/* Main featured image */}
          <img
            src={post.image}
            alt={post.title}
            className="blog-main-image reveal-item"
          />

          {/* Blog Title */}
          <h2 className="blog-section-title reveal-item">{post.title}</h2>

          {/* Blog Content Blocks */}
          {post.content.map((block, index) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <p key={index} className="blog-paragraph reveal-item">
                    {block.text}
                  </p>
                );
              case "title":
                return (
                  <h2 key={index} className="blog-subtitle reveal-item">
                    {block.text}
                  </h2>
                );
              case "image":
                return (
                  <img
                    key={index}
                    src={blogSectionImg}
                    alt="blog related"
                    className="blog-image reveal-item"
                  />
                );
              default:
                return null;
            }
          })}

          {/* Footer: Tags & Social Links */}
          <div className="blog-section-content-footer reveal-item">
            {/* Tags */}
            <div className="blog-section-content-tags">
              <h3>Tags:</h3>
              <div className="blog-tags-wrapper">
                {post.tags.map((tag, i) => (
                  <span key={i} className="blog-tag-item">
                    {tag}
                    {i < post.tags.length - 1 && ","}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Share Buttons */}
            <div
              className="blog-section-content-social"
              aria-label="Social media links"
            >
              <h3>SHARE: </h3>
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Pinterest">
                <FaPinterestP />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Global Social Section & Footer */}
      <SocialSection />
      <Footer />
    </section>
  );
};

export default BlogDetailsSection;

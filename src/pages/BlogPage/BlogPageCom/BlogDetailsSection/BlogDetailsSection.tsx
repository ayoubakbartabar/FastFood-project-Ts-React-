import React, { useRef } from "react";
import type { FC } from "react";

import { useLocation } from "react-router-dom";

import NavBar from "../../../../components/layout/NavBar/NavBar";
import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import SocialSection from "../../../../components/layout/SocialSection/SocialSection";
import Footer from "../../../../components/layout/Footer/Footer";

import BlogAsideSection from "../BlogAsideSection/BlogAsideSection";
import blogSectionImg from "../../../../assets/images/661cabff491ead7e40ea57ec_image.png";

import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";

import "./BlogDetailsSection.css";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import type { BlogDataProps } from "../../../../data/BlogData";

const BlogDetailsSection: FC = () => {
  const location = useLocation();
  const post = location.state?.post as BlogDataProps | undefined;
  const contentRef = useRef<HTMLDivElement | null>(null); // Ref for main content animation

  useIntersectionAnimation(".reveal-item");

  if (!post) return <p>Post not found</p>;

  return (
    <section className="blog-section">
      <NavBar />
      <PageHeader title={post.title} />

      <div className="blog-main-wrapper">
        <div className="blog-aside-section">
          <BlogAsideSection />
        </div>

        {/* Blog Content with reveal animation */}
        <div className="blog-section-content" ref={contentRef}>
          <img
            src={post.image}
            alt={post.title}
            className="blog-main-image reveal-item"
          />
          <h2 className="blog-section-title reveal-item">{post.title}</h2>

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

          {/* Footer Content */}
          <div className="blog-section-content-footer reveal-item">
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

      <SocialSection />
      <Footer />
    </section>
  );
};

export default BlogDetailsSection;

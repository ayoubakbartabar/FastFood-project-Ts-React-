import React, { FC, useMemo, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";

// Components
import NavBar from "../../../../components/layout/NavBar/NavBar";
import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import BlogAsideSection from "../BlogAsideSection/BlogAsideSection";
import SocialSection from "../../../../components/layout/SocialSection/SocialSection";
import Footer from "../../../../components/layout/Footer/Footer";

// Icons
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";

// Images & hooks
import blogSectionImg from "/images/661cabff491ead7e40ea57ec_image.png";
import { useBlogData } from "../../../../core/hooks/useBlogData/useBlogData";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

// Types
import type {
  BlogContent,
  BlogDataProps,
} from "../../../../types/models/BlogTypes";

// Styles
import "./BlogDetailsSection.css";

const BlogDetailsSection: FC = () => {
  const { id } = useParams<{ id: string }>(); // Get post ID from route
  const { blogs, loading } = useBlogData(); // Fetch all blogs
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Access navigation state if coming from PopularPostSection
  const location = useLocation();
  const statePost = location.state?.post as BlogDataProps | undefined;

  // Determine which post to display
  const post: BlogDataProps | undefined = useMemo(() => {
    if (statePost) return statePost; // Use passed state if available
    return blogs.find((b) => b.id.toString() === id); // Fallback: find from blogs array
  }, [blogs, id, statePost]);

  // Initialize intersection animation for reveal elements
  useIntersectionAnimation(".reveal-item", { threshold: 0.2 });

  // Handle loading / not found states
  if (loading && !statePost) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <section className="blog-section">
      <NavBar />
      <PageHeader title={post.title} />

      <div className="blog-main-wrapper">
        {/* Sidebar */}
        <aside className="blog-aside-section">
          <BlogAsideSection />
        </aside>

        {/* Main content */}
        <div className="blog-section-content" ref={contentRef}>
          <img
            src={post.image}
            alt={post.title}
            className="blog-main-image reveal-item"
          />
          <h2 className="blog-section-title reveal-item">{post.title}</h2>

          {/* Render dynamic content */}
          {post.content.map((block: BlogContent, index: number) => {
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

          {/* Footer with tags and social links */}
          <div className="blog-section-content-footer reveal-item">
            <div className="blog-section-content-tags">
              <h3>Tags:</h3>
              <div className="blog-tags-wrapper">
                {post.tags.map((tag: string, i: number) => (
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

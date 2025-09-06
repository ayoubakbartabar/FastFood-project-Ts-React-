import React, { useRef, useMemo } from "react";
import "./BlogCategoryTagsSection.css";

import NavBar from "../../../../components/layout/NavBar/NavBar";
import PageHeader from "../../../../components/layout/PageHeader/PageHeader";
import SocialSection from "../../../../components/layout/SocialSection/SocialSection";
import Footer from "../../../../components/layout/Footer/Footer";

import { useLocation, useParams } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";

import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";

import BlogData from "../../../../data/BlogData";
import type { BlogDataProps } from "../../../../data/BlogData";

export default function BlogCategoryTagsSection(): React.JSX.Element {
  // Reference to section for intersection animation
  const sectionRef = useRef<HTMLElement | null>(null);

  // URL params and location state
  const location = useLocation();
  const { type, value } = useParams<{ type?: string; value?: string }>();
  const locationState = location.state as
    | { category?: string; tag?: string }
    | undefined;

  // Determine current category or tag
  const category =
    locationState?.category || (type === "category" ? value : undefined);
  const tag = locationState?.tag || (type === "tags" ? value : undefined);

  const pageType = category ? "category" : tag ? "tag" : null;

  // If neither category nor tag is provided, show fallback
  if (!pageType) return <p>No category or tag provided.</p>;

  // Memoized filtered posts to avoid recalculation on every render
  const filteredPosts = useMemo(() => {
    if (pageType === "category") {
      return BlogData.filter((post) => post.categories.trim() === category);
    } else {
      return BlogData.filter((post) =>
        post.tags.some((t) => t.trim() === tag)
      );
    }
  }, [category, tag, pageType]);

  // Initialize intersection animation for all blog cards
  useIntersectionAnimation(".blog-categories-card");

  // Custom navigation hook to navigate to single blog page
  const { navigateTo } = useDynamicNavigate();
  const handleReadMore = (post: BlogDataProps) => {
    navigateTo(`/blog/${post.id}`, { post });
  };

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Page Header */}
      <PageHeader
        title={
          pageType === "category" ? `Category: ${category}` : `Tag: ${tag}`
        }
      />

      {/* Blog Cards Section */}
      <div className="blog-categories-bg">
        <section className="blog-categories-section" ref={sectionRef}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const firstParagraph = post.content.find(
                (item) => item.type === "paragraph"
              )?.text;

              return (
                <div className="blog-categories-card" key={post.id}>
                  {/* Blog featured image */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-categories-image"
                  />

                  {/* Blog content */}
                  <div className="blog-categories-content">
                    <span className="blog-categories-category">
                      {post.categories}
                    </span>
                    <h3 className="blog-categories-title">{post.title}</h3>
                    {firstParagraph && (
                      <p className="blog-categories-paragraph">
                        {firstParagraph}
                      </p>
                    )}

                    {/* Read More Button */}
                    <button
                      className="blog-categories-read-more"
                      onClick={() => handleReadMore(post)}
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read more <MdOutlineArrowRightAlt />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>
              No posts found for this{" "}
              {pageType === "category" ? "category" : "tag"}.
            </p>
          )}
        </section>
      </div>

      {/* Social Links and Footer */}
      <SocialSection />
      <Footer />
    </>
  );
}

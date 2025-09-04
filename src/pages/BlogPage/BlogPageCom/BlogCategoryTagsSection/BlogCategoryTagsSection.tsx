import React, { useRef } from "react";
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

export default function BlogCategoryTagsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const location = useLocation();
  const { type, value } = useParams<{ type?: string; value?: string }>();

  // Initialize intersection animation for blog cards
  useIntersectionAnimation(".blog-categories-card");

  // Custom navigate hook
  const { navigateTo } = useDynamicNavigate();

  // Determine category or tag from URL params or location state
  const locationState = location.state as
    | { category?: string; tag?: string }
    | undefined;
  const category =
    locationState?.category || (type === "category" ? value : undefined);
  const tag = locationState?.tag || (type === "tags" ? value : undefined);

  const pageType = category ? "category" : tag ? "tag" : null;
  if (!pageType) return <p>No category or tag provided.</p>;

  // Filter posts based on category or tag
  const filteredPosts: BlogDataProps[] =
    pageType === "category"
      ? BlogData.filter((post) => post.categories.trim() === category)
      : BlogData.filter((post) => post.tags.some((t) => t.trim() === tag));

  // Navigate to single blog page
  const handleReadMore = (post: BlogDataProps) => {
    navigateTo(`/blog/${post.id}`, { post });
  };

  return (
    <>
      <NavBar />
      <PageHeader
        title={
          pageType === "category" ? `Category: ${category}` : `Tag: ${tag}`
        }
      />

      <div className="blog-categories-bg">
        <section className="blog-categories-section" ref={sectionRef}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const firstParagraph = post.content.find(
                (item) => item.type === "paragraph"
              )?.text;

              return (
                <div className="blog-categories-card" key={post.id}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-categories-image"
                  />
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
                    <button
                      className="blog-categories-read-more"
                      onClick={() => handleReadMore(post)}
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

      <SocialSection />
      <Footer />
    </>
  );
}

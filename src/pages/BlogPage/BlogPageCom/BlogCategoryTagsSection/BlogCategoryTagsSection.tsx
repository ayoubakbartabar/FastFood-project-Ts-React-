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

import { useBlogData } from "../../../../core/hooks/useBlogData/useBlogData";
import type { BlogDataProps } from "../../../../types/models/BlogTypes";

export default function BlogCategoryTagsSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Get URL params and location state
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

  if (!pageType) return <p>No category or tag provided.</p>;

  // Fetch blog data using custom hook
  const { blogs, loading } = useBlogData();

  // Filter blogs based on category or tag
  const filteredPosts = useMemo(() => {
    if (!blogs?.length) return [];
    return pageType === "category"
      ? blogs.filter((post) => post.categories.trim() === category)
      : blogs.filter((post) => post.tags.some((t) => t.trim() === tag));
  }, [blogs, category, tag, pageType]);

  // Initialize intersection animation for blog cards
  useIntersectionAnimation(".blog-categories-card");

  // Navigation to single blog page
  const { navigateTo } = useDynamicNavigate();
  const handleReadMore = (post: BlogDataProps) => {
    navigateTo(`/blog/${post.id}`, { post });
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <>
      {/* Navigation bar */}
      <NavBar />

      {/* Page header */}
      <PageHeader
        title={
          pageType === "category" ? `Category: ${category}` : `Tag: ${tag}`
        }
      />

      {/* Blog cards section */}
      <div className="blog-categories-bg">
        <section className="blog-categories-section" ref={sectionRef}>
          {filteredPosts.length ? (
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

                    {/* Read more button */}
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

      {/* Social links and footer */}
      <SocialSection />
      <Footer />
    </>
  );
}

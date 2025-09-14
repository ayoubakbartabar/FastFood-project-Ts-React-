import React, { useRef, FC } from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";

import "./BlogsContentSection.css";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";
import { useBlogData } from "../../../../core/hooks/useBlogData/useBlogData";
import type { BlogDataProps } from "../../../../types/models/BlogTypes";

const BlogsContentSection: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { blogs, loading } = useBlogData();
  useIntersectionAnimation(".blog-content-card");

  const { navigateTo } = useDynamicNavigate();

  const handleReadMore = (post: BlogDataProps) => {
    navigateTo(`/blog/${post.id}`, { post });2
  };

  if (loading) return <p>Loading blogs...</p>;
  if (!blogs.length) return <p>No blogs found.</p>;

  return (
    <section className="blog-content-section" ref={sectionRef}>
      <div className="blog-content-grid">
        {blogs.map((post) => (
          <article className="blog-content-card" key={post.id}>
            <img
              src={post.image}
              alt={post.title}
              className="blog-content-image"
            />
            <div className="blog-content-content">
              <span className="blog-content-category">{post.categories}</span>
              <h3 className="blog-content-title">{post.title}</h3>
              <button
                className="read-more"
                onClick={() => handleReadMore(post)}
                aria-label={`Read more about ${post.title}`}
              >
                Read more <MdOutlineArrowRightAlt />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogsContentSection;

import React, { useRef } from "react";
import type { FC } from "react";
import { IoSearch } from "react-icons/io5";

import "./PopularPostSection.css";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";
import BlogData from "../../../../data/BlogData";
import type { BlogDataProps } from "../../../../data/BlogData";

const PopularPostSection: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Initialize intersection animation
  useIntersectionAnimation(".popular-post-item");

  // Custom navigate hook
  const { navigateTo } = useDynamicNavigate();

  // Handle click on post -> navigate to blog detail page
  const handleReadMore = (post: BlogDataProps) => {
    navigateTo(`/blog/${post.id}`, { post });
  };

  // Show first 5 posts as popular
  const posts = BlogData.slice(0, 5);

  return (
    <aside className="blog-aside" ref={sectionRef}>
      {/* Search box */}
      <div className="search-box">
        <input type="text" placeholder="Search…" />
        <span className="search-icon">
          <IoSearch />
        </span>
      </div>

      {/* Popular posts list */}
      <div className="popular-posts">
        <h3>Popular Post</h3>
        <div className="underline"></div>
        {posts.map((post) => (
          <div key={post.id} className="popular-post-item">
            <img src={post.image} alt={post.title} />
            <p onClick={() => handleReadMore(post)}>{post.title}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default PopularPostSection;

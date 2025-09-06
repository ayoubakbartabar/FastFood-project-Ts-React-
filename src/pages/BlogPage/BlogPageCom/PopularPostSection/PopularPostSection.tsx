import React, { useRef } from "react";
import type { FC } from "react";

import { IoSearch } from "react-icons/io5";

import "./PopularPostSection.css";

// Custom hooks
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";

// Blog data
import BlogData from "../../../../data/BlogData";
import type { BlogDataProps } from "../../../../data/BlogData";

const PopularPostSection: FC = () => {
  // Reference to aside section for intersection animation
  const sectionRef = useRef<HTMLElement | null>(null);

  // Trigger scroll/fade animation for each popular post item
  useIntersectionAnimation(".popular-post-item");

  // Custom navigation hook
  const { navigateTo } = useDynamicNavigate();

  // Navigate to blog detail page on click
  const handleReadMore = (post: BlogDataProps) => {
    navigateTo(`/blog/${post.id}`, { post });
  };

  // Limit to first 5 posts for popular section
  const posts = BlogData.slice(0, 5);

  return (
    <aside className="blog-aside" ref={sectionRef}>
      {/* Search Box */}
      <div className="search-box">
        <input type="text" placeholder="Search…" aria-label="Search posts" />
        <span className="search-icon">
          <IoSearch />
        </span>
      </div>

      {/* Popular Posts */}
      <div className="popular-posts">
        <h3 className="popular-posts-title">Popular Posts</h3>
        <div className="underline"></div>

        <ul className="popular-posts-list">
          {posts.map((post) => (
            <li
              key={post.id}
              className="popular-post-item"
              onClick={() => handleReadMore(post)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="popular-post-image"
              />
              <span className="popular-post-title">{post.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default PopularPostSection;

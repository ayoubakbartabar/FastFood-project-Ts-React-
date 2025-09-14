import React, { FC, useRef } from "react";
import { IoSearch } from "react-icons/io5";

// Custom hooks
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";
import useDynamicNavigate from "../../../../core/hooks/useNavigateTo/useNavigateTo";
import { useBlogData } from "../../../../core/hooks/useBlogData/useBlogData";

// Styles
import "./PopularPostSection.css";

const PopularPostSection: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Fetch blogs
  const { blogs, loading } = useBlogData();

  // Animate list items when visible
  useIntersectionAnimation(".popular-post-item");

  // Dynamic navigation
  const { navigateTo } = useDynamicNavigate();

  // Navigate to BlogDetailsSection with state
  const handleReadMore = (postId: number) => {
    const post = blogs.find((b) => b.id === postId);
    if (post) {
      // Pass blog data via state to avoid refetch
      navigateTo(`/blog/${postId}`, { state: { post } });
    }
  };

  // Show top 5 posts
  const popularPosts = blogs.slice(0, 5);

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

        {loading ? (
          <p>Loading...</p>
        ) : popularPosts.length ? (
          <ul className="popular-posts-list">
            {popularPosts.map((post) => (
              <li
                key={post.id}
                className="popular-post-item"
                onClick={() => handleReadMore(post.id)}
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
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </aside>
  );
};

export default PopularPostSection;

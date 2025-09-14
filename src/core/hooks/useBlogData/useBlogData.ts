import { useState, useEffect, useMemo } from "react";
import type { BlogDataProps } from "../../../types/models/BlogTypes";

// Custom hook to fetch blog data with performance optimizations
// Adds firstParagraph property and returns loading & error states
export const useBlogData = () => {
  const [blogsRaw, setBlogsRaw] = useState<BlogDataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Base API URL (better managed via .env file)
  const API_URL = "http://localhost:5000/blogs";

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL, { signal });
        if (!res.ok)
          throw new Error(`Failed to fetch blogs: ${res.statusText}`);

        // Strongly typed response
        const data: unknown = await res.json();
        const blogsArray: BlogDataProps[] = Array.isArray(data)
          ? data
          : (data as { blogs?: BlogDataProps[] })?.blogs ?? [];

        // Prevent unnecessary state update if data is same
        setBlogsRaw((prev) =>
          JSON.stringify(prev) === JSON.stringify(blogsArray)
            ? prev
            : blogsArray
        );
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          // Request was aborted - ignore silently
          return;
        }
        console.error("Failed to fetch blogs:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setBlogsRaw([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    // Cleanup to abort fetch on unmount
    return () => controller.abort();
  }, [API_URL]);

  // Compute firstParagraph only when blogsRaw changes
  const blogs = useMemo(
    () =>
      blogsRaw.map((b) => ({
        ...b,
        firstParagraph:
          b.content.find((c) => c.type === "paragraph")?.text || "",
      })),
    [blogsRaw]
  );

  return { blogs, loading, error };
};

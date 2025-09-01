import { useEffect } from "react";

// Define the options type for IntersectionObserver
interface Options extends IntersectionObserverInit {}

/**
 * Custom hook to animate elements when they enter the viewport.
 * Adds the "show" class to each observed element when it intersects.
 *
 * @param selector - CSS selector for target elements
 * @param options - IntersectionObserver options (threshold, root, rootMargin)
 */
export default function useIntersectionAnimation(
  selector: string,
  options: Options = {}
) {
  useEffect(() => {
    // Select all elements matching the selector
    const elements = document.querySelectorAll<HTMLElement>(selector);

    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When element enters viewport
          if (entry.isIntersecting) {
            entry.target.classList.add("show"); // Add "show" class
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      { threshold: 0.2, ...options } // Merge default threshold with user options
    );

    // Observe each selected element
    elements.forEach((el) => observer.observe(el));

    // Cleanup observer on unmount
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selector, options]); // Re-run effect if selector or options change
}

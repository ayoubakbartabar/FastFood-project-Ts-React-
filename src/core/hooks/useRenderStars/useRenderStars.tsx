import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import type { ReactNode } from "react";

/**
 * Custom hook to render star ratings for products.
 * Supports full stars, half stars, and empty stars.
 */
export function useRenderStars() {
  /**
   * Renders an array of star icons based on the rating number.
   * @param rating - Product rating (0 to 5, can be decimal)
   * @returns Array of ReactNode elements representing stars
   */
  const renderStars = (rating: number): ReactNode[] => {
    const stars: ReactNode[] = [];

    // Loop from 1 to 5 for each star position
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        // Full star for integer part of rating
        stars.push(<FaStar key={i} className="star full" />);
      } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
        // Half star if decimal part >= 0.5
        stars.push(<FaStarHalfAlt key={i} className="star half" />);
      } else {
        // Empty star for remaining positions
        stars.push(<FaRegStar key={i} className="star empty" />);
      }
    }

    return stars;
  };

  // Return the renderStars function for use in components
  return { renderStars };
}

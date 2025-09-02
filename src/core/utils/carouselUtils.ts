import type { TestimonialItem } from "../../data/TestimonialCarouselData";

/** Determine number of cards to show based on viewport width */
export const getCardsPerView = (): number => {
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1024) return 2;
  return 3;
};

/**
 * Build array of visible items based on startIndex and cardsPerView
 * @param data - Full array of testimonial items
 * @param startIndex - Current starting index
 * @param cardsPerView - Number of cards visible at once
 */
export const buildVisible = (
  data: TestimonialItem[],
  startIndex: number,
  cardsPerView: number
): TestimonialItem[] =>
  Array.from({ length: cardsPerView }, (_, i) => {
    const idx = (startIndex + i) % data.length;
    return data[idx];
  });

/** Get next start index in carousel */
export const goNextIndex = (
  startIndex: number,
  cardsPerView: number,
  total: number
): number => (startIndex + cardsPerView) % total;

/** Get previous start index in carousel */
export const goPrevIndex = (
  startIndex: number,
  cardsPerView: number,
  total: number
): number => (startIndex - cardsPerView + total) % total;

/** Set up auto-scroll interval for carousel */
export const startAutoScroll = (
  callback: () => void,
  interval: number
): number => window.setInterval(callback, interval);

/** Clear auto-scroll interval */
export const clearAutoScroll = (intervalId: number | null): void => {
  if (intervalId !== null) clearInterval(intervalId);
};

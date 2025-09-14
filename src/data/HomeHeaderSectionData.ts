// data/HomeHeaderSectionData.ts
import slide1 from "/images/661cbfbcac04478f46ca34b9_78178740_Fresh beef burger isolated -1 2.png";
import slide2 from "/images/66210f2fc3b3464a6a180ca7_wepik-export-202404181214557fEP-p-2000.png";
import slide3 from "/images/66210df4c3b3464a6a16c59c_image.png";
import slide4 from "/images/66210efa8e4b4099fd114212_pasta image.png";
import slide5 from "/images/66210efa802edd9170475c57_image (1).png";

// TypeScript interface for each slide
export interface Slide {
  id: number;
  header: string;
  title: string;
  description: string;
  image: string;
}

// Full-length slide data
const HomeHeaderSectionData: Slide[] = [
  {
    id: 1,
    header: "Discover Delight at Fastfood TNC",
    title: "Your Go-To Spot for Quick and Tasty Eats!",
    description:
      "Where quick eats and quality collide, crafting a taste sensation. Speed meets flavor in every bite, promising a culinary journey that's as swift as it is delicious.",
    image: slide1,
  },
  {
    id: 2,
    header: "Discover Delight at Fastfood TNC",
    title: "Your Go-To Spot for Quick and Tasty Eats!",
    description:
      "Where quick eats and quality collide, crafting a taste sensation. Speed meets flavor in every bite, promising a culinary journey that's as swift as it is delicious.",
    image: slide2,
  },
  {
    id: 3,
    header: "Discover Delight at Fastfood TNC",
    title: "Your Go-To Spot for Quick and Tasty Eats!",
    description:
      "Where quick eats and quality collide, crafting a taste sensation. Speed meets flavor in every bite, promising a culinary journey that's as swift as it is delicious.",
    image: slide3,
  },
  {
    id: 4,
    header: "Discover Delight at Fastfood TNC",
    title: "Your Go-To Spot for Quick and Tasty Eats!",
    description:
      "Where quick eats and quality collide, crafting a taste sensation. Speed meets flavor in every bite, promising a culinary journey that's as swift as it is delicious.",
    image: slide4,
  },
  {
    id: 5,
    header: "Discover Delight at Fastfood TNC",
    title: "Your Go-To Spot for Quick and Tasty Eats!",
    description:
      "Where quick eats and quality collide, crafting a taste sensation. Speed meets flavor in every bite, promising a culinary journey that's as swift as it is delicious.",
    image: slide5,
  },
];

export default HomeHeaderSectionData;

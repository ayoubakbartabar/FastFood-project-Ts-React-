import BlogImg1 from "../assets/images/blog-image(1).png";
import BlogImg2 from "../assets/images/blog-image(2).png";
import BlogImg3 from "../assets/images/blog-image(3).png";
import BlogImg4 from "../assets/images/blog-image(4).png";
import BlogImg5 from "../assets/images/blog-image(5).png";
import BlogImg6 from "../assets/images/blog-image(6).png";

export type BlogContent =
  | { type: "paragraph"; text: string }
  | { type: "title"; text: string }
  | { type: "image" };

export type BlogDataProps = {
  id: number;
  image: string;
  title: string;
  content: BlogContent[];
  categories: string;
  tags: string[];
};

const BlogData: BlogDataProps[] = [
  {
    id: 1,
    image: BlogImg1,
    title: "The Inspiring Fusion of Art and Cuisine",
    content: [
      {
        type: "paragraph",
        text: "Exploring the evolving landscape of FastFood TNC...",
      },
      {
        type: "paragraph",
        text: "Embark on a gastronomic adventure with FastFood TNC...",
      },
      { type: "title", text: "Grilled Peach Salad - A Symphony of Freshness:" },
      {
        type: "paragraph",
        text: "Immerse yourself in the vibrant flavors of summer...",
      },
      { type: "image" },
      { type: "title", text: "Lobster Risotto - Luxurious Indulgence" },
      {
        type: "paragraph",
        text: "Elevate your dining experience with our Lobster Risotto...",
      },
      {
        type: "paragraph",
        text: "Unleash your taste buds with our TNC Signature Burger...",
      },
      { type: "title", text: "Chocolate Decadence Cake - Sweet Culmination" },
      {
        type: "paragraph",
        text: "Conclude your culinary journey on a sweet note...",
      },
      {
        type: "paragraph",
        text: "At FastFood TNC, our signature dishes are not just meals...",
      },
    ],
    categories: "Subway",
    tags: ["Food", "TNC menu", "Offers"],
  },
  {
    id: 2,
    image: BlogImg2,
    title: "Pairing the Perfect Wines with TNC's Delightful Dishes",
    content: [
      {
        type: "paragraph",
        text: "Exploring the evolving landscape of FastFood TNC...",
      },
      {
        type: "paragraph",
        text: "Embark on a gastronomic adventure with FastFood TNC...",
      },
      { type: "title", text: "Grilled Peach Salad - A Symphony of Freshness:" },
      {
        type: "paragraph",
        text: "Immerse yourself in the vibrant flavors of summer...",
      },
      { type: "image" },
      { type: "title", text: "Lobster Risotto - Luxurious Indulgence" },
      {
        type: "paragraph",
        text: "Elevate your dining experience with our Lobster Risotto...",
      },
      {
        type: "paragraph",
        text: "Unleash your taste buds with our TNC Signature Burger...",
      },
      { type: "title", text: "Chocolate Decadence Cake - Sweet Culmination" },
      {
        type: "paragraph",
        text: "Conclude your culinary journey on a sweet note...",
      },
      {
        type: "paragraph",
        text: "At FastFood TNC, our signature dishes are not just meals...",
      },
    ],
    categories: "Italian Dish",
    tags: ["Food", "Restaurant", "Asian Cuisine"],
  },
  {
    id: 3,
    image: BlogImg3,
    title: "A Culinary Journey Through TNC's Signature Dishes",
    content: [
      {
        type: "paragraph",
        text: "Exploring the evolving landscape of FastFood TNC...",
      },
      {
        type: "paragraph",
        text: "Embark on a gastronomic adventure with FastFood TNC...",
      },
      { type: "title", text: "Grilled Peach Salad - A Symphony of Freshness:" },
      {
        type: "paragraph",
        text: "Immerse yourself in the vibrant flavors of summer...",
      },
      { type: "image" },
      { type: "title", text: "Lobster Risotto - Luxurious Indulgence" },
      {
        type: "paragraph",
        text: "Elevate your dining experience with our Lobster Risotto...",
      },
      {
        type: "paragraph",
        text: "Unleash your taste buds with our TNC Signature Burger...",
      },
      { type: "title", text: "Chocolate Decadence Cake - Sweet Culmination" },
      {
        type: "paragraph",
        text: "Conclude your culinary journey on a sweet note...",
      },
      {
        type: "paragraph",
        text: "At FastFood TNC, our signature dishes are not just meals...",
      },
    ],
    categories: "Subway",
    tags: ["Food", "Restaurant", "PIzza"],
  },
  {
    id: 4,
    image: BlogImg4,
    title: "Meet the culinary masterminds behind TNC's kitchen",
    content: [
      {
        type: "paragraph",
        text: "Exploring the evolving landscape of FastFood TNC...",
      },
      {
        type: "paragraph",
        text: "Embark on a gastronomic adventure with FastFood TNC...",
      },
      { type: "title", text: "Grilled Peach Salad - A Symphony of Freshness:" },
      {
        type: "paragraph",
        text: "Immerse yourself in the vibrant flavors of summer...",
      },
      { type: "image" },
      { type: "title", text: "Lobster Risotto - Luxurious Indulgence" },
      {
        type: "paragraph",
        text: "Elevate your dining experience with our Lobster Risotto...",
      },
      {
        type: "paragraph",
        text: "Unleash your taste buds with our TNC Signature Burger...",
      },
      { type: "title", text: "Chocolate Decadence Cake - Sweet Culmination" },
      {
        type: "paragraph",
        text: "Conclude your culinary journey on a sweet note...",
      },
      {
        type: "paragraph",
        text: "At FastFood TNC, our signature dishes are not just meals...",
      },
    ],
    categories: "Dinner DIsh",
    tags: ["Food", "Offers", "Asian Cuisine"],
  },
  {
    id: 5,
    image: BlogImg5,
    title:
      "Explore TNC's green initiatives in the kitchen for sustainable dining",
    content: [
      {
        type: "paragraph",
        text: "Exploring the evolving landscape of FastFood TNC...",
      },
      {
        type: "paragraph",
        text: "Embark on a gastronomic adventure with FastFood TNC...",
      },
      { type: "title", text: "Grilled Peach Salad - A Symphony of Freshness:" },
      {
        type: "paragraph",
        text: "Immerse yourself in the vibrant flavors of summer...",
      },
      { type: "image" },
      { type: "title", text: "Lobster Risotto - Luxurious Indulgence" },
      {
        type: "paragraph",
        text: "Elevate your dining experience with our Lobster Risotto...",
      },
      {
        type: "paragraph",
        text: "Unleash your taste buds with our TNC Signature Burger...",
      },
      { type: "title", text: "Chocolate Decadence Cake - Sweet Culmination" },
      {
        type: "paragraph",
        text: "Conclude your culinary journey on a sweet note...",
      },
      {
        type: "paragraph",
        text: "At FastFood TNC, our signature dishes are not just meals...",
      },
    ],
    categories: "Italian Dish",
    tags: ["Food", "PIzza", "Offers"],
  },
  {
    id: 6,
    image: BlogImg6,
    title: "Embark on a sweet journey with TNC's delectable desserts",
    content: [
      {
        type: "paragraph",
        text: "Exploring the evolving landscape of FastFood TNC...",
      },
      {
        type: "paragraph",
        text: "Embark on a gastronomic adventure with FastFood TNC...",
      },
      { type: "title", text: "Grilled Peach Salad - A Symphony of Freshness:" },
      {
        type: "paragraph",
        text: "Immerse yourself in the vibrant flavors of summer...",
      },
      { type: "image" },
      { type: "title", text: "Lobster Risotto - Luxurious Indulgence" },
      {
        type: "paragraph",
        text: "Elevate your dining experience with our Lobster Risotto...",
      },
      {
        type: "paragraph",
        text: "Unleash your taste buds with our TNC Signature Burger...",
      },
      { type: "title", text: "Chocolate Decadence Cake - Sweet Culmination" },
      {
        type: "paragraph",
        text: "Conclude your culinary journey on a sweet note...",
      },
      {
        type: "paragraph",
        text: "At FastFood TNC, our signature dishes are not just meals...",
      },
    ],
    categories: "FastFood TNC",
    tags: ["Food", "PIzza", "Asian Cuisine"],
  },
];

export default BlogData;

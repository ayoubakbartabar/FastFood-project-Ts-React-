import Img1 from "../assets/images/661cd14a88dd92f7fc455bf8_Ellipse 41.webp";
import Img2 from "../assets/images/661cd14a88dd92f7fc455bfa_Rectangle 126.webp";
import Img3 from "../assets/images/661cd14a88dd92f7fc455bf6_Rectangle 127.webp";
import Img4 from "../assets/images/661cd14a88dd92f7fc455bf4_Ellipse 165 (1).webp";
import Img5 from "../assets/images/661cd14a88dd92f7fc455bf2_Ellipse 131.webp";
import Img6 from "../assets/images/661cd14a88dd92f7fc455bf0_Rectangle 125.webp";
import Img7 from "../assets/images/661cd14a88dd92f7fc455bee_image.webp";
import Img8 from "../assets/images/661cd14a88dd92f7fc455bec_Ellipse 2.png";
import Img9 from "../assets/images/661cd14a88dd92f7fc455bea_Ellipse 2 (1).png";

export interface TestimonialItem {
  id: number;
  name: string;
  job: string;
  paragraph: string;
  image: string;
}

const TestimonialCarouselData: TestimonialItem[] = [
  {
    id: 1,
    image: Img1,
    name: "Leslie Alexander",
    job: "UX/UI Designer",
    paragraph:
      "Pen arrange link background community line figma horizontal link. Follower layer content hand undo. Figma edit flows.",
  },
  {
    id: 2,
    image: Img2,
    name: "Stuart Mark",
    job: "Chef",
    paragraph:
      "Team flatten stroke follower overflow move. Rectangle export arrange invite follower plugin star connection underline.",
  },
  {
    id: 3,
    image: Img3,
    name: "Megan Johnson",
    job: "Customer",
    paragraph:
      "g it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.",
  },
  {
    id: 4,
    image: Img4,
    name: "Mila Smith",
    job: "Food Blogger",
    paragraph:
      "Pen arrange link background community line figma horizontal link. Follower layer content hand undo. Figma edit flows.",
  },
  {
    id: 5,
    image: Img5,
    name: "Stuart Mark",
    job: "Chef",
    paragraph:
      "Team flatten stroke follower overflow move. Rectangle export arrange invite follower plugin star connection underline.",
  },
  {
    id: 6,
    image: Img6,
    name: "Megan Johnson",
    job: "Customer",
    paragraph:
      "It look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.",
  },
  {
    id: 7,
    image: Img7,
    name: "Armas Rosie",
    job: "UX/UI Designer",
    paragraph:
      "Pen arrange link background community line figma horizontal link. Follower layer content hand undo. Figma edit flows.",
  },
  {
    id: 8,
    image: Img8,
    name: "Andrew Watson",
    job: "Chef",
    paragraph:
      "Team flatten stroke follower overflow move. Rectangle export arrange invite follower plugin star connection underline.",
  },
  {
    id: 9,
    image: Img9,
    name: "Johnson Pele",
    job: "Customer",
    paragraph:
      "g it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.",
  },
];

export default TestimonialCarouselData;

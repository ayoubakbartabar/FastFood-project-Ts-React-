import Img1 from "../assets/svg/6620ab50d8bc7e20bf29747f_Group.svg";
import Img2 from "../assets/svg/6620ab3bf9e38f772400a07d_Group (1).svg";
import Img3 from "../assets/svg/6620ab0fd8bc7e20bf293055_fi_13911032(2).svg";
import Img4 from "../assets/svg/6620aaf775f767e21daa7db2_fi_9183489 (3).svg";
import Img5 from "../assets/svg/6620aa7f75f767e21daa1321_fi_3059169(4).svg";
import Img6 from "../assets/svg/6620aa5bc7caba37ea193cc2_g2223(6).svg";

export interface ServiceContent {
  type: "title" | "paragraph";
  value: string;
}

export interface ServiceItem {
  id: number;
  image: string;
  title: string;
  paragraph: string;
  content: ServiceContent[];
}

const ServiceData: ServiceItem[] = [
  {
    id: 1,
    image: Img1,
    title: "Community Engagement",
    paragraph:
      "Proud community members, engaging in initiatives that uplift neighbors. Your patronage matters.",
    content: [
      { type: "title", value: "Dine-In Excellence" },
      {
        type: "paragraph",
        value:
          "Proud community members, engaging in initiatives that uplift neighbors. Your patronage matters.",
      },
      {
        type: "paragraph",
        value:
          "Bold opacity scale polygon share edit link background move pixel...",
      },
      {
        type: "paragraph",
        value: "Pixel ipsum vector union text rectangle figjam...",
      },
      {
        type: "paragraph",
        value: "Variant editor italic editor rectangle vertical...",
      },
    ],
  },
  {
    id: 2,
    image: Img2,
    title: "Table Reservations",
    paragraph:
      "Elevate events with Fastfood TNC catering, adding delectable touches to special moments.",
    content: [
      { type: "title", value: "Dine-In Excellence" },
      {
        type: "paragraph",
        value:
          "Proud community members, engaging in initiatives that uplift neighbors. Your patronage matters.",
      },
      {
        type: "paragraph",
        value:
          "Bold opacity scale polygon share edit link background move pixel...",
      },
      {
        type: "paragraph",
        value: "Pixel ipsum vector union text rectangle figjam...",
      },
      {
        type: "paragraph",
        value: "Variant editor italic editor rectangle vertical...",
      },
    ],
  },
  {
    id: 3,
    image: Img3,
    title: "Catering for Occasion",
    paragraph:
      "Elevate events with Fastfood TNC catering, adding delectable touches to special moments.",
    content: [
      { type: "title", value: "Dine-In Excellence" },
      {
        type: "paragraph",
        value:
          "Proud community members, engaging in initiatives that uplift neighbors. Your patronage matters.",
      },
      {
        type: "paragraph",
        value:
          "Bold opacity scale polygon share edit link background move pixel...",
      },
      {
        type: "paragraph",
        value: "Pixel ipsum vector union text rectangle figjam...",
      },
      {
        type: "paragraph",
        value: "Variant editor italic editor rectangle vertical...",
      },
    ],
  },
  {
    id: 4,
    image: Img4,
    title: "Express Delivery",
    paragraph:
      "Can't make it? Experience Express Delivery: hot, fresh, and on-time to your door.",
    content: [
      { type: "title", value: "Dine-In Excellence" },
      {
        type: "paragraph",
        value:
          "Proud community members, engaging in initiatives that uplift neighbors. Your patronage matters.",
      },
      {
        type: "paragraph",
        value:
          "Bold opacity scale polygon share edit link background move pixel...",
      },
      {
        type: "paragraph",
        value: "Pixel ipsum vector union text rectangle figjam...",
      },
      {
        type: "paragraph",
        value: "Variant editor italic editor rectangle vertical...",
      },
    ],
  },
  {
    id: 5,
    image: Img5,
    title: "Easy Online Ordering",
    paragraph:
      "Explore online ordering: choose dishes, customize, and have it ready for pickup or delivery.",
    content: [
      { type: "title", value: "Dine-In Excellence" },
      {
        type: "paragraph",
        value:
          "Proud community members, engaging in initiatives that uplift neighbors. Your patronage matters.",
      },
      {
        type: "paragraph",
        value:
          "Bold opacity scale polygon share edit link background move pixel...",
      },
      {
        type: "paragraph",
        value: "Pixel ipsum vector union text rectangle figjam...",
      },
      {
        type: "paragraph",
        value: "Variant editor italic editor rectangle vertical...",
      },
    ],
  },
  {
    id: 6,
    image: Img6,
    title: "Dine-In Excellence",
    paragraph:
      "Experience our dine-in: vibrant atmosphere, prompt service, and a comfortable setting awaits.",
    content: [
      { type: "title", value: "Dine-In Excellence" },
      {
        type: "paragraph",
        value:
          "Proud community members, engaging in initiatives that uplift neighbors. Your patronage matters.",
      },
      {
        type: "paragraph",
        value:
          "Bold opacity scale polygon share edit link background move pixel...",
      },
      {
        type: "paragraph",
        value: "Pixel ipsum vector union text rectangle figjam...",
      },
      {
        type: "paragraph",
        value: "Variant editor italic editor rectangle vertical...",
      },
    ],
  },
];

export default ServiceData;

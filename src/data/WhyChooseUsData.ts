import FlavorIcon from "../assets/images/661cceffefc1a1ed7ffd276a_Flavor icon.png";
import FoodSafetyIcon from "../assets/images/661cceff9911086b9044d821_food-safety icon.png";
import FreshFoodIcon from "../assets/images/661cceffce5a04ced087edb6_fresh food icon.png";
import FoodIcon from "../assets/images/661cceffce5a04ced087edb1_food icon.png";
import HappyClientIcon from "../assets/images/661cceff4907e55afedda051_happy-client 1.png";
import TableIcon from "../assets/images/661cceff2d1e145399faea3a_table 1.png";
import OnlineShoppingIcon from "../assets/images/661cceffeebef79d631b7758_online-shopping 1.png";
import NetworkIcon from "../assets/images/661cceffec7af83cd0a6f61d_network 1.png";

export type WhyChooseUsItem = {
  id: number;
  image: string;
  title: string;
  paragraph: string;
};

const WhyChooseUsData: WhyChooseUsItem[] = [
  {
    id: 1,
    image: FlavorIcon,
    title: "Unmatched Flavor Fusion",
    paragraph:
      "Masterpieces of taste, from burgers to wraps, expertly crafted.",
  },
  {
    id: 2,
    image: FoodSafetyIcon,
    title: "Quality Ingredients, Every Time",
    paragraph:
      "Committed to the finest ingredients quality at the heart of every bite.",
  },
  {
    id: 3,
    image: FreshFoodIcon,
    title: "Fast, Fresh, and Friendly",
    paragraph: "More than a name, we commit to quick, fresh service.",
  },
  {
    id: 4,
    image: FoodIcon,
    title: "Signature Specials",
    paragraph:
      "Explore unique signature specials artisanal delighting taste buds.",
  },
  {
    id: 5,
    image: HappyClientIcon,
    title: "Customer-Centric Experience",
    paragraph:
      "Satisfaction priority. Welcoming space to enjoy, excel guided by feedback.",
  },
  {
    id: 6,
    image: TableIcon,
    title: "Innovative Dining Solutions",
    paragraph:
      "For enthusiasts or quick bites, diverse menu embraces trends, classics.",
  },
  {
    id: 7,
    image: OnlineShoppingIcon,
    title: "Online Convenience",
    paragraph:
      "Easy online orders: reserve tables, enjoy favorites at home effortlessly.",
  },
  {
    id: 8,
    image: NetworkIcon,
    title: "Community Connection",
    paragraph:
      "Beyond a restaurant, we support locals, source locally, and contribute.",
  },
];

export default WhyChooseUsData;

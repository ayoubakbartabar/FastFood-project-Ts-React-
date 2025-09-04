import Img1 from "../assets/svg/661e0638e7aac97d4fb49b25_food-safety (1) 1.svg";
import Img2 from "../assets/svg/661e063892b143ef241617e9_fi_4474452.svg";
import Img3 from "../assets/svg/661e0638be6ebf99dd96aa6a_innovation 1.svg";

export type OurCommitmentsDataProps = {
  id: number;
  image: string;
  title: string;
  paragraph: string;
};

const OurCommitmentsData: OurCommitmentsDataProps[] = [
  {
    id: 1,
    image: Img1,
    title: "Quality Ingredients",
    paragraph:
      "We prioritize freshness, sourcing locally whenever possible. Each dish is a testament to our dedication to using only the finest ingredients.",
  },
  {
    id: 2,
    image: Img2,
    title: "Community Focus",
    paragraph:
      "Beyond serving great food, we actively engage with and support our community. Fastfood TNC is a local hub, connecting people through shared culinary experiences.",
  },
  {
    id: 3,
    image: Img3,
    title: "Innovation",
    paragraph:
      "Our chefs infuse creativity into every dish, offering a menu that balances contemporary trends with timeless classics. Expect an array of flavors that excite and satisfy.",
  },
];

export default OurCommitmentsData;

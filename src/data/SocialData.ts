import Img1 from "../assets/images/Social(1).webp";
import Img2 from "../assets/images/661cabff491ead7e40ea570d_Rectangle 23.webp";
import Img3 from "../assets/images/661cabff491ead7e40ea570e_wepik-export-20240101084202rP9g 1.webp";
import Img4 from "../assets/images/661cabff491ead7e40ea5717_Rectangle 19.webp";
import Img5 from "../assets/images/661cabff491ead7e40ea5733_Rectangle 22.webp";

export type SocialDataProps = {
  id: number;
  image: string;
  alt: string;
};

const SocialData: SocialDataProps[] = [
  { id: 1, image: Img1, alt: "product-image" },
  { id: 2, image: Img2, alt: "product-image" },
  { id: 3, image: Img3, alt: "product-image" },
  { id: 4, image: Img4, alt: "product-image" },
  { id: 5, image: Img5, alt: "product-image" },
];

export default SocialData;

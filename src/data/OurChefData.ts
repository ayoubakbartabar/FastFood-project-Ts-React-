import Img1 from "../assets/images/659e6d050a2af686af339d58_wepik-export-20240104041528hu14 1.png";
import Img2 from "../assets/images/661e105aa3542c723fa34577_wepik-export-20240102125523pipv 1.webp";
import Img3 from "../assets/images/661e154024524e66c1a62274_image.png";
import Img4 from "../assets/images/chef-image.webp";
import Img5 from "../assets/images/661e153fc80ef94d0d6a22d8_image-7.png";
import Img6 from "../assets/images/661e153f03768e836598f9e5_image-3.png";
import Img7 from "../assets/images/661e153f9543d43b5e7fe74d_imaage.png";
import Img8 from "../assets/images/661e153fd040d5c09a81a088_image-4.png";
import Img9 from "../assets/images/661e154069f1521b1617c7d6_wepik-export-20240123122618sLjm 1.png";

export type Chef = {
  id: number;
  name: string;
  role: string;
  image: string;
};

const OurChefData: Chef[] = [
  { id: 1, name: "Brooklyn Simmons", role: "Pizza Specialist", image: Img1 },
  { id: 2, name: "Jane Cooper", role: "Burger Specialist", image: Img2 },
  { id: 3, name: "Jerome Bell", role: "Head Chef", image: Img3 },
  { id: 4, name: "Courtney Henry", role: "Pasta Specialist", image: Img4 },
  { id: 5, name: "Brooklyn Simmons", role: "Pizza Specialist", image: Img5 },
  { id: 6, name: "Jane Cooper", role: "Burger Specialist", image: Img6 },
  { id: 7, name: "Jerome Bell", role: "Head Chef", image: Img7 },
  { id: 8, name: "Mark John", role: "Cuisine Specialist", image: Img8 },
  { id: 9, name: "Albert Flores", role: "Cuisine Specialist", image: Img9 },
];

export default OurChefData;

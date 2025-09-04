import type { Product } from "../core/context/CartContext/CartContext.type";

import Img1 from "../assets/images/66210efa8e4b4099fd114212_pasta image.png";
import Img2 from "../assets/images/661cbfbcac04478f46ca34b9_78178740_Fresh beef burger isolated -1 2.png";
import Img3 from "../assets/images/661cc038dcc14c75443911c3_image.png";
import Img4 from "../assets/images/661cc01f38e41da22474a52a_fast_food_set 1.png";
import Img5 from "../assets/images/661cc047c3a82b8be8890aa0_wepik-export-20240119111930TbUs 1.png";
import Img6 from "../assets/images/661cc009926e82c8f0e27899_Tasty mint julep cocktail 1.png";
import Img7 from "../assets/images/66210df4c3b3464a6a16c59c_image.png";
import Img8 from "../assets/images/661cbf8e0563fed591d090fd_image-2.png";

const ProductsData: Product[] = [
  {
    id: 1,
    image: Img1,
    title: "Pasta with Tomatoes and Basil",
    paragraph:
      "Pizza ipsum dolor meat lovers buffalo. Sausage large wing bell NY olives pan. Spinach pan string pan spinach. Sautéed marinara rib buffalo lasagna pork sausage olives tomatoes NY.",
    star: 5,
    price: 30.0,
    count: 10,
    category: "pasta",
    sku: "2FPS",
  },
  {
    id: 2,
    image: Img2,
    title: "Testy Beef Burger",
    paragraph:
      "Pizza ipsum dolor meat lovers buffalo. Sausage large wing bell NY olives pan. Spinach pan string pan spinach. Sautéed marinara rib buffalo lasagna pork sausage olives tomatoes NY.",
    star: 5,
    price: 41.0,
    count: 13,
    category: "burger",
    sku: "2ASF",
  },
  {
    id: 3,
    image: Img3,
    title: "Spinach Artichoke Spectacle",
    paragraph:
      "Pizza ipsum dolor meat lovers buffalo. Sausage large wing bell NY olives pan. Spinach pan string pan spinach. Sautéed marinara rib buffalo lasagna pork sausage olives tomatoes NY.",
    star: 5,
    price: 48.0,
    count: 18,
    category: "pizza",
    sku: "2FBG",
  },
  {
    id: 4,
    image: Img4,
    title: "TNC Combo Meals",
    paragraph:
      "Pizza ipsum dolor meat lovers buffalo. Sausage large wing bell NY olives pan. Spinach pan string pan spinach. Sautéed marinara rib buffalo lasagna pork sausage olives tomatoes NY.",
    star: 4.5,
    price: 41.0,
    count: 17,
    category: "combo meals",
    sku: "2FBG",
  },
  {
    id: 5,
    image: Img5,
    title: "Tasty Mint Julep Cocktail",
    paragraph:
      "Pizza ipsum dolor meat lovers buffalo. Sausage large wing bell NY olives pan. Spinach pan string pan spinach. Sautéed marinara rib buffalo lasagna pork sausage olives tomatoes NY.",
    star: 3.5,
    price: 75.0,
    count: 20,
    category: "drinks",
    sku: "2FDT",
  },
  {
    id: 6,
    image: Img6,
    title: "Lemon Ice Tea",
    paragraph:
      "Pizza ipsum dolor meat lovers buffalo. Sausage large wing bell NY olives pan. Spinach pan string pan spinach. Sautéed marinara rib buffalo lasagna pork sausage olives tomatoes NY.",
    star: 5,
    price: 15.0,
    count: 8,
    category: "drinks",
    sku: "2FBG",
  },
  {
    id: 7,
    image: Img7,
    title: "Fried Chicken Legs",
    paragraph:
      "Pizza ipsum dolor meat lovers buffalo. Sausage large wing bell NY olives pan. Spinach pan string pan spinach. Sautéed marinara rib buffalo lasagna pork sausage olives tomatoes NY.",
    star: 5,
    price: 20.0,
    count: 4,
    category: "sides & fries",
    sku: "2FBG",
  },
  {
    id: 8,
    image: Img8,
    title: "Philly Steak Sandwich",
    paragraph:
      "Pizza ipsum dolor meat lovers buffalo. Sausage large wing bell NY olives pan. Spinach pan string pan spinach. Sautéed marinara rib buffalo lasagna pork sausage olives tomatoes NY.",
    star: 4.5,
    price: 35.0,
    count: 7,
    category: "sandwich",
    sku: "2FBA",
  },
];

export default ProductsData;

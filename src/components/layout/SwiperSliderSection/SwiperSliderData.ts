// TypeScript interface for each slider item
export interface SliderItem {
  id: number;
  image: string;
  title: string;
  href: string;
}

// Array of slider items
const SwiperSliderData: SliderItem[] = [
  {
    id: 1,
    image: "src/assets/images/661cbcd37d541eea8b29644a_combo icon.png",
    title: "Combo Meals",
    href: "#",
  },
  {
    id: 2,
    image: "src/assets/images/661cbc77533d0a6b182c9a5b_pasta icon.png",
    title: "Pasta",
    href: "#",
  },
  {
    id: 3,
    image: "src/assets/images/661cbc66491ead7e40f8ba4e_pizza icon.png",
    title: "Pizza",
    href: "#",
  },
  {
    id: 4,
    image: "src/assets/images/661cbc4f97149635cdf9dbe4_burger icon.png",
    title: "Burger",
    href: "#",
  },
  {
    id: 5,
    image: "src/assets/images/661cbc8d8cb1484ef3056129_sandwich icon.png",
    title: "Sandwich",
    href: "#",
  },
  {
    id: 6,
    image: "src/assets/images/661cbc998b5bdd7f338f485a_drinks icon.png",
    title: "Drinks",
    href: "#",
  },
  {
    id: 7,
    image: "src/assets/images/661cbcb9533d0a6b182cee2d_chicken-icon.png",
    title: "Sides & Fries",
    href: "#",
  },
  {
    id: 8,
    image: "src/assets/images/661cbcb5dd419285fc7219d1_meal icon.png",
    title: "Kids' Meals",
    href: "#",
  },
];

export default SwiperSliderData;

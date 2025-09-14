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
  firstParagraph?: string; 
};

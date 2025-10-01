import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Type for each slide
export interface Slide {
  id: number;
  header: string;
  title: string;
  description: string;
  image: string;
}

// Fetcher
const fetchHomeHeaderData = async (): Promise<Slide[]> => {
  const { data } = await axios.get("http://localhost:3001/HomePagination");
  return data;
};

// Custom hook
export const useHomeHeaderData = () => {
  return useQuery<Slide[]>({
    queryKey: ["HomeHeaderSection"],
    queryFn: fetchHomeHeaderData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

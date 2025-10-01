import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Type definitions
export interface FooterCompany {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
}

export interface FooterLink {
  id: number;
  title: string;
  href: string;
}

export interface FooterHour {
  day: string;
  time: string;
}

export interface FooterNewsletter {
  placeholder: string;
  description: string;
}

export interface FooterSocial {
  id: number;
  platform: string;
  href: string;
}

export interface FooterData {
  company: FooterCompany;
  links: FooterLink[];
  hours: FooterHour[];
  newsletter: FooterNewsletter;
  social: FooterSocial[];
  copyright: string;
}

// Fetcher function
const fetchFooterData = async (): Promise<FooterData> => {
  const { data } = await axios.get("http://localhost:3001/footer");
  return data;
};

// Custom hook
export const useFooterData = () => {
  return useQuery<FooterData>({
    queryKey: ["footer"],
    queryFn: fetchFooterData,
    staleTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false, 
  });
};

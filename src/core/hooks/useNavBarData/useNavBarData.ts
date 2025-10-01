import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface NavbarMenuItem {
  id: number;
  title: string;
  href: string;
}

interface NavbarIconItem {
  id: number;
  icon: string;
}

interface NavBarData {
  Menu: NavbarMenuItem[];
  icons: NavbarIconItem[];
  logo: string[];
}

const fetchNavBarData = async (): Promise<NavBarData> => {
  const { data } = await axios.get("http://localhost:3001/navbar");
  return data;
};

export const useNavBarData = () => {
  return useQuery({
    queryKey: ["navbar"],
    queryFn: fetchNavBarData,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });
};

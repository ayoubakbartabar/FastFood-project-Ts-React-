import { useState, useEffect, useCallback } from "react";
import type { Product } from "../../../store/cartStore";

interface UseProductDataReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProductData = (): UseProductDataReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/products", { signal });
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err: unknown) {
      if ((err as DOMException)?.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error(err);
        setError((err as Error)?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);

    return () => controller.abort(); 
  }, [fetchProducts]);

  return { products, loading, error, refetch: () => fetchProducts() };
};

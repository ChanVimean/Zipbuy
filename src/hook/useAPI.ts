import type { Categories } from "@/types/Product";
import { useEffect, useState } from "react";

interface Product {
  categories: Categories;
}

const LOCAL_KEY = "products";

const useAPI = <T extends Product>(
  category: Categories | "all"
): [T[], boolean, string | null] => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFromLocalStorage = async () => {
      try {
        const stored = localStorage.getItem(LOCAL_KEY);
        if (!stored) throw new Error("No local data found");

        const parsed: unknown = JSON.parse(stored);
        const allData = Array.isArray(parsed) ? (parsed as T[]) : [];

        const filtered =
          category === "all"
            ? allData
            : allData.filter((item: T) => item.categories === category);

        setData(filtered);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchFromLocalStorage();
  }, [category]);

  return [data, loading, error];
};

export default useAPI;

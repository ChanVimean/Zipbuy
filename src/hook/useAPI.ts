import fetchApi from "../utils/fetchApi";
import type { Categories } from "../types/Product";
import { useEffect, useState } from "react";

interface Product {
  categories: Categories;
}

const useAPI = <T extends Product>(
  category: Categories
): [T[], boolean, string | null] => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoies = async () => {
      try {
        const res = await fetchApi();
        const filtered = (res as T[]).filter(
          (item) => item.categories === category
        );
        setData(filtered);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Failed to fetch data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoies();
  }, [category]);

  return [data, loading, error];
};

export default useAPI;

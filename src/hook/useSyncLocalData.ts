import type { BaseProduct } from "@/types/Product";
import fetchApi from "@/utils/fetchApi";
import { useEffect } from "react";

const LOCAL_KEY = "products";

const useSyncLocalData = () => {
  useEffect(() => {
    const syncData = async () => {
      try {
        const res: BaseProduct[] = await fetchApi();
        localStorage.setItem(LOCAL_KEY, JSON.stringify(res));
      } catch (error) {
        console.error("Failed to sync with API: ", error);
      }
    };

    const exiting = localStorage.getItem(LOCAL_KEY);
    if (!exiting) syncData();
  }, []);
};

export default useSyncLocalData;

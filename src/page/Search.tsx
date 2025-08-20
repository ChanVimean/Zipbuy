import ProductCard from "@/components/ProductCard";
import useAPI from "@/hook/useAPI";
import type { BaseProduct } from "@/types/Product";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [data] = useAPI<BaseProduct>("all");
  const [searchParams] = useSearchParams(); // query or brand

  const category = searchParams.get("category") || undefined;
  const brand = searchParams.get("brand") || undefined;
  const query = searchParams.get("query") || undefined;

  // Filter data
  const filtered = useMemo(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      return data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          item.brand.toLowerCase().includes(lowerQuery) ||
          item.categories.toLowerCase().includes(lowerQuery)
      );
    }

    if (category) {
      return data.filter(
        (item) => item.categories.toLowerCase() === category.toLowerCase()
      );
    }

    if (brand) {
      return data.filter(
        (item) => item.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    return [];
  }, [data, query, category, brand]);

  const header = query
    ? `Search results for "${query}"`
    : category
    ? `Category: ${category}`
    : brand
    ? `Brand: ${brand}`
    : "No results";

  return (
    <div>
      <h1 className="font-semibold text-lg md:text-xl lg:text-2xl mb-4">
        {header}
      </h1>

      <ProductCard
        data={filtered}
        descLines={2}
        gridbox="grid"
        titleLines={1}
        pagination={true}
        rows={5}
      />
    </div>
  );
};

export default Search;

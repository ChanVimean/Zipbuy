import useAPI from "@/hook/useAPI";
import { useDebounce } from "@/hook/useDebounce";
import type { BaseProduct } from "@/types/Product";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command, CommandEmpty, CommandItem, CommandList } from "./ui/command";
import { Input } from "./ui/input";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";

const SearchEngine = () => {
  const [data] = useAPI<BaseProduct>("all");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BaseProduct[]>([]);
  const [open, setOpen] = useState<boolean>(true);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  // Filter results based on search query
  useEffect(() => {
    if (!debouncedQuery.trim()) return setResults([]);

    const lowerQuery = debouncedQuery.trim().toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.brand.toLowerCase().includes(lowerQuery) ||
        item.categories.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [debouncedQuery, data]);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductSelect = (item: BaseProduct) => {
    navigate(
      `/Search?query=${encodeURIComponent(
        item.name
      )}&category=${encodeURIComponent(
        item.categories
      )}&brand=${encodeURIComponent(item.brand)}`
    );
    setQuery("");
    setOpen(false);
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/Search?category=${encodeURIComponent(category)}`);
    setQuery("");
    setOpen(false);
  };

  const handleBrandSelect = (brand: string) => {
    navigate(`/Search?brand=${encodeURIComponent(brand)}`);
    setQuery("");
    setOpen(false);
  };

  const uniqueCategories = [...new Set(results.map((r) => r.categories))];
  const uniqueBrands = [...new Set(results.map((r) => r.brand))];

  return (
    <div className="w-full relative text-slate-950" ref={ref}>
      <Command>
        <Input
          placeholder="Search Product..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.trim() && setOpen(true)}
          className="w-full bg-white"
        />

        {open && query.trim() && (
          <CommandList className="absolute z-50 mt-12 w-full max-h-80 overflow-auto rounded-sm bg-white shadow scrollbar-hide">
            {/* Product Section */}
            {results.length > 0 &&
              results.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleProductSelect(item)}
                  className="cursor-pointer flex justify-between items-center px-2 py-1 hover:bg-gray-100"
                >
                  <article className="flex items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-16 h-auto object-contain"
                    />
                    <div className="flex flex-col ml-2">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500">
                        {item.categories}
                      </span>
                    </div>
                  </article>
                  <IoIosArrowForward className="text-gray-400 me-1.5" />
                </CommandItem>
              ))}

            {/* Category Section */}
            {uniqueCategories.length > 0 && (
              <>
                <CommandEmpty className="mt-2">Categories</CommandEmpty>
                {uniqueCategories.map((category: string) => (
                  <CommandItem
                    key={category}
                    onSelect={() => handleCategorySelect(category)}
                    className="flex justify-between items-center cursor-pointer px-2 py-1 hover:bg-gray-100"
                  >
                    <span className="font-medium">{category}</span>
                    <span className="text-gray-500 px-2 py-0.5 rounded">
                      View all
                    </span>
                  </CommandItem>
                ))}
              </>
            )}

            {/* Brand Section */}
            {uniqueBrands.length > 0 && (
              <>
                <CommandEmpty className="mt-2">Brands</CommandEmpty>
                {uniqueBrands.map((brand: string) => (
                  <CommandItem
                    key={brand}
                    onSelect={() => handleBrandSelect(brand)}
                    className="flex justify-between items-center cursor-pointer px-2 py-1 hover:bg-gray-100"
                  >
                    <span className="font-medium">{brand}</span>
                    <span className="text-gray-500 px-2 py-0.5 rounded">
                      View all
                    </span>
                  </CommandItem>
                ))}
              </>
            )}

            {results.length === 0 && (
              <CommandEmpty>No results found</CommandEmpty>
            )}
          </CommandList>
        )}

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(false);
            }}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <RxCross2 />
          </button>
        )}
      </Command>
    </div>
  );
};

export default SearchEngine;

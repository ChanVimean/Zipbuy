import useAPI from "@/hook/useAPI";
import { useDebounce } from "@/hook/useDebounce";
import type { BaseProduct } from "@/types/Product";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command, CommandEmpty, CommandItem, CommandList } from "./ui/command";
import { Input } from "./ui/input";
import { RxCross2 } from "react-icons/rx";

const SearchEngine: React.FC = () => {
  const [data] = useAPI<BaseProduct>("all");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BaseProduct[]>([]);
  const [open, setOpen] = useState<boolean>(true);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) return setResults([]);

    const lowerQuery = debouncedQuery.trim().toLowerCase();

    const filtered =
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          item.brand.toLowerCase().includes(lowerQuery)
      ) ?? [];

    setResults(filtered);
  }, [debouncedQuery, data]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: BaseProduct) => {
    localStorage.setItem("search", JSON.stringify([item]));
    navigate("/products");
    setQuery("");
  };

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
          onFocus={() => query.trim() && setOpen(false)}
          className="w-full bg-white"
        />
        {/* Only render results if there is a query */}
        {open && query.trim() && (
          <CommandList className="absolute z-50 mt-12 w-full max-h-60 overflow-auto rounded-lg bg-white shadow scrollbar-hide">
            {results.length === 0 ? (
              <CommandEmpty>No results found</CommandEmpty>
            ) : (
              results.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item)}
                  className="cursor-pointer"
                >
                  <img
                    src={item.thumbnail}
                    alt="Search Image"
                    className="w-16 h-auto object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.brand}</span>
                  </div>
                </CommandItem>
              ))
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

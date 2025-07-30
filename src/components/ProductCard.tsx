import type { BaseProduct } from "@/types/Product";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import LineClampText from "./LineClampText";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useSelector } from "react-redux";
import type { RootState } from "@/context/store";
import { IoMdMore } from "react-icons/io";

interface ProductCardProps {
  title?: string;
  data: BaseProduct[];
  gridbox?: "grid" | "carousel";
  titleLines?: 1 | 2 | 3 | 4 | 5;
  descLines?: 1 | 2 | 3 | 4 | 5;
  pagination?: boolean;
  rows?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title = "",
  data,
  gridbox = "grid",
  titleLines = 1,
  descLines = 2,
  pagination = false,
  rows = 3,
}) => {
  const [favorite, setFavorite] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const theme = useSelector((state: RootState) => state.theme.theme);

  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (!(gridbox === "grid" && pagination)) return;
      if (!containerRef.current) return;

      const width = window.innerWidth;
      let cols = 2; // default

      if (width >= 1024) cols = 6;
      else if (width >= 768) cols = 3;

      const rowCount = Math.max(1, rows);
      setItemsPerPage(cols * rowCount);
    };

    updateItemsPerPage(); // on mount
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [gridbox, pagination, rows]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination
    ? data.slice(startIndex, startIndex + itemsPerPage)
    : data;

  useEffect(() => {
    const initialFavorites: Record<number, boolean> = {};
    data.forEach((_, index) => {
      initialFavorites[index] = false;
    });
    setCurrentPage(1);
    setFavorite(initialFavorites);
  }, [data]);

  const toggleFavorite = (index: number) => {
    setFavorite((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // ? Grid Layout
  const RenderGrid = (card: BaseProduct, index: number) => {
    const price = (card.price - card.price * card.discount).toFixed(2);
    const [intPart, decimalPart] = price.split(".");

    return (
      <Card
        key={index}
        className="relative flex flex-col border-2 pt-0 overflow-hidden gap-2"
      >
        <aside className="w-full overflow-hidden rounded-b-lg shadow-sm">
          <img
            src={card.thumbnail}
            alt={card.name}
            className="w-full h-auto object-cover object-center"
          />
        </aside>
        <CardHeader className="w-full flex flex-col justify-between text-start space-x-2 mt-2 px-4">
          <article>
            <LineClampText
              text={card.name}
              lines={titleLines}
              classText="font-semibold text-md md:text-lg lg:text-xl"
            />
          </article>
          <article className="w-full flex justify-between">
            <span className="font-medium text-sm md:text-md lg:text-lg">
              ${intPart}
              <span className="text-xs relative -top-[4px] ml-0.5">
                .{decimalPart}
              </span>
            </span>
            <span className="text-xs">⭐ ({card.rating})</span>
          </article>
        </CardHeader>
        <CardDescription className="hidden lg:block px-4">
          <LineClampText
            text={card.desc}
            lines={descLines}
            classText="text-xs"
          />
        </CardDescription>
        <CardFooter className="flex items-center justify-between text-start mt-2">
          <button className="w-full text-2xl cursor-pointer">
            <FaCartPlus />
          </button>

          <button className="text-2xl lg:text-3xl cursor-pointer">
            <IoMdMore />
          </button>
        </CardFooter>

        {/* Overlay */}
        <CardAction className="absolute z-10 right-2 top-2 md:right-3 md:top-3 lg:right-4 lg:top-4">
          <button
            onClick={() => toggleFavorite(index)}
            className="bg-white rounded-full p-2 text-lg md:text-xl lg:text-2xl"
          >
            {favorite[index] ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </CardAction>
      </Card>
    );
  };

  return (
    <div className="space-y-2 md:space-y-4 lg:space-y-4">
      <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">{title}</h1>

      {gridbox === "grid" ? (
        <div className="space-y-16">
          <section>
            <div
              ref={containerRef}
              className="columns-2 md:columns-3 lg:columns-6 gap-4 mx-auto"
            >
              {paginatedData.map((card, index) => (
                <div key={index} className="break-inside-avoid mb-4">
                  {RenderGrid(card, index)}
                </div>
              ))}
            </div>
          </section>

          {pagination && totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="cursor-pointer border hover:bg-blue-50 active:bg-blue-100"
                  />
                </PaginationItem>

                {currentPage > 2 && (
                  <PaginationItem>
                    <span className="px-2 text-gray-400">...</span>
                  </PaginationItem>
                )}

                {[
                  currentPage - 2,
                  currentPage - 1,
                  currentPage,
                  currentPage + 1,
                  currentPage + 2,
                ]
                  .filter((page) => page >= 1 && page <= totalPages)
                  .map((page) => {
                    const isActive = page === currentPage;

                    const activeTextColor =
                      theme === "dark" ? "text-[var(--bg-theme)]" : "";

                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={isActive}
                          onClick={() => setCurrentPage(page)}
                          className={`cursor-pointer ${
                            isActive
                              ? `bg-white ${activeTextColor} font-semibold border border-[var(--text-theme)]`
                              : "text-[var(--text-theme)]"
                          }`}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                {currentPage < totalPages - 1 && (
                  <PaginationItem>
                    <span className="px-2 text-gray-400">...</span>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="cursor-pointer border hover:bg-blue-50 active:bg-blue-100"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      ) : (
        <Carousel
          opts={{ align: "start" }}
          className="flex items-center justify-between space-x-4"
        >
          <CarouselContent>
            {data.map((card, index) => (
              <CarouselItem
                key={index}
                className="space-y-2 basis-1/3 md:basis-1/4 lg:basis-1/6 overflow-hidden"
              >
                <aside className="w-full h-24 md:h-36 lg:h-52 overflow-hidden rounded-sm shadow-sm">
                  <img
                    src={card.thumbnail}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </aside>
                <h1 className="w-full text-start">
                  <LineClampText
                    text={card.name}
                    lines={1}
                    classText="font-medium text-sm md:text-md lg:text-lg"
                  />
                </h1>
                <p className="block lg:hidden text-xs">⭐ ({card.rating})</p>
                <div className="flex flex-col lg:flex-row justify-between items-center">
                  <button
                    className="rounded-full text-sm
                      px-2 py-1 lg:px-3.5 lg:py-1.5
                      border-2 border-slate-500 shadow-sm
                      font-medium hover:font-semibold cursor-pointer duration-150 ease-in-out
                      hover:bg-gray-100 active:bg-white"
                  >
                    Add to Cart
                  </button>
                  <p className="hidden lg:block">⭐ ({card.rating})</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex text-slate-950" />
          <CarouselNext className="hidden lg:flex text-slate-950" />
        </Carousel>
      )}
    </div>
  );
};

export default ProductCard;

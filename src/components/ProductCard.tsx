import type { BaseProduct } from "@/types/Product";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import LineClampText from "./LineClampText";
import { FaCartPlus } from "react-icons/fa";
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
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/context/store";
import { IoMdMore } from "react-icons/io";
import { addToCart } from "@/context/slices/cartSlice";
import { Link } from "react-router-dom";

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
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.theme.theme);

  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const handleAddToCart = (product: BaseProduct) => {
    const price = (product.price - product.price * product.discount).toFixed(2);

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        desc: product.desc,
        thumbnail: product.thumbnail,
        price: Number(price),
        limited: product.limited,
      })
    );
  };

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
  }, [data]);

  // ? Grid Layout
  const RenderGrid = (card: BaseProduct, index: number) => {
    const rawPrice = card.price * (1 - card.discount);
    const [intPart, decimalPart] = rawPrice.toFixed(2).split(".");

    return (
      <Link to={`/Detail/${card.categories}/${card.id}`} className="block">
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
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(card);
              }}
              className="w-full text-2xl cursor-pointer"
            >
              <FaCartPlus />
            </button>

            <button
              onClick={(e) => e.stopPropagation()}
              className="text-2xl lg:text-3xl cursor-pointer"
            >
              <IoMdMore />
            </button>
          </CardFooter>
        </Card>
      </Link>
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
            {data.map((card, index) => {
              const rawPrice = card.price * (1 - (card.discount ?? 0));
              const [intPart, decimalPart] = rawPrice.toFixed(2).split(".");

              return (
                <CarouselItem
                  key={index}
                  className="space-y-4 basis-1/3 md:basis-1/4 lg:basis-1/6 overflow-hidden"
                >
                  <Link
                    to={`/Detail/${card.categories}/${card.id}`}
                    className="block"
                  >
                    <aside className="w-full h-24 md:h-36 lg:h-52 overflow-hidden rounded-sm shadow-sm">
                      <img
                        src={card.thumbnail}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    </aside>

                    {/* Container */}
                    <article className="space-y-2 px-2">
                      <h1 className="w-full text-start">
                        <LineClampText
                          text={card.name}
                          lines={1}
                          classText="font-medium text-sm md:text-md lg:text-lg"
                        />
                      </h1>

                      {/* Price row */}
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-md md:text-lg lg:text-xl">
                          ${intPart}
                          <span className="text-xs relative -top-[4px] ml-0.5">
                            .{decimalPart}
                          </span>
                        </span>
                        <span className="text-xs">⭐ ({card.rating})</span>
                      </div>

                      {/* Action & More buttons*/}
                      <div className="flex justify-between items-center mt-6">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(card);
                          }}
                          className="text-2xl md:text-3xl cursor-pointer"
                        >
                          <FaCartPlus />
                        </button>
                        <button className="text-3xl cursor-pointer">
                          <IoMdMore />
                        </button>
                      </div>
                    </article>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="hidden lg:flex text-slate-950" />
          <CarouselNext className="hidden lg:flex text-slate-950" />
        </Carousel>
      )}
    </div>
  );
};

export default ProductCard;

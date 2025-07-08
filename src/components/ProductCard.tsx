import type { BaseProduct } from "@/types/Product";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import LineClampText from "./LineClampText";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface ProductCardProps {
  title: string;
  data: BaseProduct[];
  gridbox?: "grid" | "carousel";
  titleLines?: 1 | 2 | 3 | 4 | 5;
  descLines?: 1 | 2 | 3 | 4 | 5;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  data,
  gridbox = "grid",
  titleLines = 1,
  descLines = 2,
}) => {
  const [favorite, setFavorite] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const initialFavorites: Record<number, boolean> = {};
    data.forEach((_, index) => {
      initialFavorites[index] = false;
    });
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
        className={"relative flex flex-col border-2 pt-0 overflow-hidden"}
      >
        <aside className="w-full h-48 md:h-64 lg:h-80 overflow-hidden rounded-b-lg shadow-sm">
          <img
            src={card.thumbnail}
            alt={card.name}
            className="w-full h-full object-cover object-center"
          />
        </aside>
        <CardHeader className="w-full flex flex-col md:flex-row justify-between space-x-2 items-start md:items-end mt-2 px-4">
          <span>
            <LineClampText
              text={card.name}
              lines={titleLines}
              classText="font-semibold text-lg md:text-xl lg:text-2xl"
            />
          </span>
          <span className="font-medium text-sm md:text-md lg:text-lg">
            ${intPart}
            <span className="text-xs relative -top-[4px] ml-0.5">
              .{decimalPart}
            </span>
          </span>
        </CardHeader>
        <CardDescription className="px-4">
          <LineClampText text={card.desc} lines={descLines} />
        </CardDescription>
        <CardContent className="text-sm">⭐ ({card.rating})</CardContent>
        <CardFooter className="text-center md:text-start">
          <button
            className="rounded-full px-4 py-2 lg:px-6 lg:py-3
              border-2 border-slate-500 shadow-sm
              font-medium hover:font-semibold cursor-pointer duration-150 ease-in-out
              hover:bg-gray-100 active:bg-white"
          >
            Add to Card
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
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {data.map((card, index) => RenderGrid(card, index))}
        </section>
      ) : (
        <Carousel
          opts={{ align: "start" }}
          className="w-full flex items-center justify-between space-x-4"
        >
          <CarouselPrevious className="static hidden md:block" />
          <CarouselContent>
            {data.map((card, index) => (
              <CarouselItem
                key={index}
                className="space-y-2 basis-1/3 md:basis-1/4 lg:basis-1/6 overflow-hidden"
              >
                <aside className="w-full h-24 md:h-36 lg:h-52 overflow-hidden rounded-b-lg shadow-sm">
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
                <div className="flex justify-between items-center">
                  <button
                    className="rounded-full text-sm
                      px-2 py-1 lg:px-3.5 lg:py-1.5
                      border-2 border-slate-500 shadow-sm
                      font-medium hover:font-semibold cursor-pointer duration-150 ease-in-out
                      hover:bg-gray-100 active:bg-white"
                  >
                    Add to Cart
                  </button>
                  <p>⭐ ({card.rating})</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="static hidden md:block" />
        </Carousel>
      )}
    </div>
  );
};

export default ProductCard;

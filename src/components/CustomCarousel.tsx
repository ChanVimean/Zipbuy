import type { BaseProduct } from "@/types/Product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface CustomCarouselProps {
  title: string;
  items: BaseProduct[];
  filterCondition?: (item: BaseProduct) => boolean;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  title,
  items,
  filterCondition,
}) => {
  const filteredItems = filterCondition ? items.filter(filterCondition) : items;

  return (
    <div className="space-y-2 rounded-md overflow-hidden">
      <h2 className="font-semibold text-lg md:text-2xl">{title}</h2>

      <Carousel className="flex items-center space-x-2">
        <CarouselPrevious className="static text-slate-900" />
        <CarouselContent>
          {filteredItems.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded">
                  ${(item.price - item.price * item.discount).toFixed(2)}
                </div>
              </div>
              <h3 className="text-lg font-semibold mt-2 text-center">
                {item.name}
              </h3>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="static text-slate-950" />
      </Carousel>
    </div>
  );
};

export default CustomCarousel;

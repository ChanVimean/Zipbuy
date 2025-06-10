import { type BaseProduct } from "@/types/Product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { FaCartPlus, FaRegHeart } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";

interface CarouselDetailInterface {
  data: BaseProduct[];
  filterFn: (item: BaseProduct) => boolean;
}

const CarouselDetail: React.FC<CarouselDetailInterface> = ({
  data,
  filterFn,
}) => {
  const filtered = data.filter(filterFn);

  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-2xl">Limited Edition</h2>
      <Carousel>
        <CarouselContent>
          {filtered.map(
            ({ thumbnail, name, brand, rating, discount, price }, index) => (
              <CarouselItem
                key={index}
                className="basis-1/5 relative overflow-hidden"
              >
                <div className="h-4/5 w-auto">
                  <img
                    src={thumbnail}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Hover Effect */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20
                  transition-all duration-300 flex items-center justify-center gap-4 opacity-0
                  group-hover:opacity-100"
                >
                  <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 hover:scale-110 transition-all">
                    <FaCartPlus className="text-gray-800" />
                  </button>
                  <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 hover:scale-110 transition-all">
                    <FaRegHeart className="text-gray-800" />
                  </button>
                  <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 hover:scale-110 transition-all">
                    <TbListDetails className="text-gray-800" />
                  </button>
                </div>

                <h2 className="text-md text-gray-500 font-medium">{brand}</h2>
                <h2 className="text-xl font-semibold">{name}</h2>
                <p>Rating: {rating} ⭐</p>
                <p className="font-semibold text-lg">${price}</p>

                {/* Overlay */}
                <div
                  className="absolute w-auto z-10 top-1 right-1 bg-yellow-500/90
                    text-[var(--retext-theme)] px-2 py-1 rounded font-semibold text-lg"
                >
                  <h3>Discount {discount * 100}%</h3>
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselDetail;

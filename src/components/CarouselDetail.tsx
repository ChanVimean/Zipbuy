import { type BaseProduct } from "@/types/Product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface CarouselDetailInterface {
  title: string;
  data: BaseProduct[];
  filterFn: (item: BaseProduct) => void;
}

const CarouselDetail: React.FC<CarouselDetailInterface> = ({
  title,
  data,
  filterFn,
}) => {
  const filtered = data.filter(filterFn);

  return (
    <div className="space-y-2">
      <aside className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">{title}</h2>
        <button>See All</button>
      </aside>
      <Carousel>
        <CarouselContent>
          {filtered.map(
            ({ thumbnail, name, brand, rating, discount, price }, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-2/5 lg:basis-1/5 relative overflow-hidden"
              >
                <div className="aspect-[3/2] w-full">
                  <img
                    src={thumbnail}
                    alt={name}
                    className="w-full h-full object-cover bg-[var(--frame-theme)]"
                  />
                </div>

                <div className="custom-scrollbar">
                  <h2 className="text-md text-gray-500 font-medium">{brand}</h2>
                  <h2 className="text-xl font-semibold truncate whitespace-nowrap overflow-hidden">
                    {name}
                  </h2>
                  <p>⭐ {rating}</p>
                  <p className="font-semibold text-lg">
                    ${(price - price * discount).toFixed(2)}
                  </p>
                </div>

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
        <CarouselPrevious className="text-black" />
        <CarouselNext className="text-black" />
      </Carousel>
    </div>
  );
};

export default CarouselDetail;

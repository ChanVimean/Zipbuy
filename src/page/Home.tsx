import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useAPI from "@/hook/useAPI";
import { type BaseProduct, type Laptops } from "@/types/Product";
import type { JSX } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

type MiniSectionType = {
  title: string;
  subtitle: string;
  text: string;
  icon: JSX.Element;
};

const Home = () => {
  const [data, dataLoading, dataError] = useAPI<BaseProduct>("all");
  const [laptops, laptopLoading, laptopError] = useAPI<Laptops>("laptops");

  const miniSections: MiniSectionType[] = [
    {
      title: "+200$",
      subtitle: "Free Shipping",
      text: "Spend more than 200$ to get free shipping anywhere!",
      icon: <FaBoxOpen />,
    },
    {
      title: "-30%",
      subtitle: "Sign up",
      text: "Sign up to get 30% discount",
      icon: <MdDiscount />,
    },
  ];

  if (laptopLoading) return <div>Loading...</div>;
  if (laptopError) return <div>{laptopError}</div>;
  if (laptops.length === 0) return <div>No laptops available</div>;

  if (dataLoading) return <div>Loading</div>;
  if (dataError) return <div>{dataError}</div>;

  const topRated = data.filter((item) => item.rating >= 7.0);

  return (
    <div className="grid py-2 md:py-8 gap-8 w-full">
      {/* Top Row */}
      <section className="lg:h-[500px] rounded-lg overflow-hidden">
        <img
          src={
            "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?cs=srgb&dl=pexels-pixabay-356056.jpg&fm=jpg"
          }
          alt="Top Laptop"
          className="w-full h-full object-cover object-center"
        />
      </section>

      {/* Mini Pages */}
      <section className="flex justify-between gap-8 mb-8 overflow-hidden">
        {miniSections.map((sect, index) => (
          <aside
            key={index}
            className="w-full flex justify-between bg-[var(--frame-theme)] rounded-lg px-6 py-8 gap-12"
          >
            <div className="w-1/3 text-center space-y-2">
              <h3 className="text-lg font-medium">{sect.subtitle}</h3>
              <h1 className="font-semibold text-4xl">{sect.title}</h1>
            </div>
            <div className="w-1/3 flex items-center">
              <p>{sect.text}</p>
            </div>
            <div className="w-1/3 flex items-center justify-center text-6xl">
              {sect.icon}
            </div>
          </aside>
        ))}
      </section>

      {/* Brand Collection Carousel */}
      <section className="border-2 shadow-sm rounded-lg py-4 bg-blue-200 overflow-hidden">
        <Carousel>
          <CarouselContent>
            {data.map(({ brand, brandLogo }, index) => (
              <CarouselItem
                key={index}
                className="basis-1/12 flex items-center justify-center"
              >
                <img
                  src={brandLogo}
                  alt={brand}
                  className="h-16 w-auto object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Trend */}
      <section className="flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full flex items-start">
          <h1 className="font-semibold text-2xl">Trending</h1>
        </div>
        <Carousel className="w-11/12 space-y-4">
          <CarouselContent>
            {topRated.map((rate, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 md:basis-1/3 lg:basis-1/6"
              >
                <div className="relative w-full h-[150px] md:h-[200px]">
                  <img
                    src={rate.thumbnail}
                    alt={rate.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <aside
                    className="absolute w-5/6 z-10 bottom-2 left-1/2 -translate-x-1/2 bg-black/60
                      text-[var(--retext-theme)] px-2 py-1 rounded font-semibold text-lg text-center"
                  >
                    <h3>{rate.name}</h3>
                  </aside>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Limited Edition */}
    </div>
  );
};

export default Home;

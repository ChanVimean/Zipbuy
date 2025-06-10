import CarouselDetail from "@/components/CarouselDetail";
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
import { FaGuilded, FaQuestion } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";

type MiniSectionType = {
  title: string;
  icon: JSX.Element;
  link: string;
};

const Home = () => {
  const [data, dataLoading, dataError] = useAPI<BaseProduct>("all");
  const [laptops, laptopLoading, laptopError] = useAPI<Laptops>("laptops");

  const miniSections: MiniSectionType[] = [
    { title: "About Us", icon: <FaQuestion />, link: "" },
    { title: "Services", icon: <RiCustomerService2Line />, link: "" },
    { title: "Guild", icon: <FaGuilded />, link: "" },
  ];

  if (laptopLoading) return <div>Loading...</div>;
  if (laptopError) return <div>{laptopError}</div>;
  if (laptops.length === 0) return <div>No laptops available</div>;

  if (dataLoading) return <div>Loading</div>;
  if (dataError) return <div>{dataError}</div>;

  const topRated = data.filter((item) => item.rating >= 7.0);

  return (
    <div className="grid py-2 md:py-8 gap-8">
      {/* Top Row */}
      <section className="relative lg:h-[500px] overflow-hidden">
        {/* Column Middle */}
        <div className="overflow-hidden h-full">
          <img
            src={
              "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?cs=srgb&dl=pexels-pixabay-356056.jpg&fm=jpg"
            }
            alt="Top Laptop"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Model overlay */}
        <div className="absolute inset-0 flex items-center justify-center hover:bg-black/50 transition duration-300 cursor-pointer"></div>
      </section>

      {/* Mini Pages */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
        {miniSections.map((section, index) => (
          <a
            key={index}
            href={section.link}
            className="flex justify-center items-center col-span-1 py-20 font-bold text-3xl bg-[var(--frame-theme)] space-x-6"
          >
            <span className="text-4xl">{section.icon}</span>
            <span>{section.title}</span>
          </a>
        ))}
      </section>

      {/* Top Trend */}
      <section>
        <Carousel opts={{ slidesToScroll: 1.5 }}>
          <CarouselContent className="">
            {topRated.map((rate, index) => (
              <CarouselItem
                key={index}
                className="basic-1 md:basis-1/3 lg:basis-1/4 snap-start relative overflow-hidden"
              >
                <img
                  src={rate.thumbnail}
                  alt={rate.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute w-5/6 z-10 bottom-2 left-1/2 -translate-x-1/2 bg-black/60
                    text-[var(--retext-theme)] px-2 py-1 rounded font-semibold text-lg text-center"
                >
                  <h3>{rate.name}</h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/*  */}
      <section>
        <CarouselDetail
          data={data}
          filterFn={(item) => item.limited === true}
        />
      </section>
    </div>
  );
};

export default Home;

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
    <div className="grid py-2 md:py-8 gap-8 w-full">
      {/* Top Row */}
      <section className="lg:h-[500px] overflow-hidden">
        <img
          src={
            "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?cs=srgb&dl=pexels-pixabay-356056.jpg&fm=jpg"
          }
          alt="Top Laptop"
          className="w-full h-full object-cover object-center"
        />
      </section>

      {/* Mini Pages */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-16 overflow-hidden">
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

      {/* Trend */}
      <section className="flex items-center justify-center">
        <Carousel opts={{ slidesToScroll: 1.5 }} className="md:w-[95%]">
          <CarouselContent>
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
          <CarouselPrevious className="hidden md:flex text-black" />
          <CarouselNext className="hidden md:flex text-black" />
        </Carousel>
      </section>

      {/* Limited Edition */}
      <section className="flex justify-center items-center mt-16">
        <div className="w-[95%]">
          <CarouselDetail
            title="Limited Edition"
            data={data}
            filterFn={(item) => item.limited === true && item.discount > 0}
          />
        </div>
      </section>

      {/* Top Rate */}
      {/* <section className="flex justify-center items-center">
        <div className="w-[95%]">
          <CarouselDetail
            title="Top Rate"
            data={data}
            filterFn={(item) => item.available === true && item.rating >= 7}
          />
        </div>
      </section> */}
    </div>
  );
};

export default Home;

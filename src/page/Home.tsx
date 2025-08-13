import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useAPI from "@/hook/useAPI";
import { type BaseProduct } from "@/types/Product";
import { useMemo, type JSX } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import CustomCarousel from "@/components/CustomCarousel";
import { FramerAutoSlider } from "@/components/FramerComponents";
import { useSelector } from "react-redux";
import type { RootState } from "@/context/store";

type MiniSectionType = {
  title: string;
  subtitle: string;
  text: string;
  icon: JSX.Element;
};

const Home = () => {
  const [data] = useAPI<BaseProduct>("all");
  const theme = useSelector((state: RootState) => state.theme.theme);

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

  const uniqueBrand = useMemo(() => {
    const seen = new Set();
    const unique = data.filter((item) => {
      const key = item.brand.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return unique.sort((a, b) => a.brand.localeCompare(b.brand));
  }, [data]);

  const newReleaseFilter = (item: BaseProduct) =>
    item.rating >= 7 && item.available;

  // if (dataLoading) return <div>Loading</div>;
  // if (dataError) return <div>{dataError}</div>;

  const spotlights = data.filter(
    (item) =>
      item.limited === true && item.rating >= 9 && item.available === true
  );

  return (
    <div className="grid md:py-8 w-full py-2 px-2 md:p-4 lg:px-0 lg:py-8 gap-4 md:gap-8">
      {/* Top Row */}
      <section>
        <FramerAutoSlider data={spotlights} />
      </section>

      {/* Mini Pages */}
      <section className="flex flex-col lg:flex-row justify-between overflow-hidden gap-4 lg:gap-8">
        {miniSections.map((sect, index) => (
          <aside
            key={index}
            className={`w-full flex justify-between rounded-lg
              px-4 py-2
              md:px-0 md:py-4
              lg:px-6 lg:py-8
              gap-6 md:gap-8 lg:gap-12
              ${theme === "light" ? "bg-blue-100" : "bg-cyan-700"}
              `}
          >
            <div className="w-1/5 md:w-1/3 text-center space-y-2">
              <h3 className="font-medium text-sm lg:text-lg">
                {sect.subtitle}
              </h3>
              <h1 className="font-semibold text-2xl lg:text-4xl">
                {sect.title}
              </h1>
            </div>
            <div className="w-3/5 md:w-1/3 flex items-center">
              <p className="text-sm md:text-md lg:text-lg">{sect.text}</p>
            </div>
            <div className="w-1/5 md:w-1/3 flex items-center justify-center text-3xl md:text-4xl lg:text-6xl">
              {sect.icon}
            </div>
          </aside>
        ))}
      </section>

      {/* Thematics */}
      <section className="space-y-12 md:space-y-14 lg:space-y-16 rounded-lg">
        <main className="flex flex-col lg:flex-row justify-evenly items-center space-y-8 lg:space-y-0">
          <aside className="w-[250px] md:w-[500px] lg:w-auto overflow-hidden">
            <img
              src="Thematic.png"
              alt="Thermatic"
              className="w-full h-full object-cover"
            />
          </aside>
          <article className="space-y-8">
            <h1 className="font-semibold text-center lg:text-start text-lg md:text-2xl lg:text-4xl">
              What Sets Us Apart
            </h1>
            <ul className="space-y-8">
              <li className="flex items-center space-x-4">
                <span className="p-4 rounded-lg shadow-md bg-blue-300 text-lg md:text-xl lg:text-2xl">
                  <FaBoltLightning />
                </span>
                <p className="font-medium text-md md:text-lg lg:text-xl">
                  Blazing-fast performance out of the box
                </p>
              </li>
              <li className="flex items-center space-x-4">
                <span className="p-4 rounded-lg shadow-md bg-blue-300 text-lg md:text-xl lg:text-2xl">
                  <FaBoltLightning />
                </span>
                <p className="font-medium text-md md:text-lg lg:text-xl">
                  Purpose-driven design, no fluff
                </p>
              </li>
              <li className="flex items-center space-x-4">
                <span className="p-4 rounded-lg shadow-md bg-blue-300 text-lg md:text-xl lg:text-2xl">
                  <FaBoltLightning />
                </span>
                <p className="font-medium text-md md:text-lg lg:text-xl">
                  Smarter workflows backed by data
                </p>
              </li>
              <li className="flex items-center space-x-4">
                <span className="p-4 rounded-lg shadow-md bg-blue-300 text-lg md:text-xl lg:text-2xl">
                  <FaBoltLightning />
                </span>
                <p className="font-medium text-md md:text-lg lg:text-xl">
                  Human support, not ticket bots
                </p>
              </li>
            </ul>
          </article>
        </main>
        <aside>
          <ul className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-between space-y-8 lg:space-y-0">
            <li className="w-full md:w-1/2 text-center space-x-4">
              <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                Live
              </h1>
              <p>Servers & services are fully operational</p>
            </li>
            <li className="w-full md:w-1/2 text-center space-x-4">
              <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                v2.4.1
              </h1>
              <p>
                You're experiencing our latest features & performance
                improvements
              </p>
            </li>
            <li className="w-full md:w-1/2 text-center space-x-4">
              <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                99.98% Uptime
              </h1>
              <p>
                Engineered for reliability — minimal downtime, maximum trust
              </p>
            </li>
            <li className="w-full md:w-1/2 text-center space-x-4">
              <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                80+ Countries Served
              </h1>
              <p>
                A truly global reach — used and loved by teams around the world
              </p>
            </li>
          </ul>
        </aside>
      </section>

      {/* Brand Carousel */}
      <section className="space-y-2 overflow-hidden">
        <h2 className="font-semibold text-lg md:text-2xl">Categories</h2>
        <Carousel
          className={`shadow-sm rounded-lg py-4 text-slate-950 ${
            theme === "light" ? "bg-blue-100" :"bg-blue-200"
          }`}
        >
          <CarouselContent>
            {uniqueBrand.map(({ brand, brandLogo }, index) => (
              <CarouselItem
                key={index}
                className="basis-1/4 md:basis-1/5 lg:basis-1/10 flex flex-col items-center md:justify-center space-y-2"
              >
                <div className="h-10 md:h-12 lg:h-16 w-auto">
                  <img
                    src={brandLogo}
                    alt={brand}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-center text-sm md:text-md lg:text-lg">
                  {brand}
                </h3>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Carousel Preview */}
      <section className="space-y-4 overflow-hidden">
        <CustomCarousel
          title="New Release"
          items={data}
          filterCondition={newReleaseFilter}
        />
        <div className="inline-block w-full text-center">
          <button
            className="py-2 px-6 rounded-md bg-blue-400 font-medium text-lg text-[var(--retext-theme)]
            cursor-pointer"
          >
            See more
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;

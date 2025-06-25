import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useAPI from "@/hook/useAPI";
import { type BaseProduct, type Laptops } from "@/types/Product";
import { useMemo, type JSX } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";

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

  if (laptopLoading) return <div>Loading...</div>;
  if (laptopError) return <div>{laptopError}</div>;
  if (laptops.length === 0) return <div>No laptops available</div>;

  if (dataLoading) return <div>Loading</div>;
  if (dataError) return <div>{dataError}</div>;

  return (
    <div className="grid py-2 md:py-8 gap-8 w-full">
      {/* Top Row */}
      <section>
        <div className="lg:h-[500px] rounded-lg overflow-hidden">
          <img
            src={
              "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?cs=srgb&dl=pexels-pixabay-356056.jpg&fm=jpg"
            }
            alt="Top Laptop"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* Mini Pages */}
      <section className="flex justify-between gap-8 overflow-hidden text-slate-900">
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

      {/* Brand Carousel */}
      <section className="shadow-sm rounded-lg py-4 bg-[var(--frame-theme)] overflow-hidden">
        <Carousel>
          <CarouselContent>
            {uniqueBrand.map(({ brand, brandLogo }, index) => (
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

      {/* Thematics */}
      <section className="space-y-16 rounded-lg px-32 py-16">
        <main className="flex justify-between items-center">
          <aside className="overflow-hidden">
            <img
              src="Thematic.png"
              alt="Thermatic"
              className="w-full h-full object-cover
            "
            />
          </aside>
          <article className="space-y-8">
            <h1 className="font-semibold text-4xl">What Sets Us Apart</h1>
            <ul className="space-y-8">
              <li className="flex items-center space-x-4">
                <span className="p-4 rounded-lg shadow-md bg-blue-300 text-2xl">
                  <FaBoltLightning />
                </span>
                <p className="font-medium text-xl">
                  Blazing-fast performance out of the box
                </p>
              </li>
              <li className="flex items-center space-x-4">
                <span className="p-4 rounded-lg shadow-md bg-blue-300 text-2xl">
                  <FaBoltLightning />
                </span>
                <p className="font-medium text-xl">
                  Purpose-driven design, no fluff
                </p>
              </li>
              <li className="flex items-center space-x-4">
                <span className="p-4 rounded-lg shadow-md bg-blue-300 text-2xl">
                  <FaBoltLightning />
                </span>
                <p className="font-medium text-xl">
                  Smarter workflows backed by data
                </p>
              </li>
              <li className="flex items-center space-x-4">
                <span className="p-4 rounded-lg shadow-md bg-blue-300 text-2xl">
                  <FaBoltLightning />
                </span>
                <p className="font-medium text-xl">
                  Human support, not ticket bots
                </p>
              </li>
            </ul>
          </article>
        </main>
        <aside>
          <ul className="flex justify-between">
            <li className="text-center space-x-4">
              <h1 className="font-semibold text-3xl">Live</h1>
              <p>Servers & services are fully operational</p>
            </li>
            <li className="text-center space-x-4">
              <h1 className="font-semibold text-3xl">v2.4.1</h1>
              <p>
                You're experiencing our latest features & performance
                improvements
              </p>
            </li>
            <li className="text-center space-x-4">
              <h1 className="font-semibold text-3xl">99.98% Uptime</h1>
              <p>
                Engineered for reliability — minimal downtime, maximum trust
              </p>
            </li>
            <li className="text-center space-x-4">
              <h1 className="font-semibold text-3xl">80+ Countries Served</h1>
              <p>
                A truly global reach — used and loved by teams around the world
              </p>
            </li>
          </ul>
        </aside>
      </section>

      {/* Newsletter */}
      <section></section>
    </div>
  );
};

export default Home;

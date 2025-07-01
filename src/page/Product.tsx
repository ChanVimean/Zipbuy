import Banners from "@/components/Banners";
import LineClampText from "@/components/LineClampText";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAPI from "@/hook/useAPI";
import type { BaseProduct } from "@/types/Product";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Product = () => {
  const [data, dataLoading, dataError] = useAPI<BaseProduct>("all");
  const bannerBtn = () => {};

  return (
    <div className="py-2 px-2 md:p-4 lg:px-0 lg:py-8 gap-4 md:gap-8">
      {/* Banner */}
      <section>
        <Banners
          src="https://png.pngtree.com/thumb_back/fh260/background/20220522/pngtree-ecommerce-banner-planning-segmentation-selection-image_1375247.jpg"
          alt="Banner"
          onMd="md:h-[200px]"
          onLg="lg:h-[400px]"
          title="Grab Upto 50% Off On Selected Headphone"
          btnText="Buy Now"
          btnOnClick={bannerBtn}
          titleColor="light"
        />
      </section>

      {/* Filters */}
      <section className="flex justify-between">
        <main className="flex gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center bg-gray-300 py-4 px-8 rounded-full overflow-hidden shadow-sm space-x-2 font-semibold">
              <h3 className="text-lg">Categories</h3>
              <span className="text-2xl">
                <IoIosArrowDown />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger>Price</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger>Rate</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </main>

        <aside>
          <DropdownMenu>
            <DropdownMenuTrigger>
              Sort By
              <span></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>A-Z</DropdownMenuItem>
              <DropdownMenuItem>Highest Price</DropdownMenuItem>
              <DropdownMenuItem>Lowest Price</DropdownMenuItem>
              <DropdownMenuItem>Top Rate</DropdownMenuItem>
              <DropdownMenuItem>Limited Edition</DropdownMenuItem>
              <DropdownMenuItem>Available</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </aside>
      </section>

      {/* Products */}
      <section className="flex flex-wrap justify-between gap-10">
        {data.map((card, index) => (
          <Card
            key={index}
            className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] flex flex-col pt-0"
          >
            <aside className="w-full h-48 overflow-hidden rounded-b-lg">
              <img
                src={card.thumbnail}
                alt={card.name}
                className="w-full h-full object-cover object-center"
              />
            </aside>
            <CardHeader className="flex justify-between items-end mt-2 px-4">
              <span>
                <LineClampText
                  text={card.name}
                  lines={1}
                  classText="font-semibold text-2xl"
                />
              </span>
              <span className="font-medium text-lg">
                ${card.price - card.price * card.discount}
              </span>
            </CardHeader>
            <CardDescription className="px-4">
              <LineClampText text={card.desc} lines={2} />
            </CardDescription>
            <CardContent className="text-sm">⭐ ({card.rating})</CardContent>
            <CardFooter>
              <button className="rounded-full px-6 py-3 border-2 border-slate-500 shadow-sm">
                Add to Card
              </button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Product;

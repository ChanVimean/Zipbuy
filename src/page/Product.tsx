import Banners from "@/components/Banners";
import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAPI from "@/hook/useAPI";
import type { BaseProduct } from "@/types/Product";
import { IoIosArrowDown } from "react-icons/io";

const Product = () => {
  const [data] = useAPI<BaseProduct>("all");
  const bannerBtn = () => {};

  const limitedEdition = data.filter((item) => item.limited === true);

  const weekly = data.filter((item) => item.rating >= 7);

  return (
    <div className="py-2 px-2 md:p-4 lg:px-0 lg:py-8 space-y-4 md:space-y-6 lg:space-y-8">
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

      {/* Limited Edition */}
      <section className="w-full">
        <ProductCard title="Limited Edition" data={limitedEdition} />
      </section>

      {/* Weekly Products */}
      <section>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <ProductCard
                title="Weekly Products"
                data={weekly}
                gridbox="carousel"
                titleLines={1}
                descLines={1}
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
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

      {/* Main Product Grid */}
      <section></section>

      {/* Spot light */}
      <section></section>

      {/* SEO Category Desciption */}
      <section></section>

      {/* Trust & Security - Boxes */}
      <section></section>
    </div>
  );
};

export default Product;

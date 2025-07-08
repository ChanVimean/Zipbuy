import Banners from "@/components/Banners";
import ProductCard from "@/components/ProductCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAPI from "@/hook/useAPI";
import { CategoriesList, type BaseProduct } from "@/types/Product";
import { useState } from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Product = () => {
  const [data] = useAPI<BaseProduct>("all");
  const bannerBtn = () => {};
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const limitedEdition = data.filter((item) => item.limited === true);

  const weekly = data.filter((item) => item.rating >= 7);

  return (
    <div className="py-2 px-2 md:p-4 lg:px-0 lg:py-8 space-y-6 md:space-y-12 lg:space-y-24">
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
        <ProductCard
          title="Weekly Products"
          data={weekly}
          gridbox="carousel"
          titleLines={1}
          descLines={1}
        />
      </section>

      {/* Main Product Grid & Filters */}
      <section className="space-y-8">
        <aside className="flex justify-between items-center">
          <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
            <DropdownMenuTrigger
              className="flex items-center
                  py-2 px-4 overflow-hidden space-x-2 font-semibold"
            >
              <h3 className="text-sm md:text-md lg:text-lg">Categories</h3>
              <span
                className={`text-xl transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <IoIosArrowDown />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {CategoriesList.slice()
                .sort((a, b) => a.localeCompare(b))
                .map((category, index) => (
                  <DropdownMenuItem key={index}>
                    {category.charAt(0).toUpperCase() +
                      category.slice(1).toLowerCase()}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div>
            <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
              <DropdownMenuTrigger className="flex items-center space-x-2">
                <span className="">
                  {isOpen ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
                </span>
                <span>Sort By</span>
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
          </div>
        </aside>

        <ProductCard
          title="Product"
          data={data}
          descLines={2}
          gridbox="grid"
          titleLines={1}
          pagination={true}
        />
      </section>

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

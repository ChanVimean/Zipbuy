import Banners from "@/components/Banners";
import { FramerAutoSlider } from "@/components/FramerComponents";
import ProductCard from "@/components/ProductCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAPI from "@/hook/useAPI";
import {
  CategoriesList,
  type BaseProduct,
  type Categories,
} from "@/types/Product";
import { useState } from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Product = () => {
  const [data] = useAPI<BaseProduct>("all");
  const bannerBtn = () => {};
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const sortOptions: string[] = [
    "A-Z",
    "Highest Price",
    "Lowest Price",
    "Top Rate",
    "Limited Edition",
    "Available",
  ];

  const specialOffers = data.filter(
    (item) => item.available === true && item.rating >= 7.5
  );

  const weekly = data.filter((item) => item.rating >= 7);

  const spotlights = data.filter(
    (item) =>
      item.limited === true && item.rating >= 8 && item.available === true
  );

  const filteredData = data
    .filter((item) => {
      if (!selectedCategory) return true;
      return item.categories?.toLowerCase() === selectedCategory.toLowerCase();
    })
    .sort((a, b) => {
      if (!selectedSort) return 0;

      switch (selectedSort) {
        case "A-Z":
          return a.name.localeCompare(b.name);
        case "Highest Price":
          return b.price - a.price;
        case "Lowest Price":
          return a.price - b.price;
        case "Top Rate":
          return b.rating - a.rating;
        case "Limited Edition":
          return Number(b.limited) - Number(a.limited);
        case "Available":
          return Number(b.available) - Number(a.available);
        default:
          return 0;
      }
    });

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

      {/* Limited Edition */}
      <section className="w-full">
        <ProductCard
          title="Special Offers"
          data={specialOffers}
          gridbox="carousel"
        />
      </section>

      {/* Main Product Grid & Filters */}
      <section className="space-y-4">
        <aside className="flex justify-between items-center">
          <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">
            Products
          </h1>

          {/* Filter and Sort Options */}
          <div className="flex items-center space-x-4">
            <DropdownMenu onOpenChange={(open) => setIsCategoryOpen(open)}>
              <DropdownMenuTrigger className="flex items-center py-2 px-4 overflow-hidden space-x-2 font-semibold">
                <h3 className="text-sm md:text-md lg:text-lg">Categories</h3>
                <span
                  className={`text-xl transform transition-transform duration-300 ${
                    isCategoryOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <IoIosArrowDown />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {CategoriesList.slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((category, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() =>
                        setSelectedCategory(category as Categories)
                      }
                    >
                      {category.charAt(0).toUpperCase() +
                        category.slice(1).toLowerCase()}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu onOpenChange={(open) => setIsSortOpen(open)}>
              <DropdownMenuTrigger className="flex items-center space-x-2">
                <span className="">
                  {isSortOpen ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
                </span>
                <span>Sort By</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortOptions.map((option, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => setSelectedSort(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>
                
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>

        <ProductCard
          data={filteredData}
          descLines={2}
          gridbox="grid"
          titleLines={1}
          pagination={true}
          rows={3}
        />
      </section>

      {/* Spot light */}
      <section>
        <FramerAutoSlider data={spotlights} delay={3000} autoScroll />
      </section>
    </div>
  );
};

export default Product;

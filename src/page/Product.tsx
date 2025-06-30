import Banners from "@/components/Banners";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Product = () => {
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
        <main>
          <DropdownMenu>
            <DropdownMenuTrigger>Categories</DropdownMenuTrigger>
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
      <section>Product</section>
    </div>
  );
};

export default Product;

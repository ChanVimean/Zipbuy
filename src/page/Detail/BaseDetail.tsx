import { FramerImages } from "@/components/FramerComponents";
import { addToCart } from "@/context/slices/cartSlice";
import type { BaseProduct } from "@/types/Product";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface BaseDetailProps<T extends BaseProduct> {
  product: T;
  extraContent: React.ReactNode;
}

const BaseDetail = <T extends BaseProduct>({
  product,
  extraContent,
}: BaseDetailProps<T>) => {
  const dispatch = useDispatch();

  const rawPrice = product.price * (1 - (product.discount ?? 0));
  const [intPart, decimalPart] = rawPrice.toFixed(2).split(".");
  const [origInt, origDecimal] = product.price.toFixed(2).split(".");

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        desc: product.desc,
        thumbnail: product.thumbnail,
        price: Number(rawPrice.toFixed(2)),
        limited: product.limited,
        categories: product.categories,
      })
    );
  };

  return (
    <div className="py-6 lg:px-36">
      <section className="flex flex-col lg:flex-row items-center justify-between lg:items-start gap-12">
        {/* Image */}
        <div className="w-full lg:w-2/3 overflow-hidden">
          <FramerImages image={product.images} autoScroll delay={4000} />
        </div>

        {/* Details */}
        <article className="w-full lg:w-1/3 flex flex-col gap-4">
          {/* Product Name & Logo */}
          <h1 className="text-2xl font-bold flex space-x-3 items-center">
            <img
              src={product.brandLogo}
              alt="Brand Logo"
              className="h-10 w-auto"
            />
            <span>{product.name}</span>
          </h1>

          {/* Category & Rating */}
          <h4 className="flex space-x-1 text-sm">
            <span className="font-medium">Category:</span>
            <span>{product.categories}</span>
          </h4>
          <p className="flex items-center space-x-1">
            <span>⭐</span> <span>{product.rating}</span>
          </p>

          {/* Status & Discount */}
          <div className="flex flex-wrap gap-2 items-center text-white">
            <span className="px-2 py-1 rounded bg-green-500">
              {product.available ? "In Stock" : "Unavailable"}
            </span>
            {product.limited && (
              <span className="px-2 py-1 rounded bg-yellow-500">Limited</span>
            )}
            {product.discount > 0 && (
              <span className="px-2 py-1 rounded bg-red-500">
                -{product.discount * 100}%
              </span>
            )}
          </div>

          {/* Warranty */}
          <p className="flex items-center space-x-2">
            <span className="font-semibold">Warranty:</span>
            <span>{product.warranty}</span>
          </p>

          {/* Price */}
          <div className="flex space-x-4">
            {/* Original Price */}
            <h3 className="line-through opacity-50">
              ${origInt}
              <span className="text-sm align-super">.{origDecimal}</span>
            </h3>

            {/* Discounted Price */}
            <h2 className="text-2xl font-bold">
              ${intPart}
              <span className="text-sm align-super">.{decimalPart}</span>
            </h2>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mx-auto md:mx-0 mt-4 inline-flex self-start items-center gap-4 text-xl font-medium px-4 py-2 rounded text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 ease-in-out duration-150 cursor-pointer"
          >
            <FaCartPlus />
            <span>Add to Cart</span>
          </button>
        </article>
      </section>

      {/* Extra content */}
      <section className="mt-10">
        <p className="mb-8">{product.desc}</p>

        {extraContent}
      </section>
    </div>
  );
};

export default BaseDetail;

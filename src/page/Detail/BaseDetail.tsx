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

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        desc: product.desc,
        thumbnail: product.thumbnail,
        price: Number(rawPrice.toFixed(2)),
        limited: product.limited,
      })
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="w-full h-96 overflow-hidden rounded-md shadow-md">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-gray-700 text-sm">{product.desc}</p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-2xl">
            ${intPart}
            <span className="text-xs relative -top-[4px] ml-0.5">
              .{decimalPart}
            </span>
          </span>
          <span className="text-sm">⭐ {product.rating}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg flex items-center gap-2"
        >
          <FaCartPlus /> Add to Cart
        </button>

        {extraContent && <div className="mt-4">{extraContent}</div>}
      </div>

      {product.limited && (
        <p className="text-red-500 font-semibold">Limited stock available!</p>
      )}
    </div>
  );
};

export default BaseDetail;

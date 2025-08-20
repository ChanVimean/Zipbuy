import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/context/slices/cartSlice";
import { FaTrashCan } from "react-icons/fa6";
import type { RootState } from "@/context/store";
import LineClampText from "@/components/LineClampText";
import type { BaseProduct } from "@/types/Product";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CartItem extends BaseProduct {
  qty: number;
}

const Cart: React.FC = () => {
  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  ) as CartItem[];
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price);
    const discount = Number(item.discount ?? 0);
    const qty = Number(item.qty);
    const discountedPrice = price - discount;
    return discountedPrice > 0 && qty > 0 ? acc + discountedPrice * qty : acc;
  }, 0);

  const handleQtyChange = (id: number, qty: number) => {
    if (qty >= 1) {
      dispatch(updateQuantity({ id, qty }));
    }
  };

  const getFinalPrice = (item: CartItem) =>
    (item.price - (item.discount ?? 0)) * item.qty;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center">
        My Cart
      </h1>

      {/* Outer Container — stacks on mobile/tablet, row on desktop */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Items */}
        <ul className="space-y-4 flex-1">
          {cartItems.length === 0 && <p>Your cart is empty.</p>}
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="
                grid grid-cols-1 gap-4 w-full border-b pb-4
                md:grid-cols-[auto_1fr_auto_auto_auto] md:items-center
              "
            >
              {/* Image & Detail */}
              <div className="flex gap-4">
                <Link to={`/Product/${item.categories}/${item.id}`}>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-28 h-28 md:w-36 md:h-36 object-cover rounded"
                  />
                </Link>
                <article className="space-y-1 flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <LineClampText
                    text={item.desc}
                    lines={2}
                    classText="text-sm break-words"
                  />
                  <p className="font-bold">${getFinalPrice(item).toFixed(2)}</p>
                </article>
              </div>

              {/* Limited Edition */}
              <aside className="flex flex-col space-y-2 text-white text-center text-sm">
                <Badge
                  className="bg-yellow-500 px-2 py-1"
                  style={{ visibility: item.limited ? "visible" : "hidden" }}
                >
                  Limited Edition
                </Badge>
              </aside>

              {/* Quantity + Remove */}
              <div className="flex items-center justify-between gap-4">
                <aside className="flex items-center gap-3 font-medium text-xl">
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty - 1)}
                    className="cursor-pointer"
                  >
                    -
                  </button>
                  <p>{item.qty}</p>
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty + 1)}
                    className="cursor-pointer"
                  >
                    +
                  </button>
                </aside>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="cursor-pointer"
                >
                  <FaTrashCan />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <form
          className="
            w-full lg:max-w-xs space-y-4 border p-4 rounded-md bg-white text-slate-950
            lg:sticky lg:top-4
          "
        >
          <h2 className="text-lg font-semibold">Summary</h2>
          <p className="text-sm text-gray-500">Do you have a promo code?</p>

          <div className="flex justify-between">
            <h4>Subtotal</h4>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <h4>Delivery</h4>
            <p>$0.00</p>
          </div>

          <div className="flex justify-between font-bold">
            <h4>Total</h4>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded cursor-pointer"
          >
            Checkout
          </button>
          <button
            type="button"
            className="w-full border p-2 rounded cursor-pointer"
          >
            Paypal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;

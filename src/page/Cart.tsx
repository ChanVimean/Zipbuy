import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/context/slices/cartSlice";
import { FaTrashCan } from "react-icons/fa6";
import type { RootState } from "@/context/store";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleQtyChange = (id: number, qty: number) => {
    if (qty >= 1) {
      dispatch(updateQuantity({ id, qty }));
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">My Cart</h1>
      <div className="flex justify-between gap-8 flex-wrap lg:flex-nowrap">
        <ul className="space-y-4 flex-1">
          {cartItems.length === 0 && <p>Your cart is empty.</p>}
          {cartItems.map((item) => (
            <li key={item.id} className="flex gap-4 border-b pb-4">
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-24 h-24 object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm">{item.desc}</p>
                <div className="flex gap-2 items-center mt-2">
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty - 1)}
                  >
                    -
                  </button>
                  <p>{item.qty}</p>
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm mt-1">Limited Edition</p>
                <p className="font-bold">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>

              <button onClick={() => dispatch(removeFromCart(item.id))}>
                <FaTrashCan />
              </button>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <form className="w-full max-w-xs space-y-4 border p-4 rounded-md">
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
            className="w-full bg-black text-white p-2 rounded"
          >
            Checkout
          </button>
          <button type="button" className="w-full border p-2 rounded">
            Paypal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;

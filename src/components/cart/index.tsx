import { Link } from "@tanstack/react-router";

import { useCartStore } from "../../stores/cartStore";
import { Trash2Icon } from "lucide-react";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0,
  );

  return (
    <div className="mx-auto mt-14 min-h-[50vh] max-w-5xl px-4 md:mt-32">
      <h1 className="mb-6 text-3xl">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="">
          Your cart is empty.{" "}
          <Link to="/" className="hover:underline">
            Go shopping!
          </Link>
        </p>
      ) : (
        <>
          <table className="mb-4 w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Product</th>
                <th className="whitespace-nowrap py-2 text-left">
                  Price
                  <span className="text-sm text-gray-600">*</span>
                </th>
                <th className="py-2 text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="max-w-1/2 items-center gap-4 py-2 md:flex">
                    <img
                      src={item.image.url}
                      alt={item.image.alt}
                      className="mb-1 size-20 rounded-lg object-cover"
                    />
                    <Link
                      to={`/product/${item.id}`}
                      className="hover:underline md:text-lg"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap py-2">
                    {item.discountedPrice.toFixed(2)}
                  </td>
                  <td className="py-2 text-center">
                    <button onClick={() => removeFromCart(item.id)}>
                      <Trash2Icon className="mt-1 size-5 text-destructive" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="pb-4 text-sm text-gray-600">
            * Prices are shown in NOK.
          </p>
          <div className="mb-6 text-right">
            <p className="text-xl font-semibold">
              Total: {totalPrice.toFixed(2)} NOK
            </p>
          </div>
          <div className="flex justify-end pb-10 md:mt-10">
            <button className="rounded-xl bg-primary px-14 py-2 text-white transition-all duration-200 hover:bg-gray-900">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

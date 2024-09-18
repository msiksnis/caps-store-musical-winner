import { Link } from "@tanstack/react-router";

import { useCartStore } from "../../stores/cartStore";
import { Trash2Icon } from "lucide-react";
import { Button } from "../Button";
import { useSEO } from "../../hooks/useSEO";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // Sets SEO properties for the Cart page
  useSEO({
    title: "Cap's Store | Shopping Cart",
    description: "Review the items in your cart at Cap's Store.",
    keywords: "Cap's Store, Shopping Cart, Products, Checkout",
    currentPath: "/cart",
    ogTitle: "Cap's Store | Shopping Cart",
    ogDescription: "Review the items in your cart at Cap's Store.",
    ogImage: "/assets/logo.png",
  });

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
                  <td className="max-w-1/2 flex items-center gap-2 py-2 md:gap-4">
                    <img
                      src={item.image.url}
                      alt={item.image.alt}
                      className="mb-1 size-20 rounded-lg object-cover"
                    />
                    <Link
                      to={`/product/${item.id}`}
                      className="underline-offset-2 hover:underline md:text-lg"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap py-2">
                    {item.discountedPrice.toFixed(2)}
                  </td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-md p-2 transition-all duration-200 hover:bg-red-50"
                    >
                      <Trash2Icon className="size-5 text-destructive" />
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
            <Link to="/checkout">
              <Button size="wider" rounded="full" className="h-fit px-14 py-3">
                Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

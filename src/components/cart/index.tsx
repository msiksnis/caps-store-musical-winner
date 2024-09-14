import { Link } from "@tanstack/react-router";

import { useCartStore } from "../../stores/cartStore";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0,
  );

  return (
    <div className="mx-auto mt-20 max-w-5xl px-4 md:mt-32">
      <h1 className="mb-6 text-3xl font-semibold">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Go shopping!
          </Link>
        </p>
      ) : (
        <>
          <table className="mb-4 w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Product</th>
                <th className="py-2 text-left">Price</th>
                <th className="py-2 text-left">Quantity</th>
                <th className="py-2 text-left">Total</th>
                <th className="py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="py-2">
                    {item.discountedPrice.toFixed(2)} NOK
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-16 rounded border p-1"
                    />
                  </td>
                  <td className="py-2">
                    {(item.discountedPrice * item.quantity).toFixed(2)} NOK
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-6 text-right">
            <p className="text-xl font-semibold">
              Total: {totalPrice.toFixed(2)} NOK
            </p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={clearCart}
              className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Clear Cart
            </button>
            <button className="rounded bg-primary px-6 py-2 text-white hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

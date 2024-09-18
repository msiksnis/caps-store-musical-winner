import { Link } from "@tanstack/react-router";
import { useSEO } from "../../hooks/useSEO";

export default function PurchaseComplete() {
  useSEO({
    title: "Cap's Store | Thank You!",
    description:
      "Thank you for your purchase from Cap's Store. Your payment was successful.",
    keywords: "Cap's Store, Purchase Complete, Thank You, Online Shopping",
    currentPath: "/purchase-complete",
    ogTitle: "Cap's Store | Payment Successful",
    ogDescription:
      "Thank you for your purchase from Cap's Store. Your payment was successful.",
    ogImage: "/assets/logo.png",
    ogUrl: window.location.href,
  });

  return (
    <div className="mx-auto mt-40 flex min-h-[50vh] max-w-xl flex-col px-4 md:px-10">
      <h1 className="text-4xl font-bold">Payment Successful!</h1>
      <p className="mt-4 text-lg">Thank you for your purchase.</p>
      <Link
        to="/"
        className="mt-10 w-fit rounded-full bg-primary px-14 py-4 text-white transition-all duration-200 hover:bg-gray-800 md:px-20"
      >
        Back to store
      </Link>
    </div>
  );
}

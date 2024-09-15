import { Link } from "@tanstack/react-router";

export default function PurchaseComplete() {
  return (
    <div className="mx-auto mt-40 flex max-w-xl flex-col px-4 md:px-10">
      <h1 className="text-4xl font-bold">Payment Successful!</h1>
      <p className="mt-4 text-lg">Thank you for your purchase.</p>
      <Link
        to="/"
        className="mt-10 w-fit rounded-full bg-primary px-14 py-2 text-white transition-all duration-200 hover:bg-gray-900"
      >
        Back to store
      </Link>
    </div>
  );
}

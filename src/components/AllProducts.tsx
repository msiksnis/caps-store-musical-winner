import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";

import ProductCard from "../components/ProductCard";
import { Product } from "../lib/types";
import Loader from "../components/Loader";
import { fetchProducts } from "../api";
import { cn } from "../lib/utils";
import GradualSpacing from "./GradualSpacing";
import { Route } from "../routes";
import ErrorLoadingButton from "./ErrorLoadingButton";

export default function AllProducts() {
  const navigate = useNavigate();

  const search = Route.useSearch(); // Gets the validated search params
  const filter = search.filter || "all"; // Default to "all" if not provided

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", { filter }],
    queryFn: () => fetchProducts(filter),
  });

  if (isLoading) return <Loader />;
  if (!products.length) {
    return (
      <div className="mt-32 flex flex-col items-center justify-center">
        No products found.
      </div>
    );
  }
  if (error) {
    return (
      <ErrorLoadingButton
        errorMessage="Error loading products. Please try again later."
        onRetry={refetch}
      />
    );
  }

  // Updates the filter in the URL
  const handleFilterChange = (newFilter: "all" | "top-rated" | "sale") => {
    navigate({
      search: (prev) => ({
        ...prev,
        filter: newFilter,
      }),
    });
  };

  // Filters the products client-side based on the selected filter
  const filteredProducts = products.filter((product: Product) => {
    if (filter === "all") return true;
    if (filter === "top-rated") return product.rating >= 4.5;
    if (filter === "sale") return product.price > product.discountedPrice;
    return true;
  });

  const blurInVariants = {
    hidden: { filter: "blur(3px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <div className="mx-auto px-4 sm:max-w-4xl md:max-w-5xl md:px-10 xl:max-w-7xl">
      <div className="mt-32">
        <GradualSpacing
          text="Cap's Store"
          className="text-primary text-5xl font-medium tracking-[-0.1em] sm:text-[3.5rem] md:text-[4rem] md:leading-[5rem]"
        />
        <motion.h2
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          variants={blurInVariants}
          className="text-muted-foreground text-pretty py-4 text-xl font-light"
        >
          Check out our full collection of products tailored to your needs
        </motion.h2>
      </div>
      {/* Filtering buttons */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.2 }}
        variants={blurInVariants}
        className="flex justify-between pb-2 pt-6"
      >
        <div className="flex gap-2 md:gap-4 xl:gap-6">
          <button
            className={cn(
              "text-foreground/70 hover:bg-muted rounded-full border px-6 py-2 shadow-sm transition-all duration-200",
              {
                "bg-primary border-primary hover:bg-primary text-white shadow-md":
                  filter === "all",
              },
            )}
            onClick={() => handleFilterChange("all")}
          >
            All Products
          </button>
          <button
            className={cn(
              "text-foreground/70 hover:bg-muted rounded-full border px-6 py-2 shadow-sm transition-all duration-200",
              {
                "bg-primary border-primary hover:bg-primary text-white shadow-md":
                  filter === "top-rated",
              },
            )}
            onClick={() => handleFilterChange("top-rated")}
          >
            Top Rated
          </button>
          <button
            className={cn(
              "text-foreground/70 hover:bg-muted rounded-full border px-6 py-2 shadow-sm transition-all duration-200",
              {
                "bg-primary border-primary hover:bg-primary text-white shadow-md":
                  filter === "sale",
              },
            )}
            onClick={() => handleFilterChange("sale")}
          >
            Sale
          </button>
        </div>
        <div className="relative hidden md:block">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            placeholder="Search..."
            className="focus:border-foreground peer size-10 cursor-pointer rounded-full border border-transparent p-2 outline-none transition-all duration-300 placeholder:opacity-0 focus:cursor-text focus:pl-4 focus:placeholder:opacity-100 focus:sm:w-40 focus:md:w-72"
          />
          <SearchIcon className="text-foreground/70 pointer-events-none absolute right-2 top-1/2 size-6 -translate-y-1/2 transform transition-opacity duration-200 peer-focus:opacity-0" />
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.3 }}
        variants={blurInVariants}
        className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:gap-6 xl:grid-cols-3 xl:gap-8"
      >
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </div>
  );
}

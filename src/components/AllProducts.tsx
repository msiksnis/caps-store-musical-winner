import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "@tanstack/react-router";
import { motion } from "framer-motion";

import ProductCard from "../components/ProductCard";
import { Product } from "../lib/types";
import Loader from "../components/Loader";
import { fetchProducts } from "../api";
import { cn } from "../lib/utils";
import { SearchIcon } from "lucide-react";
import GradualSpacing from "./GradualSpacing";
import BlurInText from "./BlurInText";

export default function AllProducts() {
  //   const loaderData = useLoaderData({ from: "/" }) as Product[];

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    // initialData: loaderData,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading products.</div>;

  // Only for visual purpose. Later 'isActive' will be used when filtering products
  const isActive = true;

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
        <BlurInText
          text="Check out our full collection of products tailored to your needs"
          className="text-muted-foreground text-pretty py-4 text-xl font-light"
        />
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
            className={cn("text-foreground/70 rounded-full border px-6 py-2", {
              "bg-primary border-primary text-white": isActive,
            })}
          >
            All Products
          </button>
          <button className="text-foreground/70 rounded-full border px-6 py-2">
            Top Rated
          </button>
          <button className="text-foreground/70 rounded-full border px-6 py-2">
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
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </div>
  );
}

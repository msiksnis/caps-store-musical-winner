import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import ProductCard from "../../components/ProductCard";
import { Product } from "../../lib/types";
import Loader from "../../components/Loader";
import { fetchProducts } from "../../api";
import { Route } from "../../routes";
import ErrorLoadingButton from ".././ErrorLoadingButton";
import { blurInVariants } from "../../lib/utils";

interface AllProductsProps {
  searchTerm: string;
}

export default function AllProducts({ searchTerm }: AllProductsProps) {
  const search = Route.useSearch(); // Gets the validated search params
  const filter = search.filter || "all"; // Defaults to "all" if not provided

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", { filter }],
    queryFn: () => fetchProducts(filter),
    retry: 2,
  });

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <ErrorLoadingButton
        errorMessage="Error loading products. Please try again later."
        onRetry={refetch}
      />
    );
  }

  // Filters the products client-side based on search term
  const filteredProducts = products.filter((product: Product) => {
    const matchesFilter =
      filter === "all-products" ||
      (filter === "top-rated" && product.rating >= 4.5) ||
      (filter === "sale" && product.price > product.discountedPrice);

    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearchTerm;
  });

  if (!filteredProducts.length) {
    return (
      <div className="mt-32 flex flex-col items-center justify-center">
        {searchTerm
          ? "No products match your search."
          : "No products found in this category."}
      </div>
    );
  }

  return (
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
  );
}

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
  const filter = search.filter || null; // By default, there's no filter

  const {
    data: products = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", { filter }],
    queryFn: () => fetchProducts(filter || undefined),
    retry: 2,
  });

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <ErrorLoadingButton
        errorMessage={`Error loading products: ${error.message}`}
        onRetry={refetch}
      />
    );
  }

  // Filters the products client-side based on search term
  const filteredProducts = products.filter((product: Product) => {
    const matchesFilter =
      !filter || // If no filter, it means "All Products"
      (filter === "top-rated" && product.rating >= 4.5) ||
      (filter === "sale" && product.price > product.discountedPrice);

    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearchTerm;
  });

  // To display a message if no products are found based on the search term or filter
  if (!filteredProducts.length) {
    return (
      <div className="my-20 flex flex-col items-center justify-center sm:mt-32">
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

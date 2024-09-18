import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import ProductCard from "./ProductCard";
import { Product } from "../../lib/types";
import Loader from "../../components/Loader";
import { fetchProducts } from "../../api";
import { Route } from "../../routes";
import ErrorLoadingButton from "../ErrorLoadingButton";
import { blurInVariants } from "../../lib/utils";

interface AllProductsProps {
  /** The current search term used to filter products */
  searchTerm: string;
}

/**
 * The AllProducts component fetches and displays a list of products.
 * It applies client-side filtering based on the search term and selected filter.
 * It handles loading and error states and displays appropriate messages.
 *
 * @component
 * @param {AllProductsProps} props - The props for the AllProducts component.
 */
export default function AllProducts({ searchTerm }: AllProductsProps) {
  // Retrieve search parameters from the route (e.g., filter)
  const search = Route.useSearch(); // Gets the validated search params
  const filter = search.filter || null; // By default, there's no filter

  // Fetch products using React Query
  const {
    data: products = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Product[], Error>({
    queryKey: ["products", { filter }],
    queryFn: () => fetchProducts(filter || undefined),
    retry: 2,
  });

  // Display loader while data is being fetched
  if (isLoading) return <Loader />;

  // Prepare error message
  const errorMessage =
    error instanceof Error
      ? `Error loading products: ${error.message}`
      : "An unexpected error occurred while loading the products.";

  // Display error message with a retry option
  if (error) {
    return <ErrorLoadingButton errorMessage={errorMessage} onRetry={refetch} />;
  }

  // Filter functions
  const isTopRated = (product: Product) => product.rating >= 4.5;
  const isOnSale = (product: Product) =>
    product.price > product.discountedPrice;

  /**
   * Filters the products based on the selected filter and search term.
   */
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
      <p className="my-20 flex flex-col items-center justify-center sm:mt-32">
        {searchTerm
          ? "No products match your search."
          : "No products found in this category."}
      </p>
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

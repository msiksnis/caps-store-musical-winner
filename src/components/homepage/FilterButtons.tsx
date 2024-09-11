import { useCallback } from "react";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";

import { blurInVariants, cn, FILTER_OPTIONS } from "../../lib/utils";
import { FilterOption } from "../../lib/types";
import Search from "../Search";

interface FilterButtonsProps {
  filter: string | null;
  handleFilterChange: (newFilter: FilterOption | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function FilterButtons({
  filter,
  handleFilterChange,
  searchTerm,
  setSearchTerm,
}: FilterButtonsProps) {
  // Utility function to format filter options
  const formatFilterLabel = useCallback((option: string) => {
    return option.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.1 }}
      variants={blurInVariants}
      className="flex flex-col justify-between pb-2 pt-6 sm:flex-row"
    >
      <div className="flex gap-2 md:gap-4 xl:gap-6">
        {/* All Products Button */}
        <button
          className={cn(
            "text-primary border-primary group relative overflow-hidden rounded-full border px-6 py-2 shadow-sm hover:text-white md:px-10",
            {
              "bg-primary border-primary hover:bg-primary text-white shadow-md":
                !filter,
            },
          )}
          aria-label="Show all products"
          onClick={() => handleFilterChange(null)}
        >
          <div className="bg-primary absolute -left-2 top-1/2 -z-10 size-0 -translate-y-1/2 rounded-full transition-all duration-300 ease-in-out group-hover:-left-1/2 group-hover:size-64" />
          <span>All Products</span>
        </button>

        {/* Other Filters */}
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            className={cn(
              "text-primary border-primary group relative overflow-hidden rounded-full border px-6 py-2 shadow-sm hover:text-white md:px-10",
              {
                "bg-primary border-primary hover:bg-primary text-white shadow-md":
                  filter === option,
              },
            )}
            aria-label={`Filter by ${formatFilterLabel(option)}`}
            onClick={() => handleFilterChange(option)}
          >
            <div className="bg-primary absolute -left-2 top-1/2 -z-10 size-0 -translate-y-1/2 rounded-full transition-all duration-300 ease-in-out group-hover:-left-1/2 group-hover:size-64" />
            <span>{formatFilterLabel(option)}</span>
          </button>
        ))}
      </div>

      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className={cn(
          "focus:text-primary mt-6 h-10 w-full cursor-pointer rounded-full border pl-8 outline-none transition-all duration-200 focus:cursor-text focus:placeholder:opacity-100 sm:mt-0 sm:size-10 sm:border-transparent sm:p-2 sm:pl-0 sm:placeholder:opacity-0 focus:sm:w-40 focus:sm:pl-4 focus:md:w-72",
          {
            "text-primary border-b border-gray-400 sm:w-40 sm:border-gray-400 sm:pl-4 md:w-72":
              searchTerm,
          },
        )}
      />
    </motion.div>
  );
}

import { useCallback } from "react";
import { motion } from "framer-motion";

import { blurInVariants, cn, FILTER_OPTIONS } from "../../lib/utils";
import { FilterOption } from "../../lib/types";
import Search from "../Search";
import { Button } from "../Button";

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
      transition={{ duration: 0.5, delay: 0.3 }}
      variants={blurInVariants}
      className="flex flex-col justify-between pb-2 pt-2 sm:flex-row md:mt-6"
    >
      <div className="flex gap-2 md:gap-4 xl:gap-6">
        {/* All Products Button */}

        <button
          className="group relative"
          aria-label="Show all products"
          onClick={() => handleFilterChange(null)}
        >
          <span
            className={cn(
              "relative z-10 block h-10 overflow-hidden rounded-full border border-primary bg-card px-14 text-primary transition-colors duration-300 ease-out group-hover:text-white md:h-12 md:px-20",
              { "bg-primary text-white": !filter },
            )}
          >
            <span className="ease absolute left-0 -ml-1 h-48 w-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-black transition-all duration-300 group-hover:-rotate-180"></span>
            <span className="absolute inset-0 flex w-full items-center justify-center text-sm md:text-base">
              All Products
            </span>
          </span>
        </button>

        {/* Other Filters */}
        {FILTER_OPTIONS.map((option) => (
          <button
            className="group relative"
            aria-label={`Filter by ${formatFilterLabel(option)}`}
            onClick={() => handleFilterChange(option)}
          >
            <span
              className={cn(
                "relative z-10 block h-10 overflow-hidden rounded-full border border-primary bg-card px-12 text-primary transition-colors duration-300 ease-out group-hover:text-white md:h-12 md:px-20",
                { "bg-primary text-white": filter === option },
              )}
            >
              <span className="ease absolute left-0 -ml-1 h-48 w-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-black transition-all duration-300 group-hover:-rotate-180"></span>
              <span className="absolute inset-0 flex w-full items-center justify-center text-sm md:text-base">
                {formatFilterLabel(option)}
              </span>
            </span>
          </button>
        ))}
      </div>

      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className={cn(
          "mt-4 h-10 w-full cursor-pointer rounded-full border pl-8 outline-none transition-all duration-200 focus:cursor-text focus:text-primary focus:placeholder:opacity-100 sm:mt-0 sm:size-10 sm:border-transparent sm:p-2 sm:pl-0 sm:placeholder:opacity-0 focus:sm:w-40 focus:sm:pl-4 md:h-12 focus:md:w-72",
          {
            "border-b border-gray-400 text-primary sm:w-40 sm:border-gray-400 sm:pl-4 md:w-72":
              searchTerm,
          },
        )}
      />
    </motion.div>
  );
}

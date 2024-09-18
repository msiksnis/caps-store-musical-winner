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
      transition={{ duration: 0.5, delay: 0.1 }}
      variants={blurInVariants}
      className="flex flex-col justify-between pb-2 pt-2 sm:flex-row md:mt-6"
    >
      <div className="flex gap-2 md:gap-4 xl:gap-6">
        {/* All Products Button */}
        <Button
          variant="secondary"
          className={cn(
            "h-fit border border-primary bg-card px-6 py-2 md:px-10 md:py-3",
            {
              "border-primary bg-primary text-white shadow-md hover:bg-primary":
                !filter,
            },
          )}
          aria-label="Show all products"
          onClick={() => handleFilterChange(null)}
        >
          All Products
        </Button>

        {/* Other Filters */}
        {FILTER_OPTIONS.map((option) => (
          <Button
            key={option}
            variant="secondary"
            className={cn(
              "h-fit border border-primary bg-card px-6 py-2 md:px-10 md:py-3",
              {
                "border-primary bg-primary text-white shadow-md hover:bg-primary":
                  filter === option,
              },
            )}
            aria-label={`Filter by ${formatFilterLabel(option)}`}
            onClick={() => handleFilterChange(option)}
          >
            {formatFilterLabel(option)}
          </Button>
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

import { motion } from "framer-motion";

import { blurInVariants, cn, FILTER_OPTIONS } from "../../lib/utils";
import { SearchIcon } from "lucide-react";
import { FilterOption } from "../../lib/types";

interface FilterButtonsProps {
  filter: string;
  handleFilterChange: (
    newFilter: "all-products" | "top-rated" | "sale",
  ) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function FilterButtons({
  filter,
  handleFilterChange,
  searchTerm,
  setSearchTerm,
}: FilterButtonsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.1 }}
      variants={blurInVariants}
      className="flex justify-between pb-2 pt-6"
    >
      <div className="flex gap-2 md:gap-4 xl:gap-6">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            className={cn(
              "text-foreground/70 hover:bg-muted rounded-full border px-6 py-2 shadow-sm transition-all duration-200",
              {
                "bg-primary border-primary hover:bg-primary text-white shadow-md":
                  filter === option,
              },
            )}
            onClick={() => handleFilterChange(option as FilterOption)}
          >
            {option.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="relative hidden md:block">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="focus:border-foreground focus:text-primary peer size-10 cursor-pointer rounded-full border border-transparent p-2 text-transparent outline-none transition-all duration-300 placeholder:opacity-0 focus:cursor-text focus:pl-4 focus:placeholder:opacity-100 focus:sm:w-40 focus:md:w-72"
        />
        <SearchIcon className="text-foreground/70 pointer-events-none absolute right-2 top-1/2 size-6 -translate-y-1/2 transform transition-opacity duration-200 peer-focus:opacity-0" />
      </div>
    </motion.div>
  );
}

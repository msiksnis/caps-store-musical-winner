import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

import AllProducts from "./AllProducts";
import HeadingSection from "./HeadingSection";
import FilterButtons from "./FilterButtons";
import useDebounce from "../../hooks/useDebounce";
import { Route } from "../../routes";
import { FilterOption } from "../../lib/types";

export default function Home() {
  const navigate = useNavigate();
  const { filter, query = "" } = Route.useSearch();
  const debouncedSearchTerm = useDebounce(query, 300);

  // Handles filter change, uses null for "All Products"
  const handleFilterChange = useCallback(
    (newFilter: FilterOption | null) => {
      navigate({
        search: (prev) => {
          const updatedSearch = { ...prev };

          if (newFilter) {
            updatedSearch.filter = newFilter;
          } else {
            delete updatedSearch.filter;
          }

          return updatedSearch;
        },
      });
    },
    [navigate],
  );

  // Handle search term update
  const setSearchTerm = useCallback(
    (term: string) => {
      navigate({
        search: (prev) => ({
          ...prev,
          query: term,
        }),
      });
    },
    [navigate],
  );

  /**
   * Formats the filter string to be more readable.
   * @param {string} filter - The filter string to format.
   */
  const formatFilter = (filter: string) => {
    return filter
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <main className="mx-auto px-4 sm:max-w-4xl md:max-w-5xl md:px-10 xl:max-w-7xl">
      <HeadingSection />
      <FilterButtons
        filter={filter || null}
        handleFilterChange={handleFilterChange}
        searchTerm={query}
        setSearchTerm={setSearchTerm}
      />
      <AllProducts searchTerm={debouncedSearchTerm} />
    </main>
  );
}

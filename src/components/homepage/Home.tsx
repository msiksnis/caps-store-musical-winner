import { useCallback, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import AllProducts from "./AllProducts";
import HeadingSection from "./HeadingSection";
import FilterButtons from "./FilterButtons";
import useDebounce from "../../hooks/useDebounce";
import { Route } from "../../routes";
import { FilterOption } from "../../lib/types";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const filter = Route.useSearch().filter || "all-products";

  const handleFilterChange = useCallback(
    (newFilter: FilterOption) => {
      navigate({
        search: (prev) => ({
          ...prev,
          filter: newFilter,
        }),
      });
    },
    [navigate],
  );

  return (
    <div className="mx-auto px-4 sm:max-w-4xl md:max-w-5xl md:px-10 xl:max-w-7xl">
      <HeadingSection />
      <FilterButtons
        filter={filter}
        handleFilterChange={handleFilterChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <AllProducts searchTerm={debouncedSearchTerm} />
    </div>
  );
}

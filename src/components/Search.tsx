import { SearchIcon, XIcon } from "lucide-react";

import { useResetSearchQuery } from "../hooks/useResetSearchQuery";
import { cn } from "../lib/utils";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  className?: string;
}

/**
 * Renders a search input field with dynamic search icon and reset functionality.
 *
 * The component allows users to input a search term, displays a search icon when the input is empty,
 * and an "X" icon when there is a search term, enabling the user to clear the search. It integrates
 * the custom hook `useResetSearchQuery` to reset the search query when the "X" icon is clicked.
 *
 * @param props - The props for the Search component.
 * @returns The rendered search input field component.
 */
export default function Search({
  searchTerm,
  setSearchTerm,
  className,
}: SearchProps): JSX.Element {
  const resetSearchQuery = useResetSearchQuery();

  return (
    <div className="relative w-3/5 sm:w-auto">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={cn("peer focus:border-foreground", className)}
      />

      <SearchIcon
        className={cn(
          "pointer-events-none absolute bottom-2.5 left-2 size-5 transform text-foreground/70 transition-all duration-200 peer-hover:text-primary sm:right-2 sm:top-1/2 sm:size-6 sm:-translate-y-1/2 peer-focus:sm:opacity-0",
          { "sm:hidden": searchTerm },
        )}
      />

      {searchTerm && (
        <XIcon
          className="absolute bottom-2.5 right-2 size-5 transform cursor-pointer text-gray-500 transition-colors duration-200 hover:text-primary peer-focus:text-primary sm:top-1/2 sm:size-6 sm:-translate-y-1/2"
          onClick={() => {
            setSearchTerm("");
            resetSearchQuery();
          }}
        />
      )}
    </div>
  );
}

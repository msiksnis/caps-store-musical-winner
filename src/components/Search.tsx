import { SearchIcon, XIcon } from "lucide-react";
import { useResetSearchQuery } from "../hooks/useResetSearchQuery";
import { cn } from "../lib/utils";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  className?: string;
}

export default function Search({
  searchTerm,
  setSearchTerm,
  className,
}: SearchProps) {
  const resetSearchQuery = useResetSearchQuery();

  return (
    <div className="relative w-2/3 sm:w-auto">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={cn("focus:border-foreground peer", className)}
      />
      <SearchIcon
        className={cn(
          "text-foreground/70 peer-hover:text-primary pointer-events-none absolute bottom-1.5 left-0 size-5 transform transition-all duration-200 sm:right-2 sm:top-1/2 sm:size-6 sm:-translate-y-1/2 peer-focus:sm:opacity-0",
          { "sm:hidden": searchTerm },
        )}
      />

      {searchTerm && (
        <XIcon
          className="peer-focus:text-primary hover:text-primary absolute bottom-1.5 right-0 size-5 transform cursor-pointer text-gray-500 transition-colors duration-200 sm:right-2 sm:top-1/2 sm:size-6 sm:-translate-y-1/2"
          onClick={() => {
            setSearchTerm("");
            resetSearchQuery();
          }}
        />
      )}
    </div>
  );
}

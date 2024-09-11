import { useNavigate } from "@tanstack/react-router";

/**
 * Custom hook to reset the search query in the URL.
 *
 * This hook removes the `query` parameter and its value from the URL.
 *
 * @returns A function that resets the search query by removing it from the URL.
 */
export function useResetSearchQuery(): () => void {
  const navigate = useNavigate();

  /**
   * Resets the search query by removing the `query` parameter from the URL.
   */
  const resetSearchQuery = () => {
    navigate({
      search: (prev) => {
        const updatedSearch = { ...prev };
        delete updatedSearch.query; // Remove 'query' parameter completely
        return updatedSearch;
      },
    });
  };

  return resetSearchQuery;
}

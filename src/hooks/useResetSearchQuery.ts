import { useNavigate } from "@tanstack/react-router";

/**
 * Custom hook to reset the search query in the URL.
 *
 * This hook utilizes TanStack Router's `useNavigate` function to update
 * the search query in the URL without modifying other query parameters or state.
 * It effectively resets the search query to its previous state or clears it.
 *
 * @returns A function that resets the search query when called.
 */
export function useResetSearchQuery(): () => void {
  const navigate = useNavigate();

  /**
   * Resets the search query in the URL by navigating without modifying the existing state.
   */
  const resetSearchQuery = () => {
    navigate({
      search: (prev) => {
        const updatedSearch = { ...prev };
        return updatedSearch;
      },
    });
  };

  return resetSearchQuery;
}

import { useNavigate } from "@tanstack/react-router";

export function useResetSearchQuery() {
  const navigate = useNavigate();

  const resetSearchQuery = () => {
    navigate({
      search: (prev) => {
        const updatedSearch = { ...prev };
        delete updatedSearch.query; // Remove the 'query' parameter
        return updatedSearch;
      },
    });
  };

  return resetSearchQuery;
}

import { Product } from "./lib/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchProducts(filter?: string) {
  let url = API_BASE_URL;

  // Append the filter query param if provided. Defaults to "all". This filtering is done server-side.
  if (filter !== "all") {
    url += `?filter=${filter}`;
  }

  const res = await fetch(url);
  const json = await res.json();

  return json.data;
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}${id}`);
  const json = await res.json();

  return json.data;
}

import { Product } from "./lib/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchProducts(filter?: string): Promise<Product[]> {
  const url = new URL(API_BASE_URL);

  // Add filter as a query parameter if provided
  if (filter) {
    url.searchParams.append("filter", filter);
  }

  try {
    const res = await fetch(url.toString());

    // To check if the response is OK
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const json = await res.json();

    // Checks if the response format is valid
    if (!json.data || !Array.isArray(json.data)) {
      throw new Error("Invalid response format");
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  const url = `${API_BASE_URL}${id}`;

  try {
    const res = await fetch(url);

    // Checks if the response is OK
    if (!res.ok) {
      throw new Error(
        `Failed to fetch product with ID ${id}: ${res.statusText}`,
      );
    }

    const json = await res.json();

    if (!json.data) {
      throw new Error("Invalid product data");
    }

    return json.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}

import { Product } from "./lib/types";

export async function fetchProducts() {
  const res = await fetch("https://v2.api.noroff.dev/online-shop/");
  const json = await res.json();

  return json.data;
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
  const json = await res.json();

  return json.data;
}

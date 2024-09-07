import { createFileRoute } from "@tanstack/react-router";
import AllProducts from "../components/AllProducts";

export const Route = createFileRoute("/")({
  component: AllProducts,
});

// import { createFileRoute } from "@tanstack/react-router";
// import AllProducts from "../components/AllProducts";
// import { fetchProducts } from "../api";

// export const Route = createFileRoute("/")({
//   loader: async () => {
//     const products = await fetchProducts();
//     return products;
//   },
//   component: AllProducts,
// });

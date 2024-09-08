import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";
import AllProducts from "../components/AllProducts";

const productSearchSchema = z.object({
  filter: z.enum(["all", "top-rated", "sale"]).catch("all"),
});

export const Route = createFileRoute("/")({
  validateSearch: productSearchSchema.parse.bind(productSearchSchema), // Use Zod for validation
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

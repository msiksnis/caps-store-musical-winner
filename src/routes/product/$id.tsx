import { createFileRoute } from "@tanstack/react-router";
import ProductById from "../../components/ProductById";

export const Route = createFileRoute("/product/$id")({
  component: ProductById,
});

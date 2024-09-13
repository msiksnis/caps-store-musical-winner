import { createFileRoute } from "@tanstack/react-router";
import SingleProduct from "../../components/single-product";

export const Route = createFileRoute("/product/$id")({
  component: SingleProduct,
});

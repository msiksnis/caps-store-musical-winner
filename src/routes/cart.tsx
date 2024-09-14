import { createFileRoute } from "@tanstack/react-router";
import Cart from "../components/cart";

export const Route = createFileRoute("/cart")({
  component: Cart,
});

import { createFileRoute } from "@tanstack/react-router";
import CartPage from "../components/cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

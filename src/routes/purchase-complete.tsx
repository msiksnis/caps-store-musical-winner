import { createFileRoute } from "@tanstack/react-router";
import PurchaseComplete from "../components/cart/PurchaseComplete";

export const Route = createFileRoute("/purchase-complete")({
  component: PurchaseComplete,
});

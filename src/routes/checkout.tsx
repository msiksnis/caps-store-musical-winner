import { createFileRoute } from "@tanstack/react-router";
import PaymentForm from "../components/cart/PaymentForm";

export const Route = createFileRoute("/checkout")({
  component: PaymentForm,
});

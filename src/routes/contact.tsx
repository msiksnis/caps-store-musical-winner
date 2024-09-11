import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "../components/contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

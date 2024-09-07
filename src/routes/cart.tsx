import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cart")({
  component: () => <div>Hello /cart!</div>,
});

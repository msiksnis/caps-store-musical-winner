import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => (
    <div className="">
      <div className="">About page</div>
    </div>
  ),
});

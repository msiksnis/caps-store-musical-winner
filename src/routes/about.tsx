import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => (
    <div className="mt-52 flex justify-center">
      <div className="">About us</div>
    </div>
  ),
});

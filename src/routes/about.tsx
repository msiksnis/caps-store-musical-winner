import { createFileRoute } from "@tanstack/react-router";
import TestButton from "../components/TestButton";

export const Route = createFileRoute("/about")({
  component: () => (
    <div className="mt-52 flex justify-center">
      <div className="">
        <TestButton />
      </div>
    </div>
  ),
});

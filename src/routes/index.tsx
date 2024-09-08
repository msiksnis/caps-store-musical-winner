import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";

import { FILTER_OPTIONS } from "../lib/utils";
import Home from "../components/homepage/Home";

const productSearchSchema = z.object({
  filter: z.enum(FILTER_OPTIONS).default("all-products"),
});

export const Route = createFileRoute("/")({
  validateSearch: productSearchSchema.parse.bind(productSearchSchema),
  component: Home,
});

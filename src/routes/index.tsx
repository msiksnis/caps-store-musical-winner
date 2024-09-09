import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";

import { FILTER_OPTIONS } from "../lib/utils";
import Home from "../components/homepage/Home";

const productFilterSchema = z.object({
  filter: z.enum(FILTER_OPTIONS).optional(),
  query: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: productFilterSchema.parse.bind(productFilterSchema),
  component: Home,
});

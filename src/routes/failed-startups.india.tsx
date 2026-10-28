import { createFileRoute } from "@tanstack/react-router";

import html from "@/bought/research-2.html?raw";
import { boughtPage } from "@/bought/serve";

// Purchased page, served exactly as supplied (scripts removed, noindex kept).
export const Route = createFileRoute("/failed-startups/india")({
  server: {
    handlers: {
      GET: async () => boughtPage(html),
    },
  },
});

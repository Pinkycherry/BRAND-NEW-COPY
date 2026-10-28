import { createFileRoute } from "@tanstack/react-router";

import html from "@/bought/topics.html?raw";
import { boughtPage } from "@/bought/serve";

// Purchased page, served exactly as supplied (scripts removed, noindex kept).
export const Route = createFileRoute("/topics")({
  server: {
    handlers: {
      GET: async () => boughtPage(html),
    },
  },
});

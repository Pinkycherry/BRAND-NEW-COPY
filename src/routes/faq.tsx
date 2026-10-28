import { createFileRoute } from "@tanstack/react-router";

import html from "@/bought/faq.html?raw";
import { boughtPage } from "@/bought/serve";

// Purchased page, served exactly as supplied (scripts removed, noindex kept).
export const Route = createFileRoute("/faq")({
  server: {
    handlers: {
      GET: async () => boughtPage(html),
    },
  },
});

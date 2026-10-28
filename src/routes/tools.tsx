import { createFileRoute } from "@tanstack/react-router";

import html from "@/bought/tools.html?raw";

// Purchased page, served exactly as supplied (scripts removed, noindex kept).
export const Route = createFileRoute("/tools")({
  server: {
    handlers: {
      GET: async () => new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } }),
    },
  },
});

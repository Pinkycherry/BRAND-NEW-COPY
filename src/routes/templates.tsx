import { createFileRoute } from "@tanstack/react-router";

import html from "@/bought/templates.html?raw";

// Purchased page, served exactly as supplied (scripts removed, noindex kept).
export const Route = createFileRoute("/templates")({
  server: {
    handlers: {
      GET: async () => new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } }),
    },
  },
});

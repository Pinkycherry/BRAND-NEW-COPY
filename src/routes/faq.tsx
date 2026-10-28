import { createFileRoute } from "@tanstack/react-router";

import html from "@/bought/faq.html?raw";
import menus from "@/bought/menus.html?raw";

// Purchased page, served exactly as supplied (scripts removed, noindex kept).
export const Route = createFileRoute("/faq")({
  server: {
    handlers: {
      GET: async () => new Response(html.replace("</body>", menus + "</body>"), { headers: { "Content-Type": "text/html; charset=utf-8" } }),
    },
  },
});

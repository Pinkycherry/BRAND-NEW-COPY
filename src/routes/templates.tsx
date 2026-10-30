import { createFileRoute } from "@tanstack/react-router";
import purchasedPage from "@/bought/templates.html?raw";
import { boughtPage } from "@/bought/serve";

export const Route = createFileRoute("/templates")({
  server: {
    handlers: {
      GET: async () => boughtPage(purchasedPage, "templates"),
    },
  },
});

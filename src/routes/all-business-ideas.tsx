import { createFileRoute } from "@tanstack/react-router";
import purchasedPage from "@/bought/subcategory-business-ideas.html?raw";
import { boughtPage } from "@/bought/serve";

export const Route = createFileRoute("/all-business-ideas")({
  server: {
    handlers: {
      GET: async () => boughtPage(purchasedPage, "subcategory-business-ideas"),
    },
  },
});

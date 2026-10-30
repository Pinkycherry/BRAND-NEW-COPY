import { createFileRoute } from "@tanstack/react-router";
import purchasedPage from "@/bought/lists.html?raw";
import { boughtPage } from "@/bought/serve";

export const Route = createFileRoute("/lists/")({
  server: {
    handlers: {
      GET: async () => boughtPage(purchasedPage, "lists"),
    },
  },
});

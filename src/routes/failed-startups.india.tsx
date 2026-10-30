import { createFileRoute } from "@tanstack/react-router";
import purchasedPage from "@/bought/research-2.html?raw";
import { boughtPage } from "@/bought/serve";

export const Route = createFileRoute("/failed-startups/india")({
  server: {
    handlers: {
      GET: async () => boughtPage(purchasedPage, "research-2"),
    },
  },
});

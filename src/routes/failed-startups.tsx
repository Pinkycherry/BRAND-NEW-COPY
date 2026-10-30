import { createFileRoute } from "@tanstack/react-router";
import purchasedPage from "@/bought/startup-failure-database.html?raw";
import { boughtPage } from "@/bought/serve";

export const Route = createFileRoute("/failed-startups")({
  server: {
    handlers: {
      GET: async () => boughtPage(purchasedPage, "startup-failure-database"),
    },
  },
});

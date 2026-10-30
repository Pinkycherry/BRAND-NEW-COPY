import { createFileRoute } from "@tanstack/react-router";
import purchasedPage from "@/bought/tools.html?raw";
import { boughtPage } from "@/bought/serve";

export const Route = createFileRoute("/tools")({
  server: {
    handlers: {
      GET: async () => boughtPage(purchasedPage, "tools"),
    },
  },
});

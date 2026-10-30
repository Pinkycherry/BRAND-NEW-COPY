import { createFileRoute } from "@tanstack/react-router";
import purchasedPage from "@/bought/faq.html?raw";
import { boughtPage } from "@/bought/serve";

export const Route = createFileRoute("/faq")({
  server: {
    handlers: {
      GET: async () => boughtPage(purchasedPage, "faq"),
    },
  },
});

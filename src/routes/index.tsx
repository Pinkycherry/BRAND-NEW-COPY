import { createFileRoute } from "@tanstack/react-router";
import purchasedPage from "@/bought/home.html?raw";
import { boughtPage } from "@/bought/serve";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: async () => boughtPage(purchasedPage, "home"),
    },
  },
});

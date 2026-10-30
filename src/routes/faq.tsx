import { createFileRoute } from "@tanstack/react-router";
import { FAQPage } from "@/components/faq/faq-page";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
});

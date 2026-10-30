import { createFileRoute } from "@tanstack/react-router";
import caseStudiesHtml from "@/bought/case-studies.html?raw";
import { boughtPage } from "@/bought/serve";

/**
 * Serve the purchased case-studies page as its original rendered template.
 *
 * Keep the template's page markup, wording, CSS and image references intact.
 * boughtPage only replaces the template header/footer with the shared BBI
 * site chrome and injects the shared navigation styles and interactions.
 */
export const Route = createFileRoute("/case-studies")({
  server: {
    handlers: {
      GET: async () => boughtPage(caseStudiesHtml),
    },
  },
});

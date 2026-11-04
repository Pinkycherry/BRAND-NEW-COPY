import { createFileRoute } from "@tanstack/react-router";
import { renderTopicPage } from "@/bought/topic-page";
import { topicPage } from "@/data/topic-pages";

// India topic page on the purchased topics layout. Content: src/data/topic-pages.
export const Route = createFileRoute("/product-market-fit-india")({
  server: {
    handlers: {
      GET: async () => renderTopicPage(topicPage("product-market-fit-india")),
    },
  },
});

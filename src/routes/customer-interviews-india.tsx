import { createFileRoute } from "@tanstack/react-router";
import { renderTopicPage } from "@/bought/topic-page";
import { topicPage } from "@/data/topic-pages";

// India topic page on the purchased topics layout. Content: src/data/topic-pages.
export const Route = createFileRoute("/customer-interviews-india")({
  server: {
    handlers: {
      GET: async () => renderTopicPage(topicPage("customer-interviews-india")),
    },
  },
});

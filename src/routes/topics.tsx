import { createFileRoute } from "@tanstack/react-router";
import { TopicsHubPage } from "@/components/topics/topics-hub-page";

export const Route = createFileRoute("/topics")({
  component: TopicsHubPage,
});

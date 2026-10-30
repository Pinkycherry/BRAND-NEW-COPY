import { createFileRoute } from "@tanstack/react-router";
import { BusinessIdeaListsPage } from "@/components/lists/business-idea-lists-page";

export const Route = createFileRoute("/lists/")({
  component: BusinessIdeaListsPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { CoachingBusinessIdeasPage } from "@/components/lists/coaching-business-ideas-page";

export const Route = createFileRoute("/lists/coaching-business-ideas")({
  component: CoachingBusinessIdeasPage,
});

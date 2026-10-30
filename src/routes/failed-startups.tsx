import { createFileRoute } from "@tanstack/react-router";
import { FailedStartupsPage } from "@/components/failed-startups/failed-startups-page";

export const Route = createFileRoute("/failed-startups")({
  component: FailedStartupsPage,
});

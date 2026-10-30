import { createFileRoute } from "@tanstack/react-router";
import { FailedStartupsIndiaPage } from "@/components/failed-startups/failed-startups-india-page";

export const Route = createFileRoute("/failed-startups/india")({
  component: FailedStartupsIndiaPage,
});

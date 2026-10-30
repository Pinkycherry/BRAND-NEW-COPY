import { createFileRoute } from "@tanstack/react-router";
import { OpenSourceResearchPage } from "@/components/open-source/open-source-research-page";

export const Route = createFileRoute("/open-source")({
  component: OpenSourceResearchPage,
});

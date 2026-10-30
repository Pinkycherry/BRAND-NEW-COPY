import { createFileRoute } from "@tanstack/react-router";
import { FrameworksComparisonPage } from "@/components/frameworks/frameworks-comparison-page";

export const Route = createFileRoute("/frameworks-comparison")({
  component: FrameworksComparisonPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { AlternateToolsPage } from "@/components/tools/alternate-tools-page";

export const Route = createFileRoute("/tools/alternate")({
  component: AlternateToolsPage,
});

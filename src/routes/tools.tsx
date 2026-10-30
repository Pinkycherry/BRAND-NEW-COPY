import { createFileRoute } from "@tanstack/react-router";
import { ToolsDirectoryPage } from "@/components/tools/tools-directory-page";

export const Route = createFileRoute("/tools")({
  component: ToolsDirectoryPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { MarketResearchPage } from "@/components/market-research/market-research-page";

export const Route = createFileRoute("/market-research")({
  component: MarketResearchPage,
});

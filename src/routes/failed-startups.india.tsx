import { createFileRoute } from "@tanstack/react-router";
import { FailedStartupsIndiaPage } from "@/components/v2/failure-research";

export const Route = createFileRoute("/failed-startups/india")({
  head: () => ({ meta: [
    { title: "Failed Startups in India: Founder Accounts and Lessons | BusinessIdea.io" },
    { name: "description", content: "Verified Indian startup shutdowns, founder accounts, exact status, and practical questions for your own business." },
    { name: "robots", content: "noindex,nofollow" },
    { property: "og:image", content: "/images/failure-india.svg" },
  ] }),
  component: FailedStartupsIndiaPage,
});

/** All India topic pages, keyed by slug. Rename a slug or title in its data file only. */
import type { TopicPage } from "@/bought/topic-page";
import { validateIdea } from "./topic-pages-a";

export const TOPIC_PAGES: TopicPage[] = [validateIdea];
export const topicPage = (slug: string) => TOPIC_PAGES.find((p) => p.slug === slug)!;

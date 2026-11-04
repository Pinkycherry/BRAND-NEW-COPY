/** All India topic pages, keyed by slug. Rename a slug or title in its data file only. */
import type { TopicPage } from "@/bought/topic-page";
import { validateIdea, getFunding, mistakes } from "./topic-pages-a";
import { cac, tam, moneyToStart, bootstrapping } from "./topic-pages-b";
import { pmf, interviews, mvp } from "./topic-pages-c";
import { isIdeaGood } from "./topic-pages-d";

export const TOPIC_PAGES: TopicPage[] = [validateIdea, getFunding, mistakes, cac, tam, moneyToStart, bootstrapping, pmf, interviews, mvp, isIdeaGood];
export const topicPage = (slug: string) => TOPIC_PAGES.find((p) => p.slug === slug)!;

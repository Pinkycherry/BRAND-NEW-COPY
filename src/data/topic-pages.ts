/** All India topic pages, keyed by slug. Rename a slug or title in its data file only. */
import type { TopicPage } from "@/bought/topic-page";
import { mistakes } from "./topic-pages-rw3";
import { getFunding } from "./topic-pages-rw2";
import { validateIdea } from "./topic-pages-rw1";
import { cac } from "./topic-pages-rw4";
import { tam } from "./topic-pages-rw5";
import { moneyToStart, bootstrapping } from "./topic-pages-b";
import { pmf, interviews, mvp } from "./topic-pages-c";
import { isIdeaGood, raiseFunds } from "./topic-pages-d";
import { businessNumbers, businessPlan, competitors, fundingQuestions, adsTest, govResources, validateFood, validateOnline } from "./topic-pages-e";

export const TOPIC_PAGES: TopicPage[] = [validateIdea, getFunding, mistakes, cac, tam, moneyToStart, bootstrapping, pmf, interviews, mvp, isIdeaGood, raiseFunds, businessNumbers, businessPlan, competitors, fundingQuestions, adsTest, govResources, validateFood, validateOnline];
export const topicPage = (slug: string) => TOPIC_PAGES.find((p) => p.slug === slug)!;

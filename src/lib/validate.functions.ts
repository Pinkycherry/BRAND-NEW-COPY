import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getIdea, type Idea } from "@/lib/ideas.functions";

export const VALIDATE_PLATFORMS = [
  { id: "claude", label: "Claude" },
  { id: "perplexity", label: "Perplexity" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "grok", label: "Grok" },
] as const;
export type ValidatePlatform = (typeof VALIDATE_PLATFORMS)[number]["id"];
export const VALIDATE_CONTEXT_MAX_LENGTH = 600;

function promptFor(idea: Idea, context?: string): string {
  const lines = [
    "Act as a blunt, operator-grade startup analyst. Produce a complete, structured, markdown-formatted validation report for the business idea below. Be specific to this idea and its actual market — no generic startup platitudes, no hedging, no marketing language.",
    "",
    "Idea: " + idea.title,
    "Category code: " + idea.category_code + " / " + idea.subcategory_code,
    "Business description: " + (idea.what_it_is || idea.summary),
  ];
  if (idea.who_pays_you) lines.push("Who pays: " + idea.who_pays_you);
  if (idea.how_money_comes) lines.push("Revenue: " + idea.how_money_comes);
  if (idea.what_hurts) lines.push("Claimed risks on file: " + idea.what_hurts);
  if (idea.verdict) lines.push("Existing editorial verdict: " + idea.verdict);
  const trimmed = context?.trim();
  if (trimmed) lines.push("", "The user added this context themselves before sending — it's real signal, not filler. Weave it into whichever sections it actually bears on:", trimmed);
  lines.push(
    "",
    "Structure the report with these sections, each with real substance:",
    "1. Market analysis — real demand signals, market size context, competitive density and timing for this specific niche.",
    "2. Target buyer — the exact customer, what they do today instead, and what would make them switch.",
    "3. Revenue model — how this makes money, realistic pricing, and the path to first revenue.",
    "4. Key risks — the 3-4 things most likely to kill this, stated plainly.",
    "5. Launch roadmap — a concrete plan from zero to first paying customer.",
    "",
    "If your platform can generate an accompanying chart, diagram or other visual (market sizing, a roadmap timeline, competitive positioning), generate one alongside the written report rather than plain paragraphs only.",
    "Treat unsourced claims as hypotheses and cite sources where possible."
  );
  return lines.join("\n");
}

function destination(platform: ValidatePlatform, prompt: string): string {
  const q = encodeURIComponent(prompt);
  switch (platform) {
    case "claude": return "https://claude.ai/new?q=" + q;
    case "perplexity": return "https://www.perplexity.ai/search?q=" + q;
    case "chatgpt": return "https://chatgpt.com/?q=" + q;
    case "grok": return "https://grok.com/?q=" + q;
  }
}

/** Real published idea only. No AI API key or report is stored by this site. */
export const getValidateUrl = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({
    slug: z.string().min(1).max(200),
    platform: z.enum(["claude", "perplexity", "chatgpt", "grok"]),
    context: z.string().trim().max(VALIDATE_CONTEXT_MAX_LENGTH).optional(),
  }).parse(input))
  .handler(async ({ data }) => {
    const idea = await getIdea({ data: { slug: data.slug } });
    if (!idea) throw new Error("That published idea could not be found.");
    return destination(data.platform, promptFor(idea, data.context));
  });

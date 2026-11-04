/**
 * The ONE backend prompt template behind the Validate button on every India topic page.
 * It is filled automatically from the page's title, topic and key questions (its section headings)
 * plus today's date. Never write a separate prompt per page.
 * Pending (founder, 5 Nov 2026): much stronger, longer prompts for every Validate button.
 */
export type TopicPromptInput = { title: string; topic: string; questions: string[]; date: Date };

export function topicValidatePrompt({ title, topic, questions, date }: TopicPromptInput): { prompt: string; prefillPrompt: string } {
  const today = date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  const qs = questions.filter(Boolean).slice(0, 8);
  const prompt = [
    `Today is ${today}. I am a first-time founder in India reading a guide titled "${title}" (topic: ${topic}).`,
    `Ask me first for my city or town, state, the business I have in mind, my budget in rupees and the time I can give each week. Then answer for my exact location, using today's figures.`,
    `Cover these questions from the guide:`,
    ...qs.map((q, i) => `${i + 1}. ${q}`),
    `Rules: give current numbers in rupees with the date they apply to, and name the official Indian source for each (a .gov.in or .nic.in site, RBI, PIB, the scheme's own portal, or my bank). If a figure differs by state or city, say so. If you are not sure of a figure, say so plainly instead of guessing.`,
    `Finish with a checklist of documents and a simple plan for the next 7 days.`,
  ].join("\n");
  const prefillPrompt = [
    `Today is ${today}. I'm a first-time founder in India. Help me with: "${title}".`,
    `First ask my city, state, business, budget in ₹ and weekly time. Then give today's figures in ₹ with official Indian sources (.gov.in, RBI, PIB, scheme portals), note state differences, flag anything uncertain, and end with a document checklist and a 7-day plan.`,
    qs.length ? `Cover: ${qs.slice(0, 5).join("; ")}.` : "",
  ].filter(Boolean).join("\n");
  return { prompt, prefillPrompt };
}

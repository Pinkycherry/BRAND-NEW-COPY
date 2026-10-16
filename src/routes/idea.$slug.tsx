import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { SiteShell, Breadcrumbs } from "@/components/site-shell";
import { TAXONOMY } from "@/data/taxonomy";
import {
  BAND_LABEL,
  MODE_LABEL,
  SKILL_LABEL,
  TIME_LABEL,
  getIdea,
  type Idea,
} from "@/lib/ideas.functions";

const ideaQuery = (slug: string) =>
  queryOptions({
    queryKey: ["idea", slug],
    queryFn: () => getIdea({ data: { slug } }),
    staleTime: 60_000,
  });

/** Category and subcategory for an idea, from the fixed taxonomy. */
function placeOf(idea: Idea) {
  const category = TAXONOMY[Number(idea.category_code.slice(1)) - 1];
  const index = Number(idea.subcategory_code.slice(6)) - 1;
  const subcategory = category?.subcategories[index];
  return category && subcategory ? { category, subcategory } : null;
}

export const Route = createFileRoute("/idea/$slug")({
  loader: async ({ context, params }) => {
    const idea = await context.queryClient.ensureQueryData(ideaQuery(params.slug));
    if (!idea) throw notFound();
    return { title: idea.title, summary: idea.summary };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Business idea"} | BusinessIdea.io` },
      { name: "description", content: loaderData?.summary ?? "" },
      // Idea pages stay out of search results until launch decides otherwise.
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: IdeaPage,
  notFoundComponent: () => (
    <SiteShell tone="instrument">
      <p className="mx-auto max-w-3xl px-4 py-24">We don't have that idea.</p>
    </SiteShell>
  ),
  errorComponent: () => (
    <SiteShell tone="instrument">
      <p className="mx-auto max-w-3xl px-4 py-24">Couldn't load this idea. Try refreshing.</p>
    </SiteShell>
  ),
});

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Para({ text }: { text: string }) {
  return <p className="text-base leading-relaxed text-muted-foreground">{text}</p>;
}

function IdeaPage() {
  const { slug } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQuery(slug));
  if (!idea) return null;
  const where = placeOf(idea);
  const tags = [
    BAND_LABEL[idea.investment_band],
    TIME_LABEL[idea.time_needed],
    SKILL_LABEL[idea.skill_level],
    MODE_LABEL[idea.work_mode],
  ].filter(Boolean);

  return (
    <SiteShell tone="instrument">
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-12">
        <div className="space-y-4">
          {where && (
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Browse", to: "/browse" },
                {
                  label: where.category.name,
                  to: "/category/$categorySlug",
                  params: { categorySlug: where.category.slug },
                },
                {
                  label: where.subcategory.name,
                  to: "/category/$categorySlug/$subcategorySlug",
                  params: {
                    categorySlug: where.category.slug,
                    subcategorySlug: where.subcategory.slug,
                  },
                },
                { label: idea.title },
              ]}
            />
          )}
          <h1 className="text-3xl font-bold tracking-tight">{idea.title}</h1>
          <p className="text-lg leading-relaxed">{idea.hook}</p>
          <ul className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
          <Para text={idea.summary} />
        </div>

        <Section id="what" title="What this business is">
          <Para text={idea.what_it_is} />
        </Section>
        <Section id="who" title="Who pays you">
          <Para text={idea.who_pays_you} />
        </Section>
        <Section id="money" title="How the money comes">
          <Para text={idea.how_money_comes} />
        </Section>
        <Section id="need" title="What you need">
          <Para text={idea.what_you_need} />
        </Section>
        {idea.first_30_days?.length > 0 && (
          <Section id="first" title="Your first 30 days">
            <ol className="list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              {idea.first_30_days.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Section>
        )}
        <Section id="hurts" title="What will hurt in year one">
          <Para text={idea.what_hurts} />
        </Section>
        <Section id="verdict" title="The straight verdict">
          <p className="rounded-xl border border-border/60 p-4 text-base leading-relaxed">
            {idea.verdict}
          </p>
        </Section>
        {idea.faq?.length > 0 && (
          <Section id="faq" title="Questions people ask">
            <div className="space-y-4">
              {idea.faq.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </Section>
        )}
        <Section id="validate" title="Check today's numbers in your area">
          <p className="text-sm text-muted-foreground">
            Copy this question into any research assistant for current prices and rules near you.
          </p>
          <p className="rounded-xl border border-dashed border-border/70 p-4 text-sm leading-relaxed">
            {idea.validate_prompt}
          </p>
        </Section>

        {where && (
          <Link
            to="/category/$categorySlug/$subcategorySlug"
            params={{ categorySlug: where.category.slug, subcategorySlug: where.subcategory.slug }}
            className="mo-link t-eyebrow inline-block"
          >
            ← All {where.subcategory.name.replace(/ Business Ideas$/, "")} ideas
          </Link>
        )}
      </article>
    </SiteShell>
  );
}

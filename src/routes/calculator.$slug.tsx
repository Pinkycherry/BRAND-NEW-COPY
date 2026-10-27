import { useId, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, RotateCcw } from "lucide-react";

import { GlassShell } from "@/components/glass-shell";
import { READY_CALCULATORS, isReadyCalculator, defaultInputs, fieldGroups, findCalculator, readValues, type Calculator, type FieldIssue, type Reading } from "@/lib/calculators";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import "@/components/glass-library.css";
import "@/components/calculator-review.css";

export const Route = createFileRoute("/calculator/$slug")({
  loader: ({ params }) => {
    const calculator = findCalculator(params.slug);
    if (!calculator) throw notFound();
    return { slug: calculator.slug };
  },
  head: ({ loaderData }) => {
    const calculator = loaderData ? findCalculator(loaderData.slug) : undefined;
    return { meta: [
      { title: calculator ? `${calculator.title}${isReadyCalculator(calculator) ? " calculator" : " calculation under review"} | BusinessIdea.io` : "Calculator not found | BusinessIdea.io" },
      { name: "description", content: calculator && isReadyCalculator(calculator) ? calculator.description : "This source calculation is under review. Use a specifically modeled calculator or founder worksheet instead." },
      { property: "og:type", content: "website" },
    ] };
  },
  component: CalculatorRoute,
  notFoundComponent: () => <GlassShell><div className="gl-page gl-message"><h1>We do not have that calculator.</h1><Link to="/calculator">See all calculators</Link></div></GlassShell>,
});

function CalculatorRoute() {
  const { slug } = Route.useParams();
  const calculator = findCalculator(slug);
  if (!calculator) throw notFound();
  if (!isReadyCalculator(calculator)) return <CalculatorReview calculator={calculator} />;
  return <CalculatorPage key={calculator.slug} calculator={calculator} />;
}

function CalculatorReview({ calculator }: { calculator: Calculator }) {
  return <GlassShell><div className="gl-page gl-calculator-review"><nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/calculator">Calculators</Link><span>/</span><span>{calculator.title}</span></nav><header><p className="gh-eyebrow">SOURCE CALCULATION UNDER REVIEW</p><h1>{calculator.title} needs a proper model.</h1><p>This source entry had generic inputs and an arithmetic result that did not define the named metric. We have paused its calculator instead of showing a misleading number. Its URL is preserved while the inputs, formula and edge cases are rebuilt and checked.</p></header><div className="gl-review-actions"><Link className="gh-button gh-button-primary" to="/business-idea-toolkit">Choose an available tool <ArrowUpRight size={17}/></Link><Link className="gh-button gh-button-secondary" to="/startup-terms-india">Look up the metric <ArrowUpRight size={17}/></Link></div></div></GlassShell>;
}

function CalculatorPage({ calculator }: { calculator: Calculator }) {
  const [typed, setTyped] = useState<Record<string, string>>(() => defaultInputs(calculator));
  const { values, issues } = readValues(calculator.fields, typed);
  const readings = issues.length === 0 ? calculator.compute(values) : [];
  const issueFor = (key: string): FieldIssue | undefined => issues.find((issue) => issue.key === key);
  const name = `${calculator.title} ${calculator.highlight}`;
  const path = `/calculator/${calculator.slug}`;
  const others = READY_CALCULATORS.filter((item) => item.slug !== calculator.slug);
  return <>
    <JsonLd schema={[
      webPageSchema({ path, name, description: calculator.description }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Calculators", path: "/calculator" }, { name, path }]),
    ]} />
    <GlassShell><div className="gl-page gl-calculator-page">
      <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/calculator">Calculators</Link><span>/</span><span>{name}</span></nav>
      <header className="gl-calculator-hero"><p className="gh-eyebrow">A TOOL FOR YOUR OWN NUMBERS</p><h1>{calculator.title} <em>{calculator.highlight}</em></h1><p>{calculator.intro}</p></header>
      <div className="gl-calculator-layout">
        <form className="gl-calculator-panel" onSubmit={(event) => event.preventDefault()}>
          <div className="gl-panel-head"><div><p className="gh-eyebrow">YOUR INPUTS</p><h2>Your numbers</h2></div><button type="button" onClick={() => setTyped(defaultInputs(calculator))}><RotateCcw size={16} aria-hidden="true" /> Reset</button></div>
          <p className="gl-panel-help">The boxes begin with example figures. Replace them with your own; the answer updates as you type.</p>
          <div className="gl-field-groups">{fieldGroups(calculator).map(({ group, fields }) => <fieldset key={group}><legend>{group}</legend><div className="gl-field-grid">{fields.map((field) => <FieldInput key={field.key} field={field} value={typed[field.key] ?? ""} issue={issueFor(field.key)} onChange={(next) => setTyped((previous) => ({ ...previous, [field.key]: next }))} />)}</div></fieldset>)}</div>
        </form>
        <section className="gl-calculator-panel gl-calculator-results" aria-labelledby="result-heading" aria-live="polite">
          <p className="gh-eyebrow">THE WORKING</p><h2 id="result-heading">{issues.length ? "Check your inputs" : "What this comes to"}</h2>
          {issues.length ? <><p>Every box needs a valid number before the sums can run.</p><ul>{issues.map((issue) => <li key={issue.key}><strong>{issue.label}</strong> — {issue.message}</li>)}</ul></> : <><ol>{readings.map((reading) => <ResultRow key={reading.key} reading={reading} />)}</ol><p className="gl-results-note">These answers come only from the figures above. The formulas show their working; they do not measure local demand or promise a return.</p></>}
        </section>
      </div>
      <section className="gl-related" aria-labelledby="other-tools-heading"><div className="gl-section-heading"><div><p className="gh-eyebrow">ANOTHER QUESTION?</p><h2 id="other-tools-heading">Other calculators.</h2><p>Choose a different calculation, or return to the full toolkit.</p></div><Link to="/calculator" className="gl-inline-link">View all <ArrowUpRight size={17} /></Link></div><details className="gl-more-tools"><summary>Show {others.length} more tools</summary><div className="gl-related-list">{others.map((item) => <Link key={item.slug} to="/calculator/$slug" params={{ slug: item.slug }}>{item.title} {item.highlight}<ArrowUpRight size={16} /></Link>)}</div></details></section>
    </div></GlassShell>
  </>;
}

function FieldInput({ field, value, issue, onChange }: { field: Calculator["fields"][number]; value: string; issue: FieldIssue | undefined; onChange: (next: string) => void }) {
  const id = useId(); const helpId = `${id}-help`; const errorId = `${id}-error`;
  return <div className="gl-field"><label htmlFor={id}>{field.label} <span>({field.unitLabel})</span></label><div className="gl-field-box">{field.prefix && <span aria-hidden="true">{field.prefix}</span>}<input id={id} name={field.key} type="text" inputMode="decimal" autoComplete="off" value={value} onChange={(event) => onChange(event.target.value)} aria-describedby={issue ? `${helpId} ${errorId}` : helpId} aria-invalid={issue ? true : undefined} />{field.suffix && <span aria-hidden="true">{field.suffix}</span>}</div><p id={helpId}>{field.help}</p>{issue && <p id={errorId} className="gl-error-text">{issue.message}</p>}</div>;
}

function ResultRow({ reading }: { reading: Reading }) {
  return <li className={reading.primary ? "gl-result-primary" : ""}><span>{reading.label}</span><strong>{reading.display}</strong><p>{reading.formula}</p>{reading.note && <p>{reading.note}</p>}</li>;
}

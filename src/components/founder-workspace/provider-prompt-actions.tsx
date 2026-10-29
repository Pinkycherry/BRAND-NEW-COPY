import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";

const providers = [
  { id: "chatgpt", label: "ChatGPT", base: "https://chatgpt.com/?q=" },
  { id: "claude", label: "Claude", base: "https://claude.ai/new?q=" },
  { id: "grok", label: "Grok", base: "https://grok.com/?q=" },
  { id: "perplexity", label: "Perplexity", base: "https://www.perplexity.ai/search?q=" },
] as const;

export function ProviderPromptActions({ prompt, title = "Continue with your chosen AI", className = "" }: { prompt: string; title?: string; className?: string }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };
  return <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6 ${className}`} aria-label="Choose an AI provider">
    <h3 className="text-xl font-bold text-slate-950">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-600">Your prepared prompt opens in your own provider account. Review it there and press send yourself. BusinessIdea.io does not run the AI request or save its answer.</p>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {providers.map(provider => <a key={provider.id} href={provider.base + encodeURIComponent(prompt)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-900 transition hover:border-blue-400 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
        <span>Open {provider.label} with prepared prompt</span><ArrowUpRight size={17} className="shrink-0 text-blue-700"/>
      </a>)}
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button type="button" onClick={()=>void copyPrompt()} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:border-blue-500">{copyState==="copied"?<Check size={16}/>:<Copy size={16}/>} {copyState==="copied"?"Prompt copied":"Copy prepared prompt"}</button>
      {copyState==="copied"&&<p role="status" className="text-sm text-green-700">Ready to paste wherever you need it.</p>}
      {copyState==="failed"&&<p role="status" className="text-sm text-amber-800">Copy was blocked by your browser. Select and copy from the prompt preview above.</p>}
    </div>
  </section>;
}

import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SiClaude, SiPerplexity } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { getValidateUrl, VALIDATE_PLATFORMS, type ValidatePlatform } from "@/lib/validate.functions";

const icon = { claude: SiClaude, perplexity: SiPerplexity, chatgpt: RiOpenaiFill, grok: Sparkles };

export function ValidateButton({ slug }: { slug: string }) {
  const getUrl = useServerFn(getValidateUrl);
  const [opening, setOpening] = useState<ValidatePlatform | null>(null);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState("");
  const choose = async (platform: ValidatePlatform) => {
    if (opening) return;
    setError(""); setFallback(""); setOpening(platform);
    const tab = window.open("about:blank", "_blank");
    if (tab) { tab.opener = null; tab.document.title = "Preparing your validation"; tab.document.body.textContent = "Preparing your validation…"; }
    try {
      const url = await getUrl({ data: { slug, platform } });
      if (tab && !tab.closed) tab.location.replace(url);
      else setFallback(url);
    } catch (e) {
      if (tab && !tab.closed) tab.close();
      setError(e instanceof Error ? e.message : "We could not open this idea right now. Please try again.");
    } finally { setOpening(null); }
  };
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
    <div className="flex items-center gap-3"><span className="rounded-lg bg-primary/10 p-2 text-primary"><Sparkles size={22}/></span><h3 className="text-xl font-bold">Validate this idea</h3></div>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Choose an AI tool to open a structured research prompt prepared from this published idea. Check the result against local sources and real buyers.</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-label="Choose an AI validation tool">{VALIDATE_PLATFORMS.map(platform=>{const Icon=icon[platform.id]; return <button key={platform.id} type="button" onClick={()=>void choose(platform.id)} disabled={Boolean(opening)} aria-busy={opening===platform.id} className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left font-semibold transition hover:border-primary/50 disabled:opacity-60"><Icon size={19}/><span className="flex-1">{opening===platform.id?"Opening…":"Continue with "+platform.label}</span><ArrowUpRight size={17}/></button>})}</div>
    {error&&<p className="mt-4 text-sm text-red-700" role="alert">{error}</p>}
    {fallback&&<a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary" href={fallback} target="_blank" rel="noopener noreferrer">Open prepared validation <ArrowUpRight size={16}/></a>}
    <p className="mt-5 text-xs text-muted-foreground">The research opens on the selected service in a new tab.</p>
  </div>;
}

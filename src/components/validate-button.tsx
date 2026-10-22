import { useEffect, useId, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SiClaude, SiPerplexity } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";

import { authClient } from "@/lib/auth-client";
import { getValidateUrl, VALIDATE_CONTEXT_MAX_LENGTH, VALIDATE_PLATFORMS, type ValidatePlatform } from "@/lib/validate.functions";
import "@/components/glass-validation.css";

const icon = { claude: SiClaude, perplexity: SiPerplexity, chatgpt: RiOpenaiFill, grok: Sparkles };

/** Same four destinations and optional context as the staging site's Validate control. */
export function ValidateButton({ slug }: { slug: string }) {
  const fieldId = useId();
  const navigate = useNavigate();
  const getUrl = useServerFn(getValidateUrl);
  const [auth, setAuth] = useState<"loading" | "anonymous" | "signed-in">("loading");
  const [context, setContext] = useState("");
  const [opening, setOpening] = useState<ValidatePlatform | null>(null);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState("");

  useEffect(() => {
    let active = true;
    void authClient.auth.getSession().then(({ data }) => {
      if (active) setAuth(data.session ? "signed-in" : "anonymous");
    }).catch(() => { if (active) setAuth("anonymous"); });
    const { data: listener } = authClient.auth.onAuthStateChange((_event, session) => {
      if (active) setAuth(session ? "signed-in" : "anonymous");
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  const choose = async (platform: ValidatePlatform) => {
    if (auth === "anonymous") {
      void navigate({ to: "/sign-in", search: { redirect: "/idea/" + slug + "#validate" } });
      return;
    }
    if (auth !== "signed-in" || opening) return;
    setError("");
    setFallback("");
    setOpening(platform);
    // Open during the user gesture so browser popup blockers do not drop the result.
    const tab = window.open("about:blank", "_blank");
    if (tab) {
      tab.opener = null;
      tab.document.title = "Preparing your validation";
      tab.document.body.textContent = "Preparing your validation…";
    }
    try {
      const url = await getUrl({ data: { slug, platform, context: context.trim() || undefined } });
      if (tab && !tab.closed) tab.location.replace(url);
      else setFallback(url);
    } catch (e) {
      if (tab && !tab.closed) tab.close();
      setError(e instanceof Error ? e.message : "We could not open this idea right now. Please try again.");
    } finally {
      setOpening(null);
    }
  };

  return <div className="gl-validate-panel">
    <div className="gl-validate-top"><span className="gl-validate-icon" aria-hidden="true"><Sparkles size={24} /></span><div><p className="gh-eyebrow">FREE · NO EXTRA COST OR LIMIT</p><h3>Validate this idea.</h3></div></div>
    <p>Get a structured research write-up using an AI tool you already use. Choose a destination; the prompt is prepared from this published blueprint.</p>
    <div className="gl-validate-options" aria-label="Choose an AI validation tool">
      {VALIDATE_PLATFORMS.map((platform) => {
        const Icon = icon[platform.id];
        return <button key={platform.id} type="button" onClick={() => void choose(platform.id)} disabled={auth === "loading" || Boolean(opening)} aria-busy={opening === platform.id}>
          <Icon size={19} aria-hidden="true" /><span>{opening === platform.id ? "Opening…" : "Continue with " + platform.label}</span><ArrowUpRight size={16} aria-hidden="true" />
        </button>;
      })}
    </div>
    <div className="gl-validate-context"><div className="gl-validate-label"><label htmlFor={fieldId}>Add your own context <span>(optional)</span></label><span>{VALIDATE_CONTEXT_MAX_LENGTH - context.length} left</span></div><textarea id={fieldId} value={context} maxLength={VALIDATE_CONTEXT_MAX_LENGTH} disabled={Boolean(opening)} onChange={(event) => setContext(event.target.value)} rows={3} placeholder="Your city, target market, starting budget, skills, or the angle you want stress-tested hardest." /><p>Your context is sent to the AI tool you select as part of the prompt. We do not save it here.</p></div>
    {error && <p className="gl-validate-error" role="alert">{error}</p>}
    {fallback && <a className="gl-validate-fallback" href={fallback} target="_blank" rel="noopener noreferrer">Open your prepared validation <ArrowUpRight size={16} /></a>}
    <p className="gl-validate-foot">Sign in here once to use Validate. Your research opens on the chosen service in a new tab; sign in there if it asks you to, then send the prepared prompt.</p>
  </div>;
}

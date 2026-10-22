import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { z } from "zod";

import { GlassShell } from "@/components/glass-shell";
import { signInWithGoogle } from "@/lib/auth-client";
import "@/components/glass-library.css";

export const Route = createFileRoute("/sign-in")({
  validateSearch: z.object({ redirect: z.string().optional() }),
  head: () => ({ meta: [
    { title: "Sign In | BusinessIdea.io" },
    { name: "description", content: "Sign in with Google to use your BusinessIdea.io account." },
    { name: "robots", content: "noindex,follow" },
  ] }),
  component: SignInPage,
});

function SignInPage() {
  const { redirect } = Route.useSearch();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSignIn = async () => {
    setPending(true);
    setError(null);
    const destination = window.location.origin + (redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/");
    try {
      const { error: signInError } = await signInWithGoogle(destination);
      if (signInError) { setError(signInError.message); setPending(false); }
    } catch {
      setError("Sign-in could not start. Please try again.");
      setPending(false);
    }
  };
  return <GlassShell><div className="gl-page gl-sign-page">
    <nav className="gl-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Sign in</span></nav>
    <div className="gl-sign-card"><div className="gl-sign-art" aria-hidden="true">✦</div><p className="gh-eyebrow">YOUR ACCOUNT</p><h1>Welcome <em>back.</em></h1><p>Continue with Google to sign in. You can still browse published ideas and use calculators without an account.</p><button type="button" className="gh-button gh-button-primary" onClick={handleSignIn} disabled={pending}>{pending ? "Redirecting…" : "Continue with Google"} <ArrowUpRight size={17} aria-hidden="true" /></button>{error && <p className="gl-sign-error" role="alert">{error}</p>}<p className="gl-sign-small">Google is the available sign-in method on this demo.</p><Link to="/browse" className="gl-inline-link">Explore ideas without signing in <ArrowUpRight size={17} /></Link></div>
  </div></GlassShell>;
}

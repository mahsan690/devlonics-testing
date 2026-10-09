"use client";

import { useSearchParams } from "next/navigation";
import { QuoteWizard } from "./QuoteWizard";

// Reads ?need=store or ?state=TX from links elsewhere on the site
// so the form opens with that answer already picked.
export function ContactWizard() {
  const sp = useSearchParams();
  const need = sp.get("need") ?? undefined;
  const state = sp.get("state") ?? undefined;
  return <QuoteWizard key={`${need}-${state}`} initialNeed={need} initialState={state} variant="page" />;
}

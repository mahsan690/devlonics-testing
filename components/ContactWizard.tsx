"use client";

import { useSearchParams } from "next/navigation";
import { QuoteWizard } from "./QuoteWizard";

// Reads ?need=leads or ?industry=hvac from links elsewhere on the site
// so the form opens with that answer already picked.
export function ContactWizard() {
  const sp = useSearchParams();
  const need = sp.get("need") ?? undefined;
  const industry = sp.get("industry") ?? undefined;
  return <QuoteWizard key={`${need}-${industry}`} initialNeed={need} initialIndustry={industry} variant="page" />;
}

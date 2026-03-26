/**
 * Turn raw Google-style category labels into short, natural phrases for prose
 * (e.g. city page intros). Omits entries that do not look urgent-care-related.
 */

const EXACT_PHRASE: Record<string, string> = {
  "urgent care center": "urgent care centers",
  "urgent care clinic": "urgent care clinics",
  "walk-in clinic": "walk-in clinics",
  "medical clinic": "medical clinics",
  "community health centre": "community health centers",
  "community health center": "community health centers",
  "after hours clinic": "after-hours clinics",
  "immediate care center": "immediate care centers",
  "minor injuries unit": "minor injury units",
  "emergency care physician": "emergency and urgent care physicians",
  "family practice physician": "family medicine providers",
};

const URGENT_CARE_LIKE =
  /urgent\s*care|walk-?in|after\s*hours|immediate\s*care|minor\s*injur|medical\s*clinic|community\s*health|primary\s*care|family\s*practice|pediatric/i;

/** Labels that match common noise but are not healthcare services. */
const NON_URGENT_CARE =
  /auto\s+repair|collision|transmission|student\s+dormitory|orthodox\s+church|storage\s+facility|insurance\s+agency/i;

function normalizeKey(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Fallback: lowercase prose, light plural / phrasing for service-style labels. */
function humanizeFallback(raw: string): string {
  let s = raw.trim().toLowerCase();
  if (!s) return "";
  if (s.endsWith(" service")) {
    return `${s.slice(0, -" service".length)} services`;
  }
  if (s.endsWith(" clinic")) {
    return s.replace(/ clinic$/, " clinics");
  }
  if (s.endsWith(" center")) {
    return s.replace(/ center$/, " centers");
  }
  if (s.endsWith("ist") && !s.endsWith("urgent care provider")) {
    return `${s}s`;
  }
  if (!s.endsWith("s")) {
    return `${s}s`;
  }
  return s;
}

function phraseForLabel(raw: string): string | null {
  const key = normalizeKey(raw);
  if (!key) return null;
  if (NON_URGENT_CARE.test(key)) return null;
  if (EXACT_PHRASE[key]) return EXACT_PHRASE[key];
  if (!URGENT_CARE_LIKE.test(raw)) return null;
  return humanizeFallback(raw);
}

function oxfordJoin(items: string[]): string {
  if (items.length === 1) return items[0]!;
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/**
 * @param careTypes Raw labels from listings (dedupe before calling if needed).
 * @param maxItems Cap how many categories appear in the sentence (default 5).
 * @returns Clause starting with "including …" or a neutral fallback (no leading "including" duplicate in caller).
 */
export function formatCareTypesClause(
  careTypes: string[],
  maxItems = 5,
): string {
  const seen = new Set<string>();
  const phrases: string[] = [];
  for (const raw of careTypes) {
    const p = phraseForLabel(raw);
    if (!p || seen.has(p)) continue;
    seen.add(p);
    phrases.push(p);
    if (phrases.length >= maxItems) break;
  }
  if (phrases.length === 0) return "including urgent care and walk-in services";
  return `including ${oxfordJoin(phrases)}`;
}

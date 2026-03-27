/**
 * Turn raw Google-style category labels into short, natural phrases for prose
 * (e.g. city page intros). Omits entries that do not look OB-GYN– or women's-health–related.
 */

const EXACT_PHRASE: Record<string, string> = {
  "obstetrician-gynecologist": "obstetrician-gynecologists",
  "obstetrician gynecologist": "obstetrician-gynecologists",
  "gynecologist": "gynecologists",
  "obstetrician": "obstetricians",
  "women's health clinic": "women's health clinics",
  "womens health clinic": "women's health clinics",
  "reproductive health clinic": "reproductive health clinics",
  "maternity care": "maternity care services",
  "prenatal care": "prenatal care",
  "family planning center": "family planning centers",
  "medical clinic": "medical clinics",
  "community health centre": "community health centers",
  "community health center": "community health centers",
};

const OBGYN_WOMENS_HEALTH_LIKE =
  /ob\s*-?\s*gyn|obstetr|gynecol|women'?s\s+health|maternity|prenatal|postpartum|reproductive\s+health|birth\s+control|family\s+planning|perinatal|pelvic|menopause|midwif/i;

/** Place / business labels that are never OB-GYN or women's health (filter noise from Maps categories). */
const NON_RELEVANT =
  /auto\s+repair|car\s+wash|car\s+dealer|gas\s+station|restaurant|cafe|coffee\s+shop|pizza|retail|grocery|supermarket|gym|fitness(\s+center)?|yoga\s+studio|hotel|motel|barber|beauty\s+salon|nail\s+salon|plumber|electrician|lawyer|attorney|bank|real\s+estate|church|synagogue|mosque|storage\s+facility|laundromat|parking\s+lot/i;

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
  if (s.endsWith("ist") && !s.endsWith("ob-gyn provider")) {
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
  if (NON_RELEVANT.test(key)) return null;
  if (EXACT_PHRASE[key]) return EXACT_PHRASE[key];
  if (!OBGYN_WOMENS_HEALTH_LIKE.test(raw)) return null;
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
  if (phrases.length === 0) {
    return "including OB-GYN and women's health services";
  }
  return `including ${oxfordJoin(phrases)}`;
}

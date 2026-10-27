/**
 * Turning a sourced value from a data file into a line in a page's
 * "Sources" section. Every data file stores rules as objects carrying
 * source_name, source_url, effective_from and an original-language quote.
 */

export interface SourceEntry {
  /** i18n key of what this source governs. */
  labelKey: string;
  sourceName: string;
  sourceUrl: string;
  effectiveFrom: string | null;
  /** Original-language quote proving the value. */
  evidence: string;
  unsure: boolean;
}

export interface SourcedValue {
  source_name?: string;
  source_url?: string;
  effective_from?: string | null;
  evidence?: string;
  unsure?: boolean;
}

export function sourceEntry(labelKey: string, node: SourcedValue): SourceEntry {
  return {
    labelKey,
    sourceName: node.source_name ?? "",
    sourceUrl: node.source_url ?? "",
    effectiveFrom: node.effective_from ?? null,
    evidence: node.evidence ?? "",
    unsure: node.unsure === true,
  };
}

/** The language a quote is written in, for its lang attribute. */
export function quoteLang(text: string): "hy" | "ru" | "en" {
  if (/[Ա-֏]/.test(text)) return "hy";
  if (/[Ѐ-ӿ]/.test(text)) return "ru";
  return "en";
}

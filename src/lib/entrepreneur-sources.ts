/**
 * The source list shown at the foot of the entrepreneur page, read out of
 * the sourced-value objects in src/data/salary-tax.json, so the page cites
 * exactly what the calculator computed with.
 */

import data from "../data/salary-tax.json" with { type: "json" };
import type { SourceEntry } from "./salary-sources.ts";

interface SourcedValue {
  source_name?: string;
  source_url?: string;
  effective_from?: string | null;
  evidence?: string;
  unsure?: boolean;
}

function entry(labelKey: string, node: SourcedValue): SourceEntry {
  return {
    labelKey,
    sourceName: node.source_name ?? "",
    sourceUrl: node.source_url ?? "",
    effectiveFrom: node.effective_from ?? null,
    evidence: node.evidence ?? "",
    unsure: node.unsure === true,
  };
}

const E = data.entrepreneur;
const services = E.turnover_tax.rates_2026.find((r) => r.activity.startsWith("Other activities"))!;

/** In the order of the result lines, then the regime thresholds. */
export const ENTREPRENEUR_SOURCES: SourceEntry[] = [
  entry("turnoverTax", services.rate),
  entry("profitTax", E.turnover_tax.ie_fixed_payments[0]!),
  entry("pension", E.turnover_tax.ie_fixed_payments[1]!),
  entry("microPension", E.micro_enterprise.other_fixed_payments[0]!),
  entry("stamp", E.general_regime.ie_stamp_duty),
  entry("health", E.general_regime.ie_health_insurance),
  entry("microThreshold", E.micro_enterprise.threshold),
];

export const LAST_VERIFIED: string = data._readme.last_verified;

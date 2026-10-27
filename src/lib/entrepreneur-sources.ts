/**
 * The source list shown at the foot of the entrepreneur page, read out of
 * the sourced-value objects in src/data/salary-tax.json, so the page cites
 * exactly what the calculator computed with.
 */

import data from "../data/salary-tax.json" with { type: "json" };
import { sourceEntry as entry, type SourceEntry } from "./sources.ts";

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

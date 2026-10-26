/**
 * The source list shown at the foot of the salary page.
 *
 * Reads the sourced-value objects out of src/data/salary-tax.json so the page
 * cites exactly what the calculator computed with. If a value's source
 * changes in the data, the page updates with it.
 */

import data from "../data/salary-tax.json" with { type: "json" };

export interface SourceEntry {
  /** i18n key for the deduction this source governs. */
  labelKey: string;
  sourceName: string;
  sourceUrl: string;
  effectiveFrom: string | null;
  /** Original-language quote proving the value. */
  evidence: string;
  unsure: boolean;
}

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

const e = data.employee;

/** In the same order as the deduction lines in the result. */
export const SALARY_SOURCES: SourceEntry[] = [
  entry("incomeTax", e.income_tax.standard_rate),
  entry("pension", e.funded_pension.formula_2026),
  entry("stamp", e.stamp_duty.bands_2026),
  entry("health", e.health_insurance.bands_2026),
  entry("minimumWage", e.minimum_wage),
];

export const LAST_VERIFIED: string = data._readme.last_verified;

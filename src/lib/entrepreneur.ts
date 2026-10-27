/**
 * The entrepreneur calculation bound to the real data.
 *
 * Reads the `entrepreneur` section of src/data/salary-tax.json, where every
 * value carries its primary source and an original-language quote, and binds
 * the pure functions in ./entrepreneur-core.ts to it. The browser receives
 * ENTREPRENEUR_PARAMS serialised into the page instead of the data file.
 *
 * ADVISORY ONLY. The IT rate and the micro-enterprise pension base are
 * flagged `unsure` in the data file; the page says so.
 */

import data from "../data/salary-tax.json" with { type: "json" };
import {
  calculateEntrepreneurTax as coreCalculate,
  type ActivityKey,
  type EntrepreneurInput,
  type EntrepreneurParams,
  type EntrepreneurResult,
  type TurnoverActivity,
} from "./entrepreneur-core.ts";
import type { Band } from "./salary-core.ts";

export type {
  ActivityKey,
  EntrepreneurInput,
  EntrepreneurParams,
  EntrepreneurResult,
  LineKey,
  Regime,
  Warning,
} from "./entrepreneur-core.ts";

const E = data.entrepreneur;
const T = E.turnover_tax;

/**
 * Which row of the art. 258 table each activity in the calculator reads.
 * Matched on the row's description, so reordering the table in the data
 * file cannot silently swap rates.
 */
const ACTIVITY_ROWS: Record<ActivityKey, string> = {
  services: "Other activities",
  it: "High-technology activities",
  trade: "Trade (purchase & resale)",
  production: "Production",
  catering: "Catering",
  rent: "Rent, interest, royalties",
};

function activityRow(key: ActivityKey) {
  const row = T.rates_2026.find((r) => r.activity.startsWith(ACTIVITY_ROWS[key]));
  if (!row) throw new Error(`No turnover-tax row for ${key}`);
  return row;
}

export const ACTIVITY_KEYS = Object.keys(ACTIVITY_ROWS) as ActivityKey[];

const activities: TurnoverActivity[] = ACTIVITY_KEYS.map((key) => {
  const row = activityRow(key);
  return {
    key,
    ratePercent: row.rate.value,
    expenseCreditPercent: row.deduction?.value ?? null,
    minimumPercent: row.minimum?.value ?? null,
  };
});

const [fixedProfitTax, turnoverPension] = T.ie_fixed_payments;
const microPension = E.micro_enterprise.other_fixed_payments[0]!;
const G = E.general_regime;

/** The micro pension rate is stored as prose ("5% of income received"). */
function leadingPercent(text: string): number {
  const match = /^(\d+(?:\.\d+)?)%/.exec(text);
  if (!match) throw new Error(`Expected a leading percentage in "${text}"`);
  return Number(match[1]);
}

export const ENTREPRENEUR_PARAMS: EntrepreneurParams = {
  taxYear: data._readme.tax_year,
  activities,
  turnoverThreshold: T.eligibility_threshold.value,
  microThreshold: E.micro_enterprise.threshold.value,
  fixedProfitTaxMonthly: fixedProfitTax!.value as number,
  turnoverPensionMonthly: turnoverPension!.value as number,
  microPensionRatePercent: leadingPercent(microPension.value as string),
  stampBands: G.ie_stamp_duty.value.bands as Band[],
  healthPremium: G.ie_health_insurance.value,
  healthFrom: G.ie_health_insurance.applies_from_prior_year_income,
  // Art. 267(5): the micro regime is closed to all trade, to software
  // development and other professional services, and to anyone receiving
  // rent, interest or royalties.
  microExcluded: ["trade", "it", "rent"],
};

/** Values page copy refers to by name, before formatting. */
export const ENTREPRENEUR_FACTS = {
  taxYear: ENTREPRENEUR_PARAMS.taxYear,
  generalProfitTaxRate: G.ie_income_tax.value,
  vatRate: G.vat_rate.value,
  itRateUntil: activityRow("it").rate.effective_to!,
  lastVerified: data._readme.last_verified,
} as const;

export function calculateEntrepreneurTax(input: EntrepreneurInput): EntrepreneurResult {
  return coreCalculate(ENTREPRENEUR_PARAMS, input);
}

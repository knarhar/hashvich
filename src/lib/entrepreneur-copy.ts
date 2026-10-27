/**
 * Formatted values that the entrepreneur page's copy refers to by name.
 *
 * Project rule: numbers live in src/data, text lives in src/i18n. Copy holds
 * placeholders like {rateServices}; this module supplies the values, already
 * formatted for the locale.
 */

import type { Locale } from "../i18n/config.ts";
import type { Params } from "../i18n/utils.ts";
import { formatAmd, formatPercent } from "./format.ts";
import type { ActivityKey, EntrepreneurInput } from "./entrepreneur-core.ts";
import { activityFor } from "./entrepreneur-core.ts";
import {
  ENTREPRENEUR_FACTS,
  ENTREPRENEUR_PARAMS,
  calculateEntrepreneurTax,
} from "./entrepreneur.ts";

/** The worked examples, also quoted in the FAQ. */
export const EXAMPLE_CASES: (EntrepreneurInput & { activity: ActivityKey })[] = [
  { regime: "turnover", activity: "it", turnover: 12_000_000 },
  { regime: "turnover", activity: "services", turnover: 6_000_000, expenses: 2_000_000 },
  { regime: "micro", activity: "production", turnover: 10_000_000 },
];

/** "Services" → "Services", "Rent" → "Rent": the capitalised key for params. */
const cap = (key: string) => key[0]!.toUpperCase() + key.slice(1);

export function entrepreneurCopyParams(locale: Locale): Params {
  const P = ENTREPRENEUR_PARAMS;
  const amd = (v: number) => formatAmd(v, locale);
  const pct = (v: number) => formatPercent(v, locale);

  const perActivity: Params = {};
  for (const key of ["services", "it", "trade", "production", "catering", "rent"] as const) {
    const a = activityFor(P, key);
    perActivity[`rate${cap(key)}`] = pct(a.ratePercent);
    if (a.expenseCreditPercent !== null) perActivity[`credit${cap(key)}`] = pct(a.expenseCreditPercent);
    if (a.minimumPercent !== null) perActivity[`min${cap(key)}`] = pct(a.minimumPercent);
  }

  const [it, services, micro] = EXAMPLE_CASES.map((c) => calculateEntrepreneurTax(c));

  return {
    year: P.taxYear,
    nextYear: P.taxYear + 1,
    ...perActivity,

    turnoverThreshold: amd(P.turnoverThreshold),
    microThreshold: amd(P.microThreshold),

    fixedProfitTaxMonthly: amd(P.fixedProfitTaxMonthly),
    fixedProfitTaxYear: amd(P.fixedProfitTaxMonthly * 12),
    turnoverPensionMonthly: amd(P.turnoverPensionMonthly),
    turnoverPensionYear: amd(P.turnoverPensionMonthly * 12),
    microPensionRate: pct(P.microPensionRatePercent),

    stampLow: amd(P.stampBands[0]!.amount),
    stampHigh: amd(P.stampBands[1]!.amount),
    stampThreshold: amd(P.stampBands[0]!.to!),

    healthPremium: amd(P.healthPremium),
    healthThreshold: amd(P.healthFrom - 1),

    generalRate: pct(ENTREPRENEUR_FACTS.generalProfitTaxRate),
    vatRate: pct(ENTREPRENEUR_FACTS.vatRate),
    itRateUntilYear: ENTREPRENEUR_FACTS.itRateUntil.slice(0, 4),

    exampleItTurnover: amd(it!.base),
    exampleItTotal: amd(it!.total),
    exampleServicesTurnover: amd(services!.base),
    exampleServicesExpenses: amd(EXAMPLE_CASES[1]!.expenses!),
    exampleServicesTotal: amd(services!.total),
    exampleMicroTurnover: amd(micro!.base),
    exampleMicroTotal: amd(micro!.total),
  };
}

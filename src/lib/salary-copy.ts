/**
 * Formatted values that page copy refers to by name.
 *
 * Project rule: numbers live in src/data, text lives in src/i18n. Copy
 * therefore contains placeholders like {rate}, and this module supplies the
 * values, already formatted for the locale. No rate or amount is written into
 * a translation file.
 */

import type { Locale } from "../i18n/config.ts";
import type { Params } from "../i18n/utils.ts";
import { formatAmd, formatPercent } from "./format.ts";
import { SALARY_FACTS, calculateNetSalary } from "./salary.ts";

/** Gross salaries used by the worked examples and quoted in the FAQ. */
export const EXAMPLE_SALARIES = [300_000, 800_000, 1_500_000] as const;

export function salaryCopyParams(locale: Locale): Params {
  const p = SALARY_FACTS;
  const amd = (v: number) => formatAmd(v, locale);
  const pct = (v: number) => formatPercent(v, locale);

  // FAQ quotes two of the worked examples, so the numbers in the prose and
  // the numbers in the table cannot drift apart.
  const low = calculateNetSalary({ gross: EXAMPLE_SALARIES[0] });
  const mid = calculateNetSalary({ gross: EXAMPLE_SALARIES[1] });

  return {
    year: p.taxYear,
    rate: pct(p.incomeTaxRate),
    rdRate: pct(p.rdRate),

    pensionLowerRate: pct(p.pensionLowerRate),
    pensionLowerBandMax: amd(p.pensionLowerBandMax),
    pensionUpperRate: pct(p.pensionUpperRate),
    pensionDeduction: amd(p.pensionDeduction),
    pensionCap: amd(p.pensionCapBase),
    pensionMax: amd(p.pensionMaxPayment),

    stampLow: amd(p.stampLow),
    stampHigh: amd(p.stampHigh),
    stampThreshold: amd(p.stampThreshold),

    healthNone: amd(p.healthNone),
    // The first dram at which the reduced share starts, so copy can say
    // "from X to Y" without implying the boundary amount is excluded.
    healthNoneNext: amd(p.healthNone + 1),
    healthReduced: amd(p.healthReduced),
    healthReducedMax: amd(p.healthReducedMax),
    healthFull: amd(p.healthFull),

    minWage: amd(p.minimumWage),

    exampleLowGross: amd(low.gross),
    exampleLowNet: amd(low.net),
    exampleMidGross: amd(mid.gross),
    exampleMidNet: amd(mid.net),
  };
}

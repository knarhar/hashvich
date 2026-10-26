/**
 * The salary calculation bound to the real data.
 *
 * All arithmetic lives in `./salary-core.ts` as pure functions of a parameter
 * object. This module reads `src/data/salary-tax.json`, where every value
 * carries its primary source and an original-language quote, and binds the
 * core functions to it. Server rendering and tests use these wrappers; the
 * browser receives `SALARY_PARAMS` serialised into the page and calls the
 * core functions directly, so the data file never reaches the client bundle.
 *
 * ADVISORY ONLY. Several inputs are flagged `unsure` in the data file
 * (`_open_questions`). Read those before relying on the output.
 */

import data from "../data/salary-tax.json" with { type: "json" };
import {
  calculateNetSalary as coreCalculate,
  healthInsurance as coreHealth,
  incomeTax as coreIncomeTax,
  incomeTaxRate as coreIncomeTaxRate,
  pensionPayment as corePension,
  stampPayment as coreStamp,
  type Band,
  type SalaryInput,
  type SalaryParams,
  type SalaryResult,
} from "./salary-core.ts";

export type {
  Band,
  DeductionKey,
  DeductionLine,
  Formula,
  SalaryInput,
  SalaryParams,
  SalaryResult,
} from "./salary-core.ts";

const P = data.employee.calculation_parameters_2026;

/**
 * The parameters, projected out of the data file. This object is what gets
 * serialised into the page for the browser.
 */
export const SALARY_PARAMS: SalaryParams = {
  taxYear: P._tax_year,
  incomeTaxRatePercent: P.income_tax.standard_rate_percent,
  rdRatePercent: P.income_tax.rd_rate_percent,
  pensionLowerRatePercent: P.funded_pension.lower_rate_percent,
  pensionLowerBandMax: P.funded_pension.lower_band_max,
  pensionUpperRatePercent: P.funded_pension.upper_rate_percent,
  pensionUpperDeduction: P.funded_pension.upper_deduction_amd,
  pensionCapBase: P.funded_pension.cap_base_amd,
  pensionMaxPayment: P.funded_pension.max_payment_amd,
  stampBands: P.stamp_payment.bands as Band[],
  healthBands: P.health_insurance.bands as Band[],
  minimumWage: P.minimum_wage_amd,
};

/** Values page copy refers to by name, before formatting. */
export const SALARY_FACTS = {
  taxYear: SALARY_PARAMS.taxYear,
  incomeTaxRate: SALARY_PARAMS.incomeTaxRatePercent,
  rdRate: SALARY_PARAMS.rdRatePercent,
  pensionLowerRate: SALARY_PARAMS.pensionLowerRatePercent,
  pensionLowerBandMax: SALARY_PARAMS.pensionLowerBandMax,
  pensionUpperRate: SALARY_PARAMS.pensionUpperRatePercent,
  pensionDeduction: SALARY_PARAMS.pensionUpperDeduction,
  pensionCapBase: SALARY_PARAMS.pensionCapBase,
  pensionMaxPayment: SALARY_PARAMS.pensionMaxPayment,
  minimumWage: SALARY_PARAMS.minimumWage,
  stampLow: SALARY_PARAMS.stampBands[0]!.amount,
  stampHigh: SALARY_PARAMS.stampBands[1]!.amount,
  stampThreshold: SALARY_PARAMS.stampBands[0]!.to!,
  healthNone: SALARY_PARAMS.healthBands[0]!.to!,
  healthReduced: SALARY_PARAMS.healthBands[1]!.amount,
  healthReducedMax: SALARY_PARAMS.healthBands[1]!.to!,
  healthFull: SALARY_PARAMS.healthBands[2]!.amount,
  lastVerified: data._readme.last_verified,
} as const;

export function incomeTaxRate(regime: "standard" | "rd" = "standard"): number {
  return coreIncomeTaxRate(SALARY_PARAMS, regime);
}

export function incomeTax(gross: number, regime: "standard" | "rd" = "standard"): number {
  return coreIncomeTax(SALARY_PARAMS, gross, regime);
}

export function pensionPayment(gross: number, participant = true): number {
  return corePension(SALARY_PARAMS, gross, participant);
}

export function stampPayment(gross: number): number {
  return coreStamp(SALARY_PARAMS, gross);
}

export function healthInsurance(gross: number, covered = true): number {
  return coreHealth(SALARY_PARAMS, gross, covered);
}

export function calculateNetSalary(input: SalaryInput): SalaryResult {
  return coreCalculate(SALARY_PARAMS, input);
}

/**
 * The salary calculation itself, as pure functions of an explicit parameter
 * object. Nothing here imports data.
 *
 * This split exists for a practical reason: `src/data/salary-tax.json` is
 * ~180 KB because every value carries its source and an original-language
 * quote. Importing it into the browser bundle would ship all of that to every
 * visitor. The server reads the data and serialises only the handful of
 * numbers below into the page, and the browser runs the same functions over
 * them. One implementation, no duplicated arithmetic.
 *
 * `src/lib/salary.ts` binds these to the real data for server and test use.
 */

import type { Formula } from "./breakdown.ts";

export type { Formula } from "./breakdown.ts";

/** A band of the form "from AMD to AMD (inclusive) charge `amount`". */
export interface Band {
  from: number;
  to: number | null;
  amount: number;
}

/** Every number the calculation needs. Mirrors the data file's parameters. */
export interface SalaryParams {
  taxYear: number;
  incomeTaxRatePercent: number;
  rdRatePercent: number;
  pensionLowerRatePercent: number;
  pensionLowerBandMax: number;
  pensionUpperRatePercent: number;
  pensionUpperDeduction: number;
  pensionCapBase: number;
  pensionMaxPayment: number;
  stampBands: Band[];
  healthBands: Band[];
  minimumWage: number;
}

/** Which deduction a line represents. Used as an i18n key. */
export type DeductionKey = "incomeTax" | "pension" | "stamp" | "health";

export interface DeductionLine {
  key: DeductionKey;
  amount: number;
  formula: Formula;
}

export interface SalaryInput {
  /** Monthly gross salary in AMD, as accrued by this employer. */
  gross: number;
  /**
   * Whether the employee makes the funded-pension social payment.
   * Mandatory for employees born on or after 1974-01-01; others may opt in.
   */
  pensionParticipant?: boolean;
  /**
   * Income-tax regime. "rd" is the reduced rate for qualifying R&D staff.
   */
  regime?: "standard" | "rd";
  /**
   * Whether the employee is inside the universal health-insurance system.
   * The bands already encode who is covered in the current tax year; set
   * this to false to force the premium to zero.
   */
  healthInsuranceCovered?: boolean;
}

export interface SalaryResult {
  gross: number;
  incomeTax: number;
  pensionPayment: number;
  stampPayment: number;
  healthInsurance: number;
  totalDeductions: number;
  net: number;
  /** Effective total deduction rate, 0-1. */
  effectiveRate: number;
  /** One entry per deduction, in display order. */
  lines: DeductionLine[];
}

export function bandFor(bands: Band[], amount: number): Band {
  const hit = bands.find((b) => amount >= b.from && (b.to === null || amount <= b.to));
  if (!hit) throw new Error(`No band covers ${amount}`);
  return hit;
}

export function incomeTaxRate(
  params: SalaryParams,
  regime: "standard" | "rd" = "standard",
): number {
  return regime === "rd" ? params.rdRatePercent : params.incomeTaxRatePercent;
}

export function incomeTax(
  params: SalaryParams,
  gross: number,
  regime: "standard" | "rd" = "standard",
): number {
  // The pension, stamp and health payments do not reduce the income-tax base.
  return (gross * incomeTaxRate(params, regime)) / 100;
}

/**
 * Funded-pension social payment on monthly salary.
 *
 * Lower band: a flat percentage of salary. Above it: a higher percentage
 * minus a fixed deduction, on a base capped at a multiple of the minimum
 * wage.
 *
 * Note: the statutory cap is assessed on income from ALL employers combined,
 * so for an employee with more than one job this can overstate the payment.
 */
export function pensionPayment(
  params: SalaryParams,
  gross: number,
  participant = true,
): number {
  if (!participant) return 0;
  if (gross <= params.pensionLowerBandMax) {
    return (gross * params.pensionLowerRatePercent) / 100;
  }
  const base = Math.min(gross, params.pensionCapBase);
  return (base * params.pensionUpperRatePercent) / 100 - params.pensionUpperDeduction;
}

export function stampPayment(params: SalaryParams, gross: number): number {
  return bandFor(params.stampBands, gross).amount;
}

export function healthInsurance(
  params: SalaryParams,
  gross: number,
  covered = true,
): number {
  if (!covered) return 0;
  return bandFor(params.healthBands, gross).amount;
}

export function calculateNetSalary(
  params: SalaryParams,
  input: SalaryInput,
): SalaryResult {
  const {
    gross,
    pensionParticipant = true,
    regime = "standard",
    healthInsuranceCovered = true,
  } = input;

  if (!Number.isFinite(gross) || gross < 0) {
    throw new Error(`gross must be a non-negative number, got ${gross}`);
  }

  const tax = incomeTax(params, gross, regime);
  const pension = pensionPayment(params, gross, pensionParticipant);
  const stamp = stampPayment(params, gross);
  const health = healthInsurance(params, gross, healthInsuranceCovered);

  const stampBand = bandFor(params.stampBands, gross);
  const healthBand = bandFor(params.healthBands, gross);

  const pensionFormula: Formula = !pensionParticipant
    ? { kind: "exempt" }
    : gross <= params.pensionLowerBandMax
      ? { kind: "percent", rate: params.pensionLowerRatePercent, base: gross }
      : {
          kind: "percentMinus",
          rate: params.pensionUpperRatePercent,
          base: Math.min(gross, params.pensionCapBase),
          minus: params.pensionUpperDeduction,
          capped: gross > params.pensionCapBase,
        };

  const lines: DeductionLine[] = [
    {
      key: "incomeTax",
      amount: tax,
      formula: { kind: "percent", rate: incomeTaxRate(params, regime), base: gross },
    },
    { key: "pension", amount: pension, formula: pensionFormula },
    {
      key: "stamp",
      amount: stamp,
      formula: { kind: "band", from: stampBand.from, to: stampBand.to },
    },
    {
      key: "health",
      amount: health,
      formula: healthInsuranceCovered
        ? { kind: "band", from: healthBand.from, to: healthBand.to }
        : { kind: "exempt" },
    },
  ];

  const totalDeductions = tax + pension + stamp + health;

  return {
    gross,
    incomeTax: tax,
    pensionPayment: pension,
    stampPayment: stamp,
    healthInsurance: health,
    totalDeductions,
    net: gross - totalDeductions,
    effectiveRate: gross === 0 ? 0 : totalDeductions / gross,
    lines,
  };
}

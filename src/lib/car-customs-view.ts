/**
 * The car import calculation as the calculator's form sees it, and its
 * result as a Breakdown for the shared result panel.
 *
 * Pure and data-free, so the browser island runs the same code as the
 * server: parameters and rates arrive as arguments.
 */

import {
  calculateCarImport,
  productionDate,
  type CarCustomsParams,
  type CarImportInput,
  type CarImportResult,
  type Fuel,
} from "./car-customs-core.ts";
import type { Breakdown, BreakdownLine, Formula } from "./breakdown.ts";
import type { CbaRates, RateCurrency } from "./cba-rates.ts";

/** Who imports and from where, folded into one choice for the form. */
export type Situation = "personal" | "business" | "eaeuFirst" | "eaeu";
export type FormFuel = "petrol" | "diesel" | "hybrid" | "electric";
export type PriceCurrency = RateCurrency | "AMD";

export interface CarForm {
  situation: Situation;
  fuel: FormFuel;
  year: number;
  /** 1-12, or null when unknown (customs then assumes the middle of the year). */
  month: number | null;
  engineCc: number;
  price: number;
  currency: PriceCurrency;
  /** Day the declaration is registered, YYYY-MM-DD. */
  clearanceDate: string;
}

export type CarWarning = "hybridAssumed" | "eaeuEnvUnconfirmed";

export interface CarView {
  breakdown: Breakdown;
  result: CarImportResult;
  warning: CarWarning | null;
}

const FUEL: Record<FormFuel, Fuel> = {
  petrol: "petrol",
  diesel: "diesel",
  // Petrol and diesel hybrids differ only in the commercial tariff, and only
  // when the engine outpowers the motor, which the form does not ask.
  hybrid: "hybrid_petrol",
  electric: "electric",
};

export function priceInAmd(price: number, currency: PriceCurrency, rates: CbaRates): number {
  return currency === "AMD" ? price : price * rates.amdPer[currency];
}

export function toImportInput(form: CarForm, rates: CbaRates): CarImportInput {
  const eaeu = form.situation === "eaeu" || form.situation === "eaeuFirst";
  const made: CarImportInput["made"] =
    form.month === null ? { year: form.year } : { year: form.year, month: form.month };

  // A car "made this year" with no month counts as made on 1 July, which can
  // fall after today. Customs cannot clear a car before it exists, so count
  // it as made on the clearance day instead.
  const on = new Date(`${form.clearanceDate}T00:00:00Z`);
  const clamped =
    productionDate(made).getTime() > on.getTime()
      ? { year: on.getUTCFullYear(), month: on.getUTCMonth() + 1, day: on.getUTCDate() }
      : made;

  return {
    importer: form.situation === "business" || form.situation === "eaeu" ? "business" : "personal",
    origin: eaeu ? "eaeu" : "third_country",
    fuel: FUEL[form.fuel],
    engineCc: form.engineCc,
    made: clamped,
    clearanceDate: form.clearanceDate,
    valueAmd: priceInAmd(form.price, form.currency, rates),
    eurRate: rates.amdPer.EUR,
    eaeuFirstCarThisYear: form.situation === "eaeuFirst",
  };
}

function dutyFormula(result: CarImportResult, input: CarImportInput): Formula {
  const f = result.dutyFormula;
  const perCc = (rate: number, floored: boolean): Formula => ({
    kind: "perUnit",
    rate,
    rateSymbol: "€",
    units: input.engineCc ?? 0,
    unitSymbol: "cm³",
    fx: input.eurRate,
    floored,
  });
  switch (f.kind) {
    case "none":
      return { kind: "exempt", reason: f.reason === "eaeu_goods" ? "eaeu" : "evQuota" };
    case "percent":
      return { kind: "percent", rate: f.percent, base: input.valueAmd };
    case "percentMin":
      return f.minApplied
        ? perCc(f.minEurPerCc, true)
        : { kind: "percent", rate: f.percent, base: input.valueAmd };
    case "perCc":
      return perCc(f.eurPerCc, false);
  }
}

const VAT_EXEMPT_REASON = {
  unified_includes_vat: "unified",
  ev_2026: "ev2026",
  eaeu_first_car: "eaeuFirst",
} as const;

export function carView(form: CarForm, rates: CbaRates, P: CarCustomsParams): CarView {
  const input = toImportInput(form, rates);
  const result = calculateCarImport(input, P);

  const vatFormula: Formula = result.vatExempt
    ? { kind: "exempt", reason: VAT_EXEMPT_REASON[result.vatExempt] }
    : {
        kind: "percent",
        rate: P.vat_percent,
        base: input.valueAmd + (result.regime === "tariff" ? result.duty : 0),
      };

  const lines: BreakdownLine[] = [
    { key: "duty", amount: result.duty, formula: dutyFormula(result, input) },
    { key: "vat", amount: result.vat, formula: vatFormula },
    {
      key: "environmental",
      amount: result.environmentalTax,
      formula: { kind: "percent", rate: result.environmentalPercent, base: input.valueAmd },
    },
  ];

  const value = Math.round(input.valueAmd);
  const warning: CarWarning | null = result.warnings.includes(
    "hybrid_power_split_assumed_electric_dominant",
  )
    ? "hybridAssumed"
    : result.warnings.includes("eaeu_first_car_environmental_tax_unconfirmed")
      ? "eaeuEnvUnconfirmed"
      : null;

  return {
    breakdown: {
      base: value,
      lines,
      total: result.total,
      result: value + result.total,
      effectiveRate: value === 0 ? 0 : result.total / value,
    },
    result,
    warning,
  };
}

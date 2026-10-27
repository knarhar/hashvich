/**
 * Import payments for a passenger car (EAEU HS heading 8703) brought into
 * Armenia, as pure functions of an explicit parameter object. Nothing here
 * imports data, so the browser island can run it without the 115 KB data
 * file; `./car-customs.ts` binds it to `src/data/car-customs.json`.
 *
 * The plain-words version of every rule below, with the legal source for
 * each, is in `docs/car-customs-logic.md`. Read that first.
 *
 * Two regimes exist and they do not mix:
 *   - personal use (an individual, one car, not for resale): one unified
 *     payment that already includes VAT, plus the environmental tax;
 *   - commercial (a company, or an individual over the personal-use limits):
 *     tariff duty, then 20% VAT on (customs value + duty), plus the
 *     environmental tax.
 * Electric cars are outside the unified payment even for individuals: they
 * always pay tariff duty plus VAT (both of which have 2026 exemptions).
 * Cars that already have EAEU status pay no customs duty at all.
 *
 * Every line is rounded to the whole dram, halves up, which is what the
 * SRC's own calculator (exim.src.am/transport) does.
 *
 * ADVISORY ONLY. Several inputs are flagged `unsure` in the data file
 * (`_open_questions`). Read those before relying on the output.
 */

export type Importer = "personal" | "business";
export type Origin = "third_country" | "eaeu";
export type Fuel = "petrol" | "diesel" | "hybrid_petrol" | "hybrid_diesel" | "electric";

/** A row of a table keyed by an upper bound; `to: null` is open-ended. */
interface UnifiedValueBand { eur_to: number | null; percent: number; min_eur_per_cc: number }
interface PerCcBand { cc_to: number | null; eur_per_cc: number }
interface TariffUsedBand { cc_to: number | null; percent: number; min_eur_per_cc: number }
interface TariffNewBand { cc_to: number | null; percent: number }
interface EnvBand { age_to: number | null; percent: number }

interface TariffTable {
  new: TariffNewBand[];
  used_3_to_7: TariffUsedBand[];
  over_7: PerCcBand[];
}

export interface CarCustomsParams {
  personal_unified: {
    up_to_3_years: UnifiedValueBand[];
    over_3_to_5_years: PerCcBand[];
    over_5_years: PerCcBand[];
  };
  tariff: {
    petrol: TariffTable;
    diesel: TariffTable;
    hybrid_electric_dominant_percent: number;
    electric_percent: number;
  };
  ev_duty_quota: { percent: number; valid_to: string };
  vat_percent: number;
  ev_vat_exemption: {
    any_ev: { from: string; to: string };
    newer_ev: { from: string; to: string; made_after: string };
  };
  eaeu_personal_vat_free_cars_per_year: number;
  environmental_tax: EnvBand[];
  state_duty_amd: { passenger_declaration: number; goods_declaration: number };
}

export interface CarImportInput {
  importer: Importer;
  origin: Origin;
  fuel: Fuel;
  /** Engine displacement in cm³. Ignored for electric cars. */
  engineCc?: number;
  /** Production date. Only the year is required. */
  made: { year: number; month?: number; day?: number };
  /** Date the customs declaration is registered, `YYYY-MM-DD`. */
  clearanceDate: string;
  /**
   * Value in AMD. Third country: customs value (price + transport and
   * insurance to the border; individuals' personal-use cars exclude
   * transport and insurance). EAEU: purchase price.
   */
  valueAmd: number;
  /** CBA AMD-per-EUR rate on the declaration day. */
  eurRate: number;
  /**
   * Hybrids, commercial regime only: is the combustion engine more powerful
   * than the electric motor's 30-minute rating? The tariff splits on this.
   * Undefined means "no", which is what the SRC calculator assumes.
   */
  hybridIceStronger?: boolean;
  /** Personal import from the EAEU: is this the first car this tax year? */
  eaeuFirstCarThisYear?: boolean;
  /** EV imported inside Armenia's 2026 zero-duty quota (needs a permit). */
  evDutyQuota?: boolean;
  /** Set false to ignore the 2026 EV VAT exemption even if eligible. */
  evVatExemption?: boolean;
}

/** How the duty line was arrived at, so a UI can show the arithmetic. */
export type DutyFormula =
  | { kind: "none"; reason: "eaeu_goods" | "ev_quota" }
  | { kind: "percent"; percent: number }
  | { kind: "percentMin"; percent: number; minEurPerCc: number; minApplied: boolean }
  | { kind: "perCc"; eurPerCc: number };

export interface CarImportResult {
  regime: "unified" | "tariff" | "eaeu";
  /** Whole years for display; the bands compare exact dates. */
  ageYears: number;
  /** Unified payment (personal) or customs duty (tariff). */
  duty: number;
  dutyFormula: DutyFormula;
  vat: number;
  vatExempt: false | "unified_includes_vat" | "ev_2026" | "eaeu_first_car";
  environmentalTax: number;
  environmentalPercent: number;
  /** duty + VAT + environmental tax, rounded once, as the SRC calculator does. */
  total: number;
  /** Customs state duty for the declaration; not in `total` (see docs). */
  stateDuty: number;
  warnings: string[];
}

/** Round to the whole dram, halves up, tolerant of float noise. */
export function roundAmd(x: number): number {
  return Math.round(Number(x.toFixed(6)));
}

/**
 * Production date with the SRC/EEC gap-filling rule: year only means
 * 1 July, year and month only means the 15th.
 */
export function productionDate(made: CarImportInput["made"]): Date {
  const month = made.month ?? 7;
  const day = made.month === undefined ? 1 : (made.day ?? 15);
  return new Date(Date.UTC(made.year, month - 1, day));
}

function addYears(d: Date, n: number): Date {
  return new Date(Date.UTC(d.getUTCFullYear() + n, d.getUTCMonth(), d.getUTCDate()));
}

/** True when strictly more than `n` years separate `made` and `on`. */
export function olderThan(made: Date, on: Date, n: number): boolean {
  return on.getTime() > addYears(made, n).getTime();
}

function wholeYears(made: Date, on: Date): number {
  let n = on.getUTCFullYear() - made.getUTCFullYear();
  if (addYears(made, n).getTime() > on.getTime()) n -= 1;
  return n;
}

function byCc<T extends { cc_to: number | null }>(bands: T[], cc: number): T {
  const hit = bands.find((b) => b.cc_to === null || cc <= b.cc_to);
  if (!hit) throw new Error(`No band covers ${cc} cm³`);
  return hit;
}

function inRange(on: Date, from: string, to: string): boolean {
  const t = on.getTime();
  return t >= Date.parse(from) && t <= Date.parse(to);
}

function requireCc(input: CarImportInput): number {
  if (!input.engineCc || input.engineCc <= 0) throw new Error("engineCc is required");
  return input.engineCc;
}

/** Personal-use unified payment, in EUR. Covers duty and VAT together. */
export function unifiedPaymentEur(
  P: CarCustomsParams,
  made: Date,
  on: Date,
  cc: number,
  valueEur: number,
): { eur: number; formula: DutyFormula } {
  const U = P.personal_unified;
  if (!olderThan(made, on, 3)) {
    const band = U.up_to_3_years.find((b) => b.eur_to === null || valueEur <= b.eur_to)!;
    const byValue = (valueEur * band.percent) / 100;
    const byVolume = cc * band.min_eur_per_cc;
    return {
      eur: Math.max(byValue, byVolume),
      formula: {
        kind: "percentMin",
        percent: band.percent,
        minEurPerCc: band.min_eur_per_cc,
        minApplied: byVolume > byValue,
      },
    };
  }
  const table = olderThan(made, on, 5) ? U.over_5_years : U.over_3_to_5_years;
  const band = byCc(table, cc);
  return { eur: cc * band.eur_per_cc, formula: { kind: "perCc", eurPerCc: band.eur_per_cc } };
}

/** Common Customs Tariff duty for commercial imports, in AMD. */
export function tariffDutyAmd(
  P: CarCustomsParams,
  input: CarImportInput,
  made: Date,
  on: Date,
): { amd: number; formula: DutyFormula } {
  const T = P.tariff;
  if (input.fuel === "electric") {
    return { amd: (input.valueAmd * T.electric_percent) / 100, formula: { kind: "percent", percent: T.electric_percent } };
  }
  const isHybrid = input.fuel === "hybrid_petrol" || input.fuel === "hybrid_diesel";
  if (isHybrid && !input.hybridIceStronger) {
    const p = T.hybrid_electric_dominant_percent;
    return { amd: (input.valueAmd * p) / 100, formula: { kind: "percent", percent: p } };
  }
  const table = input.fuel === "diesel" || input.fuel === "hybrid_diesel" ? T.diesel : T.petrol;
  const cc = requireCc(input);
  // "Used" in the tariff means 3 years or more since production.
  const used = !(on.getTime() < addYears(made, 3).getTime());
  if (!used) {
    const band = byCc(table.new, cc);
    return { amd: (input.valueAmd * band.percent) / 100, formula: { kind: "percent", percent: band.percent } };
  }
  if (olderThan(made, on, 7)) {
    const band = byCc(table.over_7, cc);
    return { amd: cc * band.eur_per_cc * input.eurRate, formula: { kind: "perCc", eurPerCc: band.eur_per_cc } };
  }
  const band = byCc(table.used_3_to_7, cc);
  const byValue = (input.valueAmd * band.percent) / 100;
  const byVolume = cc * band.min_eur_per_cc * input.eurRate;
  return {
    amd: Math.max(byValue, byVolume),
    formula: { kind: "percentMin", percent: band.percent, minEurPerCc: band.min_eur_per_cc, minApplied: byVolume > byValue },
  };
}

/** Environmental tax rate for the car's age, compared by exact dates. */
export function environmentalPercent(P: CarCustomsParams, made: Date, on: Date): number {
  const band = P.environmental_tax.find((b) => b.age_to === null || !olderThan(made, on, b.age_to));
  return band!.percent;
}

function evVatExempt(P: CarCustomsParams, made: Date, on: Date): boolean {
  const E = P.ev_vat_exemption;
  if (inRange(on, E.any_ev.from, E.any_ev.to)) return true;
  return inRange(on, E.newer_ev.from, E.newer_ev.to) && made.getTime() > Date.parse(E.newer_ev.made_after);
}

export function calculateCarImport(
  input: CarImportInput,
  P: CarCustomsParams,
): CarImportResult {
  const made = productionDate(input.made);
  const on = new Date(`${input.clearanceDate}T00:00:00Z`);
  if (Number.isNaN(on.getTime())) throw new Error(`Bad clearanceDate: ${input.clearanceDate}`);
  if (on.getTime() < made.getTime()) throw new Error("Clearance is before production");
  const warnings: string[] = [];
  const isEv = input.fuel === "electric";

  const environmentalPercentValue = environmentalPercent(P, made, on);
  const environmentalRaw = (input.valueAmd * environmentalPercentValue) / 100;
  const environmentalTax = roundAmd(environmentalRaw);

  let regime: CarImportResult["regime"];
  // Unrounded amounts: the SRC calculator rounds the total from these, not
  // from the rounded lines, so the two can differ by one dram.
  let dutyRaw = 0;
  let vatRaw = 0;
  let duty = 0;
  let dutyFormula: DutyFormula;
  let vat = 0;
  let vatExempt: CarImportResult["vatExempt"] = false;
  let vatBase = input.valueAmd;

  if (input.origin === "eaeu") {
    regime = "eaeu";
    dutyFormula = { kind: "none", reason: "eaeu_goods" };
    if (input.importer === "personal" && input.eaeuFirstCarThisYear) {
      vatExempt = "eaeu_first_car";
      warnings.push("eaeu_first_car_environmental_tax_unconfirmed");
    }
  } else if (input.importer === "personal" && !isEv) {
    regime = "unified";
    const u = unifiedPaymentEur(P, made, on, requireCc(input), input.valueAmd / input.eurRate);
    dutyRaw = u.eur * input.eurRate;
    duty = roundAmd(dutyRaw);
    dutyFormula = u.formula;
    vatExempt = "unified_includes_vat";
  } else {
    regime = "tariff";
    const quotaOpen = on.getTime() <= Date.parse(P.ev_duty_quota.valid_to);
    if (isEv && input.evDutyQuota && quotaOpen) {
      duty = 0;
      dutyFormula = { kind: "none", reason: "ev_quota" };
    } else {
      const t = tariffDutyAmd(P, input, made, on);
      vatBase += t.amd;
      dutyRaw = t.amd;
      duty = roundAmd(dutyRaw);
      dutyFormula = t.formula;
    }
    if (input.fuel.startsWith("hybrid") && input.hybridIceStronger === undefined) {
      warnings.push("hybrid_power_split_assumed_electric_dominant");
    }
  }

  if (isEv && input.evVatExemption !== false && evVatExempt(P, made, on) && vatExempt === false) {
    vatExempt = "ev_2026";
  }
  if (vatExempt === false) {
    vatRaw = (vatBase * P.vat_percent) / 100;
    vat = roundAmd(vatRaw);
  }

  const declares = input.origin === "third_country";
  const stateDuty = !declares
    ? 0
    : input.importer === "personal"
      ? P.state_duty_amd.passenger_declaration
      : P.state_duty_amd.goods_declaration;

  return {
    regime,
    ageYears: wholeYears(made, on),
    duty,
    dutyFormula,
    vat,
    vatExempt,
    environmentalTax,
    environmentalPercent: environmentalPercentValue,
    total: roundAmd(dutyRaw + vatRaw + environmentalRaw),
    stateDuty,
    warnings,
  };
}

/**
 * Yearly tax of an individual entrepreneur (ИП / ԱՁ) in Armenia, as pure
 * functions of an explicit parameter object. Nothing here imports data.
 *
 * Two special regimes are covered, because they are the ones a calculator
 * can answer from turnover alone:
 *   - turnover tax: a rate on sales by activity, reduced by a share of
 *     documented expenses down to a minimum, plus a fixed monthly profit tax;
 *   - micro-enterprise: no tax on the business itself.
 * Both add the funded-pension payment, the stamp payment and, above an
 * income threshold, the health-insurance premium. The general regime (profit
 * tax plus VAT) depends on deductible costs and input VAT, so it is
 * explained on the page rather than calculated.
 *
 * `src/lib/entrepreneur.ts` binds these to src/data/salary-tax.json.
 */

import { bandFor, type Band } from "./salary-core.ts";
import type { Breakdown, BreakdownLine, Formula } from "./breakdown.ts";

/** One row of the turnover-tax table (Tax Code art. 258). */
export interface TurnoverActivity {
  key: ActivityKey;
  ratePercent: number;
  /** Share of documented expenses that reduces the tax, if the row allows it. */
  expenseCreditPercent: number | null;
  /** The tax cannot fall below this share of turnover, if the row sets one. */
  minimumPercent: number | null;
}

export type ActivityKey = "services" | "it" | "trade" | "production" | "catering" | "rent";

export type Regime = "turnover" | "micro";

export interface EntrepreneurParams {
  taxYear: number;
  activities: TurnoverActivity[];
  /** Turnover above which the turnover-tax regime is not available. */
  turnoverThreshold: number;
  /** Turnover above which the micro-enterprise regime is not available. */
  microThreshold: number;
  /** Fixed profit tax per month under turnover tax. */
  fixedProfitTaxMonthly: number;
  /** Funded-pension payment per month for turnover-tax activities. */
  turnoverPensionMonthly: number;
  /** Funded-pension rate on income for an IE that is only a micro-enterprise. */
  microPensionRatePercent: number;
  /** Yearly stamp payment by turnover. */
  stampBands: Band[];
  /** Yearly health-insurance premium. */
  healthPremium: number;
  /** Income (prior year) from which the premium is due. */
  healthFrom: number;
  /** Activities the micro regime is closed to. */
  microExcluded: ActivityKey[];
}

export interface EntrepreneurInput {
  regime: Regime;
  activity: ActivityKey;
  /** Sales turnover for the year, AMD. */
  turnover: number;
  /** Documented expenses for the year, AMD. Only reduces turnover tax. */
  expenses?: number;
  /** Whether the entrepreneur makes the funded-pension payment. */
  pensionParticipant?: boolean;
  /**
   * Last year's income, which decides the health-insurance premium. Defaults
   * to this year's turnover.
   */
  priorYearIncome?: number;
}

export type LineKey = "turnoverTax" | "profitTax" | "pension" | "stamp" | "health";

/** Why the chosen regime may not be open to this entrepreneur. */
export type Warning = "overTurnoverThreshold" | "overMicroThreshold" | "microExcluded";

export interface EntrepreneurResult extends Breakdown {
  lines: (BreakdownLine & { key: LineKey })[];
  warning: Warning | null;
}

/** Months in the tax year: the fixed payments are monthly amounts. */
const MONTHS = 12;

export function activityFor(params: EntrepreneurParams, key: ActivityKey): TurnoverActivity {
  const hit = params.activities.find((a) => a.key === key);
  if (!hit) throw new Error(`Unknown activity: ${key}`);
  return hit;
}

/**
 * Turnover tax for the year: rate × turnover, less the expense credit, but
 * never below the minimum share of turnover. The unused part of the credit
 * carries forward in law; a one-year calculator ignores it.
 */
export function turnoverTax(
  activity: TurnoverActivity,
  turnover: number,
  expenses = 0,
): { amount: number; formula: Formula } {
  const gross = (turnover * activity.ratePercent) / 100;
  if (activity.expenseCreditPercent === null || expenses <= 0) {
    return { amount: gross, formula: { kind: "percent", rate: activity.ratePercent, base: turnover } };
  }
  const reduced = gross - (expenses * activity.expenseCreditPercent) / 100;
  const floor = ((activity.minimumPercent ?? 0) * turnover) / 100;
  if (activity.minimumPercent !== null && reduced < floor) {
    return { amount: floor, formula: { kind: "floor", rate: activity.minimumPercent, base: turnover } };
  }
  return {
    amount: Math.max(reduced, 0),
    formula: {
      kind: "percentMinusPercent",
      rate: activity.ratePercent,
      base: turnover,
      creditRate: activity.expenseCreditPercent,
      creditBase: expenses,
    },
  };
}

export function warningFor(params: EntrepreneurParams, input: EntrepreneurInput): Warning | null {
  if (input.regime === "turnover") {
    return input.turnover > params.turnoverThreshold ? "overTurnoverThreshold" : null;
  }
  if (params.microExcluded.includes(input.activity)) return "microExcluded";
  return input.turnover > params.microThreshold ? "overMicroThreshold" : null;
}

export function calculateEntrepreneurTax(
  params: EntrepreneurParams,
  input: EntrepreneurInput,
): EntrepreneurResult {
  const { regime, turnover, expenses = 0, pensionParticipant = true } = input;
  const priorYearIncome = input.priorYearIncome ?? turnover;

  for (const [name, value] of [["turnover", turnover], ["expenses", expenses]] as const) {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(`${name} must be a non-negative number, got ${value}`);
    }
  }

  const exempt: Formula = { kind: "exempt" };
  const activity = activityFor(params, input.activity);

  const tax =
    regime === "turnover"
      ? turnoverTax(activity, turnover, expenses)
      : { amount: 0, formula: exempt };

  const profitTax =
    regime === "turnover"
      ? {
          amount: params.fixedProfitTaxMonthly * MONTHS,
          formula: { kind: "times", amount: params.fixedProfitTaxMonthly, times: MONTHS } as Formula,
        }
      : { amount: 0, formula: exempt };

  const pension = !pensionParticipant
    ? { amount: 0, formula: exempt }
    : regime === "turnover"
      ? {
          amount: params.turnoverPensionMonthly * MONTHS,
          formula: { kind: "times", amount: params.turnoverPensionMonthly, times: MONTHS } as Formula,
        }
      : {
          amount: (turnover * params.microPensionRatePercent) / 100,
          formula: { kind: "percent", rate: params.microPensionRatePercent, base: turnover } as Formula,
        };

  const stampBand = bandFor(params.stampBands, turnover);
  const healthDue = priorYearIncome >= params.healthFrom;

  const lines: EntrepreneurResult["lines"] = [
    { key: "turnoverTax", ...tax },
    { key: "profitTax", ...profitTax },
    { key: "pension", ...pension },
    {
      key: "stamp",
      amount: stampBand.amount,
      formula: { kind: "band", from: stampBand.from, to: stampBand.to },
    },
    {
      key: "health",
      amount: healthDue ? params.healthPremium : 0,
      formula: healthDue ? { kind: "band", from: params.healthFrom, to: null } : exempt,
    },
  ];

  const total = lines.reduce((sum, line) => sum + line.amount, 0);

  return {
    base: turnover,
    lines,
    total,
    result: turnover - total,
    effectiveRate: turnover === 0 ? 0 : total / turnover,
    warning: warningFor(params, input),
  };
}

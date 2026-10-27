/**
 * The shape every calculator's result takes, and how it becomes text.
 *
 * Each calculator computes in its own pure module, then describes its result
 * as a Breakdown: a base amount, the lines charged on it, their total and
 * what is left. The result panel, the worked examples and the browser island
 * all render that one shape, so the calculators look and read alike.
 *
 * Shared by the server render and the browser, so a figure never changes
 * shape when the page becomes interactive.
 */

import { formatAmount, formatAmd, formatNumber, formatPercent, intlLocale } from "./format.ts";
import type { Locale } from "../i18n/config.ts";

/**
 * How a line was arrived at, in machine-readable form, so the UI can render
 * "20% × 300,000" without the calculation knowing any language.
 */
export type Formula =
  | { kind: "percent"; rate: number; base: number }
  | {
      kind: "percentMinus";
      rate: number;
      base: number;
      minus: number;
      /** True when the base was clipped to the statutory cap. */
      capped: boolean;
    }
  | {
      /** A rate on one base, reduced by a rate on another: "10% × A − 6% × B". */
      kind: "percentMinusPercent";
      rate: number;
      base: number;
      creditRate: number;
      creditBase: number;
    }
  | {
      /** A statutory minimum replaced the computed amount: "4,5% × A". */
      kind: "floor";
      rate: number;
      base: number;
    }
  | { kind: "band"; from: number; to: number | null }
  | { kind: "times"; amount: number; times: number }
  | {
      /** A rate per unit, converted: "5,5 € × 3 000 cm³ × 404,11". */
      kind: "perUnit";
      rate: number;
      rateSymbol: string;
      units: number;
      unitSymbol: string;
      fx: number;
      /** True when this per-unit minimum replaced a percentage. */
      floored?: boolean;
    }
  | {
      /** A bank fee plus an exchange margin: "7 000 ֏ + 0,73%". */
      kind: "feePlusMargin";
      /** Null when the fee is not published. */
      fee: number | null;
      marginRate: number;
    }
  | {
      kind: "exempt";
      /** Picks a specific wording from `exemptReasons`, if one is given. */
      reason?: string;
    };

export interface BreakdownLine {
  /** i18n key of the line's label, relative to the calculator's namespace. */
  key: string;
  amount: number;
  formula: Formula;
}

export interface Breakdown {
  /** The amount everything is charged on: salary, turnover, car price. */
  base: number;
  lines: BreakdownLine[];
  total: number;
  /** The headline figure. */
  result: number;
  /** Total as a share of the base, 0-1. */
  effectiveRate: number;
}

/** The few words a formula needs. Everything else is arithmetic. */
export interface FormulaLabels {
  /** Shown where nothing is charged, e.g. "not withheld". */
  exempt: string;
  /** Shown under a capped line, e.g. "Base capped at X". */
  capNote: string;
  /** Shown under a line where a statutory minimum applied. */
  floorNote?: string;
  /** Wording for specific exemptions, by reason. */
  exemptReasons?: Record<string, string>;
}

/**
 * A formula as a mostly language-neutral expression:
 *   "20% × 300 000"
 *   "10% × 1 125 000 − 25 000"
 *   "10% × 6 000 000 − 6% × 1 000 000"
 *   "200 001 – 500 000"
 *   "> 1 000 000"
 *   "5 000 × 12"
 *   "5,5 € × 3 000 cm³ × 404,11"
 * Only the exempt case uses translated words.
 */
export function formulaText(
  formula: Formula,
  locale: Locale,
  labels: FormulaLabels,
): string {
  const n = (v: number) => formatAmount(v, locale);
  const pct = (v: number) => formatPercent(v, locale);

  switch (formula.kind) {
    case "percent":
    case "floor":
      return `${pct(formula.rate)} × ${n(formula.base)}`;
    case "percentMinus":
      return `${pct(formula.rate)} × ${n(formula.base)} − ${n(formula.minus)}`;
    case "percentMinusPercent":
      return `${pct(formula.rate)} × ${n(formula.base)} − ${pct(formula.creditRate)} × ${n(formula.creditBase)}`;
    case "band":
      return formula.to === null
        ? `> ${n(formula.from - 1)}`
        : `${n(formula.from)} – ${n(formula.to)}`;
    case "times":
      return `${n(formula.amount)} × ${n(formula.times)}`;
    case "perUnit":
      return `${formatNumber(formula.rate, locale, 2)} ${formula.rateSymbol} × ${n(formula.units)} ${formula.unitSymbol} × ${formatNumber(formula.fx, locale, 4)}`;
    case "feePlusMargin": {
      const fee = formula.fee === null ? (labels.exemptReasons?.feeUnpublished ?? "?") : formatAmd(formula.fee, locale);
      return `${fee} + ${pct(formula.marginRate)}`;
    }
    case "exempt":
      return (formula.reason && labels.exemptReasons?.[formula.reason]) || labels.exempt;
  }
}

/** True when the cap note should be shown next to the line. */
export function isCapped(formula: Formula): boolean {
  return formula.kind === "percentMinus" && formula.capped;
}

/** The note shown under a line, if any. */
export function noteFor(formula: Formula, labels: FormulaLabels): string | null {
  if (isCapped(formula)) return labels.capNote;
  if (formula.kind === "floor" || (formula.kind === "perUnit" && formula.floored)) {
    return labels.floorNote ?? null;
  }
  return null;
}

export interface RenderedLine {
  key: string;
  amount: string;
  formula: string;
  note: string | null;
}

export interface RenderedBreakdown {
  base: string;
  result: string;
  total: string;
  effectiveRate: string;
  lines: RenderedLine[];
}

/** A 0-1 share as a percentage with one decimal: 0.269 reads as 26.9%. */
export function formatShare(share: number, locale: Locale): string {
  return (
    new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 1 }).format(
      share * 100,
    ) + "%"
  );
}

export function renderBreakdown(
  breakdown: Breakdown,
  locale: Locale,
  labels: FormulaLabels,
): RenderedBreakdown {
  return {
    base: formatAmd(breakdown.base, locale),
    result: formatAmd(breakdown.result, locale),
    total: formatAmd(breakdown.total, locale),
    effectiveRate: formatShare(breakdown.effectiveRate, locale),
    lines: breakdown.lines.map((line) => ({
      key: line.key,
      amount: line.amount === 0 ? "—" : formatAmd(line.amount, locale),
      formula: formulaText(line.formula, locale, labels),
      note: noteFor(line.formula, labels),
    })),
  };
}

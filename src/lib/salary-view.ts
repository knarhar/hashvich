/**
 * Turning a calculation result into display strings.
 *
 * Shared by the server render and the browser island, so a figure never
 * changes shape when the page becomes interactive.
 */

import type { Formula, SalaryResult } from "./salary-core.ts";
import { formatAmount, formatAmd, formatPercent, intlLocale } from "./format.ts";
import type { Locale } from "../i18n/config.ts";

/** The few words a formula needs. Everything else is arithmetic. */
export interface FormulaLabels {
  /** Shown where no amount is withheld, e.g. "not withheld". */
  exempt: string;
  /** Appended when the pension base hit the cap, e.g. "Base capped at X". */
  capNote: string;
}

/**
 * A formula as a mostly language-neutral expression:
 *   "20% × 300 000"
 *   "10% × 1 125 000 − 25 000"
 *   "200 001 – 500 000"
 *   "> 1 000 000"
 * Only the exempt case uses a translated word.
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
      return `${pct(formula.rate)} × ${n(formula.base)}`;
    case "percentMinus":
      return `${pct(formula.rate)} × ${n(formula.base)} − ${n(formula.minus)}`;
    case "band":
      return formula.to === null
        ? `> ${n(formula.from - 1)}`
        : `${n(formula.from)} – ${n(formula.to)}`;
    case "exempt":
      return labels.exempt;
  }
}

/** True when the cap note should be shown next to the pension line. */
export function isCapped(formula: Formula): boolean {
  return formula.kind === "percentMinus" && formula.capped;
}

export interface RenderedResult {
  gross: string;
  net: string;
  total: string;
  effectiveRate: string;
  lines: {
    key: string;
    amount: string;
    formula: string;
    capped: boolean;
  }[];
}

export function renderResult(
  result: SalaryResult,
  locale: Locale,
  labels: FormulaLabels,
): RenderedResult {
  return {
    gross: formatAmd(result.gross, locale),
    net: formatAmd(result.net, locale),
    total: formatAmd(result.totalDeductions, locale),
    // One decimal: 0.269 of a salary reads better as 26.9% than 27%.
    effectiveRate:
      new Intl.NumberFormat(intlLocale(locale), {
        maximumFractionDigits: 1,
      }).format(result.effectiveRate * 100) + "%",
    lines: result.lines.map((line) => ({
      key: line.key,
      amount: line.amount === 0 ? "—" : formatAmd(line.amount, locale),
      formula: formulaText(line.formula, locale, labels),
      capped: isCapped(line.formula),
    })),
  };
}

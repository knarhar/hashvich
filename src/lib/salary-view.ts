/**
 * The salary result as a Breakdown, ready for the shared result panel.
 *
 * Shared by the server render and the browser island, so a figure never
 * changes shape when the page becomes interactive.
 */

import type { SalaryResult } from "./salary-core.ts";
import {
  renderBreakdown,
  type Breakdown,
  type FormulaLabels,
  type RenderedBreakdown,
} from "./breakdown.ts";
import type { Locale } from "../i18n/config.ts";

export { formulaText, isCapped, type FormulaLabels } from "./breakdown.ts";

/** Gross is the base, the four withholdings are the lines, net is the result. */
export function salaryBreakdown(result: SalaryResult): Breakdown {
  return {
    base: result.gross,
    lines: result.lines,
    total: result.totalDeductions,
    result: result.net,
    effectiveRate: result.effectiveRate,
  };
}

export function renderResult(
  result: SalaryResult,
  locale: Locale,
  labels: FormulaLabels,
): RenderedBreakdown {
  return renderBreakdown(salaryBreakdown(result), locale, labels);
}

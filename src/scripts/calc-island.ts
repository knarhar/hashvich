/**
 * Browser helpers shared by every calculator island.
 *
 * Each island finds its CalcShell by name, reads the serialised parameters,
 * reads its inputs and writes a RenderedBreakdown into the ResultPanel. The
 * arithmetic itself stays in each calculator's pure core module.
 */

import type { RenderedBreakdown } from "../lib/breakdown.ts";
import { formatAmount, parseAmount } from "../lib/format.ts";
import type { Locale } from "../i18n/config.ts";

/** Run `setup` once for every island of this name on the page. */
export function mountIslands<Config>(
  name: string,
  setup: (root: HTMLElement, config: Config) => void,
): void {
  for (const root of document.querySelectorAll<HTMLElement>(`[data-calculator="${name}"]`)) {
    const configEl = root.querySelector<HTMLScriptElement>("[data-calc-config]");
    if (!configEl?.textContent) continue;
    setup(root, JSON.parse(configEl.textContent) as Config);
  }
}

/** The control registered under `[data-input="name"]`. */
export function inputOf<T extends HTMLElement = HTMLInputElement>(
  root: HTMLElement,
  name: string,
): T {
  const el = root.querySelector<T>(`[data-input="${name}"]`);
  if (!el) throw new Error(`Calculator input "${name}" is missing`);
  return el;
}

/**
 * Read an amount field, keeping the last good number so clearing the field
 * does not show NaN. Also regroups the typed number on blur ("300000" becomes
 * "300 000"), but never while typing: regrouping mid-entry moves the caret.
 */
export function amountReader(input: HTMLInputElement, locale: Locale): () => number {
  let last = parseAmount(input.value) ?? 0;
  input.addEventListener("blur", () => {
    const parsed = parseAmount(input.value);
    if (parsed !== null) input.value = formatAmount(parsed, locale);
  });
  return () => {
    const parsed = parseAmount(input.value);
    if (parsed !== null) last = parsed;
    return last;
  };
}

/** Recalculate whenever any control inside the island changes. */
export function onAnyInput(root: HTMLElement, update: () => void): void {
  root.addEventListener("input", update);
  root.addEventListener("change", update);
}

/** Write a rendered result into the ResultPanel inside `root`. */
export function applyBreakdown(
  root: HTMLElement,
  view: RenderedBreakdown,
  warning: string | null = null,
): void {
  const set = (selector: string, text: string) => {
    const el = root.querySelector(selector);
    if (el) el.textContent = text;
  };

  set("[data-result]", view.result);
  set("[data-base]", view.base);
  set("[data-total]", view.total);
  set("[data-effective]", view.effectiveRate);

  const warningEl = root.querySelector<HTMLElement>("[data-warning]");
  if (warningEl) {
    warningEl.textContent = warning ?? "";
    warningEl.hidden = !warning;
  }

  for (const line of view.lines) {
    const row = root.querySelector<HTMLElement>(`[data-line="${line.key}"]`);
    if (!row) continue;
    row.querySelector("[data-value]")!.textContent = line.amount;
    const formula = row.querySelector("[data-formula]")!;
    formula.textContent = line.formula;
    if (line.note) {
      const note = document.createElement("span");
      note.className = "note";
      note.textContent = line.note;
      formula.appendChild(note);
    }
  }
}

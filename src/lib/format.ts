/**
 * Locale-aware number formatting.
 *
 * Kept separate from the calculation so the arithmetic stays pure and the
 * formatting can be tested on its own. The same `Intl` locale tags are used
 * on the server and in the browser, so a server-rendered figure and one
 * recalculated client-side are formatted identically.
 */

import type { Locale } from "../i18n/config.ts";

/** Intl locale tag per site locale. */
const INTL_LOCALE: Record<Locale, string> = {
  ru: "ru-RU",
  hy: "hy-AM",
  en: "en-US",
};

export function intlLocale(locale: Locale): string {
  return INTL_LOCALE[locale];
}

/**
 * A plain grouped integer, e.g. 1125000 -> "1 125 000" (ru/hy) or
 * "1,125,000" (en). Fractions are rounded away: Armenian payroll amounts in
 * this calculator are whole drams, and a stray ".0000001" from floating point
 * should never reach a reader.
 */
export function formatAmount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/** A number with up to `fractionDigits` decimals, e.g. 404.11 -> "404,11". */
export function formatNumber(value: number, locale: Locale, fractionDigits: number): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/**
 * An amount with the dram sign, e.g. "219 200 ֏".
 *
 * The sign is appended rather than using `style: "currency"`, because the
 * AMD currency format differs across these locales in ways that make columns
 * of figures hard to compare.
 */
export function formatAmd(value: number, locale: Locale): string {
  return `${formatAmount(value, locale)} ֏`;
}

/** A percentage written the way the locale writes it, e.g. "20%" or "4,5%". */
export function formatPercent(value: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    maximumFractionDigits: 2,
  }).format(value) + "%";
}

/** An ISO date rendered long, e.g. "26 октября 2026 г.". */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Read a number the way a person typed it: "300 000", "300,000", "300000 ֏".
 * Returns null when nothing numeric is left, so callers can keep the previous
 * value rather than showing NaN.
 */
export function parseAmount(input: string): number | null {
  const digits = input.replace(/[^\d]/g, "");
  if (digits === "") return null;
  const value = Number(digits);
  return Number.isFinite(value) ? value : null;
}

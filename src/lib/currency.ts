/**
 * The currency converter bound to the latest CBA rates
 * (src/data/cba-latest.json, fetched before every deploy). The browser
 * receives CURRENCY_PARAMS serialised into the page.
 */

import type { Locale } from "../i18n/config.ts";
import { CBA_LATEST } from "./cba-rates.ts";
import { intlLocale } from "./format.ts";
import { AMD, convert as coreConvert, type ConvertInput, type CurrencyParams } from "./currency-core.ts";

export type { Conversion, ConvertInput, CurrencyParams } from "./currency-core.ts";

export const CURRENCY_PARAMS: CurrencyParams = { date: CBA_LATEST.date, amdPer: CBA_LATEST.amdPer };

/** The currencies most converted here come first, then the rest in CBA order. */
const FIRST = [AMD, "USD", "EUR", "RUB", "GEL", "GBP"];

export const CURRENCY_CODES: string[] = [
  ...FIRST.filter((iso) => iso === AMD || iso in CURRENCY_PARAMS.amdPer),
  ...Object.keys(CURRENCY_PARAMS.amdPer).filter((iso) => !FIRST.includes(iso)),
];

/** "Доллар США", "ԱՄՆ դոլար", "US Dollar". */
export function currencyName(iso: string, locale: Locale): string {
  const name = new Intl.DisplayNames([intlLocale(locale)], { type: "currency" }).of(iso) ?? iso;
  return name.charAt(0).toLocaleUpperCase(intlLocale(locale)) + name.slice(1);
}

export function convert(input: ConvertInput) {
  return coreConvert(CURRENCY_PARAMS, input);
}

/**
 * Formatted values that the currency page's copy refers to by name, the
 * calculator's starting values and the worked examples.
 *
 * Project rule: numbers live in src/data, text lives in src/i18n. Copy holds
 * placeholders; this module supplies the values, formatted for the locale.
 */

import type { Locale } from "../i18n/config.ts";
import type { Params } from "../i18n/utils.ts";
import { formatDate, formatPercent, intlLocale } from "./format.ts";
import { CBA_LATEST, CBA_SNAPSHOT } from "./cba-rates.ts";
import { CURRENCY_CODES, CURRENCY_PARAMS, convert, currencyName, type ConvertInput } from "./currency.ts";
import { currencySign, formatMoney, formatRate } from "./currency-view.ts";
import { COMPARED_BANKS } from "./transfers.ts";

/** What the calculator opens with: rubles for Russian readers, dollars otherwise. */
export function defaultConversion(locale: Locale): ConvertInput {
  return locale === "ru"
    ? { amount: 10_000, from: "RUB", to: "AMD" }
    : { amount: 100, from: "USD", to: "AMD" };
}

export const EXAMPLE_CONVERSIONS: ConvertInput[] = [
  { amount: 10_000, from: "RUB", to: "AMD" },
  { amount: 100, from: "USD", to: "AMD" },
  { amount: 1_000, from: "USD", to: "RUB" },
];

/** "10 000 ₽ → ֏" */
export function conversionLabel(input: ConvertInput, locale: Locale): string {
  return `${formatMoney(input.amount, input.from, locale)} → ${currencySign(input.to)}`;
}

/** Banks' non-cash or cash buying margins against the CBA rate, in percent. */
function buyMargins(currency: string, rateType: "cash" | "cashless"): number[] {
  return COMPARED_BANKS.flatMap((bank) =>
    bank.conversion.rates_observed
      .filter((r) => r.currency === currency && r.rate_type === rateType && r.margin_buy_pct !== null)
      .map((r) => r.margin_buy_pct as number),
  );
}

export function currencyCopyParams(locale: Locale): Params {
  const pct = (v: number) => formatPercent(v, locale);
  const range = (values: number[]) => `${pct(Math.min(...values))}–${pct(Math.max(...values))}`;
  const amd = (iso: string) => `${formatRate(CURRENCY_PARAMS.amdPer[iso]!, locale)}\u00a0֏`;
  // Mid-sentence names: "японская иена", but English keeps "Japanese Yen".
  const names = (isos: string[]) =>
    new Intl.ListFormat(intlLocale(locale), { type: "conjunction" }).format(
      isos.map((iso) => {
        const name = currencyName(iso, locale);
        return locale === "en" ? name : name.toLocaleLowerCase(intlLocale(locale));
      }),
    );
  const quotedPer = (n: number) =>
    Object.entries(CBA_LATEST.quotedPer).filter(([, amount]) => amount === n).map(([iso]) => iso);

  const [ex1, ex2, ex3] = EXAMPLE_CONVERSIONS.map((input) => ({ input, out: convert(input) }));
  const example = (e: typeof ex1) => ({
    amount: formatMoney(e!.input.amount, e!.input.from, locale),
    result: formatMoney(e!.out.result, e!.input.to, locale),
  });

  return {
    year: Number(CURRENCY_PARAMS.date.slice(0, 4)),
    rateDate: formatDate(CURRENCY_PARAMS.date, locale),
    usdRate: amd("USD"),
    eurRate: amd("EUR"),
    rubRate: amd("RUB"),
    // Every currency in the calculator except the dram itself.
    currencyCount: CURRENCY_CODES.length - 1,
    per10: names(quotedPer(10)),
    per100: names(quotedPer(100)),

    ex1Amount: example(ex1).amount,
    ex1Result: example(ex1).result,
    ex2Amount: example(ex2).amount,
    ex2Result: example(ex2).result,
    ex3Amount: example(ex3).amount,
    ex3Result: example(ex3).result,
    usdInRub: `${formatRate(ex3!.out.rate, locale)}\u00a0₽`,

    // Bank rates were captured once, on the day of the snapshot.
    snapshotDate: formatDate(CBA_SNAPSHOT.date, locale),
    bankCount: COMPARED_BANKS.length,
    usdBuyRange: range(buyMargins("USD", "cashless")),
    rubCashlessBuyRange: range(buyMargins("RUB", "cashless")),
    rubCashBuyRange: range(buyMargins("RUB", "cash")),
  };
}

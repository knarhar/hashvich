/**
 * A conversion as the shared result panel shows it: the amount, the rate and
 * the inverse rate, then the converted amount as the headline.
 *
 * Shared by the server render and the browser island, like breakdown.ts,
 * which it stands in for: a conversion has no lines charged on a base, so it
 * fills the same RenderedBreakdown shape directly.
 */

import type { Locale } from "../i18n/config.ts";
import type { RenderedBreakdown } from "./breakdown.ts";
import { intlLocale } from "./format.ts";
import { AMD, type Conversion } from "./currency-core.ts";

/** Signs for the currencies people here mostly convert; others show their code. */
const SIGN: Record<string, string> = {
  AMD: "֏",
  USD: "$",
  EUR: "€",
  RUB: "₽",
  GBP: "£",
  GEL: "₾",
};

export function currencySign(iso: string): string {
  return SIGN[iso] ?? iso;
}

/**
 * An amount with its sign, kept on one line: whole amounts as they are
 * ("36 088 ֏"), others to the cent ("89,30 €").
 */
export function formatMoney(value: number, iso: string, locale: Locale): string {
  const cents = Math.round(value * 100);
  const digits = cents % 100 === 0 ? 0 : 2;
  const number = new Intl.NumberFormat(intlLocale(locale), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(cents / 100);
  return `${number}\u00a0${currencySign(iso)}`;
}

/**
 * A rate: up to 4 decimals from 1 up (360,88; 1,1198), 4 significant digits
 * below 1 (0,002771), so small rates do not round to zero.
 */
export function formatRate(value: number, locale: Locale): string {
  const options: Intl.NumberFormatOptions =
    value >= 1 ? { maximumFractionDigits: 4 } : { maximumSignificantDigits: 4 };
  return new Intl.NumberFormat(intlLocale(locale), options).format(value);
}

export interface ConversionLabels {
  /** Under a rate the CBA publishes directly, e.g. "CBA, 26 October 2026". */
  direct: string;
  /** Before a cross rate's working, e.g. "via the dram:". */
  cross: string;
}

export function conversionView(
  conversion: Conversion,
  locale: Locale,
  labels: ConversionLabels,
): RenderedBreakdown {
  const { from, to } = conversion;
  const rate = (v: number) => formatRate(v, locale);
  const unit = (iso: string, v: number, other: string) =>
    `1\u00a0${currencySign(iso)} = ${rate(v)}\u00a0${currencySign(other)}`;
  const result = formatMoney(conversion.result, to, locale);

  // Each formula is written from the published CBA rates, never from a
  // rounded rate: the line that is a CBA rate itself cites it, the other
  // divides by it; a cross rate shows its working through the dram.
  const fromRate = rate(conversion.fromAmd);
  const toRate = rate(conversion.toAmd);
  const [rateFormula, inverseFormula] =
    from !== AMD && to !== AMD
      ? [`${labels.cross} ${fromRate} ÷ ${toRate}`, `${labels.cross} ${toRate} ÷ ${fromRate}`]
      : to === AMD
        ? [labels.direct, `1 ÷ ${fromRate}`]
        : [`1 ÷ ${toRate}`, labels.direct];

  return {
    base: formatMoney(conversion.amount, from, locale),
    result,
    total: result,
    effectiveRate: "",
    lines: [
      {
        key: "rate",
        amount: unit(from, conversion.rate, to),
        formula: rateFormula,
        note: null,
      },
      {
        key: "inverse",
        amount: unit(to, conversion.inverse, from),
        formula: inverseFormula,
        note: null,
      },
    ],
  };
}

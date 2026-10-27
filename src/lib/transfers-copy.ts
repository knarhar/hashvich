/**
 * Formatted values that the transfers page's copy refers to by name, and
 * the worked examples.
 *
 * Project rule: numbers live in src/data, text lives in src/i18n. Copy holds
 * placeholders; this module supplies the values, formatted for the locale.
 */

import data from "../data/fx-and-fees.json" with { type: "json" };
import type { Locale } from "../i18n/config.ts";
import { t, type Params } from "../i18n/utils.ts";
import { formatAmd, formatAmount, formatDate, formatNumber, formatPercent, intlLocale } from "./format.ts";
import type { BankCost, TransferInput } from "./transfers-core.ts";
import { TRANSFERS_PARAMS, RATES_DATE, compareBanks } from "./transfers.ts";

export const EXAMPLE_TRANSFERS: TransferInput[] = [
  { direction: "send", currency: "USD", amount: 1_000 },
  { direction: "receive", currency: "USD", amount: 1_000 },
  { direction: "send", currency: "RUB", amount: 100_000 },
];

const SIGN = { USD: "$", EUR: "€", RUB: "₽" } as const;

/** An amount in its own currency, e.g. "1 000 $", never split across lines. */
export function formatMoney(input: Pick<TransferInput, "amount" | "currency">, locale: Locale): string {
  return `${formatAmount(input.amount, locale)} ${SIGN[input.currency]}`;
}

const service = (id: string) => data.transfer_services.find((s) => s.id === id)!;
const bankRow = (id: string, index: number) => data.banks.find((b) => b.id === id)!.fees[index]!;

export function transfersCopyParams(locale: Locale): Params {
  const P = TRANSFERS_PARAMS;
  const amd = (v: number) => formatAmd(v, locale);
  const pct = (v: number) => formatPercent(v, locale);
  const bank = (id: string) => t(`pages.transfers.banks.${id}`, locale);
  const range = (values: number[]) => `${pct(Math.min(...values))}–${pct(Math.max(...values))}`;
  // Every bank tied for cheapest, e.g. "Evocabank and Converse Bank".
  const cheapest = (costs: BankCost[]) =>
    new Intl.ListFormat(intlLocale(locale), { type: "conjunction" }).format(
      costs.filter((c) => c.total === costs[0]!.total).map((c) => bank(c.id)),
    );

  const [send, receive, rub] = EXAMPLE_TRANSFERS.map((e) => compareBanks(e));
  const usdBuy = P.banks.map((b) => b.margin.USD.buy);
  const rubBuy = P.banks.map((b) => b.margin.RUB.buy);

  // Sending dollars to Russia: two banks quote a much higher minimum.
  const acbaToRussia = bankRow("acba", 6);
  const aebToRussia = bankRow("armeconombank", 5);
  const aebIncoming = bankRow("armeconombank", 9) as unknown as { tiers: { fee: number }[] };
  const ardshinRub = bankRow("ardshinbank", 11);

  const wise = service("wise").fees[0]!;
  const unistream = service("unistream").fees[0]!;

  return {
    year: Number(RATES_DATE.slice(0, 4)),
    rateDate: formatDate(RATES_DATE, locale),
    usdRate: `${formatNumber(P.cba.USD, locale, 4)} ֏`,
    eurRate: `${formatNumber(P.cba.EUR, locale, 4)} ֏`,
    rubRate: `${formatNumber(P.cba.RUB, locale, 4)} ֏`,
    bankCount: P.banks.length,

    usdBuyRange: range(usdBuy),
    rubBuyRange: range(rubBuy),

    ex1Amount: formatMoney(EXAMPLE_TRANSFERS[0]!, locale),
    ex1Bank: cheapest(send!),
    ex1Cost: amd(send![0]!.total),
    ex1WorstCost: amd(send!.at(-1)!.total),
    ex2Amount: formatMoney(EXAMPLE_TRANSFERS[1]!, locale),
    ex2Bank: cheapest(receive!),
    ex2Cost: amd(receive![0]!.total),
    ex2WorstCost: amd(receive!.at(-1)!.total),
    ex3Amount: formatMoney(EXAMPLE_TRANSFERS[2]!, locale),
    ex3Bank: cheapest(rub!),
    ex3Cost: amd(rub![0]!.total),

    ardshinRubFee: amd(ardshinRub.fixed!),
    acbaToRussiaMin: amd(acbaToRussia.min!),
    aebToRussiaMin: amd(aebToRussia.min!),
    aebIncomingLow: amd(aebIncoming.tiers![0]!.fee),
    aebIncomingHigh: amd(aebIncoming.tiers!.at(-1)!.fee),

    wiseAmount: `${formatAmount(Math.round((wise.fixed! / wise.percent!) * 100), locale)} $`,
    wiseFee: `${formatNumber(wise.fixed!, locale, 2)} $`,
    unistreamRate: pct(unistream.percent!),
  };
}

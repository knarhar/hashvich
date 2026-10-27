/**
 * Formatted values that the car customs page's copy refers to by name, and
 * the worked examples.
 *
 * Project rule: numbers live in src/data, text lives in src/i18n. Copy holds
 * placeholders like {vatRate}; this module supplies the values, formatted
 * for the locale.
 */

import type { Locale } from "../i18n/config.ts";
import type { Params } from "../i18n/utils.ts";
import { formatAmd, formatAmount, formatDate, formatNumber, formatPercent } from "./format.ts";
import { CAR_CUSTOMS_PARAMS } from "./car-customs.ts";
import { carView, type CarForm } from "./car-customs-view.ts";
import { CBA_RATES } from "./cba-rates.ts";
import data from "../data/car-customs.json" with { type: "json" };

/**
 * The worked examples, dated on the day of the rates the page was built
 * with, so they convert at that day's central bank rate.
 */
export const EXAMPLE_CARS: CarForm[] = [
  { situation: "personal", fuel: "petrol", year: 2021, month: null, engineCc: 2000, price: 15_000, currency: "EUR", clearanceDate: CBA_RATES.date },
  { situation: "personal", fuel: "hybrid", year: 2024, month: null, engineCc: 2500, price: 30_000, currency: "EUR", clearanceDate: CBA_RATES.date },
  { situation: "personal", fuel: "electric", year: 2025, month: null, engineCc: 0, price: 25_000, currency: "EUR", clearanceDate: CBA_RATES.date },
];

const CURRENCY_SIGN = { EUR: "€", USD: "$", RUB: "₽", AMD: "֏" } as const;

/** A price in its own currency, e.g. "15 000 €", never split across lines. */
export function formatPrice(form: Pick<CarForm, "price" | "currency">, locale: Locale): string {
  return `${formatAmount(form.price, locale)}\u00a0${CURRENCY_SIGN[form.currency]}`;
}

export function carCopyParams(locale: Locale): Params {
  const P = CAR_CUSTOMS_PARAMS;
  const pct = (v: number) => formatPercent(v, locale);
  const eur = (v: number) => `${formatAmount(v, locale)}\u00a0€`;
  // A rate with its dram sign, kept on one line: "404,11 ֏".
  const rate = (v: number) => `${formatNumber(v, locale, 4)}\u00a0֏`;
  const U = P.personal_unified.up_to_3_years;
  const env = P.environmental_tax;

  const [petrol, hybrid, ev] = EXAMPLE_CARS.map((car) => carView(car, CBA_RATES, P).breakdown);

  return {
    year: Number(CBA_RATES.date.slice(0, 4)),
    rateDate: formatDate(CBA_RATES.date, locale),
    eurRate: rate(CBA_RATES.amdPer.EUR),
    usdRate: rate(CBA_RATES.amdPer.USD),
    rubRate: rate(CBA_RATES.amdPer.RUB),

    unifiedLowPercent: pct(U[0]!.percent),
    unifiedLowMax: eur(U[0]!.eur_to!),
    unifiedPercent: pct(U[1]!.percent),

    tariffNewPercent: pct(P.tariff.petrol.new[0]!.percent),
    tariffUsedPercent: pct(P.tariff.petrol.used_3_to_7[0]!.percent),
    evPercent: pct(P.tariff.electric_percent),
    hybridPercent: pct(P.tariff.hybrid_electric_dominant_percent),
    vatRate: pct(P.vat_percent),
    evMadeAfter: formatDate(P.ev_vat_exemption.newer_ev.made_after, locale),
    evExemptTo: formatDate(P.ev_vat_exemption.newer_ev.to, locale),
    evQuotaTo: formatDate(P.ev_duty_quota.valid_to, locale),
    evQuotaClosed: formatDate(data.electric_vehicles.duty_quota_status.effective_from!, locale),

    env1: pct(env[0]!.percent),
    env2: pct(env[1]!.percent),
    env3: pct(env[2]!.percent),
    env4: pct(env[3]!.percent),
    env5: pct(env[4]!.percent),

    stateDutyPassenger: formatAmd(P.state_duty_amd.passenger_declaration, locale),
    stateDutyGoods: formatAmd(P.state_duty_amd.goods_declaration, locale),

    ex1Year: EXAMPLE_CARS[0]!.year,
    ex1Cc: formatAmount(EXAMPLE_CARS[0]!.engineCc, locale),
    ex1Price: formatPrice(EXAMPLE_CARS[0]!, locale),
    ex1Total: formatAmd(petrol!.total, locale),
    ex2Year: EXAMPLE_CARS[1]!.year,
    ex2Price: formatPrice(EXAMPLE_CARS[1]!, locale),
    ex2Total: formatAmd(hybrid!.total, locale),
    ex3Year: EXAMPLE_CARS[2]!.year,
    ex3Price: formatPrice(EXAMPLE_CARS[2]!, locale),
    ex3Total: formatAmd(ev!.total, locale),
  };
}

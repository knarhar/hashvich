/**
 * Central Bank of Armenia (CBA) exchange rates, from two places:
 *
 *   - CBA_LATEST / CBA_RATES: src/data/cba-latest.json, fetched by
 *     scripts/fetch-cba-rates.mjs before every deploy. The currency converter
 *     and the car customs page use these.
 *   - CBA_SNAPSHOT: the rate of the day the bank rates in
 *     src/data/fx-and-fees.json were captured. Bank margins were measured
 *     against it, so the transfer comparison uses it, and tests use it
 *     because their expected figures are worked by hand.
 *
 * The CBA API cannot be called from a visitor's browser (no CORS), so a
 * static page carries the rates of its build. Every use shows their date.
 */

import snapshotData from "../data/fx-and-fees.json" with { type: "json" };
import latestData from "../data/cba-latest.json" with { type: "json" };

export type RateCurrency = "EUR" | "USD" | "RUB";

export interface CbaRates {
  /** ISO date of the rates. */
  date: string;
  /** AMD per one unit of each currency. */
  amdPer: Record<RateCurrency, number>;
}

const snapshot = snapshotData.official_rate.snapshot;
const byDate = snapshot.rates_amd_per_unit as Record<string, Record<RateCurrency, number>>;
const snapshotDate = Object.keys(byDate).sort().at(-1)!;

export const CBA_SNAPSHOT: CbaRates = { date: snapshotDate, amdPer: byDate[snapshotDate]! };

export const CBA_SOURCE = {
  name: snapshot.source_name,
  url: snapshot.source_url,
  evidence: snapshot.evidence,
};

/**
 * Not currencies anyone exchanges: the IMF's SDR, gold and silver.
 */
const NOT_CURRENCIES = new Set(["XDR", "XAU", "XAG"]);

/**
 * Every currency the CBA publishes, as AMD per one unit. The CBA quotes a
 * few per 10 or 100 units, so each rate is divided by its quoted amount.
 */
export const CBA_LATEST = {
  date: latestData.date,
  amdPer: Object.fromEntries(
    latestData.rates
      .filter((r) => !NOT_CURRENCIES.has(r.iso))
      .map((r) => [r.iso, r.rate / r.amount]),
  ) as Record<string, number>,
  /** Currencies the CBA quotes per more than one unit, e.g. { JPY: 10 }. */
  quotedPer: Object.fromEntries(
    latestData.rates.filter((r) => r.amount !== 1).map((r) => [r.iso, r.amount]),
  ) as Record<string, number>,
};

/** The latest rates, in the shape the car customs calculator takes. */
export const CBA_RATES: CbaRates = {
  date: CBA_LATEST.date,
  amdPer: {
    EUR: CBA_LATEST.amdPer.EUR!,
    USD: CBA_LATEST.amdPer.USD!,
    RUB: CBA_LATEST.amdPer.RUB!,
  },
};

/** The latest rates' source, quoting the three main rates as the API returns them. */
export const CBA_LATEST_SOURCE = {
  name: latestData.source_name,
  url: latestData.source_url,
  evidence: latestData.rates
    .filter((r) => ["USD", "EUR", "RUB"].includes(r.iso))
    .map((r) => `<ISO>${r.iso}</ISO><Amount>${r.amount}</Amount><Rate>${r.rate}</Rate>`)
    .join(" ... "),
};

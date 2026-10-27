/**
 * The Central Bank of Armenia (CBA) rate snapshot from src/data/fx-and-fees.json.
 *
 * The CBA API cannot be called from a visitor's browser (no CORS), so a
 * static page can only carry rates fixed at a known date. Every use must show
 * that date: customs and banks apply the rate of the day itself.
 */

import data from "../data/fx-and-fees.json" with { type: "json" };

export type RateCurrency = "EUR" | "USD" | "RUB";

export interface CbaRates {
  /** ISO date of the rates. */
  date: string;
  /** AMD per one unit of each currency. */
  amdPer: Record<RateCurrency, number>;
}

const snapshot = data.official_rate.snapshot;
const byDate = snapshot.rates_amd_per_unit as Record<string, Record<RateCurrency, number>>;
const latest = Object.keys(byDate).sort().at(-1)!;

export const CBA_RATES: CbaRates = { date: latest, amdPer: byDate[latest]! };

export const CBA_SOURCE = {
  name: snapshot.source_name,
  url: snapshot.source_url,
  evidence: snapshot.evidence,
};

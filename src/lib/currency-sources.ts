/**
 * The source list shown at the foot of the currency page: the CBA rates the
 * page was built with, what the CBA rate is, how it is quoted, and each
 * bank's rates page behind the cash and non-cash figures in the FAQ.
 */

import data from "../data/fx-and-fees.json" with { type: "json" };
import { CBA_LATEST, CBA_LATEST_SOURCE, CBA_SNAPSHOT } from "./cba-rates.ts";
import { sourceEntry, type SourceEntry } from "./sources.ts";
import { COMPARED_BANKS } from "./transfers.ts";

export const CURRENCY_SOURCES: SourceEntry[] = [
  {
    labelKey: "rate",
    sourceName: CBA_LATEST_SOURCE.name,
    sourceUrl: CBA_LATEST_SOURCE.url,
    effectiveFrom: CBA_LATEST.date,
    evidence: CBA_LATEST_SOURCE.evidence,
    unsure: false,
  },
  sourceEntry("what", data.official_rate.what),
  sourceEntry("units", data.official_rate.quote_units),
  ...COMPARED_BANKS.map((bank) => {
    const row = bank.conversion.rates_observed.find((r) => r.currency === "RUB" && r.rate_type === "cash");
    return {
      labelKey: bank.id,
      sourceName: bank.name,
      sourceUrl: row?.source_url ?? bank.conversion.source_url,
      effectiveFrom: CBA_SNAPSHOT.date,
      evidence: "",
      unsure: false,
    };
  }),
];

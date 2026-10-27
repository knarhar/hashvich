/**
 * The source list shown at the foot of the transfers page: each compared
 * bank's tariff document and rates page, and the CBA rate snapshot, read out
 * of src/data/fx-and-fees.json.
 */

import data from "../data/fx-and-fees.json" with { type: "json" };
import { CBA_RATES, CBA_SOURCE } from "./cba-rates.ts";
import { FEE_ROWS, COMPARED_BANKS } from "./transfers.ts";
import type { SourceEntry } from "./sources.ts";

/** One entry per bank: the tariff row for sending dollars abroad. */
export const TRANSFER_SOURCES: SourceEntry[] = [
  ...COMPARED_BANKS.map((bank) => {
    const row = bank.fees[FEE_ROWS[bank.id]!.USD]!;
    return {
      labelKey: bank.id,
      sourceName: row.source_name ?? "",
      sourceUrl: row.source_url,
      effectiveFrom: row.effective_from ?? null,
      evidence: row.evidence ?? "",
      unsure: row.unsure === true,
    };
  }),
  {
    labelKey: "rate",
    sourceName: CBA_SOURCE.name,
    sourceUrl: CBA_SOURCE.url,
    effectiveFrom: CBA_RATES.date,
    evidence: CBA_SOURCE.evidence,
    unsure: false,
  },
];

export const LAST_VERIFIED: string = data._readme.last_verified;

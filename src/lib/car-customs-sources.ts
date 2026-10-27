/**
 * The source list shown at the foot of the car customs page, read out of
 * the sourced-value objects in src/data/car-customs.json and the CBA rate
 * snapshot, so the page cites exactly what the calculator computed with.
 */

import data from "../data/car-customs.json" with { type: "json" };
import { CBA_RATES, CBA_SOURCE } from "./cba-rates.ts";
import { sourceEntry as entry, type SourceEntry } from "./sources.ts";

export const CAR_SOURCES: SourceEntry[] = [
  entry("unifiedNew", data.personal_use_unified_payment.up_to_3_years),
  entry("unifiedOld", data.personal_use_unified_payment.over_5_years),
  entry("tariff", data.tariff_duty.petrol),
  entry("electric", data.tariff_duty.electric),
  entry("vat", data.vat.rate),
  entry("evVat", data.electric_vehicles.vat_exemption_2026),
  entry("environmental", data.environmental_tax.rates),
  entry("eaeu", data.eaeu_vs_third_country.eaeu_payments),
  entry("stateDuty", data.fees.customs_state_duty),
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

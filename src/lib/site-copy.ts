/**
 * Values the category and information pages refer to by name: dates of the
 * data behind each calculator, the official sites it comes from, and the
 * site's own contact and privacy facts. Every value is read from src/data.
 */

import type { Locale } from "../i18n/config.ts";
import type { Params } from "../i18n/utils.ts";
import carData from "../data/car-customs.json" with { type: "json" };
import fxData from "../data/fx-and-fees.json" with { type: "json" };
import taxData from "../data/salary-tax.json" with { type: "json" };
import siteData from "../data/site.json" with { type: "json" };
import { CBA_LATEST, CBA_SNAPSHOT } from "./cba-rates.ts";
import { formatDate } from "./format.ts";
import { CAR_SOURCES } from "./car-customs-sources.ts";
import { CURRENCY_SOURCES } from "./currency-sources.ts";
import { ENTREPRENEUR_SOURCES } from "./entrepreneur-sources.ts";
import { SALARY_SOURCES } from "./salary-sources.ts";
import type { SourceEntry } from "./sources.ts";
import { TRANSFER_SOURCES } from "./transfers-sources.ts";

export const SITE = siteData;

/** Each calculator's sources and the date its data was last checked. */
export const CALCULATOR_DATA: Record<string, { verified: string; sources: SourceEntry[] }> = {
  salary: { verified: taxData._readme.last_verified, sources: SALARY_SOURCES },
  entrepreneur: { verified: taxData._readme.last_verified, sources: ENTREPRENEUR_SOURCES },
  "car-customs": { verified: carData._readme.last_verified, sources: CAR_SOURCES },
  currency: { verified: CBA_LATEST.date, sources: CURRENCY_SOURCES },
  transfers: { verified: fxData._readme.last_verified, sources: TRANSFER_SOURCES },
};

/** The most recent check of any data on the site, for the footer. */
export const LAST_VERIFIED: string = Object.values(CALCULATOR_DATA)
  .map((d) => d.verified)
  .sort()
  .at(-1)!;

/** The sites every number is taken from, one entry per host, most cited first. */
export function officialSites(): { host: string; url: string; count: number }[] {
  const byHost = new Map<string, { host: string; url: string; count: number }>();
  for (const { sources } of Object.values(CALCULATOR_DATA)) {
    for (const source of sources) {
      if (!source.sourceUrl) continue;
      // One entry per site: api.cba.am and cba.am are the same source.
      const host = new URL(source.sourceUrl).hostname.split(".").slice(-2).join(".");
      const entry = byHost.get(host) ?? { host, url: `https://${host}/`, count: 0 };
      entry.count += 1;
      byHost.set(host, entry);
    }
  }
  return [...byHost.values()].sort((a, b) => b.count - a.count || a.host.localeCompare(b.host));
}

export function categoryCopyParams(locale: Locale): Params {
  return {
    year: taxData._readme.tax_year,
    snapshotDate: formatDate(CBA_SNAPSHOT.date, locale),
  };
}

export function privacyCopyParams(locale: Locale): Params {
  return { effectiveDate: formatDate(SITE.privacy.effective_from, locale) };
}

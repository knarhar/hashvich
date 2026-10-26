/**
 * URL builders for canonical links and hreflang alternates.
 *
 * Every URL this produces is absolute, lowercase-hosted and ends in a slash,
 * so canonical and hreflang never disagree about trailing slashes, which is a
 * common source of duplicate-URL reports.
 */

import { DEFAULT_LOCALE, HTML_LANG, LOCALES, type Locale } from "../i18n/config.ts";
import { allPathsFor } from "../i18n/routes.ts";

export interface Alternate {
  /** hreflang value: a language code, or "x-default". */
  hreflang: string;
  href: string;
}

/** Join a site origin and a path into one absolute URL with a trailing slash. */
export function absoluteUrl(site: URL | string, path: string): string {
  const origin = typeof site === "string" ? site : site.href;
  const url = new URL(path, origin);
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url.href;
}

export function canonicalUrl(site: URL | string, path: string): string {
  return absoluteUrl(site, path);
}

/**
 * hreflang set for a page: one entry per locale plus x-default.
 *
 * x-default points at the default locale rather than the bare root, because
 * the root only redirects. Pointing it at a redirect makes search engines
 * follow a hop to reach the same page they were already told about.
 */
export function alternatesFor(site: URL | string, pageKey: string): Alternate[] {
  const paths = allPathsFor(pageKey);
  const alternates: Alternate[] = LOCALES.map((locale) => ({
    hreflang: HTML_LANG[locale],
    href: absoluteUrl(site, paths[locale]),
  }));
  alternates.push({
    hreflang: "x-default",
    href: absoluteUrl(site, paths[DEFAULT_LOCALE]),
  });
  return alternates;
}

/** Open Graph locale codes, e.g. "ru_RU". Armenian is the Armenia region. */
const OG_LOCALE: Record<Locale, string> = {
  ru: "ru_RU",
  hy: "hy_AM",
  en: "en_US",
};

export function ogLocale(locale: Locale): string {
  return OG_LOCALE[locale];
}

export function ogAlternateLocales(locale: Locale): string[] {
  return LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]);
}

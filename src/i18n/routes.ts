/**
 * Slug registry: the one place URLs are defined.
 *
 * Each page has a stable key used in code, and a slug per locale used in the
 * URL. Slugs are localized so the target keyword sits in the URL for each
 * language (see docs/keywords.md). Armenian uses Latin transliteration rather
 * than Armenian script, to avoid percent-encoded URLs.
 *
 * `enabled: false` means the page is planned and its slugs are reserved, but
 * no page file exists yet, so it is left out of navigation and the sitemap.
 * Flip the flag when the calculator is built.
 */

import { LOCALES, type Locale } from "./config.ts";

export interface PageRoute {
  /** Stable identifier used in code and in translation keys. */
  key: string;
  /** URL slug per locale, without any locale prefix or slashes. */
  slugs: Record<Locale, string>;
  /** Whether a page file exists. Disabled pages are reserved, not built. */
  enabled: boolean;
}

/** The home page of each locale. Its slug is empty: /ru/, /hy/, /en/. */
export const HOME_KEY = "home";

export const ROUTES: PageRoute[] = [
  {
    key: HOME_KEY,
    slugs: { ru: "", hy: "", en: "" },
    enabled: true,
  },
  {
    key: "salary",
    slugs: {
      ru: "kalkulyator-zarplaty",
      hy: "ashxatavardzi-hashvich",
      en: "salary-calculator",
    },
    enabled: true,
  },
  {
    key: "entrepreneur",
    slugs: {
      ru: "nalogi-ip",
      hy: "adz-harker",
      en: "sole-proprietor-tax",
    },
    enabled: true,
  },
  {
    key: "car-customs",
    slugs: {
      ru: "rastamozhka-avto",
      hy: "maqsazercum",
      en: "car-customs-calculator",
    },
    enabled: true,
  },
  {
    key: "currency",
    slugs: {
      ru: "konverter-valyut",
      hy: "poxarjeq",
      en: "currency-converter",
    },
    enabled: true,
  },
  {
    key: "transfers",
    slugs: {
      ru: "perevod-deneg",
      hy: "dramakan-poxancum",
      en: "money-transfer-fees",
    },
    enabled: true,
  },
];

export const ROUTES_BY_KEY: Map<string, PageRoute> = new Map(
  ROUTES.map((r) => [r.key, r]),
);

export function getRoute(key: string): PageRoute {
  const route = ROUTES_BY_KEY.get(key);
  if (!route) throw new Error(`Unknown route key: ${key}`);
  return route;
}

/** Pages that actually exist, in navigation order. */
export function enabledRoutes(): PageRoute[] {
  return ROUTES.filter((r) => r.enabled);
}

/**
 * The site's base path with a trailing slash: "/" on a custom domain, or
 * "/hashvich/" on a GitHub Pages project address. Astro sets BASE_URL from
 * `base` in astro.config.mjs; outside Astro (the tests) it is "/".
 */
export const BASE_PATH: string = (import.meta.env?.BASE_URL ?? "/").replace(/\/?$/, "/");

/**
 * Path for a page in a locale, always absolute and always with a
 * trailing slash, e.g. "/ru/" or "/hy/ashxatavardzi-hashvich/".
 */
export function pathFor(key: string, locale: Locale): string {
  const slug = getRoute(key).slugs[locale];
  return slug ? `${BASE_PATH}${locale}/${slug}/` : `${BASE_PATH}${locale}/`;
}

/** Every locale's path for one page, for hreflang alternates. */
export function allPathsFor(key: string): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, pathFor(key, locale)]),
  ) as Record<Locale, string>;
}

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
 *
 * Every calculator belongs to one category. Category pages list their
 * calculators, and calculator breadcrumbs go through the category, so no
 * calculator is reachable only from the menu.
 */

import { LOCALES, type Locale } from "./config.ts";

export type PageKind = "home" | "category" | "calculator" | "info";

export interface PageRoute {
  /** Stable identifier used in code and in translation keys. */
  key: string;
  kind: PageKind;
  /** The category a calculator belongs to. Calculators only. */
  category?: string;
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
    kind: "home",
    slugs: { ru: "", hy: "", en: "" },
    enabled: true,
  },
  {
    key: "taxes",
    kind: "category",
    slugs: { ru: "nalogi", hy: "harker", en: "taxes" },
    enabled: true,
  },
  {
    key: "car",
    kind: "category",
    slugs: { ru: "avto", hy: "avtomeqena", en: "car" },
    enabled: true,
  },
  {
    key: "money",
    kind: "category",
    slugs: { ru: "dengi", hy: "gumar", en: "money" },
    enabled: true,
  },
  {
    key: "salary",
    kind: "calculator",
    category: "taxes",
    slugs: {
      ru: "kalkulyator-zarplaty",
      hy: "ashxatavardzi-hashvich",
      en: "salary-calculator",
    },
    enabled: true,
  },
  {
    key: "entrepreneur",
    kind: "calculator",
    category: "taxes",
    slugs: {
      ru: "nalogi-ip",
      hy: "adz-harker",
      en: "sole-proprietor-tax",
    },
    enabled: true,
  },
  {
    key: "car-customs",
    kind: "calculator",
    category: "car",
    slugs: {
      ru: "rastamozhka-avto",
      hy: "maqsazercum",
      en: "car-customs-calculator",
    },
    enabled: true,
  },
  {
    key: "currency",
    kind: "calculator",
    category: "money",
    slugs: {
      ru: "konverter-valyut",
      hy: "poxarjeq",
      en: "currency-converter",
    },
    enabled: true,
  },
  {
    key: "transfers",
    kind: "calculator",
    category: "money",
    slugs: {
      ru: "perevod-deneg",
      hy: "dramakan-poxancum",
      en: "money-transfer-fees",
    },
    enabled: true,
  },
  {
    key: "about",
    kind: "info",
    slugs: { ru: "o-proekte", hy: "mer-masin", en: "about" },
    enabled: true,
  },
  {
    key: "methodology",
    kind: "info",
    slugs: { ru: "metodologiya", hy: "metodabanutyun", en: "methodology" },
    enabled: true,
  },
  {
    key: "contacts",
    kind: "info",
    slugs: { ru: "kontakty", hy: "kap", en: "contacts" },
    enabled: true,
  },
  {
    key: "privacy",
    kind: "info",
    slugs: { ru: "konfidencialnost", hy: "gaghtniutyun", en: "privacy" },
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

/** Built pages of one kind, in registry order. */
export function routesOfKind(kind: PageKind): PageRoute[] {
  return enabledRoutes().filter((r) => r.kind === kind);
}

/** Every calculator, built or reserved, in navigation order. */
export function calculatorRoutes(): PageRoute[] {
  return ROUTES.filter((r) => r.kind === "calculator");
}

/** The calculators listed on a category page. */
export function calculatorsIn(category: string): PageRoute[] {
  return calculatorRoutes().filter((r) => r.category === category);
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

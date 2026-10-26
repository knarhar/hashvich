/**
 * Locale configuration. Single source of truth for which languages exist,
 * which is the default, and how locale prefixes appear in URLs.
 *
 * Routing shape: every locale is prefixed (/ru/, /hy/, /en/) and the bare
 * root redirects to the default locale. See docs/design-gaps.md.
 */

export const LOCALES = ["ru", "hy", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

/** Value for the `lang` attribute and for hreflang. */
export const HTML_LANG: Record<Locale, string> = {
  ru: "ru",
  hy: "hy",
  en: "en",
};

/** Name of each language, written in that language, for the switcher. */
export const LOCALE_LABEL: Record<Locale, string> = {
  ru: "Русский",
  hy: "Հայերեն",
  en: "English",
};

/** Short label for the compact switcher. */
export const LOCALE_SHORT: Record<Locale, string> = {
  ru: "RU",
  hy: "ՀՅ",
  en: "EN",
};

/**
 * Which font stack each locale needs first. Armenian text needs the Armenian
 * family; Russian and English are both served by Noto Sans. Both families are
 * always declared, so a mixed-script page still renders: this only decides
 * which file is preloaded.
 */
export const LOCALE_SCRIPT: Record<Locale, "armenian" | "latin-cyrillic"> = {
  ru: "latin-cyrillic",
  hy: "armenian",
  en: "latin-cyrillic",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

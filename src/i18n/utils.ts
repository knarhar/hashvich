/**
 * Translation lookup and locale helpers.
 *
 * All user-facing text comes from src/i18n/locales/*.json. Nothing in a
 * component should contain a literal string meant for a reader.
 */

import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "./config.ts";
import ru from "./locales/ru.json" with { type: "json" };
import hy from "./locales/hy.json" with { type: "json" };
import en from "./locales/en.json" with { type: "json" };

const DICTIONARIES = { ru, hy, en } as const;

/** Shape of a translation file; `ru` is the reference every locale must match. */
export type Dictionary = typeof ru;

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] as Dictionary;
}

/** Values substituted into {placeholders} in a translated string. */
export type Params = Record<string, string | number>;

/**
 * Look up a dotted key, e.g. t("nav.home", "ru").
 *
 * Falls back to the default locale when a key is missing, and throws when it
 * is missing there too: a missing string should fail the build, not ship as
 * an empty element.
 *
 * `params` fills {placeholders}. Rates and amounts are never written into the
 * translation files; copy references them by name and the caller passes the
 * value from src/data, per the project rule that numbers live in data only.
 * An unfilled placeholder throws rather than shipping a literal "{rate}".
 */
export function t(key: string, locale: Locale, params?: Params): string {
  const direct = lookup(DICTIONARIES[locale], key);
  if (typeof direct === "string") return interpolate(direct, params, key);

  const fallback = lookup(DICTIONARIES[DEFAULT_LOCALE], key);
  if (typeof fallback === "string") {
    console.warn(`[i18n] "${key}" missing for "${locale}", used ${DEFAULT_LOCALE}`);
    return interpolate(fallback, params, key);
  }

  throw new Error(`[i18n] missing translation key: "${key}"`);
}

/** Look up a key whose value is an array of strings, e.g. a list of steps. */
export function tList(key: string, locale: Locale, params?: Params): string[] {
  const value =
    lookup(DICTIONARIES[locale], key) ?? lookup(DICTIONARIES[DEFAULT_LOCALE], key);
  if (!Array.isArray(value)) {
    throw new Error(`[i18n] "${key}" is not a list`);
  }
  return value.map((item, i) => {
    if (typeof item !== "string") {
      throw new Error(`[i18n] "${key}[${i}]" is not a string`);
    }
    return interpolate(item, params, `${key}[${i}]`);
  });
}

/** Look up a key whose value is an array of objects, e.g. FAQ entries. */
export function tEntries<T extends Record<string, string>>(
  key: string,
  locale: Locale,
  params?: Params,
): T[] {
  const value =
    lookup(DICTIONARIES[locale], key) ?? lookup(DICTIONARIES[DEFAULT_LOCALE], key);
  if (!Array.isArray(value)) {
    throw new Error(`[i18n] "${key}" is not a list`);
  }
  return value.map((entry, i) => {
    if (entry === null || typeof entry !== "object") {
      throw new Error(`[i18n] "${key}[${i}]" is not an object`);
    }
    return Object.fromEntries(
      Object.entries(entry as Record<string, unknown>).map(([k, v]) => [
        k,
        interpolate(String(v), params, `${key}[${i}].${k}`),
      ]),
    ) as T;
  });
}

function interpolate(template: string, params: Params | undefined, key: string): string {
  if (!template.includes("{")) return template;
  return template.replace(/\{(\w+)\}/g, (_match, name: string) => {
    const value = params?.[name];
    if (value === undefined) {
      throw new Error(`[i18n] "${key}" needs a value for {${name}}`);
    }
    return String(value);
  });
}

/** Bind the lookups to one locale, so components call tt("nav.home"). */
export function useTranslations(locale: Locale) {
  return (key: string, params?: Params) => t(key, locale, params);
}

function lookup(source: unknown, key: string): unknown {
  return key
    .split(".")
    .reduce<unknown>(
      (node, part) =>
        node && typeof node === "object"
          ? (node as Record<string, unknown>)[part]
          : undefined,
      source,
    );
}

/**
 * Read the locale out of a URL pathname, e.g. "/hy/poxarjeq/" -> "hy".
 * Returns the default locale for an unprefixed path.
 */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : DEFAULT_LOCALE;
}

/** Every locale except the given one, in configured order. */
export function otherLocales(locale: Locale): Locale[] {
  return LOCALES.filter((l) => l !== locale);
}

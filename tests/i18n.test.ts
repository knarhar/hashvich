/**
 * Guards on the routing and translation registries.
 *
 * These catch the mistakes that are invisible in a browser: a slug duplicated
 * across two pages, a locale missing a slug, a translation key present in one
 * language and absent in another.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { LOCALES, DEFAULT_LOCALE, isLocale } from "../src/i18n/config.ts";
import {
  ROUTES,
  HOME_KEY,
  pathFor,
  allPathsFor,
  getRoute,
  enabledRoutes,
} from "../src/i18n/routes.ts";
import { t, localeFromPath, otherLocales, getDictionary } from "../src/i18n/utils.ts";

describe("locale config", () => {
  it("the default locale is one of the locales", () => {
    assert.ok(LOCALES.includes(DEFAULT_LOCALE));
  });

  it("recognises its own locales and rejects others", () => {
    for (const l of LOCALES) assert.ok(isLocale(l));
    assert.equal(isLocale("de"), false);
    assert.equal(isLocale(""), false);
  });

  it("reads the locale back out of a path", () => {
    assert.equal(localeFromPath("/hy/poxarjeq/"), "hy");
    assert.equal(localeFromPath("/en/"), "en");
    // An unprefixed path belongs to the default locale.
    assert.equal(localeFromPath("/"), DEFAULT_LOCALE);
  });

  it("otherLocales excludes the current one", () => {
    for (const l of LOCALES) {
      const others = otherLocales(l);
      assert.ok(!others.includes(l));
      assert.equal(others.length, LOCALES.length - 1);
    }
  });
});

describe("route registry", () => {
  it("every route has a slug for every locale", () => {
    for (const route of ROUTES) {
      for (const locale of LOCALES) {
        assert.equal(
          typeof route.slugs[locale],
          "string",
          `${route.key} is missing a ${locale} slug`,
        );
      }
    }
  });

  it("route keys are unique", () => {
    const keys = ROUTES.map((r) => r.key);
    assert.equal(new Set(keys).size, keys.length, "duplicate route key");
  });

  it("no two pages share a slug within a locale", () => {
    for (const locale of LOCALES) {
      const slugs = ROUTES.map((r) => r.slugs[locale]).filter(Boolean);
      assert.equal(
        new Set(slugs).size,
        slugs.length,
        `duplicate slug in ${locale}: ${slugs.join(", ")}`,
      );
    }
  });

  it("slugs are URL-safe and carry no slashes", () => {
    for (const route of ROUTES) {
      for (const locale of LOCALES) {
        const slug = route.slugs[locale];
        if (!slug) continue;
        assert.match(
          slug,
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
          `${route.key}/${locale} slug "${slug}" should be lowercase kebab-case`,
        );
      }
    }
  });

  it("only home may have an empty slug", () => {
    for (const route of ROUTES) {
      if (route.key === HOME_KEY) continue;
      for (const locale of LOCALES) {
        assert.notEqual(route.slugs[locale], "", `${route.key} needs a ${locale} slug`);
      }
    }
  });

  it("paths are prefixed with the locale and end in a slash", () => {
    for (const route of ROUTES) {
      for (const locale of LOCALES) {
        const path = pathFor(route.key, locale);
        assert.ok(path.startsWith(`/${locale}/`), `${path} should start /${locale}/`);
        assert.ok(path.endsWith("/"), `${path} should end with a slash`);
        assert.ok(!path.includes("//"), `${path} has a doubled slash`);
      }
    }
  });

  it("home resolves to the bare locale root", () => {
    for (const locale of LOCALES) {
      assert.equal(pathFor(HOME_KEY, locale), `/${locale}/`);
    }
  });

  it("allPathsFor covers every locale", () => {
    const paths = allPathsFor("salary");
    assert.deepEqual(Object.keys(paths).sort(), [...LOCALES].sort());
  });

  it("an unknown key throws rather than returning a broken URL", () => {
    assert.throws(() => getRoute("does-not-exist"));
  });

  it("the five planned calculators are registered", () => {
    const keys = ROUTES.map((r) => r.key);
    for (const expected of [
      "salary",
      "entrepreneur",
      "car-customs",
      "currency",
      "transfers",
    ]) {
      assert.ok(keys.includes(expected), `${expected} should be registered`);
    }
  });

  it("the built pages are home and the salary calculator", () => {
    assert.deepEqual(
      enabledRoutes().map((r) => r.key),
      [HOME_KEY, "salary"],
    );
  });
});

describe("translations", () => {
  /** Every dotted leaf path in an object. */
  function leafKeys(obj: unknown, prefix = ""): string[] {
    if (obj === null || typeof obj !== "object") return [prefix];
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
      leafKeys(v, prefix ? `${prefix}.${k}` : k),
    );
  }

  it("every locale has exactly the same keys as the default", () => {
    const reference = leafKeys(getDictionary(DEFAULT_LOCALE)).sort();
    for (const locale of otherLocales(DEFAULT_LOCALE)) {
      const actual = leafKeys(getDictionary(locale)).sort();
      const missing = reference.filter((k) => !actual.includes(k));
      const extra = actual.filter((k) => !reference.includes(k));
      assert.deepEqual(missing, [], `${locale} is missing keys`);
      assert.deepEqual(extra, [], `${locale} has keys no other locale has`);
    }
  });

  /** Every string value in a dictionary, with its dotted path. */
  function leafStrings(obj: unknown, prefix = ""): [string, string][] {
    if (typeof obj === "string") return [[prefix, obj]];
    if (Array.isArray(obj)) {
      return obj.flatMap((v, i) => leafStrings(v, `${prefix}[${i}]`));
    }
    if (obj === null || typeof obj !== "object") return [];
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
      leafStrings(v, prefix ? `${prefix}.${k}` : k),
    );
  }

  it("no translated string is empty", () => {
    // Checked on the raw values: strings with {placeholders} cannot be read
    // through t() without the data values, which live in src/lib/salary-copy.
    for (const locale of LOCALES) {
      for (const [path, value] of leafStrings(getDictionary(locale))) {
        assert.ok(value.trim().length > 0, `${locale}.${path} is empty`);
      }
    }
  });

  it("every registered calculator has a name and summary in every locale", () => {
    for (const route of ROUTES) {
      if (route.key === HOME_KEY) continue;
      for (const locale of LOCALES) {
        assert.ok(t(`calculators.${route.key}.name`, locale).length > 0);
        assert.ok(t(`calculators.${route.key}.summary`, locale).length > 0);
      }
    }
  });

  it("a missing key throws instead of rendering blank", () => {
    assert.throws(() => t("nope.not.here", DEFAULT_LOCALE));
  });

  it("the Armenian and Russian files really are in their own scripts", () => {
    // A copy-paste slip that leaves English text in hy.json is easy to miss.
    // Checked on a translated string, not on site.name, which is the brand
    // and is deliberately the same Latin word in every language.
    assert.match(
      t("calculators.salary.name", "hy"),
      /[԰-֏]/,
      "hy should use Armenian script",
    );
    assert.match(
      t("calculators.salary.name", "ru"),
      /[Ѐ-ӿ]/,
      "ru should use Cyrillic",
    );
  });

  it("the brand name is the same in every language", () => {
    // "Hashvich" is a brand, not a phrase to translate. Keeping it identical
    // across locales is deliberate; this guards against it drifting back
    // into a translated description.
    const names = LOCALES.map((locale) => t("site.name", locale));
    assert.deepEqual(new Set(names), new Set(["Hashvich"]), `got ${names.join(", ")}`);
  });
});

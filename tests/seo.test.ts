/**
 * Guards on canonical and hreflang construction.
 *
 * hreflang mistakes are silent: the page looks right and the wrong language
 * gets served in search results. These assert the rules that matter —
 * absolute URLs, reciprocity, a self-reference, and one x-default.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { LOCALES, DEFAULT_LOCALE, HTML_LANG } from "../src/i18n/config.ts";
import { ROUTES, pathFor } from "../src/i18n/routes.ts";
import {
  absoluteUrl,
  alternatesFor,
  canonicalUrl,
  ogAlternateLocales,
  ogLocale,
} from "../src/lib/seo.ts";

const SITE = "https://example.com";

describe("URL building", () => {
  it("produces absolute URLs with a trailing slash", () => {
    assert.equal(absoluteUrl(SITE, "/ru/"), "https://example.com/ru/");
    assert.equal(
      absoluteUrl(SITE, "/hy/ashxatavardzi-hashvich"),
      "https://example.com/hy/ashxatavardzi-hashvich/",
    );
  });

  it("accepts a URL object as the site", () => {
    assert.equal(absoluteUrl(new URL(SITE), "/en/"), "https://example.com/en/");
  });

  it("canonical matches the page's own registered path", () => {
    for (const route of ROUTES) {
      for (const locale of LOCALES) {
        const path = pathFor(route.key, locale);
        assert.equal(canonicalUrl(SITE, path), `${SITE}${path}`);
      }
    }
  });
});

describe("hreflang alternates", () => {
  for (const route of ROUTES) {
    describe(`page "${route.key}"`, () => {
      const alternates = alternatesFor(SITE, route.key);

      it("has one entry per locale plus x-default", () => {
        assert.equal(alternates.length, LOCALES.length + 1);
      });

      it("has exactly one x-default", () => {
        const defaults = alternates.filter((a) => a.hreflang === "x-default");
        assert.equal(defaults.length, 1);
      });

      it("points x-default at the default locale, not the bare root", () => {
        const xDefault = alternates.find((a) => a.hreflang === "x-default")!;
        assert.equal(
          xDefault.href,
          `${SITE}${pathFor(route.key, DEFAULT_LOCALE)}`,
          "x-default should skip the root redirect",
        );
      });

      it("includes a self-reference for every locale", () => {
        for (const locale of LOCALES) {
          const self = alternates.find((a) => a.hreflang === HTML_LANG[locale]);
          assert.ok(self, `missing hreflang for ${locale}`);
          assert.equal(self.href, `${SITE}${pathFor(route.key, locale)}`);
        }
      });

      it("uses absolute https URLs throughout", () => {
        for (const alt of alternates) {
          assert.ok(alt.href.startsWith("https://"), `${alt.href} is not absolute`);
          assert.ok(alt.href.endsWith("/"), `${alt.href} needs a trailing slash`);
        }
      });

      it("lists no duplicate hreflang values", () => {
        const tags = alternates.map((a) => a.hreflang);
        assert.equal(new Set(tags).size, tags.length);
      });
    });
  }

  it("each alternate href is exactly that locale's own canonical", () => {
    // This is what makes the annotations reciprocal in practice: the URL one
    // page advertises for a language must be the URL that language's page
    // declares as its canonical. A mismatch makes search engines drop the
    // whole hreflang cluster.
    for (const route of ROUTES) {
      const alternates = alternatesFor(SITE, route.key);
      for (const locale of LOCALES) {
        const advertised = alternates.find(
          (a) => a.hreflang === HTML_LANG[locale],
        )!.href;
        const ownCanonical = canonicalUrl(SITE, pathFor(route.key, locale));
        assert.equal(
          advertised,
          ownCanonical,
          `${route.key}: the ${locale} alternate does not match that page's canonical`,
        );
      }
    }
  });
});

describe("Open Graph locales", () => {
  it("maps every locale to a full og:locale code", () => {
    for (const locale of LOCALES) {
      assert.match(ogLocale(locale), /^[a-z]{2}_[A-Z]{2}$/);
    }
  });

  it("alternate og locales exclude the current one", () => {
    for (const locale of LOCALES) {
      const alts = ogAlternateLocales(locale);
      assert.ok(!alts.includes(ogLocale(locale)));
      assert.equal(alts.length, LOCALES.length - 1);
    }
  });
});

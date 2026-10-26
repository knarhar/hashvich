/**
 * Formatting and parsing.
 *
 * These matter because the same functions run on the server and in the
 * browser: if they disagree, a figure visibly changes shape the moment the
 * page becomes interactive.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  formatAmd,
  formatAmount,
  formatDate,
  formatPercent,
  intlLocale,
  parseAmount,
} from "../src/lib/format.ts";
import { LOCALES } from "../src/i18n/config.ts";

describe("formatAmount", () => {
  it("groups thousands in every locale", () => {
    for (const locale of LOCALES) {
      const out = formatAmount(1_125_000, locale);
      // Whatever the separator, the digits must survive in order.
      assert.equal(out.replace(/\D/g, ""), "1125000", `${locale}: ${out}`);
      assert.ok(out.length > 7, `${locale} should group: ${out}`);
    }
  });

  it("rounds away floating-point dust", () => {
    // 10% of 500001 minus 25000 lands on ...0001 in binary floating point.
    assert.equal(formatAmount(25_000.100000000002, "en"), "25,000");
    assert.equal(formatAmount(0, "en"), "0");
  });

  it("never emits a decimal separator", () => {
    for (const locale of LOCALES) {
      assert.ok(!/[.,]\d$/.test(formatAmount(1234.5, locale)));
    }
  });
});

describe("formatAmd", () => {
  it("appends the dram sign", () => {
    for (const locale of LOCALES) {
      assert.match(formatAmd(300_000, locale), /֏$/);
    }
  });
});

describe("formatPercent", () => {
  it("writes whole and fractional rates", () => {
    assert.equal(formatPercent(20, "en"), "20%");
    assert.equal(formatPercent(4.5, "en"), "4.5%");
    // Russian uses a comma as the decimal separator.
    assert.equal(formatPercent(4.5, "ru"), "4,5%");
  });
});

describe("formatDate", () => {
  it("renders an ISO date in each locale without shifting the day", () => {
    for (const locale of LOCALES) {
      const out = formatDate("2026-10-26", locale);
      assert.ok(out.includes("26"), `${locale} lost the day: ${out}`);
      assert.ok(out.includes("2026"), `${locale} lost the year: ${out}`);
    }
  });
});

describe("parseAmount", () => {
  it("reads numbers the way people type them", () => {
    assert.equal(parseAmount("300000"), 300_000);
    assert.equal(parseAmount("300 000"), 300_000);
    assert.equal(parseAmount("300,000"), 300_000);
    assert.equal(parseAmount("300 000 ֏"), 300_000);
    // Non-breaking space, which is what Intl actually emits in ru/hy.
    assert.equal(parseAmount("300 000"), 300_000);
  });

  it("returns null when there is nothing to read", () => {
    assert.equal(parseAmount(""), null);
    assert.equal(parseAmount("֏"), null);
    assert.equal(parseAmount("abc"), null);
  });

  it("round-trips what formatAmount produces", () => {
    for (const locale of LOCALES) {
      for (const value of [0, 1_000, 300_000, 1_125_000, 9_999_999]) {
        assert.equal(
          parseAmount(formatAmount(value, locale)),
          value,
          `${locale} failed to round-trip ${value}`,
        );
      }
    }
  });
});

describe("intlLocale", () => {
  it("maps every site locale to a full BCP-47 tag", () => {
    for (const locale of LOCALES) {
      assert.match(intlLocale(locale), /^[a-z]{2}-[A-Z]{2}$/);
    }
  });
});

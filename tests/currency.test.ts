/**
 * The currency converter.
 *
 * Expected figures are worked by hand at the CBA rate of 2026-10-26
 * ($1 = 360.88, €1 = 404.11, ₽1 = 4.4762 AMD):
 *
 *   100 $ → ֏      100 × 360.88            =  36,088 ֏
 *   10,000 ₽ → ֏   10,000 × 4.4762         =  44,762 ֏
 *   100,000 ֏ → €  100,000 ÷ 404.11        =  247.46 €
 *   1,000 $ → ₽    1,000 × 360.88 ÷ 4.4762 =  80,621.96 ₽  (1 $ = 80.622 ₽)
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import latest from "../src/data/cba-latest.json" with { type: "json" };
import { LOCALES } from "../src/i18n/config.ts";
import { getDictionary, t, tEntries, tList } from "../src/i18n/utils.ts";
import { CBA_LATEST, CBA_RATES, CBA_SNAPSHOT } from "../src/lib/cba-rates.ts";
import { convert, type CurrencyParams } from "../src/lib/currency-core.ts";
import { CURRENCY_CODES, CURRENCY_PARAMS } from "../src/lib/currency.ts";
import { conversionView, formatMoney, formatRate } from "../src/lib/currency-view.ts";
import { EXAMPLE_CONVERSIONS, currencyCopyParams } from "../src/lib/currency-copy.ts";
import { CURRENCY_SOURCES } from "../src/lib/currency-sources.ts";

const NB = " ";
const P: CurrencyParams = { date: CBA_SNAPSHOT.date, amdPer: { ...CBA_SNAPSHOT.amdPer } };
const LABELS = { direct: "CBA, 26 October 2026", cross: "via the dram:" };

describe("conversion arithmetic", () => {
  it("into drams, out of drams, and between two currencies through the dram", () => {
    assert.equal(convert(P, { amount: 100, from: "USD", to: "AMD" }).result, 36_088);
    assert.equal(Math.round(convert(P, { amount: 10_000, from: "RUB", to: "AMD" }).result), 44_762);
    assert.equal(convert(P, { amount: 100_000, from: "AMD", to: "EUR" }).result.toFixed(2), "247.46");
    assert.equal(convert(P, { amount: 1_000, from: "USD", to: "RUB" }).result.toFixed(2), "80621.96");
  });

  it("the rate and the inverse rate multiply to one", () => {
    const c = convert(P, { amount: 1, from: "EUR", to: "USD" });
    assert.ok(Math.abs(c.rate * c.inverse - 1) < 1e-12);
    assert.equal(convert(P, { amount: 5, from: "USD", to: "USD" }).result, 5);
  });

  it("rejects a negative amount and an unknown currency", () => {
    assert.throws(() => convert(P, { amount: -1, from: "USD", to: "AMD" }));
    assert.throws(() => convert(P, { amount: 1, from: "XYZ", to: "AMD" }));
  });
});

describe("the latest CBA rates", () => {
  it("the fetched file has a date and the three main rates", () => {
    assert.match(latest.date, /^\d{4}-\d{2}-\d{2}$/);
    for (const iso of ["USD", "EUR", "RUB"] as const) {
      assert.ok(CBA_RATES.amdPer[iso] > 0, `${iso} rate`);
    }
    assert.equal(CBA_RATES.date, latest.date);
  });

  it("rates quoted per 10 or 100 units are divided down to one unit", () => {
    for (const r of latest.rates) {
      if (r.iso in CBA_LATEST.amdPer) assert.equal(CBA_LATEST.amdPer[r.iso], r.rate / r.amount, r.iso);
    }
    assert.ok(Object.values(CBA_LATEST.quotedPer).every((n) => n > 1));
  });

  it("the SDR, gold and silver are not offered as currencies", () => {
    for (const iso of ["XDR", "XAU", "XAG"]) assert.ok(!CURRENCY_CODES.includes(iso), iso);
  });

  it("the dram and the main currencies come first, and every one has a rate", () => {
    assert.deepEqual(CURRENCY_CODES.slice(0, 4), ["AMD", "USD", "EUR", "RUB"]);
    assert.equal(new Set(CURRENCY_CODES).size, CURRENCY_CODES.length);
    for (const iso of CURRENCY_CODES.slice(1)) assert.ok(CURRENCY_PARAMS.amdPer[iso]! > 0, iso);
  });
});

describe("what the result panel shows", () => {
  it("a direct rate: amount, result, rate and inverse", () => {
    const view = conversionView(convert(P, { amount: 100, from: "USD", to: "AMD" }), "en", LABELS);
    assert.equal(view.base, `100${NB}$`);
    assert.equal(view.result, `36,088${NB}֏`);
    assert.deepEqual(
      view.lines.map((l) => [l.key, l.amount, l.formula]),
      [
        ["rate", `1${NB}$ = 360.88${NB}֏`, "CBA, 26 October 2026"],
        ["inverse", `1${NB}֏ = 0.002771${NB}$`, "1 ÷ 360.88"],
      ],
    );
  });

  it("a cross rate shows its working through the dram", () => {
    const view = conversionView(convert(P, { amount: 1_000, from: "USD", to: "RUB" }), "ru", LABELS);
    assert.equal(view.result, `80${NB}621,96${NB}₽`);
    assert.equal(view.lines[0]!.amount, `1${NB}$ = 80,622${NB}₽`);
    assert.equal(view.lines[0]!.formula, "via the dram: 360,88 ÷ 4,4762");
  });

  it("amounts show cents only when there are some", () => {
    assert.equal(formatMoney(89.3, "EUR", "en"), `89.30${NB}€`);
    assert.equal(formatMoney(36_088, "AMD", "en"), `36,088${NB}֏`);
    assert.equal(formatMoney(5, "CNY", "en"), `5${NB}CNY`);
    assert.equal(formatRate(0.000195, "en"), "0.000195");
  });

  it("the browser gets the same arithmetic as the server", () => {
    const shipped = JSON.parse(JSON.stringify(CURRENCY_PARAMS));
    for (const input of EXAMPLE_CONVERSIONS) {
      assert.deepEqual(convert(shipped, input), convert(CURRENCY_PARAMS, input));
    }
    const bytes = Buffer.byteLength(JSON.stringify(CURRENCY_PARAMS), "utf8");
    assert.ok(bytes < 4096, `params are ${bytes} bytes; expected under 4 KB`);
  });
});

describe("page copy", () => {
  for (const locale of LOCALES) {
    describe(locale, () => {
      const copy = currencyCopyParams(locale);
      const page = () => (getDictionary(locale) as Record<string, any>).pages.currency;

      it("every placeholder used by the copy has a value", () => {
        for (const match of JSON.stringify(page()).matchAll(/\{(\w+)\}/g)) {
          const name = match[1]!;
          if (name === "bank") continue;
          assert.ok(copy[name] !== undefined, `pages.currency uses {${name}}, which is not supplied`);
        }
      });

      it("headings render, and the FAQ has 5-8 questions", () => {
        for (const key of ["title", "h1", "description", "intro"]) {
          const out = t(`pages.currency.${key}`, locale, copy);
          assert.ok(out.length > 0 && !out.includes("{"), `${key}: ${out}`);
        }
        const faq = tEntries<{ q: string; a: string }>("pages.currency.faq.items", locale, copy);
        assert.ok(faq.length >= 5 && faq.length <= 8, `got ${faq.length} FAQ items`);
        assert.ok(tList("pages.currency.howItWorks.steps", locale, copy).length >= 4);
      });

      it("no rate is written into the copy", () => {
        const digitsOnly = JSON.stringify(page()).replace(/[\s .,](?=\d)/g, "");
        const rates = [...Object.values(CBA_SNAPSHOT.amdPer), ...Object.values(CBA_RATES.amdPer)];
        for (const rate of rates) {
          const digits = String(rate).replace(".", "");
          assert.ok(!digitsOnly.includes(digits), `${locale}.json hardcodes ${rate}`);
        }
      });

      it("the per-10 and per-100 currencies are named", () => {
        assert.ok(String(copy.per10).length > 0 && String(copy.per100).length > 0);
      });
    });
  }
});

describe("sources shown on the page", () => {
  it("the CBA rates, their definition, units and each bank's rates page are cited", () => {
    assert.equal(CURRENCY_SOURCES[0]!.effectiveFrom, CBA_LATEST.date);
    assert.ok(CURRENCY_SOURCES[0]!.evidence.includes("<ISO>USD</ISO>"));
    for (const source of CURRENCY_SOURCES) {
      assert.match(source.sourceUrl, /^https:\/\//, `${source.labelKey} needs a URL`);
      assert.ok(source.sourceName.length > 0, `${source.labelKey} needs a name`);
    }
  });
});

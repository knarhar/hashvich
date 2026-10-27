/**
 * The car customs page: the form's view of the calculation, the worked
 * examples, the copy and the sources. The calculation itself is tested
 * against the official SRC calculator in tests/car-customs.test.ts.
 *
 * Example figures, worked by hand at the CBA rate of 2026-10-26
 * (€1 = 404.11 AMD), for an individual importing from outside the EAEU:
 *
 *   Petrol, 2021 (counts as 1 July), 2000 cm³, €15,000 → over 5 years
 *     unified 4.8 €/cm³ × 2000 × 404.11       = 3,879,456
 *     environmental 6% × 6,061,650            =   363,699
 *     total                                   = 4,243,155
 *
 *   Hybrid, 2024, 2500 cm³, €30,000 → under 3 years, €16,700-42,300 band
 *     48% × €30,000 = €14,400 beats 5.5 × 2500 = €13,750
 *     unified 14,400 × 404.11                 = 5,819,184
 *     environmental 2% × 12,123,300           =   242,466
 *     total                                   = 6,061,650
 *
 *   Electric, 2025, €25,000 → duty 15%, VAT exempt (made after 2023)
 *     duty 15% × 10,102,750 = 1,515,412.5     → 1,515,413
 *     environmental 2%                        =   202,055
 *     total, rounded once from 1,717,467.5    = 1,717,468
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { LOCALES } from "../src/i18n/config.ts";
import { getDictionary, t, tEntries, tList } from "../src/i18n/utils.ts";
import { CAR_CUSTOMS_PARAMS as P } from "../src/lib/car-customs.ts";
import { carView, type CarForm } from "../src/lib/car-customs-view.ts";
import { EXAMPLE_CARS, carCopyParams } from "../src/lib/car-customs-copy.ts";
import { CAR_SOURCES } from "../src/lib/car-customs-sources.ts";
import { CBA_RATES } from "../src/lib/cba-rates.ts";
import { renderBreakdown } from "../src/lib/breakdown.ts";

const LABELS = {
  exempt: "not payable",
  capNote: "",
  floorNote: "minimum applies",
  exemptReasons: { eaeu: "EAEU goods", unified: "in the unified payment", ev2026: "exempt", eaeuFirst: "first car" },
};

const base: CarForm = {
  situation: "personal",
  fuel: "petrol",
  year: 2021,
  month: null,
  engineCc: 2000,
  price: 15_000,
  currency: "EUR",
  clearanceDate: "2026-10-26",
};

const view = (form: Partial<CarForm>) => carView({ ...base, ...form }, CBA_RATES, P);

describe("the rate snapshot", () => {
  it("is the CBA rate of 2026-10-26 the examples were checked against", () => {
    assert.equal(CBA_RATES.date, "2026-10-26");
    assert.equal(CBA_RATES.amdPer.EUR, 404.11);
    assert.equal(CBA_RATES.amdPer.USD, 360.88);
  });
});

describe("worked examples", () => {
  it("total customs payments match the hand calculation", () => {
    assert.deepEqual(
      EXAMPLE_CARS.map((car) => carView(car, CBA_RATES, P).breakdown.total),
      [4_243_155, 6_061_650, 1_717_468],
    );
  });

  it("petrol over 5 years: per-cm³ unified payment, VAT inside it", () => {
    const r = renderBreakdown(carView(EXAMPLE_CARS[0]!, CBA_RATES, P).breakdown, "en", LABELS);
    assert.deepEqual(
      r.lines.map((l) => [l.key, l.amount, l.formula]),
      [
        ["duty", "3,879,456 ֏", "4.8 € × 2,000 cm³ × 404.11"],
        ["vat", "—", "in the unified payment"],
        ["environmental", "363,699 ֏", "6% × 6,061,650"],
      ],
    );
    assert.equal(r.result, "10,304,805 ֏");
  });

  it("hybrid under 3 years: the percentage beats the per-cm³ minimum", () => {
    const r = renderBreakdown(carView(EXAMPLE_CARS[1]!, CBA_RATES, P).breakdown, "en", LABELS);
    assert.equal(r.lines[0]!.formula, "48% × 12,123,300");
    assert.equal(r.lines[0]!.note, null);
  });

  it("electric: 15% duty, VAT exempt in 2026 for a car made after 2023", () => {
    const r = carView(EXAMPLE_CARS[2]!, CBA_RATES, P);
    assert.equal(r.result.duty, 1_515_413);
    assert.equal(r.result.vat, 0);
    assert.equal(r.result.vatExempt, "ev_2026");
  });
});

describe("form choices", () => {
  it("the per-cm³ minimum is flagged when it beats the percentage", () => {
    // 2 years old, 3000 cm³, €30,000: 5.5 × 3000 = €16,500 beats 48% = €14,400.
    const r = renderBreakdown(
      view({ year: 2024, month: 10, engineCc: 3000, price: 30_000 }).breakdown,
      "en",
      LABELS,
    );
    assert.equal(r.lines[0]!.formula, "5.5 € × 3,000 cm³ × 404.11");
    assert.equal(r.lines[0]!.note, "minimum applies");
  });

  it("a company pays tariff duty and VAT on value plus duty", () => {
    const r = view({ situation: "business" });
    const [duty, vat] = r.breakdown.lines;
    // Used 3-7 years, 2000 cm³: 20% of value beats the 0.44 €/cm³ minimum.
    assert.deepEqual(duty!.formula, { kind: "percent", rate: 20, base: 6_061_650 });
    assert.deepEqual(vat!.formula, { kind: "percent", rate: 20, base: 6_061_650 + duty!.amount });
  });

  it("from the EAEU: no duty; the first car of the year pays no VAT", () => {
    const first = view({ situation: "eaeuFirst" });
    assert.deepEqual(first.breakdown.lines[0]!.formula, { kind: "exempt", reason: "eaeu" });
    assert.equal(first.result.vat, 0);
    assert.equal(first.warning, "eaeuEnvUnconfirmed");

    const second = view({ situation: "eaeu" });
    assert.equal(second.result.vat, Math.round(6_061_650 * 0.2));
    assert.equal(second.warning, null);
  });

  it("a commercial hybrid warns that the power split was assumed", () => {
    assert.equal(view({ situation: "business", fuel: "hybrid" }).warning, "hybridAssumed");
    assert.equal(view({ situation: "personal", fuel: "hybrid" }).warning, null);
  });

  it("prices in dollars, rubles and drams are converted at the snapshot", () => {
    assert.equal(view({ price: 10_000, currency: "USD" }).breakdown.base, 3_608_800);
    assert.equal(view({ price: 1_000_000, currency: "RUB" }).breakdown.base, 4_476_200);
    assert.equal(view({ price: 5_000_000, currency: "AMD" }).breakdown.base, 5_000_000);
  });

  it("a car of this year with no month, before July, does not throw", () => {
    const r = view({ year: 2026, month: null, clearanceDate: "2026-03-01" });
    assert.equal(r.result.ageYears, 0);
  });

  it("the result is the value plus the customs payments", () => {
    for (const car of EXAMPLE_CARS) {
      const b = carView(car, CBA_RATES, P).breakdown;
      assert.equal(b.result, b.base + b.total);
      const sum = b.lines.reduce((s, l) => s + l.amount, 0);
      // The total is rounded once from unrounded lines, as the SRC does.
      assert.ok(Math.abs(sum - b.total) <= 1, `lines ${sum} vs total ${b.total}`);
    }
  });

  it("the browser gets the same arithmetic as the server", () => {
    const shipped = JSON.parse(JSON.stringify({ P, CBA_RATES }));
    for (const car of EXAMPLE_CARS) {
      assert.deepEqual(carView(car, shipped.CBA_RATES, shipped.P), carView(car, CBA_RATES, P));
    }
    const bytes = Buffer.byteLength(JSON.stringify(P), "utf8");
    assert.ok(bytes < 4096, `params are ${bytes} bytes; expected under 4 KB`);
  });
});

describe("page copy", () => {
  const CALL_SITE_PARAMS = new Set(["fuel", "carYear", "cc", "price"]);

  for (const locale of LOCALES) {
    describe(locale, () => {
      const copy = carCopyParams(locale);
      const page = () => (getDictionary(locale) as Record<string, any>).pages["car-customs"];

      it("every placeholder used by the copy has a value", () => {
        for (const match of JSON.stringify(page()).matchAll(/\{(\w+)\}/g)) {
          const name = match[1]!;
          if (CALL_SITE_PARAMS.has(name)) continue;
          assert.ok(copy[name] !== undefined, `pages.car-customs uses {${name}}, which is not supplied`);
        }
      });

      it("headings render, and the FAQ has 5-8 questions", () => {
        for (const key of ["title", "h1", "description", "intro"]) {
          const out = t(`pages.car-customs.${key}`, locale, copy);
          assert.ok(out.length > 0 && !out.includes("{"), `${key}: ${out}`);
        }
        const faq = tEntries<{ q: string; a: string }>("pages.car-customs.faq.items", locale, copy);
        assert.ok(faq.length >= 5 && faq.length <= 8, `got ${faq.length} FAQ items`);
        assert.ok(tList("pages.car-customs.howItWorks.steps", locale, copy).length >= 4);
      });

      it("no rate or amount is written into the copy", () => {
        const digitsOnly = JSON.stringify(page()).replace(/[\s .,](?=\d)/g, "");
        for (const amount of ["40411", "36088", "44762", "8500"]) {
          assert.ok(!digitsOnly.includes(amount), `${locale}.json hardcodes ${amount}`);
        }
      });
    });
  }
});

describe("sources shown on the page", () => {
  it("every source has a URL, a name and an original-language quote", () => {
    assert.ok(CAR_SOURCES.length >= 8);
    for (const source of CAR_SOURCES) {
      assert.match(source.sourceUrl, /^https:\/\//, `${source.labelKey} needs a URL`);
      assert.ok(source.sourceName.length > 0, `${source.labelKey} needs a name`);
      assert.ok(source.evidence.length > 0, `${source.labelKey} needs a quote`);
    }
  });
});

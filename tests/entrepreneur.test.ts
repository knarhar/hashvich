/**
 * Individual entrepreneur (ИП / ԱՁ) tax, Armenia 2026.
 *
 * Expected figures are worked by hand from the rules in
 * src/data/salary-tax.json (entrepreneur section), not read back from the
 * code under test:
 *
 *   IT on the high-tech list, turnover tax, 12,000,000 turnover
 *     turnover tax 1% × 12,000,000         = 120,000
 *     fixed profit tax 5,000 × 12          =  60,000
 *     pension 5,000 × 12                   =  60,000
 *     stamp (turnover ≤ 12,000,000)        =  12,000
 *     health (prior income > 2,400,000)    = 129,600
 *     total                                = 381,600
 *
 *   Services, turnover tax, 6,000,000 turnover, 2,000,000 expenses
 *     10% × 6,000,000 − 6% × 2,000,000     = 480,000 (floor 4.5% = 270,000)
 *     + 60,000 + 60,000 + 12,000 + 129,600 = 741,600
 *
 *   Production, micro-enterprise, 10,000,000 turnover
 *     no turnover tax, no profit tax
 *     pension 5% × 10,000,000              = 500,000
 *     + 12,000 + 129,600                   = 641,600
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { LOCALES } from "../src/i18n/config.ts";
import { getDictionary, t, tEntries, tList } from "../src/i18n/utils.ts";
import {
  ENTREPRENEUR_PARAMS,
  calculateEntrepreneurTax,
  type EntrepreneurInput,
} from "../src/lib/entrepreneur.ts";
import { calculateEntrepreneurTax as coreCalculate } from "../src/lib/entrepreneur-core.ts";
import { EXAMPLE_CASES, entrepreneurCopyParams } from "../src/lib/entrepreneur-copy.ts";
import { ENTREPRENEUR_SOURCES } from "../src/lib/entrepreneur-sources.ts";
import { renderBreakdown } from "../src/lib/breakdown.ts";
import data from "../src/data/salary-tax.json" with { type: "json" };

const amount = (input: EntrepreneurInput, key: string) =>
  calculateEntrepreneurTax(input).lines.find((l) => l.key === key)!.amount;

describe("worked examples: yearly tax of an individual entrepreneur", () => {
  it("IT on the high-tech list, 12,000,000 turnover", () => {
    const r = calculateEntrepreneurTax({ regime: "turnover", activity: "it", turnover: 12_000_000 });
    assert.deepEqual(
      r.lines.map((l) => [l.key, l.amount]),
      [
        ["turnoverTax", 120_000],
        ["profitTax", 60_000],
        ["pension", 60_000],
        ["stamp", 12_000],
        ["health", 129_600],
      ],
    );
    assert.equal(r.total, 381_600);
    assert.equal(r.result, 11_618_400);
  });

  it("services with expenses, 6,000,000 turnover", () => {
    const r = calculateEntrepreneurTax({
      regime: "turnover",
      activity: "services",
      turnover: 6_000_000,
      expenses: 2_000_000,
    });
    assert.equal(r.lines[0]!.amount, 480_000);
    assert.equal(r.lines[0]!.formula.kind, "percentMinusPercent");
    assert.equal(r.total, 741_600);
  });

  it("production on the micro-enterprise regime, 10,000,000 turnover", () => {
    const r = calculateEntrepreneurTax({ regime: "micro", activity: "production", turnover: 10_000_000 });
    assert.equal(r.lines[0]!.amount, 0);
    assert.equal(r.lines[1]!.amount, 0);
    assert.equal(r.lines[2]!.amount, 500_000);
    assert.equal(r.total, 641_600);
    assert.equal(r.warning, null);
  });

  it("the page's examples are these three cases", () => {
    assert.deepEqual(
      EXAMPLE_CASES.map((c) => calculateEntrepreneurTax(c).total),
      [381_600, 741_600, 641_600],
    );
  });
});

describe("turnover tax and expenses", () => {
  const services = (expenses: number) =>
    amount({ regime: "turnover", activity: "services", turnover: 6_000_000, expenses }, "turnoverTax");

  it("expenses reduce the tax down to the minimum, not below", () => {
    assert.equal(services(0), 600_000);
    assert.equal(services(5_000_000), 300_000);
    // 600,000 − 360,000 = 240,000 is under the 4.5% floor of 270,000.
    assert.equal(services(6_000_000), 270_000);
    const r = calculateEntrepreneurTax({
      regime: "turnover",
      activity: "services",
      turnover: 6_000_000,
      expenses: 6_000_000,
    });
    assert.equal(r.lines[0]!.formula.kind, "floor");
  });

  it("activities without an expense credit ignore expenses", () => {
    assert.equal(
      amount({ regime: "turnover", activity: "it", turnover: 12_000_000, expenses: 5_000_000 }, "turnoverTax"),
      120_000,
    );
    assert.equal(
      amount({ regime: "turnover", activity: "rent", turnover: 1_000_000, expenses: 500_000 }, "turnoverTax"),
      100_000,
    );
  });

  it("trade: 10% less 9.5% of expenses, floor 1%", () => {
    const trade = (expenses: number) =>
      amount({ regime: "turnover", activity: "trade", turnover: 30_000_000, expenses }, "turnoverTax");
    assert.equal(trade(20_000_000), 1_100_000);
    assert.equal(trade(30_000_000), 300_000);
  });
});

describe("band boundaries", () => {
  it("stamp payment: 12,000 up to 12,000,000 and 120,000 above", () => {
    const stamp = (turnover: number) =>
      amount({ regime: "turnover", activity: "services", turnover }, "stamp");
    assert.equal(stamp(12_000_000), 12_000);
    assert.equal(stamp(12_000_001), 120_000);
  });

  it("health insurance: due from 2,400,001 of last year's income", () => {
    const health = (priorYearIncome: number) =>
      amount(
        { regime: "turnover", activity: "services", turnover: 6_000_000, priorYearIncome },
        "health",
      );
    assert.equal(health(2_400_000), 0);
    assert.equal(health(2_400_001), 129_600);
  });

  it("no pension when the entrepreneur is not a participant", () => {
    for (const regime of ["turnover", "micro"] as const) {
      assert.equal(
        amount({ regime, activity: "production", turnover: 5_000_000, pensionParticipant: false }, "pension"),
        0,
      );
    }
  });
});

describe("regime warnings", () => {
  it("turnover tax closes above 115,000,000", () => {
    const at = (turnover: number) =>
      calculateEntrepreneurTax({ regime: "turnover", activity: "services", turnover }).warning;
    assert.equal(at(115_000_000), null);
    assert.equal(at(115_000_001), "overTurnoverThreshold");
  });

  it("micro-enterprise closes above 24,000,000", () => {
    const at = (turnover: number) =>
      calculateEntrepreneurTax({ regime: "micro", activity: "production", turnover }).warning;
    assert.equal(at(24_000_000), null);
    assert.equal(at(24_000_001), "overMicroThreshold");
  });

  it("micro-enterprise is closed to trade, IT and rent", () => {
    for (const activity of ["trade", "it", "rent"] as const) {
      assert.equal(
        calculateEntrepreneurTax({ regime: "micro", activity, turnover: 1_000_000 }).warning,
        "microExcluded",
      );
    }
  });

  it("rejects negative input", () => {
    assert.throws(() => calculateEntrepreneurTax({ regime: "turnover", activity: "it", turnover: -1 }));
    assert.throws(() =>
      calculateEntrepreneurTax({ regime: "turnover", activity: "it", turnover: 1, expenses: -1 }),
    );
  });
});

describe("result shape", () => {
  it("lines add up to the total, and the result is turnover minus the total", () => {
    for (const input of [...EXAMPLE_CASES, { regime: "micro", activity: "services", turnover: 0 } as const]) {
      const r = calculateEntrepreneurTax(input);
      assert.equal(r.lines.reduce((s, l) => s + l.amount, 0), r.total);
      assert.equal(r.result, r.base - r.total);
    }
  });

  it("the browser gets the same arithmetic as the server", () => {
    const shipped = JSON.parse(JSON.stringify(ENTREPRENEUR_PARAMS));
    for (const input of EXAMPLE_CASES) {
      assert.deepEqual(coreCalculate(shipped, input), calculateEntrepreneurTax(input));
    }
    const bytes = Buffer.byteLength(JSON.stringify(ENTREPRENEUR_PARAMS), "utf8");
    assert.ok(bytes < 2048, `params are ${bytes} bytes; expected under 2 KB`);
  });

  it("renders formulas for each line", () => {
    const view = renderBreakdown(
      calculateEntrepreneurTax(EXAMPLE_CASES[1]!),
      "en",
      { exempt: "not payable", capNote: "", floorNote: "minimum" },
    );
    assert.equal(view.lines[0]!.formula, "10% × 6,000,000 − 6% × 2,000,000");
    assert.equal(view.lines[1]!.formula, "5,000 × 12");
    assert.equal(view.lines[3]!.formula, "0 – 12,000,000");
    assert.equal(view.lines[4]!.formula, "> 2,400,000");
  });
});

describe("the data file still says what these examples assume", () => {
  const E = data.entrepreneur;
  it("rates, credits and floors", () => {
    const row = (prefix: string) => E.turnover_tax.rates_2026.find((r) => r.activity.startsWith(prefix))!;
    assert.equal(row("Other activities").rate.value, 10);
    assert.equal(row("Other activities").deduction!.value, 6);
    assert.equal(row("Other activities").minimum!.value, 4.5);
    assert.equal(row("High-technology").rate.value, 1);
    assert.equal(row("Trade (purchase").deduction!.value, 9.5);
  });

  it("thresholds and fixed payments", () => {
    assert.equal(E.turnover_tax.eligibility_threshold.value, 115_000_000);
    assert.equal(E.micro_enterprise.threshold.value, 24_000_000);
    assert.equal(E.turnover_tax.ie_fixed_payments[0]!.value, 5_000);
    assert.equal(E.turnover_tax.ie_fixed_payments[1]!.value, 5_000);
    assert.equal(E.general_regime.ie_health_insurance.value, 129_600);
  });
});

describe("page copy", () => {
  // Supplied per call rather than by entrepreneurCopyParams.
  const CALL_SITE_PARAMS = new Set(["regime", "turnover"]);

  for (const locale of LOCALES) {
    describe(locale, () => {
      const copy = entrepreneurCopyParams(locale);

      it("every placeholder used by the copy has a value", () => {
        const page = (getDictionary(locale) as Record<string, any>).pages.entrepreneur;
        const text = JSON.stringify(page);
        for (const match of text.matchAll(/\{(\w+)\}/g)) {
          const name = match[1]!;
          if (CALL_SITE_PARAMS.has(name)) continue;
          assert.ok(copy[name] !== undefined, `pages.entrepreneur uses {${name}}, which is not supplied`);
        }
      });

      it("headings render, and the FAQ has 5-8 questions", () => {
        for (const key of ["title", "h1", "description", "intro"]) {
          const out = t(`pages.entrepreneur.${key}`, locale, copy);
          assert.ok(out.length > 0 && !out.includes("{"), `${key}: ${out}`);
        }
        const faq = tEntries<{ q: string; a: string }>("pages.entrepreneur.faq.items", locale, copy);
        assert.ok(faq.length >= 5 && faq.length <= 8, `got ${faq.length} FAQ items`);
        assert.ok(tList("pages.entrepreneur.howItWorks.steps", locale, copy).length >= 4);
      });

      it("no rule amount is written into the copy", () => {
        const raw = JSON.stringify((getDictionary(locale) as Record<string, any>).pages.entrepreneur);
        const digitsOnly = raw.replace(/[\s .,](?=\d)/g, "");
        for (const amount of ["115000000", "24000000", "129600", "2400000", "12000000", "120000"]) {
          assert.ok(!digitsOnly.includes(amount), `${locale}.json hardcodes ${amount}`);
        }
      });
    });
  }

  it("the FAQ quotes the same totals as the worked examples", () => {
    const copy = entrepreneurCopyParams("en");
    assert.equal(copy.exampleItTotal, "381,600 ֏");
    assert.equal(copy.exampleServicesTotal, "741,600 ֏");
    assert.equal(copy.exampleMicroTotal, "641,600 ֏");
  });
});

describe("sources shown on the page", () => {
  it("every source cites arlis.am with a name and a quote", () => {
    assert.ok(ENTREPRENEUR_SOURCES.length >= 5);
    for (const source of ENTREPRENEUR_SOURCES) {
      assert.ok(source.sourceUrl.includes("arlis.am"), `${source.labelKey}: ${source.sourceUrl}`);
      assert.ok(source.sourceName.length > 0, `${source.labelKey} needs a name`);
      assert.ok(source.evidence.length > 0, `${source.labelKey} needs a quote`);
    }
  });
});

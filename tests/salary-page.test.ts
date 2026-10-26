/**
 * Guards on the salary page's data wiring.
 *
 * The project rule is that numbers come only from src/data and text only from
 * src/i18n. These tests enforce that: no rate or amount may be written into a
 * translation file, and every placeholder the copy uses must be supplied.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { LOCALES, DEFAULT_LOCALE } from "../src/i18n/config.ts";
import { getDictionary, t, tEntries, tList } from "../src/i18n/utils.ts";
import { SALARY_FACTS, SALARY_PARAMS, calculateNetSalary } from "../src/lib/salary.ts";
import { EXAMPLE_SALARIES, salaryCopyParams } from "../src/lib/salary-copy.ts";
import { SALARY_SOURCES, LAST_VERIFIED } from "../src/lib/salary-sources.ts";
import { formulaText, isCapped, renderResult } from "../src/lib/salary-view.ts";
import { calculateNetSalary as coreCalculate } from "../src/lib/salary-core.ts";

const LABELS = { exempt: "not withheld", capNote: "capped" };

/**
 * Placeholders supplied per call rather than globally, because their value
 * differs by row: the worked-example heading takes the example's own salary.
 */
const CALL_SITE_PARAMS = new Set(["gross"]);

describe("copy renders in every locale", () => {
  for (const locale of LOCALES) {
    describe(locale, () => {
      const copy = salaryCopyParams(locale);

      it("every placeholder used by the copy has a value", () => {
        // Walk the raw pages.salary subtree and check that each {name} the
        // copy references is supplied by salaryCopyParams. This is the
        // contract between the translation files and the data.
        const salary = (getDictionary(locale) as Record<string, any>).pages.salary;
        const seen = new Set<string>();

        const walk = (node: unknown, path: string): void => {
          if (typeof node === "string") {
            assert.ok(node.trim().length > 0, `${path} is empty`);
            for (const match of node.matchAll(/\{(\w+)\}/g)) {
              const name = match[1]!;
              if (CALL_SITE_PARAMS.has(name)) continue;
              seen.add(name);
              assert.ok(
                copy[name] !== undefined,
                `${path} uses {${name}}, which salaryCopyParams does not supply`,
              );
            }
            return;
          }
          if (Array.isArray(node)) {
            node.forEach((item, i) => walk(item, `${path}[${i}]`));
            return;
          }
          if (node && typeof node === "object") {
            for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
          }
        };
        walk(salary, "pages.salary");

        assert.ok(seen.size > 5, `expected the copy to reference data values, saw ${seen.size}`);
      });

      it("key strings render with their placeholders filled in", () => {
        for (const key of [
          "pages.salary.title",
          "pages.salary.h1",
          "pages.salary.description",
          "pages.salary.intro",
        ]) {
          const out = t(key, locale, copy);
          assert.ok(out.length > 0, `${key} is empty`);
          assert.ok(!out.includes("{"), `${key} left a placeholder: ${out}`);
        }
      });

      it("the step list and FAQ resolve as structured data", () => {
        const steps = tList("pages.salary.howItWorks.steps", locale, copy);
        assert.ok(steps.length >= 4, "expected the full set of steps");

        const faq = tEntries<{ q: string; a: string }>(
          "pages.salary.faq.items",
          locale,
          copy,
        );
        // The spec asks for 5-8 questions.
        assert.ok(faq.length >= 5 && faq.length <= 8, `got ${faq.length} FAQ items`);
        for (const item of faq) {
          assert.ok(item.q.length > 0 && item.a.length > 0);
          assert.ok(!item.q.includes("{") && !item.a.includes("{"));
        }
      });
    });
  }
});

describe("no number is hardcoded in the copy", () => {
  // The amounts that must never appear as literals in a translation file.
  const FORBIDDEN = [
    String(SALARY_FACTS.pensionLowerBandMax), // 500000
    String(SALARY_FACTS.pensionCapBase), // 1125000
    String(SALARY_FACTS.pensionMaxPayment), // 87500
    String(SALARY_FACTS.stampThreshold), // 1000000
    String(SALARY_FACTS.healthFull), // 10800
    String(SALARY_FACTS.healthReduced), // 4800
    String(SALARY_FACTS.minimumWage), // 75000
  ];

  for (const locale of LOCALES) {
    it(`${locale}.json contains no raw rule amounts`, () => {
      // Strip grouping so "1 125 000" is caught as well as "1125000".
      const raw = JSON.stringify(getDictionary(locale));
      const digitsOnly = raw.replace(/[\s .,](?=\d)/g, "");
      for (const amount of FORBIDDEN) {
        assert.ok(
          !digitsOnly.includes(amount),
          `${locale}.json hardcodes ${amount}; use a {placeholder} instead`,
        );
      }
    });
  }

  it("historic rates quoted in the FAQ are allowed, since they are history", () => {
    // 23%/22%/21% and the old 1,500-15,000 stamp scale are deliberately
    // written out: they describe superseded law and are not calculated with.
    const ru = JSON.stringify(getDictionary("ru"));
    assert.ok(ru.includes("23%"), "the rate history should still be described");
  });
});

describe("copy parameters", () => {
  for (const locale of LOCALES) {
    it(`${locale}: every parameter is a non-empty formatted string`, () => {
      const copy = salaryCopyParams(locale);
      for (const [key, value] of Object.entries(copy)) {
        assert.ok(
          String(value).length > 0,
          `${key} is empty`,
        );
      }
    });

    it(`${locale}: FAQ example figures match the calculator`, () => {
      const copy = salaryCopyParams(locale);
      const low = calculateNetSalary({ gross: EXAMPLE_SALARIES[0] });
      // The prose quotes the same net figure the worked example shows.
      assert.ok(
        String(copy.exampleLowNet).replace(/\D/g, "").startsWith(String(low.net)),
        `${copy.exampleLowNet} should contain ${low.net}`,
      );
    });
  }
});

describe("formula rendering", () => {
  it("renders each formula kind as an expression", () => {
    assert.equal(
      formulaText({ kind: "percent", rate: 20, base: 300_000 }, "en", LABELS),
      "20% × 300,000",
    );
    assert.equal(
      formulaText(
        { kind: "percentMinus", rate: 10, base: 1_125_000, minus: 25_000, capped: true },
        "en",
        LABELS,
      ),
      "10% × 1,125,000 − 25,000",
    );
    assert.equal(
      formulaText({ kind: "band", from: 200_001, to: 500_000 }, "en", LABELS),
      "200,001 – 500,000",
    );
    assert.equal(
      formulaText({ kind: "band", from: 1_000_001, to: null }, "en", LABELS),
      "> 1,000,000",
    );
    assert.equal(formulaText({ kind: "exempt" }, "en", LABELS), LABELS.exempt);
  });

  it("flags the capped pension band and only that one", () => {
    assert.equal(
      isCapped({ kind: "percentMinus", rate: 10, base: 1_125_000, minus: 25_000, capped: true }),
      true,
    );
    assert.equal(
      isCapped({ kind: "percentMinus", rate: 10, base: 800_000, minus: 25_000, capped: false }),
      false,
    );
    assert.equal(isCapped({ kind: "percent", rate: 20, base: 1 }), false);
  });

  it("shows a dash rather than a zero amount", () => {
    const view = renderResult(
      calculateNetSalary({ gross: 150_000 }),
      "en",
      LABELS,
    );
    const health = view.lines.find((l) => l.key === "health")!;
    assert.equal(health.amount, "—");
  });

  it("the rendered lines add up to the rendered total", () => {
    for (const gross of [150_000, 300_000, 800_000, 1_500_000]) {
      const result = calculateNetSalary({ gross });
      const view = renderResult(result, "en", LABELS);
      const digits = (s: string) => Number(s.replace(/\D/g, "") || 0);
      const sum = view.lines.reduce((acc, l) => acc + digits(l.amount), 0);
      assert.equal(sum, digits(view.total), `lines do not sum at ${gross}`);
    }
  });
});

describe("the browser gets the same arithmetic as the server", () => {
  it("core functions over serialised params match the bound wrappers", () => {
    // The island receives SALARY_PARAMS as JSON. Round-trip it to prove
    // nothing is lost in serialisation.
    const shipped = JSON.parse(JSON.stringify(SALARY_PARAMS));
    for (const gross of [0, 150_000, 500_000, 500_001, 1_125_000, 1_500_000]) {
      for (const participant of [true, false]) {
        for (const regime of ["standard", "rd"] as const) {
          const server = calculateNetSalary({
            gross,
            pensionParticipant: participant,
            regime,
          });
          const client = coreCalculate(shipped, {
            gross,
            pensionParticipant: participant,
            regime,
          });
          assert.deepEqual(client, server, `mismatch at ${gross}/${participant}/${regime}`);
        }
      }
    }
  });

  it("the serialised params stay small enough to inline", () => {
    const bytes = Buffer.byteLength(JSON.stringify(SALARY_PARAMS), "utf8");
    assert.ok(bytes < 1024, `params are ${bytes} bytes; expected well under 1 KB`);
  });
});

describe("sources shown on the page", () => {
  it("every source has a URL, a name and an original-language quote", () => {
    assert.ok(SALARY_SOURCES.length >= 4);
    for (const source of SALARY_SOURCES) {
      assert.match(source.sourceUrl, /^https:\/\//, `${source.labelKey} needs a URL`);
      assert.ok(source.sourceName.length > 0, `${source.labelKey} needs a name`);
      assert.ok(source.evidence.length > 0, `${source.labelKey} needs a quote`);
    }
  });

  it("cites arlis.am, the primary legal source", () => {
    for (const source of SALARY_SOURCES) {
      assert.ok(
        source.sourceUrl.includes("arlis.am"),
        `${source.labelKey} should cite a primary source, got ${source.sourceUrl}`,
      );
    }
  });

  it("the page's last-updated date matches the data file", () => {
    assert.equal(LAST_VERIFIED, SALARY_FACTS.lastVerified);
    assert.match(LAST_VERIFIED, /^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("Armenian copy is flagged for review", () => {
  it("hy is marked TODO-REVIEW and the others are not", () => {
    const hy = getDictionary("hy") as unknown as { _meta: { reviewStatus: string } };
    assert.equal(hy._meta.reviewStatus, "TODO-REVIEW");

    for (const locale of LOCALES.filter((l) => l !== "hy")) {
      const dict = getDictionary(locale) as unknown as {
        _meta: { reviewStatus: string };
      };
      assert.notEqual(dict._meta.reviewStatus, "TODO-REVIEW");
    }
  });

  it("the default locale is not the one awaiting review", () => {
    assert.notEqual(DEFAULT_LOCALE, "hy");
  });
});

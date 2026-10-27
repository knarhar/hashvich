/**
 * The bank transfer comparison.
 *
 * Expected figures are worked by hand from src/data/fx-and-fees.json at the
 * CBA rate of 2026-10-26 ($1 = 360.88, ₽1 = 4.4762 AMD):
 *
 *   Send $1,000 abroad (360,880 AMD), fee + sell margin:
 *     Evocabank      0.15% → min 7,000 + 0.59% (2,129) =  9,129
 *     Converse Bank  0.10% → min 7,000 + 0.59% (2,129) =  9,129
 *     ...
 *     ACBA Bank      0.20% → min 12,000 + 0.59%        = 14,129
 *
 *   Receive $1,000 and change it into drams, fee + buy margin:
 *     AMIO Bank      free + 0.52% (1,877)              =  1,877
 *     Armeconombank  1,500 (up to $1,000) + 0.80%      =  4,387
 *
 *   Send ₽100,000 to Russia (447,620 AMD):
 *     AMIO Bank      0.1% → min 3,000 + 2.54% (11,370) = 14,370
 *     Ameriabank     0.1% → min 3,000 + 4.11% (18,397) = 21,397
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { LOCALES } from "../src/i18n/config.ts";
import { getDictionary, t, tEntries, tList } from "../src/i18n/utils.ts";
import {
  COMPARED_BANKS,
  FEE_ROWS,
  MISSING_BANKS,
  TRANSFERS_PARAMS,
  compareBanks,
  transfersBreakdown,
} from "../src/lib/transfers.ts";
import { feeAmd, transfersBreakdown as coreBreakdown } from "../src/lib/transfers-core.ts";
import { EXAMPLE_TRANSFERS, transfersCopyParams } from "../src/lib/transfers-copy.ts";
import { TRANSFER_SOURCES } from "../src/lib/transfers-sources.ts";
import { renderBreakdown } from "../src/lib/breakdown.ts";

const ranking = (input: Parameters<typeof compareBanks>[0]) =>
  compareBanks(input).map((c) => [c.id, c.total]);

describe("the fee rows the comparison reads", () => {
  // The same rows as the table in docs/fx-and-fees-notes.md: online, from an
  // account. Checked against each row's own description, so a reordered
  // data file cannot silently swap a branch tariff in.
  const expected: Record<string, [number, number, number]> = {
    ardshinbank: [0.15, 7_000, 50_000],
    ameriabank: [0.15, 7_000, 20_000],
    acba: [0.2, 12_000, 75_000],
    amiobank: [0.15, 7_500, 50_000],
    evocabank: [0.15, 7_000, 70_000],
    armeconombank: [0.15, 10_000, 65_000],
    conversebank: [0.1, 7_000, 45_000],
    idbank: [0.15, 10_000, 50_000],
  };

  for (const bank of COMPARED_BANKS) {
    it(`${bank.id}: USD row is the notes table's online tariff`, () => {
      const row = bank.fees[FEE_ROWS[bank.id]!.USD]!;
      assert.equal(row.operation, "outgoing_international");
      assert.equal(row.currency, "USD");
      assert.deepEqual([row.percent, row.min, row.max], expected[bank.id]);
    });

    it(`${bank.id}: EUR, RUB and incoming rows are the right operations`, () => {
      const rows = FEE_ROWS[bank.id]!;
      assert.equal(bank.fees[rows.EUR]!.currency, "EUR");
      assert.equal(bank.fees[rows.EUR]!.operation, "outgoing_international");
      assert.equal(bank.fees[rows.RUB]!.currency, "RUB");
      assert.equal(bank.fees[rows.RUB]!.operation, "outgoing_to_russia");
      assert.equal(bank.fees[rows.receive]!.operation, "incoming_international");
    });
  }

  it("Inecobank is left out: its site could not be read", () => {
    assert.deepEqual(MISSING_BANKS, ["inecobank"]);
  });
});

describe("fee arithmetic", () => {
  const fee = { percent: 0.15, min: 7_000, max: 50_000, fixed: null, tiers: null };

  it("a percentage clamped to the minimum and maximum", () => {
    assert.equal(feeAmd(fee, 1_000_000, 0), 7_000);
    assert.equal(feeAmd(fee, 10_000_000, 0), 15_000);
    assert.equal(feeAmd(fee, 100_000_000, 0), 50_000);
  });

  it("a flat fee, and tiers by the amount in the transfer currency", () => {
    assert.equal(feeAmd({ percent: null, min: null, max: null, fixed: 2_300, tiers: null }, 1, 1), 2_300);
    const tiers = [{ up_to: 1_000, fee: 1_500 }, { from: 1_001, up_to: 5_000, fee: 2_500 }, { from: 5_001, fee: 5_000 }];
    const tiered = { percent: null, min: null, max: null, fixed: null, tiers };
    assert.equal(feeAmd(tiered, 0, 1_000), 1_500);
    assert.equal(feeAmd(tiered, 0, 1_001), 2_500);
    assert.equal(feeAmd(tiered, 0, 6_000), 5_000);
  });
});

describe("worked comparisons", () => {
  it("sending $1,000 abroad", () => {
    assert.deepEqual(ranking({ direction: "send", currency: "USD", amount: 1_000 }), [
      ["evocabank", 9_129],
      ["conversebank", 9_129],
      ["ardshinbank", 9_634],
      ["ameriabank", 9_634],
      ["amiobank", 10_604],
      ["idbank", 11_624],
      ["armeconombank", 12_129],
      ["acba", 14_129],
    ]);
  });

  it("receiving $1,000: unpublished fees count as zero, tiers apply", () => {
    const costs = compareBanks({ direction: "receive", currency: "USD", amount: 1_000 });
    assert.deepEqual(costs[0], { id: "amiobank", fee: 0, marginPercent: 0.52, marginAmd: 1_877, total: 1_877 });
    assert.equal(costs.find((c) => c.id === "conversebank")!.fee, null);
    assert.deepEqual(costs.at(-1), { id: "armeconombank", fee: 1_500, marginPercent: 0.8, marginAmd: 2_887, total: 4_387 });
  });

  it("sending ₽100,000 to Russia", () => {
    const r = ranking({ direction: "send", currency: "RUB", amount: 100_000 });
    assert.deepEqual(r[0], ["amiobank", 14_370]);
    assert.deepEqual(r.at(-1), ["ameriabank", 21_397]);
    // Ardshinbank's flat 2,300 fee.
    assert.equal(compareBanks({ direction: "send", currency: "RUB", amount: 100_000 }).find((c) => c.id === "ardshinbank")!.fee, 2_300);
  });

  it("the headline is the cheapest bank, the base is the amount at the CBA rate", () => {
    const b = transfersBreakdown({ direction: "send", currency: "USD", amount: 1_000 });
    assert.equal(b.base, 360_880);
    assert.equal(b.result, 9_129);
    assert.equal(b.lines.length, 8);
  });

  it("renders each bank as fee + margin", () => {
    const view = renderBreakdown(
      transfersBreakdown({ direction: "receive", currency: "USD", amount: 1_000 }),
      "en",
      { exempt: "", capNote: "", exemptReasons: { feeUnpublished: "fee not published" } },
    );
    assert.equal(view.lines[0]!.formula, "0 ֏ + 0.52%");
    assert.equal(view.lines[1]!.formula, "fee not published + 0.52%");
  });

  it("rejects a negative amount", () => {
    assert.throws(() => compareBanks({ direction: "send", currency: "USD", amount: -1 }));
  });

  it("the browser gets the same arithmetic as the server", () => {
    const shipped = JSON.parse(JSON.stringify(TRANSFERS_PARAMS));
    for (const input of EXAMPLE_TRANSFERS) {
      assert.deepEqual(coreBreakdown(shipped, input), transfersBreakdown(input));
    }
    const bytes = Buffer.byteLength(JSON.stringify(TRANSFERS_PARAMS), "utf8");
    assert.ok(bytes < 4096, `params are ${bytes} bytes; expected under 4 KB`);
  });
});

describe("page copy", () => {
  const CALL_SITE_PARAMS = new Set(["direction", "amount"]);

  for (const locale of LOCALES) {
    describe(locale, () => {
      const copy = transfersCopyParams(locale);
      const page = () => (getDictionary(locale) as Record<string, any>).pages.transfers;

      it("every placeholder used by the copy has a value", () => {
        for (const match of JSON.stringify(page()).matchAll(/\{(\w+)\}/g)) {
          const name = match[1]!;
          if (CALL_SITE_PARAMS.has(name)) continue;
          assert.ok(copy[name] !== undefined, `pages.transfers uses {${name}}, which is not supplied`);
        }
      });

      it("headings render, and the FAQ has 5-8 questions", () => {
        for (const key of ["title", "h1", "description", "intro"]) {
          const out = t(`pages.transfers.${key}`, locale, copy);
          assert.ok(out.length > 0 && !out.includes("{"), `${key}: ${out}`);
        }
        const faq = tEntries<{ q: string; a: string }>("pages.transfers.faq.items", locale, copy);
        assert.ok(faq.length >= 5 && faq.length <= 8, `got ${faq.length} FAQ items`);
        assert.ok(tList("pages.transfers.howItWorks.steps", locale, copy).length >= 4);
      });

      it("no fee or rate is written into the copy", () => {
        const digitsOnly = JSON.stringify(page()).replace(/[\s .,](?=\d)/g, "");
        for (const amount of ["36088", "40411", "44762", "2300", "4457", "125000", "120000"]) {
          assert.ok(!digitsOnly.includes(amount), `${locale}.json hardcodes ${amount}`);
        }
      });

      it("every compared bank has a name", () => {
        for (const bank of COMPARED_BANKS) {
          assert.ok(t(`pages.transfers.banks.${bank.id}`, locale).length > 0);
        }
      });
    });
  }

  it("the FAQ names every bank tied for cheapest", () => {
    assert.equal(transfersCopyParams("en").ex1Bank, "Evocabank and Converse Bank");
    assert.equal(transfersCopyParams("en").ex1Cost, "9,129 ֏");
  });
});

describe("sources shown on the page", () => {
  it("every bank's tariff and the CBA rate are cited with a URL", () => {
    assert.equal(TRANSFER_SOURCES.length, COMPARED_BANKS.length + 1);
    for (const source of TRANSFER_SOURCES) {
      assert.match(source.sourceUrl, /^https:\/\//, `${source.labelKey} needs a URL`);
      assert.ok(source.sourceName.length > 0, `${source.labelKey} needs a name`);
    }
  });
});

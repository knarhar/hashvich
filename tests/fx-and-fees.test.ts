/**
 * Integrity checks for src/data/fx-and-fees.json.
 *
 * Run: npm test
 *
 * The file is research data (no calculator uses it yet), so these tests
 * only guard the rules it was built under: every value is sourced and
 * dated, missing values are null with a reason, and the FX margins agree
 * with the bank rates and the CBA rate they were computed from.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const data = JSON.parse(
  readFileSync(new URL("../src/data/fx-and-fees.json", import.meta.url), "utf8"),
);
const providers = [...data.banks, ...data.transfer_services];
const cba = data.official_rate.snapshot.rates_amd_per_unit[data.official_rate.snapshot.date];

describe("official rate (CBA)", () => {
  it("documents the SOAP API with its source", () => {
    const api = data.official_rate.api;
    assert.equal(api.value.endpoint, "https://api.cba.am/exchangerates.asmx");
    assert.ok(api.value.operations.ExchangeRatesLatest);
    assert.match(api.source_url, /^https:\/\/www\.cba\.am\//);
    assert.ok(api.evidence.length > 0);
  });

  it("records that browsers cannot call the API directly", () => {
    assert.equal(data.official_rate.browser_access.value, false);
  });

  it("keeps terms of use null with a reason, since none were found", () => {
    assert.equal(data.official_rate.terms_of_use.value, null);
    assert.ok(data.official_rate.terms_of_use.null_reason);
  });

  it("has the 26.10.2026 snapshot for USD, EUR and RUB", () => {
    assert.deepEqual(cba, { USD: 360.88, EUR: 404.11, RUB: 4.4762 });
  });
});

describe("providers", () => {
  it("covers the eight largest banks by assets", () => {
    const top8 = data.bank_ranking.ranking.slice(0, 8).map((r: { rank: number }) => r.rank);
    const ranked = data.banks
      .map((b: { total_assets_rank?: { rank: number } }) => b.total_assets_rank?.rank)
      .filter(Boolean);
    for (const rank of top8) assert.ok(ranked.includes(rank), `bank of rank ${rank} missing`);
  });

  it("covers at least three transfer services", () => {
    assert.ok(data.transfer_services.length >= 3);
  });

  for (const p of providers) {
    it(`${p.id}: every fee row is sourced, dated and either has numbers or a null reason`, () => {
      assert.ok(p.fees.length > 0);
      for (const f of p.fees) {
        const where = `${p.id} ${f.operation} ${f.currency} ${f.channel}`;
        assert.match(f.source_url ?? "", /^https?:\/\//, where);
        assert.equal(f.last_verified, data._readme.last_verified, where);
        assert.ok(f.likely_change, where);
        const hasNumber =
          ["percent", "min", "max", "fixed"].some((k) => typeof f[k] === "number") ||
          Array.isArray(f.tiers);
        assert.ok(hasNumber || f.null_reason, `${where}: no value and no null_reason`);
        if (hasNumber) assert.ok(f.evidence, `${where}: number without evidence`);
      }
    });

    it(`${p.id}: margins match buy/sell against the CBA rate`, () => {
      for (const r of p.conversion.rates_observed) {
        const c = cba[r.currency];
        if (typeof r.buy === "number") {
          assert.equal(r.margin_buy_pct, Math.round(((c - r.buy) / c) * 10000) / 100);
        }
        if (typeof r.sell === "number") {
          assert.equal(r.margin_sell_pct, Math.round(((r.sell - c) / c) * 10000) / 100);
        }
        if (r.buy == null && r.sell == null && r.provider_rate == null && r.provider_rate_amd_per_rub == null) {
          assert.ok(r.null_reason, `${p.id} ${r.currency}: empty rate without null_reason`);
        }
      }
    });
  }

  it("leaves Inecobank null: its site blocked automated access", () => {
    const ineco = data.banks.find((b: { id: string }) => b.id === "inecobank");
    for (const f of ineco.fees) {
      assert.equal(f.percent ?? f.fixed ?? f.min ?? f.max ?? null, null);
      assert.ok(f.null_reason);
    }
  });
});

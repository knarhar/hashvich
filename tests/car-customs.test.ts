/**
 * Worked examples for the car import payments into Armenia.
 *
 * Run: npm test
 *
 * Three kinds of expected numbers, none of them invented here:
 *
 *   1. SRC's own worked examples (FAQ of 13.12.2023, src.am/ru/getNews/299,
 *      and the SRC examples quoted by impress.am in 2019). These are in EUR
 *      and test the unified personal-use payment alone.
 *   2. The SRC's official calculator, exim.src.am/transport, run on
 *      2026-10-26 with the CBA rates it displayed (EUR 404.11, USD 360.88).
 *      Each row below is copied from `official_calculator_cross_check` in
 *      src/data/car-customs.json. The calculator assumes a car whose only
 *      known date is its year was made on 1 July.
 *   3. Real-world examples from brokers and the press
 *      (`real_world_examples`). Those are compared, not asserted equal:
 *      most do not match, and the reasons are recorded in the data file.
 *
 * The rules themselves are in docs/car-customs-logic.md.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  calculateCarImport,
  CAR_CUSTOMS_PARAMS as P,
  environmentalPercent,
  productionDate,
  unifiedPaymentEur,
  type CarImportInput,
  type Fuel,
} from "../src/lib/car-customs.ts";
import data from "../src/data/car-customs.json" with { type: "json" };

const EUR = 404.11;
const USD = 360.88;
const DAY = "2026-10-26";
const on = new Date(`${DAY}T00:00:00Z`);

/** A production date exactly `years` before 2026-10-26. */
function madeYearsAgo(years: number): Date {
  return new Date(Date.UTC(2026 - years, 9, 26));
}

describe("unified personal-use payment: SRC's own worked examples (EUR)", () => {
  it("2 years, 3000 cm³, €30,000 → 16,500 (the 5.5 €/cm³ minimum beats 48%)", () => {
    // FAQ: «30 000x48%=14 400 … 3000x5,5=16 500 … составляет 16500 евро»
    const r = unifiedPaymentEur(P, madeYearsAgo(2), on, 3000, 30000);
    assert.equal(r.eur, 16500);
    assert.deepEqual(r.formula, { kind: "percentMin", percent: 48, minEurPerCc: 5.5, minApplied: true });
  });

  it("4 years, 3000 cm³, €80,000 → 9,000 (value plays no role)", () => {
    // FAQ: «автомобилю 4 года, объем двигателя 3000 куб. см, стоимость 80 000 евро … 9000 евро (3000x3)»
    assert.equal(unifiedPaymentEur(P, madeYearsAgo(4), on, 3000, 80000).eur, 9000);
  });

  it("7 years, 3000 cm³, €40,000 → 15,000", () => {
    // FAQ: «автомобилю 7 лет, объем двигателя 3000 куб. см, Стоимость 40 000 евро … 15 000 евро (3000x5)»
    assert.equal(unifiedPaymentEur(P, madeYearsAgo(7), on, 3000, 40000).eur, 15000);
  });

  it("under 3 years, €7,800, 2500 cm³ → 6,250 (2.5 €/cm³ minimum)", () => {
    // impress.am (SRC): «վճարման ենթակա գումարը կկազմի 6250 եվրոյին համարժեք դրամ»
    assert.equal(unifiedPaymentEur(P, madeYearsAgo(1), on, 2500, 7800).eur, 6250);
  });

  it("under 3 years, €7,800, 1600 cm³ → 4,212 (54% of value)", () => {
    // impress.am (SRC): «ՄԴ = 7800€ x 54% = 4212 եվրո»
    assert.equal(unifiedPaymentEur(P, madeYearsAgo(1), on, 1600, 7800).eur, 4212);
  });
});

interface CalcRow {
  id: string;
  input: { purpose: "PERSONAL" | "BUSINESS"; from: "2" | "3"; engine: string; cc?: number; year: number; value: number; cur?: "eur" | "usd" };
  unified: number | null;
  duty: number | null;
  vat: number | null;
  env: number | null;
  total: number | null;
}

const ENGINE: Record<string, Fuel> = {
  petrol: "petrol",
  diesel: "diesel",
  hybridPetrolElectric: "hybrid_petrol",
  electric: "electric",
};

function fromCalculatorRow(row: CalcRow): CarImportInput {
  const rate = row.input.cur === "usd" ? USD : EUR;
  return {
    importer: row.input.purpose === "PERSONAL" ? "personal" : "business",
    origin: row.input.from === "2" ? "eaeu" : "third_country",
    fuel: ENGINE[row.input.engine]!,
    engineCc: row.input.cc,
    made: { year: row.input.year },
    clearanceDate: DAY,
    valueAmd: row.input.value * rate,
    eurRate: EUR,
    // The calculator leaves its exemption boxes unticked and assumes a
    // second EAEU car of the year; mirror that.
    evVatExemption: false,
  };
}

describe("matches the SRC's official calculator to the dram (exim.src.am, 2026-10-26)", () => {
  const rows = data.official_calculator_cross_check.runs as CalcRow[];

  it("has the 19 recorded runs", () => assert.equal(rows.length, 19));

  for (const row of rows) {
    it(row.id, () => {
      const r = calculateCarImport(fromCalculatorRow(row));
      assert.equal(r.duty, row.unified ?? row.duty ?? 0, "unified payment / customs duty");
      assert.equal(r.vat, row.vat ?? 0, "VAT");
      assert.equal(r.environmentalTax, row.env, "environmental tax");
      assert.equal(r.total, row.total, "total");
    });
  }
});

describe("age rules", () => {
  it("year only → 1 July; year and month → the 15th", () => {
    assert.equal(productionDate({ year: 2021 }).toISOString().slice(0, 10), "2021-07-01");
    assert.equal(productionDate({ year: 2021, month: 3 }).toISOString().slice(0, 10), "2021-03-15");
  });

  it("exactly 3 years old is still in the 'not more than 3 years' unified band", () => {
    const r = unifiedPaymentEur(P, madeYearsAgo(3), on, 2000, 20000);
    assert.equal(r.formula.kind, "percentMin");
  });

  it("one day past 3 years moves to the per-cm³ band", () => {
    const made = new Date(Date.UTC(2023, 9, 25));
    assert.deepEqual(unifiedPaymentEur(P, made, on, 2000, 20000).formula, { kind: "perCc", eurPerCc: 2.7 });
  });

  it("tariff: exactly 3 years counts as used ('3 года или более')", () => {
    const r = calculateCarImport({
      importer: "business", origin: "third_country", fuel: "petrol", engineCc: 2000,
      made: { year: 2023, month: 10, day: 26 }, clearanceDate: DAY, valueAmd: 10000 * EUR, eurRate: EUR,
    });
    assert.deepEqual(r.dutyFormula, { kind: "percentMin", percent: 20, minEurPerCc: 0.44, minApplied: false });
  });

  it("environmental tax counts exact age, as the SRC calculator does", () => {
    // Made 1 July 2021, cleared 26 Oct 2026: 5 calendar years, but over 5 → 6%.
    assert.equal(environmentalPercent(P, productionDate({ year: 2021 }), on), 6);
    assert.equal(environmentalPercent(P, madeYearsAgo(5), on), 4);
  });
});

describe("electric cars", () => {
  const ev: CarImportInput = {
    importer: "personal", origin: "third_country", fuel: "electric",
    made: { year: 2025 }, clearanceDate: DAY, valueAmd: 25000 * EUR, eurRate: EUR,
  };

  it("produced after 2023 and cleared in 2026: VAT-exempt (Tax Code art. 64(2)(58.2))", () => {
    const r = calculateCarImport(ev);
    assert.equal(r.vatExempt, "ev_2026");
    assert.equal(r.vat, 0);
    assert.equal(r.duty, 1515413);
  });

  it("produced in 2023: pays VAT", () => {
    const r = calculateCarImport({ ...ev, made: { year: 2023 } });
    assert.equal(r.vatExempt, false);
    assert.ok(r.vat > 0);
  });

  it("inside the zero-duty quota: no duty, and no duty in the VAT base", () => {
    const r = calculateCarImport({ ...ev, made: { year: 2023 }, evDutyQuota: true });
    assert.equal(r.duty, 0);
    assert.equal(r.vat, Math.round(25000 * EUR * 0.2));
  });

  it("the quota ends 2026-12-31", () => {
    const r = calculateCarImport({ ...ev, clearanceDate: "2027-01-10", evDutyQuota: true, evVatExemption: false });
    assert.equal(r.duty, Math.round(25000 * EUR * 0.15));
  });
});

describe("EAEU and hybrids", () => {
  it("an individual's first EAEU car of the year: no duty, no VAT, environmental tax still charged", () => {
    const r = calculateCarImport({
      importer: "personal", origin: "eaeu", fuel: "petrol", engineCc: 2000,
      made: { year: 2020 }, clearanceDate: DAY, valueAmd: 15000 * EUR, eurRate: EUR, eaeuFirstCarThisYear: true,
    });
    assert.equal(r.duty, 0);
    assert.equal(r.vat, 0);
    assert.equal(r.environmentalTax, 363699);
    assert.ok(r.warnings.includes("eaeu_first_car_environmental_tax_unconfirmed"));
  });

  it("business hybrid whose combustion engine is stronger uses the petrol table", () => {
    const r = calculateCarImport({
      importer: "business", origin: "third_country", fuel: "hybrid_petrol", engineCc: 2000, hybridIceStronger: true,
      made: { year: 2016 }, clearanceDate: DAY, valueAmd: 6000 * EUR, eurRate: EUR,
    });
    assert.deepEqual(r.dutyFormula, { kind: "perCc", eurPerCc: 2.2 });
  });

  it("customs state duty: 3,000 passenger declaration, 7,000 goods declaration, 0 from the EAEU", () => {
    const base = { fuel: "petrol" as const, engineCc: 2000, made: { year: 2020 }, clearanceDate: DAY, valueAmd: 1e6, eurRate: EUR };
    assert.equal(calculateCarImport({ ...base, importer: "personal", origin: "third_country" }).stateDuty, 3000);
    assert.equal(calculateCarImport({ ...base, importer: "business", origin: "third_country" }).stateDuty, 7000);
    assert.equal(calculateCarImport({ ...base, importer: "personal", origin: "eaeu" }).stateDuty, 0);
  });
});

describe("real-world examples: comparison is reproducible and mismatches stay recorded", () => {
  const ex = data.real_world_examples;

  it("has at least 3 independent examples with a formula comparison", () => {
    assert.ok(ex.items.filter((i) => i.test_input).length >= 3);
  });

  for (const item of ex.items) {
    if (!item.test_input) continue;
    it(`${item.id}: formula result recomputes (${item.verdict})`, () => {
      const r = calculateCarImport(item.test_input as CarImportInput);
      assert.equal(r.total, item.formula_result!.total_amd);
      assert.equal(r.duty, item.formula_result!.duty_or_unified_amd);
    });
  }

  it("2mcars cards: formula is 2.7-4.3× the published customs line (recorded mismatch)", () => {
    for (const item of ex.items.filter((i) => i.id.startsWith("2mcars"))) {
      const ratio = item.formula_result!.total_usd / item.published_amounts_usd!.customs_payments!;
      assert.equal(item.verdict, "mismatch");
      assert.ok(ratio > 2.5 && ratio < 4.5, `${item.id}: ${ratio}`);
    }
  });

  it("Sputnik/SRC 2019: unified €9,600 matches; environmental tax no longer does", () => {
    const item = ex.items.find((i) => i.id === "sputnik-2019-src-explainer")!;
    assert.equal(item.formula_result!.duty_or_unified_amd, Math.round(9600 * EUR));
    assert.equal(item.formula_result!.environmental_percent, 6); // was 10% → $500
  });

  it("Carawon: uses 15% new-car duty on a 6-year-old car; formula gives 20%", () => {
    const item = ex.items.find((i) => i.id === "carawon-camry-2020")!;
    assert.equal(Math.round(item.formula_result!.duty_or_unified_amd / USD), 2900);
    assert.notEqual(item.published_amounts_usd!.duty, 2900);
  });
});

describe("calculation_parameters agree with the sourced values", () => {
  it("unified payment tables", () => {
    const S = data.personal_use_unified_payment;
    assert.deepEqual(
      P.personal_unified.up_to_3_years.map((b) => [b.eur_to, b.percent, b.min_eur_per_cc]),
      S.up_to_3_years.value.map((b) => [b.value_eur_up_to, b.percent, b.but_not_less_than_eur_per_cc]),
    );
    assert.deepEqual(
      P.personal_unified.over_3_to_5_years.map((b) => [b.cc_to, b.eur_per_cc]),
      S.over_3_to_5_years.value.map((b) => [b.cc_up_to, b.eur_per_cc]),
    );
    assert.deepEqual(
      P.personal_unified.over_5_years.map((b) => [b.cc_to, b.eur_per_cc]),
      S.over_5_years.value.map((b) => [b.cc_up_to, b.eur_per_cc]),
    );
  });

  it("environmental tax, VAT, EV duty, state duty", () => {
    assert.deepEqual(
      P.environmental_tax.map((b) => [b.age_to, b.percent]),
      data.environmental_tax.rates.value.map((b) => [b.age_up_to_years, b.percent]),
    );
    assert.equal(P.vat_percent, data.vat.rate.value);
    assert.equal(P.tariff.electric_percent, data.tariff_duty.electric.value);
    assert.equal(P.state_duty_amd.passenger_declaration, data.fees.customs_state_duty.value.passenger_declaration);
    assert.equal(P.state_duty_amd.goods_declaration, data.fees.customs_state_duty.value.goods_declaration);
  });
});

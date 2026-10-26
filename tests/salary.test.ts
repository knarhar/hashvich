/**
 * Worked examples for the Armenian employee net-pay calculation, tax year 2026.
 *
 * Run: npm test
 *      (node --experimental-strip-types --test tests/)
 *
 * Every expected number below is worked out by hand in the comment above it,
 * using only the rules in src/data/salary-tax.json. The rules used are:
 *
 *   income tax      20% of gross (Tax Code art. 150(1), in force 2023-01-01)
 *                   The pension, stamp and health amounts do NOT reduce this base.
 *   funded pension  5% of gross where gross <= 500,000;
 *                   otherwise 10% of min(gross, 1,125,000) - 25,000
 *                   (Funded Pensions Law art. 6(2)(1) and art. 6(6);
 *                    the cap is 15 x the 75,000 minimum monthly wage)
 *   stamp payment   1,000 where gross <= 1,000,000; 15,000 above
 *                   (Stamp law art. 12(1)(1), as amended 17.12.25 by HO-477-N)
 *   health premium  0 where gross <= 200,000 (those employees are not covered
 *                   until 2027-01-01); 4,800 where 200,001-500,000 (the state
 *                   pays the other 6,000); 10,800 above 500,000
 *                   (UHI law art. 13(1), art. 46(9)(1), art. 45(1)(6))
 *
 *   net = gross - income tax - pension - stamp - health
 *
 * CAVEATS carried from the research (see `_open_questions` in the data file):
 *   - The 1,125,000 cap and the 87,500 maximum are computed from the statutory
 *     formula; the law prints the formula, not the figures.
 *   - For 2026 the law says the 4,800 health share is paid "by the tax agent".
 *     That it is withheld from the employee's pay is confirmed only by
 *     secondary sources (PwC, b24.am, hrdrone.am).
 *   - The law does not state which month's salary decides 4,800 vs 10,800;
 *     these examples assume the current month's salary from that employer.
 *   - No rounding rule was found in any of the laws, so no rounding is applied.
 *     All five examples happen to come out in whole drams.
 *   - The pension cap applies to income from all employers combined; these
 *     examples assume a single employer.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { calculateNetSalary, pensionPayment } from "../src/lib/salary.ts";
import data from "../src/data/salary-tax.json" with { type: "json" };

/** Assert every line of a result, so a wrong line names itself. */
function expectBreakdown(
  gross: number,
  expected: {
    incomeTax: number;
    pensionPayment: number;
    stampPayment: number;
    healthInsurance: number;
    net: number;
  },
  options: Parameters<typeof calculateNetSalary>[0] = { gross },
) {
  const r = calculateNetSalary({ ...options, gross });
  assert.equal(r.incomeTax, expected.incomeTax, "income tax");
  assert.equal(r.pensionPayment, expected.pensionPayment, "pension payment");
  assert.equal(r.stampPayment, expected.stampPayment, "stamp payment");
  assert.equal(r.healthInsurance, expected.healthInsurance, "health insurance");
  assert.equal(r.net, expected.net, "net");
  // The parts must add up to the whole.
  assert.equal(
    r.incomeTax + r.pensionPayment + r.stampPayment + r.healthInsurance,
    r.totalDeductions,
    "deductions sum",
  );
  assert.equal(r.gross - r.totalDeductions, r.net, "gross - deductions = net");
  return r;
}

describe("worked examples: monthly net pay, Armenia 2026", () => {
  /**
   * Example 1 — gross 150,000 AMD.
   * Below every threshold: the lowest pension band, and not yet inside the
   * health-insurance system in 2026.
   *
   *   income tax = 20% x 150,000           =  30,000
   *   pension    =  5% x 150,000           =   7,500   (150,000 <= 500,000)
   *   stamp      =                             1,000   (150,000 <= 1,000,000)
   *   health     =                                 0   (150,000 <= 200,000, covered from 2027)
   *   deductions = 30,000+7,500+1,000+0    =  38,500
   *   net        = 150,000 - 38,500        = 111,500
   */
  it("150,000 gross -> 111,500 net (below all thresholds)", () => {
    expectBreakdown(150_000, {
      incomeTax: 30_000,
      pensionPayment: 7_500,
      stampPayment: 1_000,
      healthInsurance: 0,
      net: 111_500,
    });
  });

  /**
   * Example 2 — gross 300,000 AMD.
   * Inside health insurance at the reduced employee share of 4,800.
   *
   *   income tax = 20% x 300,000           =  60,000
   *   pension    =  5% x 300,000           =  15,000
   *   stamp      =                             1,000
   *   health     =                             4,800   (200,001-500,000 band)
   *   deductions = 60,000+15,000+1,000+4,800 = 80,800
   *   net        = 300,000 - 80,800        = 219,200
   */
  it("300,000 gross -> 219,200 net (reduced health share)", () => {
    expectBreakdown(300_000, {
      incomeTax: 60_000,
      pensionPayment: 15_000,
      stampPayment: 1_000,
      healthInsurance: 4_800,
      net: 219_200,
    });
  });

  /**
   * Example 3 — gross 500,000 AMD. Boundary case.
   * The law reads "does not exceed 500,000", so 500,000 itself still takes the
   * 5% pension rate and the 4,800 health share.
   *
   *   income tax = 20% x 500,000           = 100,000
   *   pension    =  5% x 500,000           =  25,000   (inclusive boundary)
   *   stamp      =                             1,000
   *   health     =                             4,800   (up to 500,000, inclusive)
   *   deductions = 100,000+25,000+1,000+4,800 = 130,800
   *   net        = 500,000 - 130,800       = 369,200
   */
  it("500,000 gross -> 369,200 net (inclusive band boundary)", () => {
    expectBreakdown(500_000, {
      incomeTax: 100_000,
      pensionPayment: 25_000,
      stampPayment: 1_000,
      healthInsurance: 4_800,
      net: 369_200,
    });
  });

  /**
   * Example 4 — gross 800,000 AMD.
   * Second pension formula; full health premium; stamp still 1,000.
   *
   *   income tax = 20% x 800,000           = 160,000
   *   pension    = 10% x 800,000 - 25,000  =  55,000   (800,000 > 500,000, under the cap)
   *   stamp      =                             1,000   (800,000 <= 1,000,000)
   *   health     =                            10,800   (> 500,000)
   *   deductions = 160,000+55,000+1,000+10,800 = 226,800
   *   net        = 800,000 - 226,800       = 573,200
   */
  it("800,000 gross -> 573,200 net (upper pension formula)", () => {
    expectBreakdown(800_000, {
      incomeTax: 160_000,
      pensionPayment: 55_000,
      stampPayment: 1_000,
      healthInsurance: 10_800,
      net: 573_200,
    });
  });

  /**
   * Example 5 — gross 1,500,000 AMD.
   * Above the pension cap (15 x 75,000 = 1,125,000) and above the stamp threshold.
   *
   *   income tax = 20% x 1,500,000             = 300,000
   *   pension    = 10% x 1,125,000 - 25,000    =  87,500   (base capped, not 1,500,000)
   *   stamp      =                                15,000   (> 1,000,000)
   *   health     =                                10,800
   *   deductions = 300,000+87,500+15,000+10,800 = 413,300
   *   net        = 1,500,000 - 413,300         = 1,086,700
   */
  it("1,500,000 gross -> 1,086,700 net (pension cap and higher stamp band)", () => {
    expectBreakdown(1_500_000, {
      incomeTax: 300_000,
      pensionPayment: 87_500,
      stampPayment: 15_000,
      healthInsurance: 10_800,
      net: 1_086_700,
    });
  });
});

describe("band boundaries", () => {
  // At 500,001 the formula switches: 10% x 500,001 - 25,000 = 25,000.1,
  // which is a hair above the 25,000 paid at 500,000. The two bands meet
  // without a jump, which is a good check that the formula was read correctly.
  it("the pension bands meet continuously at 500,000/500,001", () => {
    assert.equal(pensionPayment(500_000), 25_000);
    assert.ok(Math.abs(pensionPayment(500_001) - 25_000) < 1);
  });

  it("the pension payment never exceeds the 87,500 cap", () => {
    for (const gross of [1_125_000, 1_125_001, 2_000_000, 10_000_000]) {
      assert.ok(
        pensionPayment(gross) <= 87_500,
        `pension at ${gross} should not exceed 87,500`,
      );
    }
    assert.equal(pensionPayment(1_125_000), 87_500);
  });

  it("the stamp payment steps from 1,000 to 15,000 above 1,000,000", () => {
    assert.equal(calculateNetSalary({ gross: 1_000_000 }).stampPayment, 1_000);
    assert.equal(calculateNetSalary({ gross: 1_000_001 }).stampPayment, 15_000);
  });

  it("the health premium steps 0 -> 4,800 -> 10,800", () => {
    assert.equal(calculateNetSalary({ gross: 200_000 }).healthInsurance, 0);
    assert.equal(calculateNetSalary({ gross: 200_001 }).healthInsurance, 4_800);
    assert.equal(calculateNetSalary({ gross: 500_000 }).healthInsurance, 4_800);
    assert.equal(calculateNetSalary({ gross: 500_001 }).healthInsurance, 10_800);
  });
});

describe("variant cases", () => {
  /**
   * An employee born before 1974 who never opted in pays no social payment.
   *   income tax = 20% x 300,000 = 60,000
   *   pension    = 0
   *   stamp      = 1,000
   *   health     = 4,800
   *   net        = 300,000 - 65,800 = 234,200
   */
  it("a non-participant pays no social payment", () => {
    expectBreakdown(
      300_000,
      {
        incomeTax: 60_000,
        pensionPayment: 0,
        stampPayment: 1_000,
        healthInsurance: 4_800,
        net: 234_200,
      },
      { gross: 300_000, pensionParticipant: false },
    );
  });

  /**
   * Qualifying R&D staff are taxed at 10% (Tax Code art. 150(1.1)).
   *   income tax = 10% x 800,000 = 80,000
   *   pension    = 10% x 800,000 - 25,000 = 55,000
   *   stamp      = 1,000
   *   health     = 10,800
   *   net        = 800,000 - 146,800 = 653,200
   */
  it("the R&D 10% rate lowers income tax only", () => {
    expectBreakdown(
      800_000,
      {
        incomeTax: 80_000,
        pensionPayment: 55_000,
        stampPayment: 1_000,
        healthInsurance: 10_800,
        net: 653_200,
      },
      { gross: 800_000, regime: "rd" },
    );
  });

  it("rejects a negative gross", () => {
    assert.throws(() => calculateNetSalary({ gross: -1 }));
  });
});

describe("the data file still says what these examples assume", () => {
  // If someone edits the data, these fail before the worked examples do,
  // which points at the cause rather than the symptom.
  const p = data.employee.calculation_parameters_2026;

  it("income tax is 20%, R&D 10%", () => {
    assert.equal(p.income_tax.standard_rate_percent, 20);
    assert.equal(p.income_tax.rd_rate_percent, 10);
  });

  it("the pension formula and cap are unchanged", () => {
    assert.equal(p.funded_pension.lower_rate_percent, 5);
    assert.equal(p.funded_pension.lower_band_max, 500_000);
    assert.equal(p.funded_pension.upper_rate_percent, 10);
    assert.equal(p.funded_pension.upper_deduction_amd, 25_000);
    assert.equal(p.funded_pension.cap_base_amd, 1_125_000);
    assert.equal(p.funded_pension.max_payment_amd, 87_500);
  });

  it("the cap is 15 x the minimum wage", () => {
    assert.equal(p.funded_pension.cap_base_amd, 15 * p.minimum_wage_amd);
    assert.equal(
      p.funded_pension.max_payment_amd,
      (p.funded_pension.cap_base_amd * p.funded_pension.upper_rate_percent) / 100 -
        p.funded_pension.upper_deduction_amd,
    );
  });

  it("every sourced value carries a source URL and an original-language quote", () => {
    let checked = 0;
    const walk = (node: unknown, path: string): void => {
      if (Array.isArray(node)) {
        node.forEach((v, i) => walk(v, `${path}[${i}]`));
        return;
      }
      if (node === null || typeof node !== "object") return;
      const o = node as Record<string, unknown>;
      if ("value" in o && "source_url" in o) {
        assert.ok(
          typeof o.source_url === "string" && o.source_url.startsWith("http"),
          `${path} needs a source_url`,
        );
        if (o.value !== null) {
          assert.ok(
            typeof o.evidence === "string" && o.evidence.length > 0,
            `${path} needs an evidence quote`,
          );
          assert.equal(o.last_verified, "2026-10-26", `${path} verification date`);
        }
        checked++;
        return;
      }
      for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`);
    };
    walk(data.employee, "employee");
    walk(data.entrepreneur, "entrepreneur");
    assert.ok(checked > 30, `expected to check many sourced values, checked ${checked}`);
  });

  it("the unsure and conflict indexes match the flags on the values", () => {
    // These counts are a tripwire: if research is revised, update them
    // deliberately rather than letting the index drift from the values.
    assert.equal(data._open_questions.count, data._open_questions.items.length);
    assert.equal(data._conflicts.count, data._conflicts.items.length);
    assert.ok(data._open_questions.count > 0, "open questions should be recorded, not hidden");
  });
});

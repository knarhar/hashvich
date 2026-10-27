/**
 * The bank comparison bound to src/data/fx-and-fees.json.
 *
 * Each bank publishes several fee rows for the same transfer (branch or
 * online, who pays the correspondent bank). The calculator compares one row
 * per bank: the online rate for a transfer from an account, the same rows
 * as the comparison table in docs/fx-and-fees-notes.md. They are picked by
 * position below, and tests/transfers.test.ts checks each pick against the
 * row's own description, so a reordered data file fails loudly.
 *
 * ADVISORY ONLY. Bank buy/sell rates are a single snapshot; the page shows
 * its date and never presents it as a live rate.
 */

import data from "../data/fx-and-fees.json" with { type: "json" };
import {
  compareBanks as coreCompare,
  transfersBreakdown as coreBreakdown,
  type BankParams,
  type Currency,
  type Fee,
  type TransferInput,
  type TransfersParams,
} from "./transfers-core.ts";
import { CBA_RATES } from "./cba-rates.ts";

export type { BankCost, Currency, Direction, TransferInput, TransfersParams } from "./transfers-core.ts";

/** Which fee row of each bank the comparison reads, by index in `fees`. */
export const FEE_ROWS: Record<string, { USD: number; EUR: number; RUB: number; receive: number }> = {
  ardshinbank: { USD: 2, EUR: 6, RUB: 11, receive: 12 },
  ameriabank: { USD: 1, EUR: 7, RUB: 11, receive: 16 },
  acba: { USD: 2, EUR: 4, RUB: 5, receive: 7 },
  amiobank: { USD: 1, EUR: 3, RUB: 5, receive: 6 },
  evocabank: { USD: 0, EUR: 3, RUB: 7, receive: 14 },
  armeconombank: { USD: 0, EUR: 3, RUB: 7, receive: 9 },
  conversebank: { USD: 1, EUR: 3, RUB: 7, receive: 8 },
  idbank: { USD: 2, EUR: 3, RUB: 8, receive: 16 },
};

type FeeRow = (typeof data.banks)[number]["fees"][number];

/** A fee row as a Fee, or null when the row publishes no amount at all. */
function toFee(row: FeeRow): Fee | null {
  const tiers = "tiers" in row && Array.isArray(row.tiers) ? (row.tiers as Fee["tiers"]) : null;
  if (row.percent === null && row.fixed === null && !tiers) return null;
  return { percent: row.percent, min: row.min, max: row.max, fixed: row.fixed, tiers };
}

const CURRENCIES: Currency[] = ["USD", "EUR", "RUB"];

/** Banks with published fees and rates. Inecobank's site could not be read. */
export const COMPARED_BANKS = data.banks.filter((b) => b.id in FEE_ROWS);
export const MISSING_BANKS = data.banks.filter((b) => !(b.id in FEE_ROWS)).map((b) => b.id);

const banks: BankParams[] = COMPARED_BANKS.map((bank) => {
  const rows = FEE_ROWS[bank.id]!;
  const cashless = (cur: Currency) => {
    const r = bank.conversion.rates_observed.find((x) => x.currency === cur && x.rate_type === "cashless");
    if (!r || r.margin_buy_pct === null || r.margin_sell_pct === null) {
      throw new Error(`${bank.id}: no cashless ${cur} rate`);
    }
    return { buy: r.margin_buy_pct, sell: r.margin_sell_pct };
  };
  return {
    id: bank.id,
    send: Object.fromEntries(CURRENCIES.map((c) => [c, toFee(bank.fees[rows[c]]!)])) as Record<Currency, Fee | null>,
    receive: toFee(bank.fees[rows.receive]!),
    margin: Object.fromEntries(CURRENCIES.map((c) => [c, cashless(c)])) as BankParams["margin"],
  };
});

/**
 * The margins were measured against the CBA rate of the capture day, so the
 * comparison uses that same rate.
 */
export const TRANSFERS_PARAMS: TransfersParams = { cba: CBA_RATES.amdPer, banks };

/** When the bank rates were captured: the date of the CBA snapshot. */
export const RATES_DATE = CBA_RATES.date;

export function compareBanks(input: TransferInput) {
  return coreCompare(TRANSFERS_PARAMS, input);
}

export function transfersBreakdown(input: TransferInput) {
  return coreBreakdown(TRANSFERS_PARAMS, input);
}

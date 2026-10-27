/**
 * What a transfer through an Armenian bank really costs: the bank's fee plus
 * the exchange margin, compared across banks. Pure functions of an explicit
 * parameter object; nothing here imports data.
 *
 * Two directions:
 *   - send: you pay drams, the bank sells you the currency at its own rate
 *     and sends it abroad by SWIFT for a fee;
 *   - receive: money arrives from abroad in a currency, the bank may charge
 *     for crediting it, and buys it from you for drams at its own rate.
 * The margin is the gap between the bank's rate and the Central Bank (CBA)
 * rate, so cost = fee + amount × CBA rate × margin.
 *
 * `src/lib/transfers.ts` binds this to src/data/fx-and-fees.json.
 */

import type { Breakdown, BreakdownLine } from "./breakdown.ts";

export type Currency = "USD" | "EUR" | "RUB";
export type Direction = "send" | "receive";

/** A fee in drams: a percentage clamped to min/max, a flat amount, or tiers. */
export interface Fee {
  percent: number | null;
  min: number | null;
  max: number | null;
  fixed: number | null;
  /** Flat fee by transfer amount, in the transfer's own currency. */
  tiers: { from?: number; up_to?: number; fee: number }[] | null;
}

export interface BankParams {
  id: string;
  /** Fee for sending each currency abroad; null when the bank does not publish it. */
  send: Record<Currency, Fee | null>;
  /** Fee for crediting an incoming transfer; null when no fee is published. */
  receive: Fee | null;
  /** Non-cash margins against the CBA rate, in percent. */
  margin: Record<Currency, { buy: number; sell: number }>;
}

export interface TransfersParams {
  /** AMD per one unit, on the day the bank rates were captured. */
  cba: Record<Currency, number>;
  banks: BankParams[];
}

export interface TransferInput {
  direction: Direction;
  currency: Currency;
  /** Amount in the transfer currency. */
  amount: number;
}

export function feeAmd(fee: Fee, amountAmd: number, amount: number): number {
  if (fee.tiers) {
    const tier = fee.tiers.find(
      (t) => (t.from === undefined || amount >= t.from) && (t.up_to === undefined || amount <= t.up_to),
    );
    return tier?.fee ?? 0;
  }
  let value = fee.percent === null ? 0 : (amountAmd * fee.percent) / 100;
  if (fee.percent !== null) {
    if (fee.min !== null) value = Math.max(value, fee.min);
    if (fee.max !== null) value = Math.min(value, fee.max);
  }
  return value + (fee.fixed ?? 0);
}

export interface BankCost {
  id: string;
  /** Null when the fee is not published; then only the margin is counted. */
  fee: number | null;
  marginPercent: number;
  marginAmd: number;
  total: number;
}

/** Every bank that publishes this transfer, cheapest first. */
export function compareBanks(params: TransfersParams, input: TransferInput): BankCost[] {
  const { direction, currency, amount } = input;
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error(`amount must be a non-negative number, got ${amount}`);
  }
  const amountAmd = amount * params.cba[currency];

  const costs: BankCost[] = [];
  for (const bank of params.banks) {
    const feeRule = direction === "send" ? bank.send[currency] : bank.receive;
    // A bank that does not publish its fee for sending cannot be compared.
    if (direction === "send" && feeRule === null) continue;
    const fee = feeRule === null ? null : Math.round(feeAmd(feeRule, amountAmd, amount));
    const marginPercent = direction === "send" ? bank.margin[currency].sell : bank.margin[currency].buy;
    const marginAmd = Math.round((amountAmd * marginPercent) / 100);
    costs.push({ id: bank.id, fee, marginPercent, marginAmd, total: (fee ?? 0) + marginAmd });
  }
  // Stable: ties keep the data file's order (by bank size).
  return costs.sort((a, b) => a.total - b.total);
}

/**
 * The comparison as a Breakdown: the amount at the CBA rate, one line per
 * bank, cheapest first. The headline is the cheapest bank's cost.
 */
export function transfersBreakdown(params: TransfersParams, input: TransferInput): Breakdown {
  const costs = compareBanks(params, input);
  const base = Math.round(input.amount * params.cba[input.currency]);
  const lines: BreakdownLine[] = costs.map((c) => ({
    key: c.id,
    amount: c.total,
    formula: { kind: "feePlusMargin", fee: c.fee, marginRate: c.marginPercent },
  }));
  const cheapest = costs[0]?.total ?? 0;
  return {
    base,
    lines,
    total: cheapest,
    result: cheapest,
    effectiveRate: base === 0 ? 0 : cheapest / base,
  };
}

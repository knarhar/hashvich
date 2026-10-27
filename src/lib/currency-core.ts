/**
 * Converting an amount between the dram and other currencies at the Central
 * Bank of Armenia (CBA) rate. Pure functions of an explicit parameter
 * object; nothing here imports data.
 *
 * The CBA publishes each currency's rate in drams, so:
 *   - into drams: amount × rate;
 *   - out of drams: amount ÷ rate;
 *   - between two other currencies: through the dram, amount × rate of the
 *     first ÷ rate of the second.
 *
 * `src/lib/currency.ts` binds this to src/data/cba-latest.json.
 */

export const AMD = "AMD";

export interface CurrencyParams {
  /** ISO date of the rates. */
  date: string;
  /** AMD per one unit of each currency. The dram itself is not listed. */
  amdPer: Record<string, number>;
}

export interface ConvertInput {
  amount: number;
  from: string;
  to: string;
}

export interface Conversion extends ConvertInput {
  result: number;
  /** Units of `to` for one unit of `from`. */
  rate: number;
  /** Units of `from` for one unit of `to`. */
  inverse: number;
  /** AMD per unit of `from` and of `to`; 1 for the dram. */
  fromAmd: number;
  toAmd: number;
}

/** AMD per one unit of a currency; 1 for the dram. */
export function amdPer(params: CurrencyParams, iso: string): number {
  if (iso === AMD) return 1;
  const rate = params.amdPer[iso];
  if (rate === undefined) throw new Error(`No CBA rate for ${iso}`);
  return rate;
}

export function convert(params: CurrencyParams, input: ConvertInput): Conversion {
  const { amount, from, to } = input;
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error(`amount must be a non-negative number, got ${amount}`);
  }
  const fromAmd = amdPer(params, from);
  const toAmd = amdPer(params, to);
  return {
    ...input,
    result: (amount * fromAmd) / toAmd,
    rate: fromAmd / toAmd,
    inverse: toAmd / fromAmd,
    fromAmd,
    toAmd,
  };
}

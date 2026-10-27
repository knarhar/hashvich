/**
 * The car import calculation bound to the real data.
 *
 * All arithmetic lives in `./car-customs-core.ts` as pure functions of a
 * parameter object; this module reads `src/data/car-customs.json`, where
 * every value carries its source and an original-language quote. The plain
 * words version of every rule is in `docs/car-customs-logic.md`.
 *
 * ADVISORY ONLY. Several inputs are flagged `unsure` in the data file
 * (`_open_questions`). Read those before relying on the output.
 */

import data from "../data/car-customs.json" with { type: "json" };
import {
  calculateCarImport as coreCalculate,
  type CarCustomsParams,
  type CarImportInput,
  type CarImportResult,
} from "./car-customs-core.ts";

export {
  environmentalPercent,
  olderThan,
  productionDate,
  roundAmd,
  tariffDutyAmd,
  unifiedPaymentEur,
} from "./car-customs-core.ts";
export type {
  CarCustomsParams,
  CarImportInput,
  CarImportResult,
  DutyFormula,
  Fuel,
  Importer,
  Origin,
} from "./car-customs-core.ts";

export const CAR_CUSTOMS_PARAMS = data.calculation_parameters as CarCustomsParams;

export function calculateCarImport(
  input: CarImportInput,
  P: CarCustomsParams = CAR_CUSTOMS_PARAMS,
): CarImportResult {
  return coreCalculate(input, P);
}

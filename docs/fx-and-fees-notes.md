# Exchange rates and transfer fees in Armenia: notes

Plain-words companion to `src/data/fx-and-fees.json`. Every number below is
copied from that file, where each one carries its source, date and an
original-language quote. Researched on **2026-10-26**.

**Advisory, not financial advice.** Banks also pass on correspondent bank
charges that none of them publish.

---

## 1. The official rate: Central Bank of Armenia (CBA)

- **What it is:** the average AMD rate formed on the currency market,
  published by the CBA for about 30 currencies. Tax and customs use it.
- **Where to get it:** the CBA's own SOAP web service,
  `https://api.cba.am/exchangerates.asmx`. No key is needed.
  `ExchangeRatesLatest` gives today's rates. The CBA itself recommends it for
  integrating into websites. `ExchangeRatesByDate` gives any past date.
- **Business days only.** On Monday 26 Oct the "previous" date was Friday
  23 Oct. For weekends and holidays, use the last published rate.
- **Units:** most rates are per 1 unit, but JPY, KZT and UZS are per 10 and
  IRR per 100. Always divide by the `Amount` field.
- **Terms of use:** none published (null in the file). Credit the CBA and
  cache the result.
- **Important for this site:** the API does not allow calls from a visitor's
  browser (no CORS; tested in Chromium). A static site has to fetch the rates
  at build time and save them into `src/data`. This is what
  `scripts/fetch-cba-rates.mjs` does: the deploy workflow runs it before every
  build and twice a day on a schedule, writing `src/data/cba-latest.json`.

Snapshot used for the margins: USD 360.88, EUR 404.11, RUB 4.4762 AMD.

## 2. Banks (eight largest by assets, plus IDBank)

The ranking is by total assets at 31 Dec 2025, from KPMG's Armenian Banking
Sector Overview. The CBA publishes only totals for the whole sector. The
order was cross-checked with the banks' own reports for 30 Sep 2026.

**Sending USD/EUR abroad by SWIFT, online, from an account** (fee in AMD):

| Bank | Fee | Note |
|---|---|---|
| Ardshinbank | 0.15%, min 7,000, max 50,000 | bank pays its correspondent; 5,000–25,000 if charges come out of the amount |
| Ameriabank | 0.15%, min 7,000, max 20,000 | charges come out of the amount |
| ACBA Bank | 0.2%, min 12,000, max 75,000 (USD) | ACBA pays its correspondent; 0.1% (3,000–40,000) if it comes out of the amount |
| AMIO Bank | 0.15%, min 7,500, max 50,000 | sender pays all charges |
| Inecobank | — | site blocked automated access |
| Evocabank | 0.15%, min 7,000, max 70,000 | sender pays; 5,000 flat if the receiver pays |
| Armeconombank | 0.15%, min 10,000, max 65,000 | sender pays; 5,000 flat if the receiver pays |
| Converse Bank | 0.1%, min 7,000, max 45,000 | sender pays |
| IDBank | 0.15%, min 10,000, max 50,000 | sender pays; 5,000 flat if charges come out of the amount |

Transfers **to Russia**:
- In RUB they cost 0.08–0.15%, with a minimum of 3,000–7,000 AMD. Ardshinbank charges a flat 2,300 AMD.
- In USD/EUR most banks charge much more or refuse. ACBA charges a minimum of
  125,000 AMD, Armeconombank 120,000 AMD; Ameriabank does not send them at all.

**Receiving** money from abroad:
- **Free or generic row:** usually free, or the tariff has only a generic
  "crediting to an account" row.
- **Armeconombank:** charges 1,500–5,000 AMD.

**Currency conversion margin.** No bank charges a separate conversion fee. The
cost is the gap between the bank's own buy/sell rate and the CBA rate:

| # | Bank | Tariff in force from | USD / EUR non-cash, buy / sell | RUB non-cash, buy / sell |
|---|---|---|---|---|
| 1 | Ardshinbank | 2025-08-14, 2026-05-08 | USD 0.66% / 0.73%; EUR 1.76% / 1.70% | 3.71% / 3.66% |
| 2 | Ameriabank | 2026-10-06 | USD 0.66% / 0.73%; EUR 1.51% / 1.95% | 2.60% / 4.11% |
| 3 | ACBA Bank | 2026-10-20 | USD 0.80% / 0.59%; EUR 1.26% / 1.21% | 2.82% / 2.32% |
| 4 | AMIO Bank | 2026-10-01 | USD 0.52% / 0.86%; EUR 1.26% / 1.95% | 3.04% / 2.54% |
| 5 | Inecobank | not stated | — | — |
| 6 | Evocabank | not stated | USD 0.66% / 0.59%; EUR 1.51% / 1.21% | 1.93% / 2.54% |
| 7 | Armeconombank | several documents, 2026-06-30 to 2026-10-28 | USD 0.80% / 0.59%; EUR 1.26% / 1.46% | 2.82% / 2.54% |
| 8 | Converse Bank | not stated | USD 0.52% / 0.59%; EUR 1.26% / 1.21% | 2.15% / 2.77% |
| 9 | IDBank | 2026-07-04, 2026-09-03 | USD 0.80% / 0.45%; EUR 1.26% / 1.46% | 3.49% / 2.54% |

"Buy" is what you lose selling currency to the bank, "sell" what you lose
buying it. The rates were captured around 22:00 Yerevan time, after business
hours. Cash rates for RUB are much wider: up to about 12% at Ardshinbank.

## 3. Transfer services

| Service | Armenia? | What we found |
|---|---|---|
| Wise | sends to AMD bank accounts; no RUB, nothing from Armenia | US→AM 1,000 USD: fee 44.57 USD (≈4.5%); IE→AM 1,000 EUR: 47.95 EUR. Wise's own rate was slightly better than the CBA rate. ⚠ The same page also says 44.91 USD. |
| Unistream | Russia → Armenia | RUB cash payout 0.95–1.95%; USD/EUR/AMD payout 0% fee but a worse rate. 100,000 RUB → AMD gave 4.2444 AMD/RUB, 5.18% below the CBA rate. |
| MoneyGram | US → Armenia (cash at ACBA, Ardshin, Evoca, IDBank and others) | fees null: shown only in the browser; terms forbid automated access |
| Western Union | not offered online to Armenia; stopped in Russia in March 2022 | null |
| KoronaPay | unclear: the EU site shows a licence-withdrawal notice | null |

## 4. How often each value changes

| Value | Likely to change |
|---|---|
| CBA official rate | every business day |
| Bank buy/sell rates and margins | several times a day: the file holds one snapshot, never use it as a rate |
| Bank transfer fees | a few times a year (ACBA's tariff is at edition 139, Ameriabank's at 52); re-check monthly |
| Transfer-service fees and rates | on every quote: they depend on amount, route, payment method and promotions |
| Bank ranking | quarterly |
| CBA API and policy | rarely |

## 5. Not settled (⚠)

- **Inecobank:** all values null; its site shows a bot check.
- **ACBA rates:** read once from the public page. That page loads its numbers
  from a path its robots.txt closes to crawlers. Never fetch it automatically.
- **Wise:** its terms forbid robots. Its two fees come from one read of the
  public page. Don't fetch it automatically.
- **Converse Bank:** its site shows the CBA rate of 23 Oct as today's. Take
  the CBA rate only from the CBA.
- **Correspondent bank charges:** published nowhere.
- The full list is in `_open_questions` and `_conflicts` in the data file.

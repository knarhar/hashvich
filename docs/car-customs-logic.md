# Importing a passenger car into Armenia: how the payments are worked out

Plain-words version of `src/lib/car-customs.ts`. Every number below comes from
`src/data/car-customs.json`, where each one carries its source and an
original-language quote. Researched and checked on **2026-10-26**.

**Advisory, not customs advice.** Customs (the SRC) sets the customs value and
can reject the price you declare. Items marked ⚠ are not fully settled; see
"Open questions" at the end.

---

## 1. First question: who is importing, and from where?

There are three different sets of rules. Which one applies decides everything
else.

| Situation | What you pay |
|---|---|
| **A person, for personal use, from outside the EAEU** (USA, Georgia, UAE, EU, China…), petrol / diesel / hybrid | one **unified payment** (it already includes VAT) + **environmental tax** |
| **A company, or a person importing commercially**, from outside the EAEU — and **every electric car**, even a person's | **customs duty** + **20% VAT** + **environmental tax** |
| **A car already cleared in another EAEU country** (Russia, Belarus, Kazakhstan, Kyrgyzstan) | **no customs duty**; 20% VAT (except a person's first car of the year) + **environmental tax** |

There is **no excise tax** on cars in Armenia: the Tax Code's list of excisable
goods (art. 87) covers alcohol, tobacco and fuels only.

## 2. How old is the car?

- Age runs from the **production date** to the **day the customs declaration is
  registered**.
- If only the year is known, the car counts as made on **1 July** of that year.
  If the year and month are known, it counts as made on the **15th**.
- Mileage does not matter.

Example: a car made "in 2021" (no month) and cleared on 26 Oct 2026 is 5 years
and almost 4 months old, so it is "over 5 years".

## 3. Converting currencies

Every euro rate (€ per cm³, € value tiers) is converted at the **Central Bank of
Armenia (CBA) rate on the day the declaration is registered** (Customs
Regulation Law art. 40). On 26 Oct 2026 that was €1 = 404.11 AMD and
$1 = 360.88 AMD.

## 4. Personal use: the unified payment

This one payment replaces both customs duty and VAT. Petrol, diesel and hybrid
cars all use the same table. Only the size of the combustion engine matters.

**Up to 3 years old:** take a percentage of the car's value, or a minimum per
cm³ of engine, **whichever is larger**.

| Car value | % of value | but not less than |
|---|---|---|
| up to €8,500 | 54% | €2.5 per cm³ |
| €8,500 – 16,700 | 48% | €3.5 per cm³ |
| €16,700 – 42,300 | 48% | €5.5 per cm³ |
| €42,300 – 84,500 | 48% | €7.5 per cm³ |
| €84,500 – 169,000 | 48% | €15 per cm³ |
| above €169,000 | 48% | €20 per cm³ |

**Older than 3 years:** the value no longer matters. You pay a flat amount per
cm³.

| Engine | over 3, up to 5 years | over 5 years |
|---|---|---|
| up to 1000 cm³ | €1.5 / cm³ | €3 / cm³ |
| 1001 – 1500 | €1.7 | €3.2 |
| 1501 – 1800 | €2.5 | €3.5 |
| 1801 – 2300 | €2.7 | €4.8 |
| 2301 – 3000 | €3 | €5 |
| above 3000 | €3.6 | €5.7 |

SRC's own examples: a 2-year-old 3000 cm³ car worth €30,000 pays **€16,500**
(3000 × 5.5 beats 48% × 30,000 = 14,400). A 7-year-old 3000 cm³ car pays
**€15,000** whatever it cost.

## 5. Commercial import: customs duty from the EAEU tariff

**Petrol cars**

| Engine | New (under 3 yrs) | Used 3–7 yrs | Over 7 yrs |
|---|---|---|---|
| up to 1000 cm³ | 15% | 20%, min €0.36/cm³ | €1.4/cm³ |
| 1001 – 1500 | 15% | 20%, min €0.4 | €1.5 |
| 1501 – 1800 | 15% | 20%, min €0.36 | €1.6 |
| 1801 – 2800 | 15% | 20%, min €0.44 | €2.2 |
| 2801 – 3000 | 12.5% | 20%, min €0.44 | €2.2 |
| above 3000 | 12.5% | 20%, min €0.8 | €3.2 |

**Diesel cars:** new 15%. Used 3–7 years: 20%, minimum €0.32 / €0.4 / €0.8 per
cm³ (up to 1500 / up to 2500 / above). Over 7 years: €1.5 / €2.2 / €3.2 per
cm³.

**Hybrids:** if the petrol or diesel engine is **more powerful** than the
electric motor's 30-minute rating, the petrol or diesel table applies.
Otherwise it is a flat **15%** at every age. ⚠ The official calculator never
asks about power and always uses 15%.

**Electric cars:** **15%** at every age.

"Min" means: take 20% of the customs value, or the € per cm³ amount, whichever
is larger.

Then **VAT = 20% × (customs value + duty).**

## 6. Electric cars in 2026

- **Duty:** 0% inside Armenia's 2026 quota, which needs a permit and runs until
  31 Dec 2026. The quota is 20,000 cars: 3,500 for dealers and 16,500 for
  everyone else. ⚠ The SRC says the non-dealer part **ran out on 10 Oct 2026**.
  The library therefore charges 15% unless you say the car is inside the quota.
- **VAT:** exempt in 2026 if the car was **produced after 31 Dec 2023**. In
  January 2026 every EV was exempt. Older EVs pay 20% VAT.
- **Environmental tax:** still due ⚠. The hybrid/EV exemption in the Tax Code
  covers only the yearly tax on registered cars, not the import tax.
- A person importing an EV does **not** get the unified payment. They pay duty
  plus VAT, as above.
- ⚠ **Draft, not law yet:** a government draft would end the EV VAT exemption
  on 1 Jan 2027 and replace it with a refund for one personal EV worth up to
  15 million AMD.

## 7. Environmental tax (everyone, every fuel)

| Age | Rate |
|---|---|
| up to 3 years | 2% |
| over 3, up to 5 | 4% |
| over 5, up to 10 | 6% |
| over 10, up to 15 | 12% |
| over 15 | 24% |

- **Base:** the customs value for cars from outside the EAEU, and the purchase
  price for cars from the EAEU.
- This scale has applied since **1 June 2024**. The SRC's 2023 FAQ still shows
  the old one (0 / 2 / 10 / 20%), which is out of date.
- ⚠ The official calculator counts age to the exact day here, as for duty. The
  2023 FAQ counts to the calendar year. We follow the calculator.

## 8. Cars from EAEU countries

- **No customs duty and no customs declaration.** Goods move freely inside the
  union.
- **VAT:** 20% of the purchase price. A private person's **first car in a tax
  year is VAT-free**. From the second car on, the import counts as commercial.
- **Environmental tax:** charged on the purchase price. ⚠ No source says
  whether a person's first car of the year is spared this too, so the library
  charges it and adds a warning.
- Pay to the **tax authority** (not customs) by the **20th of the following
  month**, with an import tax declaration.

## 9. Fees on top (not in the totals)

- **Customs state duty** for the declaration: **3,000 AMD** on a passenger
  declaration, **7,000 AMD** on a goods declaration (up to 3 t). It is doubled
  outside customs hours or locations. Cars from the EAEU have no declaration,
  so no fee.
- **Registration with the road police** (not a customs payment): registration
  5,000, certificate 6,000, standard plate 12,000 AMD.

The library returns the customs state duty separately as `stateDuty`. Like the
official calculator, it leaves it out of `total`.

## 10. Rounding

Each line is rounded to the whole dram, halves up. The **total** is rounded
once, from the unrounded lines. That is why it can be one dram different from
the sum of the rounded lines. The official calculator does the same.

---

## How we know the formula is right

**The official SRC calculator** (exim.src.am/transport) was run on 19 different
cars on 26 Oct 2026. The runs covered personal and business imports, petrol,
diesel, hybrid and electric, ages from new to 18 years, EAEU and third-country
origin, and EUR and USD prices. **The formula matches all 19 to the dram.**
`tests/car-customs.test.ts` checks every one.

**Independent examples** (brokers, press). Mismatches are reported, not
hidden:

| Source | Car | Published | Formula today | Verdict |
|---|---|---|---|---|
| impress.am (SRC, 2019) | under-3, €7,800, 2500 / 1600 cm³ | €6,250 / €4,212 | €6,250 / €4,212 | ✅ match |
| Sputnik (SRC, 2019) | 10 yrs, 2000 cm³, $5,000 | €9,600 + $500 env. | €9,600 + $300 env. | ◐ payment matches; env. tax scale has changed since |
| eDrive.am (2026) | EV rules | 15k quota, VAT rule, 15% | 20k quota, same VAT rule, 15% | ◐ quota figure outdated |
| 2mcars.am cards (undated) | Mazda CX-5 2020 2.5 | $5,300 customs | ≈ $14,600 | ❌ 2.75× |
| 2mcars.am | Kia Forte 2019 2.0 | $2,800 | ≈ $11,000 | ❌ 3.9× |
| 2mcars.am | Camry SE 2018 2.5 | $5,350 | ≈ $14,600 | ❌ 2.7× |
| 2mcars.am | Elantra 2020 2.0 | $2,600 | ≈ $11,050 | ❌ 4.25× |
| 2mcars.am | Rogue S 2018 2.5 | $3,700 | ≈ $14,400 | ❌ 3.9× |
| carawon.com | company, Camry 2020, CIF $14,500 | duty $2,175, VAT $3,335, env. $60 | duty $2,900, VAT $3,480, env. $870 | ❌ uses the new-car 15% on a 6-year-old car |
| brokers.am (2024) | rule for cars under 3 | per-cm³ minimum only | larger of % and minimum | ❌ incomplete rule |
| alkadycars.com | rule | "20% / 40% above $20k / $10k CIF" | no such thresholds | ❌ wrong |
| mycars.am | Camry 2023 | no customs line | — | unusable (placeholder figures) |

What this means:

- Figures taken from the SRC match the formula.
- Broker price cards are **undated and far below** the personal-use payment.
  Two of the cards don't even add up to their own totals, and one carries
  leftover Ukrainian text from a template.
- No independent source we found gives a dated, itemised receipt for a real
  clearance. Treat broker cards as marketing.

## Open questions (⚠)

1. **Value for individuals.** The EAEU Customs Code (art. 267) leaves transport
   and insurance out. The SRC's car page says they are included up to the
   Armenian border. This only changes cars up to 3 years old and the
   environmental tax.
2. **Environmental-tax age.** Counted by exact date (calculator) or by
   calendar year (2023 FAQ)?
3. **Hybrids, commercial import.** Which tariff line applies depends on the
   engine and motor power figures. The calculator assumes 15%.
4. **EV quota status.** Known only from a TASS report quoting the SRC.
5. **First EAEU car of the year:** is the environmental tax due?
6. **Excise from 2027:** the Tax Code amendment ՀՕ-295-Ն (from 1 Feb 2027) has
   not been read.
7. **Not modelled:** off-road vehicles, motorhomes, medical vehicles, the SRC
   reference-value list, and the 2023 temporary-import subsidy.

## Main sources

- EAEU Common Customs Tariff, group 87 (EEC, consolidated 22.01.2026)
- EEC Council Decision 107 (2017): personal-use unified rates
- EEC Council Decisions 111 (2025) and 79 (2026): EV quota
- RA Tax Code (arlis.am/hy/acts/230455): VAT arts. 61, 63, 64; excise art. 87;
  environmental tax arts. 165, 171, 172, 179
- RA Law on State Duty, arts. 19.9 and 28.2; RA Law on Customs Regulation,
  art. 40
- Government decision 171-Ն (2020): one car a year from the EAEU
- SRC car FAQ (src.am/getNews/299), SRC news 1339 / 1344 / 1696, and the SRC
  ExIm calculator

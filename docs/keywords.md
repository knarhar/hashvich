# Keyword & competitor research: Armenia calculators (hy / ru / en)

Research date (last_verified): **2026-10-26**. Tools: WebSearch + WebFetch only. No Google Keyword Planner, Yandex Wordstat, Ahrefs or Search Console data.

## Read this first: limits of this research

- **Not real Google.am / Yandex SERPs.** The search tool is a US-based web index. Its result order is a proxy for real rankings, not a copy of them. Yandex in particular may differ a lot for ru queries.
- **No "People also ask", related searches or autocomplete.** The tool never exposed them, so none are reported. Every variant is labelled either as a query that was actually run or as *derived from SERP titles* (wording copied from titles/H1s of ranking pages).
- **No search volumes.** Difficulty is a judgement from who ranks (gov sites, banks, big media, strong niche tools vs forums, thin or stale pages). Volumes come from your Wordstat pass (table at the end).
- **Armenian script works only in "extended" search mode.** In standard mode it returned junk. **Latin-script Armenian** (`ashxatavardzi hashvich`, `maqsazercum`, `dolari poxarjeq`…) returned nothing relevant anywhere. This shows the tool's index is weak, not that nobody searches that way. Check these in Google Search Console after launch.
- **The search budget ran out partway (200 searches per turn, shared).** English coverage is incomplete for 4 of 5 pages (see table). Those English sections are marked *unverified* and need a follow-up pass.
- **Rates quoted below are competitor claims, not data.** Any rate or fee in this file is quoted only as evidence about a competitor page (with its URL). None has been checked against SRC / arlis.am / CBA, so none may be used as calculator input.

### Coverage

| Page | ru queries | hy queries | en queries | Pages fetched | Status |
|---|---|---|---|---|---|
| 1. Salary | 16 | 15 | 3 (3 blocked) | 17 | en thin |
| 2. Sole proprietor / small business | 19 | 12 (2 blocked) | **0** | 19 | en built from directly fetched pages only, **unverified** |
| 3. Car customs | 24 | 17 (1 blocked) | 14 | ~25 | complete (en just under 15) |
| 4. Currency converter | 21 | 12 (2 blocked) | **0** | 16 | en built from directly fetched pages only, **unverified** |
| 5. Transfer commissions | 20 | 19 | 1 (3 blocked) | 24 (many 403/TLS failures) | en thin |

## Page map: one primary intent per page

Currency rates and transfer fees were split into two pages because they are different intents ("what is the rate" vs "what will sending cost me").

| Page | Single intent | Primary: ru | Primary: hy | Primary: en |
|---|---|---|---|---|
| 1. `salary` | Employee gross ↔ net pay after withholdings | калькулятор зарплаты Армения | աշխատավարձի հաշվիչ | armenia salary tax calculator |
| 2. `entrepreneur` | Tax owed by an ИП / ԱՁ / small business under its regime | налог ИП в Армении калькулятор | ԱՁ հարկերի հաշվիչ | armenia individual entrepreneur tax calculator *(unverified)* |
| 3. `car-customs` | Customs payments to clear a car **into** Armenia | растаможка авто в Армении калькулятор | ավտոմեքենայի մաքսազերծման հաշվիչ | armenia car customs clearance calculator |
| 4. `currency` | Convert an amount AMD ↔ USD/EUR/RUB at today's rate | конвертер драм рубль | դոլարի փոխարժեք | usd to amd *(unverified)* |
| 5. `transfers` | Total cost (fee + FX markup) of sending money to/from Armenia | перевод денег в армению комиссия | դրամական փոխանցում Ռուսաստանից Հայաստան միջնորդավճար *(provisional)* | send money to armenia fees |

### Ownership of keywords that could fit two pages

Decided during the merge, so no keyword is targeted on two pages. Three variants were removed from secondary lists for this reason: `armenia tax calculator 2026` (removed from entrepreneur), `best armenian dram exchange rate` and `dramakan poxancum rusastanic hayastan` (removed from transfers).

| Keyword / pattern | Owner | Reason |
|---|---|---|
| налоговый калькулятор армения · armenia tax calculator (2026) · հարկային հաշվիչ (no ИП/ԱՁ modifier) | **salary** ⚠️ *your call* | Ranking tools for it are salary calculators (taxravens). Entrepreneur page targets only ИП / ԱՁ / turnover / micro modifiers. |
| IT employee 10% income tax (подоходный налог айтишник 10%) | salary | Payroll withholding |
| IT / R&D turnover tax, "ИП для айтишника", "1% IT" | entrepreneur | Self-employed regime |
| Micro-enterprise's own tax · միկրոձեռնարկատիրություն | entrepreneur | Employee withholdings at a micro employer stay on salary |
| зарплата N долларов в драмах на руки | salary | Net-pay intent; links to currency |
| перевести рубли в драмы · рубли в драмы · драмы в рубли | currency | "перевести" = convert, not send |
| перевод денег в армению · перевод в армению в драмах / в долларах | transfers | Sending money; payout currency is part of the transfer |
| best armenian dram exchange rate · dramakan poxancum rusastanic hayastan | currency | SERP returned only converters (rate intent) |
| Card conversion fees (конвертация по карте, курс при оплате российской картой) | transfers | Fee/commission intent |
| курс ЦБ Армении · CBA rate | currency | Customs and entrepreneur pages embed the CBA rate but don't target it |
| растаможка авто **из** Армении (в Россию) · авто с армянским учетом · утильсбор | **none: future page** | Different calculation with strong, fresh competitors. Car page targets "в Армении / в Армению" only and adds a one-line disambiguation note. |
| ИП: commissions on receiving payments from abroad | transfers | ИП bank-account opening and tax stay on entrepreneur |
| Vacation pay, average/minimum wage stats, remittance volume stats, corporate profit tax | out of scope | Not one of the 5 intents |

## Where to start: biggest gaps (my ranking)

1. **Entrepreneur, ru + hy, calculator queries.** No ranking page in any language has a working ИП / ԱՁ regime calculator. The only one found (profin.am) has no H1, cites no sources and didn't rank. Russian results are articles with stale data under 2026 titles (iworld.com: title 2026, text "Состоянием на 2024 год"). **Low difficulty.**
2. **Car customs, ru + en.** No working Russian-language calculator for importing **into** Armenia ranks (one dealer page says "Калькулятор в разработке"). English results 1–4 for the head term are 2018 news stories. Nobody covers electric cars or hybrids, or queries by country of origin. **Low–medium**; the competition is the authority of src.am, not content quality.
3. **Transfers, ru + hy.** Every ru result is prose (visasam, sostav, Habr, DTF, brobank). None calculates the FX markup or compares providers in a table. Provider status is contradictory (Zolotaya Korona, `conflict: true`). Armenian has no comparison page at all. **ru medium, hy low** (the risk in hy is volume).
4. **Salary, ru + en.**
   - ru results: a templated multi-country site, 2019/2023 articles, Russian/Ukrainian/Kazakh calculators, a 404 (team2b.am) and a broken translation (b24.am/ru).
   - en results: EOR vendor pages, a 2021 BDO newsletter and a 404.
   - Difficulty: **low–medium**. hy is more crowded: **medium**.
5. **Currency, ru converter queries.** The top 5 are all Russian aggregators using the Bank of Russia rate, with no Armenian bank or CBA rates and no cash / non-cash split. **Medium.** The hy head terms (`դոլարի փոխարժեք`) are **high**: rate.am plus daily news posts. Target long-tail: converter + explanation, and cash vs non-cash ruble.

---

## 1. Salary calculator (gross ↔ net)

Slug: `salary`

Research date (last_verified): 2026-10-26

**Method notes (read first)**
- **Search tool:** the WebSearch tool is a US-based engine, not Google.am or Yandex. Its result order is a proxy for real SERPs, not a copy of them. Standard mode returned almost nothing relevant for Armenian-script queries (e.g. "աշխատավարձի հաշվիչ" returned US/Hong Kong/Turkey wage pages plus one spyur.am directory). Extended mode returned real Armenian results, so the hy SERPs below come from extended mode.
- **SERP features:** the tool exposes **no** "People also ask", related searches or autocomplete. Every variant below is labelled either "query run" (a query I actually tested) or "derived from SERP titles" (wording copied from titles or H1s of pages that ranked).
- **Search budget:** a shared per-turn search limit stopped searching after 34 query strings (hy 15, ru 16, en 3; see log). The last three en queries ("armenia income tax calculator 2026", "salary calculator armenia net", "take home pay armenia") returned no results, so **en coverage is thin**. I did not reach the requested 15–25 queries per language. To finish, run more queries in a follow-up session.
- **Rates:** this file only says a competitor is outdated when the evidence is quoted from a page fetched today (URL given). The quoted figures are what competitors claim. They have **not** been verified against petekamutner.am or arlis.am, so they must not be used as calculator inputs.
- **Volumes:** none. Difficulty ratings are reasoned from who ranks.

#### Language: hy

- **Primary keyword:** աշխատավարձի հաշվիչ (plus the year variant "աշխատավարձի հաշվիչ 2026", which many ranking titles use)
- **Search intent:** An employee or job-seeker in Armenia wants an online tool that turns a registered (gross) salary into take-home (net) pay, or the reverse, after all mandatory withholdings.
- **Secondary variants, grouped by intent:**
  - *calculate / tool*
    - աշխատավարձի հաշվիչ 2026 (query run; also in SERP titles: myhome.am, how2b.am, hrdrone.am)
    - աշխատավարձի հաշվարկ (derived from SERP titles: impress.am, accountant.am)
    - Աշխատավարձի հաշվիչ Հայաստան (derived from SERP titles: digischool.am, tvyal.com)
    - ashxatavardzi hashvich (Latin script; query run; returned only irrelevant results)
  - *net-from-gross / gross-from-net*
    - մաքուր աշխատավարձի հաշվարկ (derived from SERP titles: hrdrone.am, bestlogic.am)
    - մաքուր աշխատավարձ (query run as part of a longer phrase)
    - զուտ աշխատավարձ (query run; returned no Armenian results; myhome.am uses "Զուտ և գրանցված աշխատավարձ")
    - համախառն աշխատավարձի հաշվարկ (query run; SERP titles: karineghulyan / mariamonline blogs, 2021)
    - մաքուր աշխատավարձի հաշվարկ կեղտոտից (colloquial "dirty" salary; query run)
    - գրանցված աշխատավարձ (derived from SERP titles: myhome.am)
  - *rates and deductions info (year)*
    - աշխատավարձից պահումներ 2026 (query run)
    - եկամտային հարկ 2026 աշխատավարձ (query run)
    - կուտակային կենսաթոշակային վճար աշխատավարձից (query run)
    - դրոշմանիշային վճար 2026 (query run; also SERP title on accountant.am)
    - առողջության ապահովագրություն աշխատավարձից 2026 (query run as part of the stamp-duty query; news results from hetq.am, b24.am, iravaban.net, civilnet.am)
  - *specific amounts and cases*
    - ինչքան է մաքուր աշխատավարձը 500000 դրամ (query run; iravaban.net ranks with "N դրամ աշխատավարձից մաքուր …" headlines)
    - 250 000 դրամ աշխատավարձից մաքուր (derived from SERP titles: iravaban.net/574091.html, /575583.html)
    - ՏՏ աշխատավարձի հաշվիչ 10% (query run in standard mode; returned no relevant results)
- **Observed SERP features:** The tool exposed none (no PAA, related searches or autocomplete). Pattern seen in results: news and legal sites (iravaban.net, hetq.am, b24.am, azatutyun.am, civilnet.am) rank for deduction and "how much net from X" queries. Calculator sites rank for the "հաշվիչ" queries.
- **Competitors (top 5 for "աշխատավարձի հաշվիչ 2026", extended mode).** Wikipedia "2026" and avh.am (a vacation-pay calculator) were skipped as off-topic. b24.am was added because it ranked first for "աշխատավարձի հաշվիչ ՀՀ եկամտային հարկ …".

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|-----|-------|----|--------|--------------|------------|----------------------|
| 1 | https://myhome.am/hy/hashvichner/ashxatavardzi-hashvich | "Աշխատավարձի հաշվիչ 2026 \| Զուտ և գրանցված աշխատավարձ" (first line; no `<title>` in the extracted text) | Աշխատավարձի հաշվիչ | ~200 (calculator plus explanation) | Net↔gross toggle ("Մաքուր"/"Գրանցված"). Checkboxes for IT certificate and health-insurance participation. Shows income tax, social payment, stamp duty and health insurance. | Very thin text. No formulas or method. Stamp-duty section says "հետևյալ դրույքաչափերով" but lists no rates. IT rate not explained. Main purpose is real estate (a "what house can I buy" CTA). | Current: "Աշխատավարձի հաշվիչ 2026"; "2026թ. հունվարի 1-ից"; sample output includes stamp duty 1,000֏ and health insurance 4,800֏ |
| 2 | https://hrdrone.am/hy/blog/salary-calculator-armenia-2026 | Մաքուր աշխատավարձի հաշվարկ 2026․ բանաձև և օրինակներ \| HR Drone | Մաքուր աշխատավարձի հաշվարկ 2026․ բանաձև և օրինակներ | ~2,000 | Net→gross widget with a pension checkbox. Long article with formulas, worked examples and a 6-question FAQ (health insurance, pension opt-out, 2027 changes, IT 10%). | No IT 10% toggle in the widget. No gross→net input in the widget. Dates disagree (body says "as of July 2026"; metadata last_updated 2026-10-20). | Current: published "02 հուլ, 2026", last_updated "2026-10-20". Mentions the 2027 health-insurance change. |
| 3 | https://how2b.am/ashxatavardzi-hashvich-2026/ | Որքա՞ն կլինի Ձեր մաքուր աշխատավարձը 2026-ին․ Աշխատավարձի հաշվիչ 2026 - How2B | same | ~700–800 | Calculator in an iframe (net↔gross, pension participation, research 10% exemption). The article explains each deduction. | Calculator is an iframe, so its content is invisible to crawlers. No FAQ. No legal citations. Hy only. A separate 2025 page (how2b.am/ashxatavardzi-hashvich/) still ranks. | Published "25 Դեկտեմբեր, 2025"; "թարմացված է՝ համաձայն 2026 թվականի հունվարի 1-ից հետո գործող օրենսդրության". Not updated for the 2027 changes. |
| 4 | https://digischool.am/en/salary-calculator | Salary Calculator Armenia 2026 - Gross to Net - DiGi School | Salary Calculator (Armenia, 2026) | ~200–250 | Gross↔net toggle. Shows income tax, pension, stamp duty and net. Available in EN/ARM/RUS. 4-question FAQ. | The fetched page shows **no health-insurance line** and no IT option. One salary field only. No "last updated" date. Course-promotion content. | "Salary Calculator (Armenia, 2026)"; FAQ says stamp duty "simplified from December 2025". Freshness is partial (health insurance missing). |
| 5 | https://b24.am/salary-income-tax-calculator | "Աշխատավարձի Հաշվիչ • Եկամտային հարկ և այլ պարտադիր վճարներ" (first line) | Աշխատավարձի Հաշվիչ | ~500–600 | Most complete tool: gross↔net, 3 pension statuses, IT 10% toggle, health-insurance status. Links archived calculators for 2020–2025. Warns that net→gross is ambiguous near thresholds. Has an RU version. | No FAQ. No effective date shown for the current rules. News-portal clutter (tickers, calendar). Health-insurance output defaults to 0. | Mixed: page dated "23/10/2026" (FX ticker) and rule text "2023թ. հունվարի 1-ից՝ 20%". The search snippet described it as based on 2022 rules, but the live page includes the 2026 stamp duty and health-insurance bands. |

Other hy calculators seen in SERPs but not fetched: impress.am/calc/tools/wage_new, yourjob.am/salary-calculator, financeacademy.am/page/salary-calculator, hashvich.am/calculators/work/salary, triple-c.am/arm/calculators/salary, tvyal.com/wages, bestlogic.am, accountant.am, kmg.am, sites.google.com/view/armenia-salary.

- **Gaps / targets:**
  - **"աշխատավարձի հաշվիչ" without a year (standard mode):** the tool returned no Armenian page at all, a sign that Armenian-script content is poorly indexed. Confirm in Google.am.
  - **Latin-script "ashxatavardzi hashvich":** zero relevant results. how2b.am uses it only in its URL slug (/ashxatavardzi-hashvich/). Cheap to target with the slug, title variant and FAQ wording.
  - **Health-insurance withholding 2026/2027:** news sites own these queries (iravaban.net, hetq.am, b24.am). Most calculators either leave out health insurance (digischool.am page as fetched) or don't explain the 2027 change (how2b.am). A calculator plus explainer that is current through 2027 has a gap to fill.
  - **"N դրամ աշխատավարձից մաքուր" (amount queries):** iravaban.net ranks with news articles. Programmatic answers on the page for common amounts (e.g. 150k, 250k, 500k) could compete.
  - **IT / research 10% (ՏՏ):** the standard-mode query returned nothing relevant. Only b24.am and myhome.am have a toggle, and neither explains who qualifies.
  - **Outdated pages still ranking:** how2b.am 2025 page; 2021 student blogs for "համախառն աշխատավարձի հաշվարկ" (karineghulyan.wordpress.com, mariamonline.food.blog). The search summary said one used 20% plus 5%, another 20% plus 3.5% (not re-fetched).
- **Difficulty:** **Medium.** Many niche calculators (b24.am, myhome.am, how2b.am, hrdrone.am, impress.am, yourjob.am) plus bank-adjacent and news players compete, but most are thin (under 600 words or iframe-only) or have freshness gaps. No government calculator was seen ranking.
- **Verify in Yandex Wordstat / Google Keyword Planner:** աշխատավարձի հաշվիչ; աշխատավարձի հաշվիչ 2026; մաքուր աշխատավարձ; մաքուր աշխատավարձի հաշվարկ; համախառն աշխատավարձ; ashxatavardzi hashvich; ashxatavardz; aշխատավարձից պահումներ.

#### Language: ru

- **Primary keyword:** калькулятор зарплаты Армения
- **Search intent:** A Russian-speaking employee or relocant in Armenia wants to calculate net pay ("на руки") from gross, or the reverse, under Armenian payroll withholdings.
- **Secondary variants, grouped by intent:**
  - *calculate / tool*
    - калькулятор зп армения (query run)
    - калкулятор зарплаты армения (typo; query run; same SERP as the correct spelling)
    - калькулятор заработной платы Армения брутто нетто (query run)
    - Калькулятор Зарплаты: Армения (derived from SERP titles: b24.am/ru)
    - Калькулятор зарплаты в Армении (derived from SERP titles: team2b.am)
  - *net-from-gross / gross-from-net*
    - зарплата чистыми армения калькулятор (query run)
    - расчет зарплаты в Армении на руки 2026 (query run)
    - грязная и чистая зарплата армения как посчитать (query run)
    - зарплата в армении после вычета налогов (query run)
    - калькулятор зарплаты на руки (derived from SERP titles: taxravens.com/ru/armenia, "калькулятор зарплаты на руки")
  - *rates info (year)*
    - подоходный налог армения 2026 (query run)
    - сколько налог с зарплаты в армении (query run)
    - налоги с зарплаты в Армении 2026 пенсионный взнос гербовый сбор (query run)
    - накопительный пенсионный взнос армения 2026 (query run)
    - медицинское страхование армения 2026 удержание из зарплаты (query run)
  - *specific cases*
    - подоходный налог для айтишников армения 10% (query run)
- **Observed SERP features:** The tool exposed none (no PAA, related searches or autocomplete). Pattern: standard mode is dominated by multi-country or generic sites (taxravens.com), Habr articles from 2019 and fip.am. Local Armenian calculators (ameriabank.am/ru, b24.am/ru, triple-c.am, kmg.am, team2b.am) appeared only in extended mode. Foreign calculators also show up for Armenia queries: finance.ua (Ukraine), kurs.alfabank.ru and nalog-nalog.ru (Russia), tsnik.kz (Kazakhstan), toolfox.ru.
- **Competitors (top 5 calculators for the primary keyword).** In standard mode the top results were taxravens.com/ru/armenia, taxravens flat-tax-system, habr.com/en/articles/474090, fip.am/ru/37956 and habr.com/ru/post/475358. Only #1 is a calculator. The table therefore uses taxravens plus the calculators from the extended "брутто нетто" query.

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|-----|-------|----|--------|--------------|------------|----------------------|
| 1 | https://taxravens.com/ru/armenia | "Налоги в Армении 2026: калькулятор зарплаты на руки 🇦🇲" (top heading; no `<title>` extracted) | Налоги в Армении 2026 — калькулятор зарплаты | ~1,500–2,000 | Gross↔net toggle. Annual input (default 4,800,000 AMD). Output is income tax plus "social contributions" only. 9-question FAQ. | Templated "50+ countries" site. **No stamp-duty or health-insurance lines.** Internal inconsistency: sample income tax 972,000 on 4.8M (20.25%) vs a 20% table; mode labelled "Flat" but described as "прогрессивная шкала". The search snippet showed "Верхняя ставка 36%" and "Соцвзнос 4.5%", while the live page shows 20% and 5%, so the snippet is stale. | Claims "Актуально 2026", "Данные за 2026 год". The FAQ still says deadline "продлен до 1 ноября 2025". Partly stale. |
| 2 | https://ameriabank.am/ru/ashxatavardzi-hashvich | (not extracted) | Калькулятор зарплаты | ~2 words of calculator text (rest is navigation) | Per the search snippet: net↔gross with income tax and other withholdings. The calculator loads via JS, so the fetch saw no interface. | Content invisible to the fetcher (JS-rendered). No explanatory text, rates or FAQ. Strong brand (largest bank) but thin page. | Freshness unclear. The only date seen was the footer "© 2007-2023 Ameriabank". |
| 3 | https://b24.am/ru/salary-income-tax-calculator | (not extracted) | Калькулятор Зарплаты: Армения | ~400 | Same engine as the hy page: gross↔net, pension status, IT 10%, health insurance, stamp duty. | Translation flaws: mixed-script "1,125,000 դдрамов", an empty heading "Полный перевод без сокращений, в официально-деловом стиле:", typos "совподать" and "объязательна". No FAQ or examples. | Page dated "23/10/2026" (ticker). Rule text: "Начиная с 1 января 2023 г. ставка подоходного налога составляет 20%". Lists 2026 stamp-duty bands. |
| 4 | https://team2b.am/калькулятор-зарплаты/ | "Калькулятор зарплаты в Армении" (search result title) | — | — | — | **Fetch failed: HTTP 404** on 2026-10-26. The SERP is showing a dead page. | n/a (404) |
| 5 | https://triple-c.am/en/calculators/salary/ | "КАЛЬКУЛЯТОР ЗАРПЛАТЫ" (search result title); page text is English | Salary calculator | ~130 | Gross→net. Full month or worked days. Tax field: general / IT exemption / micro-enterprise. Pension Yes / Yes (voluntary) / No. Health insurance yes/no. | No net→gross. No rates or formulas. No day-count field visible. The RU title leads to English content. No FAQ. | "2026" in header, "Copyright © 2026". No rates shown to judge. |

Also seen: kmg.am/ru/hashvichner/ (calculator hub, not fetched); habr.com/ru/post/475358 (2019 IT salaries, not a calculator); fip.am/ru/37956 (May 2023 salary data, per snippet).

- **Gaps / targets:**
  - **Primary ru SERP is weak (standard mode):** one templated multi-country tool plus old Habr/fip.am articles. There is no strong, complete Russian-language local calculator. The best local one (b24.am/ru) has broken translation.
  - **Foreign calculators ranking:** "зарплата чистыми армения калькулятор" returned finance.ua (Ukraine), kurs.alfabank.ru and nalog-nalog.ru (Russia). "расчет зарплаты в Армении на руки 2026" returned tsnik.kz (Kazakhstan) and toolfox.ru. These are clear relevance gaps.
  - **Dead result:** team2b.am "Калькулятор зарплаты в Армении" returns 404.
  - **"гербовый сбор армения зарплата":** the search summary said its query returned nothing on stamp duty. An open info gap.
  - **"медицинское страхование армения 2026 удержание из зарплаты":** only news (jam-news.net, armenian-lawyer.com/ru, novayagazeta.ru) ranks. No calculator ties it into net pay in RU.
  - **"грязная/чистая зарплата армения":** colloquial phrasing. b24.am/ru ranks, but the SERP is mixed with a Belarus article (probusiness.io).
  - **"подоходный налог для айтишников армения 10%":** owned by armenian-lawyer.com/ru, whose title says "до 2025 года". Freshness looks stale (title only; page not fetched).
- **Difficulty:** **Low–medium.** Weak, generic or broken competitors and foreign calculators leaking in. Ameriabank has brand strength but a thin page.
- **Verify in Yandex Wordstat (priority):** калькулятор зарплаты армения; калькулятор зп армения; зарплата на руки армения; зарплата чистыми армения; грязная зарплата армения; подоходный налог армения; подоходный налог армения 2026; налоги с зарплаты армения; налог на зарплату в армении; пенсионный взнос армения; гербовый сбор армения; медстраховка армения зарплата; калькулятор зарплаты ереван; из чистой в грязную армения.

#### Language: en

- **Primary keyword:** armenia salary tax calculator (alternative: "armenia gross to net salary calculator")
- **Search intent:** An expat, remote hire or foreign employer wants to estimate an Armenian employee's take-home pay after income tax, pension, stamp duty and health insurance.
- **Secondary variants, grouped by intent:**
  - *calculate / tool*
    - armenia salary tax calculator (query run)
    - armenia gross to net salary calculator (query run)
    - net salary armenia calculator 2026 (query run)
    - Salary Calculator Armenia (derived from SERP titles: nativeteams.com, digischool.am)
    - Armenia Salary Calculator 2026 – Net Pay After Tax (derived from SERP titles: taxratesbycountry.com)
    - armenia payroll calculator (derived from SERP URL/title: nativeteams.com/payroll-calculator/armenia)
    - Armenia Income Tax Calculator 2026 (derived from link text on countrytaxcalc.com)
  - *net-from-gross / employer view*
    - armenia employment cost calculator (derived from SERP titles: rivermate.com)
    - payroll tax in armenia (derived from SERP titles: hellopebl.com)
  - *rates info*
    - Armenian payroll tax withholding social security (derived from SERP titles: armenian-lawyer.com)
    - how to calculate employee income tax in Armenia (derived from SERP titles: armenian-lawyer.com)
    - armenia tax guide 2026 (derived from SERP titles: countrytaxcalc.com)
  - *not run (search budget used up):* "armenia income tax calculator 2026", "salary calculator armenia net", "take home pay armenia". These should be run in a follow-up session.
- **Observed SERP features:** The tool exposed none (no PAA, related searches or autocomplete). Pattern: Employer-of-Record and payroll vendors (Rivermate, Native Teams, Ontop, Pebl, Asanify), law-firm guides (armenian-lawyer.com) and an old BDO 2021 newsletter. No Armenian local site ranked in en except digischool.am, which appeared in hy queries.
- **Competitors (top 5 for "armenia salary tax calculator", standard mode):**

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|-----|-------|----|--------|--------------|------------|----------------------|
| 1 | https://rivermate.com/guides/armenia/employment-cost-calculator | "Armenia Employer of Record - Hiring Guide for 2026" (banner; no `<title>` extracted) | Employer of Record in Armenia | ~1,700 | Employer cost calculator (annual salary input). The article covers income tax, pension, health insurance and stamp payment. | EOR sales page. Employer-cost focus, not employee net. Calculator output not rendered for the crawler. No net→gross. FAQ questions without answers. | "Last updated: October 13, 2026". Mentions health insurance (4,800 / 10,800) and stamp payment "AMD 1,000 per month for monthly income up to AMD 1,000,000". |
| 2 | https://nativeteams.com/payroll-calculator/armenia | (not extracted; first line "Salary Calculator Armenia") | Salary Calculator Armenia | ~800–900 | Gross→net only, monthly. Lead form for the "salary breakdown", so the result appears gated behind email. 7-question FAQ. | No net→gross. "Annual calculations will be available soon". Email gate. **Possibly outdated stamp duty:** page says "Military Stamp Duty (ranging from AMD 1,500 to AMD 15,000)", while hrdrone.am, how2b.am, b24.am and rivermate.com (all fetched today) state 1,000 AMD up to 1,000,000. Conflict noted, not verified against a primary source. | No year shown anywhere on the page. Freshness unclear, likely stale (see stamp-duty quote). |
| 3 | https://armenian-lawyer.com/business-immigration/armenian-payroll-tax-withholding-social-security-guide/ | "Armenian Payroll Administration: Tax Withholding, Social Security, and Mandatory Contributions" (search result title) | — | — | Guide, not a calculator (per snippet). | **Fetch failed: HTTP 404** on 2026-10-26. | n/a (404) |
| 4 | https://www.rivermate.com/guides/armenia/taxes | "Armenia Employer of Record - Hiring Guide for 2026" (first line) | Employer of Record in Armenia | ~2,000 | Same Rivermate template and employer cost calculator as #1. | Duplicate of #1. Calculator output not visible. Health-insurance timeline vague ("currently being phased in"). | "Last updated: October 13, 2026" |
| 5 | https://www.bdo.global/en-gb/microsites/tax-newsletters/ges-newsletter/january-2021-issue/armenia-changes-in-income-tax-and-social-payment-rates-as-from-1-january-2021 | ARMENIA - Changes in income tax and social payment rates as from 1 January 2021 - BDO | Changes in income tax and social payment rates as from 1 January 2021 | ~600 | Static newsletter with example tables. No calculator. | **Outdated:** "Global Employer Services Newsletter January 2021". States 2021 income tax "a flat rate of 22%" and 2021 social payment "For income up to AMD 500,000 3.5 % rate is applied". No stamp duty or health insurance. | January 2021 issue. Still ranks in 2026. |

Also fetched (next in line):
- https://www.countrytaxcalc.com/tax-guides/armenia-tax-guide/
  - Title and H1: "Armenia Tax Guide Hub 2026: Income Tax, Rates & Calculator". Body ~900–1,000 words. "Updated October 2026".
  - No embedded calculator; it links to /tax-calculator/armenia/.
  - Internal pension inconsistency: the text says 5% up to 500,000, but the worked example applies "10% × monthly salary − AMD 25,000".
- https://taxravens.com/en/armenia/salary
  - Title: "Average Salary in Armenia 2026: AMD 320,763 Gross, AMD 234,772 Net | TaxRavens". Gross→net tables only.

- **Gaps / targets:**
  - **No local, employee-focused English calculator ranks for the primary keyword.** The top 5 are EOR sales pages (employer view, gated or unrendered output), a dead 404 page and a 2021 newsletter.
  - **Net→gross in English:** none of the top 5 offers it. Only digischool.am (seen in hy SERPs) has an English gross↔net toggle.
  - **Freshness:** BDO 2021 ranks with the 2021 rates quoted above. nativeteams.com's stamp-duty range (1,500–15,000) conflicts with four other pages fetched today.
  - **2026 health insurance plus 2027 change in English:** only Rivermate and countrytaxcalc mention it, and neither gives clear dates.
- **Difficulty:** **Low–medium.** EOR vendors have strong domains but don't match intent well (employer cost, email gates). The SERP has dead or old pages. Coverage is thin because only 3 en queries ran.
- **Verify (Google Keyword Planner / Wordstat for en):** armenia salary calculator; armenia salary tax calculator; net salary armenia; armenia gross to net; armenia income tax calculator; take home pay armenia; armenia payroll calculator; yerevan salary after tax.

#### Boundary notes
- **налоговый калькулятор армения / armenia tax calculator / հարկային հաշվիչ** (ambiguous): the ru SERP (query run) showed taxravens' salary calculator first, plus mixed articles (remote-work taxes, property tax). It could also mean sole-proprietor (ИП) tax. Recommendation: the **salary** page owns the generic "калькулятор зарплаты/налог с зарплаты" variants. The bare "налоговый калькулятор армения" should go to whichever page has the stronger generic match. Flag it for a manual decision; don't target it on two pages.
- **Micro-enterprise employees:** triple-c.am's salary calculator has a "Micro-enterprises" tax-field option. Employee withholdings under a micro-enterprise employer belong to **salary**. Anything about the micro-enterprise's own tax ("միկրոձեռնարկատիրություն", "микропредприятие армения налог") belongs to **page (a) sole proprietor / small business**.
- **IT 10% / "налоги для IT армения":** employee income tax at 10% → **salary**. "IT company turnover tax 1%" / "налоги IT компании армения" → **page (a)**. The ru search summary itself noted the 1% figure refers to company turnover tax, not payroll.
- **"налоги ИП/ООО армения", "налоги в армении 2026 сотрудник ИП ООО"** (articles from vc.ru, armgate.am and armenia-friend.com ranked for the salary-tax queries) → **page (a)**. Don't target them on salary.
- **Salary in USD/RUB ("зарплата в армении в долларах", "average salary armenia usd")** → the conversion part belongs to **page (c) currency**. Average-salary statistics are not in any of the 5 pages' scope.
- **Out of scope for all 5 pages (seen in SERPs, don't target on salary):**
  - vacation pay (արձակուրդայինի հաշվիչ: avh.am, kmg.am)
  - funded pension *benefit* forecast (hartak.am "Հաշվել կուտակային կենսաթոշակը")
  - average or minimum wage statistics
- **Employer cost ("armenia employment cost calculator"):** stays with **salary** (same gross figure; hrdrone.am states gross is the employer's cost). It is a secondary variant only.

#### Queries run (log)
**hy** (15):
1. աշխատավարձի հաշվիչ (standard; rate-limited on first try, re-run OK, irrelevant results)
2. աշխատավարձի հաշվիչ մաքուր աշխատավարձ եկամտային հարկ (standard; irrelevant)
3. զուտ աշխատավարձ հաշվել 2026 (standard; irrelevant)
4. ashxatavardzi hashvich (standard; irrelevant)
5. աշխատավարձի հաշվիչ ՀՀ եկամտային հարկ սոցիալական վճար դրոշմանիշային վճար (extended)
6. մաքուր աշխատավարձի հաշվարկ կեղտոտից (extended)
7. եկամտային հարկ 2026 աշխատավարձ (extended)
8. աշխատավարձի հաշվիչ 2026 (extended; used for the competitor table)
9. կուտակային կենսաթոշակային վճար աշխատավարձից հաշվիչ (extended)
10. դրոշմանիշային վճար 2026 աշխատավարձ առողջության ապահովագրություն պահում (extended)
11. համախառն աշխատավարձի հաշվարկ մաքուրից (extended)
12. ինչքան է մաքուր աշխատավարձը 500000 դրամ (extended)
13. ՏՏ աշխատավարձի հաշվիչ 10% եկամտային հարկ (standard; irrelevant)
14. ashxatavardzi hashvich 2026 maqur ashxatavardz (standard; returned English/global pages)
15. աշխատավարձից պահումներ 2026 (extended)

**ru** (16):
1. калькулятор зарплаты Армения (standard; rate-limited on first try, re-run OK)
2. зарплата чистыми армения калькулятор (standard)
3. подоходный налог армения 2026 (standard)
4. калькулятор зп армения (standard)
5. расчет зарплаты в Армении на руки 2026 калькулятор (extended)
6. калькулятор заработной платы Армения брутто нетто (extended)
7. налоги с зарплаты в Армении 2026 пенсионный взнос гербовый сбор (extended)
8. сколько налог с зарплаты в армении (standard)
9. грязная и чистая зарплата армения как посчитать (extended)
10. медицинское страхование армения 2026 удержание из зарплаты 10800 (standard)
11. калкулятор зарплаты армения (standard; typo)
12. калькулятор зарплаты армения ameriabank (standard)
13. подоходный налог для айтишников армения 10% зарплата (standard)
14. зарплата в армении после вычета налогов (standard)
15. налоговый калькулятор армения (standard)
16. накопительный пенсионный взнос армения 2026 зарплата 5% калькулятор (standard)

**en** (3 successful, 3 blocked by the search budget):
1. armenia salary tax calculator (standard; used for the competitor table)
2. net salary armenia calculator 2026 (standard)
3. armenia gross to net salary calculator (standard)
4. armenia income tax calculator 2026 (blocked: search budget exhausted)
5. salary calculator armenia net (blocked)
6. take home pay armenia (blocked)
**Pages fetched (WebFetch, 2026-10-26):**
- myhome.am, hrdrone.am, how2b.am (2026), digischool.am/en, b24.am (hy)
- taxravens.com/ru/armenia, ameriabank.am/ru (JS-only), b24.am/ru, team2b.am (404), triple-c.am/en
- rivermate.com employment-cost-calculator, nativeteams.com, armenian-lawyer.com withholding guide (404), rivermate.com/guides/armenia/taxes, bdo.global 2021 newsletter, countrytaxcalc.com, taxravens.com/en/armenia/salary

---

## 2. Sole proprietor & small business tax calculator

Slug: `entrepreneur` · Research date: 2026-10-26 · Tools: WebSearch (US-based engine) + WebFetch.

**Method limitations (read first):**
- The WebSearch tool returns a list of result URLs plus a synthesized summary. It does **not** expose Google/Yandex "People also ask", "Related searches" or autocomplete. No SERP feature data was observed in any language. All variants below are either queries I ran or are **derived from SERP titles/H1s** of pages I saw or fetched (labelled).
- The session-wide WebSearch budget (shared with sibling agents) ran out after 31 query attempts (ru 18, of which 2 rate-limited and re-run; hy 11; 2 hy extended queries refused). **No English searches could be run.** The English section is built only from English pages fetched directly (taxravens.com, profin.am/en, armenian-lawyer.com). It needs a follow-up search pass before anyone relies on it.
- The engine is US-based. Armenian-script queries in "standard" mode returned mostly old gov.am PDFs and unrelated pages. One "extended" query (`շրջանառության հարկ 2026`) returned a realistic Armenian SERP. Real Google.am/Yandex rankings may differ.
- Rates quoted below are **what competitor pages say** (each quote has its URL). They are not verified values for our calculator. Competitor pages contradict each other on several points (see "Competitor-stated conflicts"), and the calculator's data must come from SRC/arlis primary sources.

---

#### Language: ru

- **Primary keyword:** налог ИП в Армении калькулятор (cluster head: «налоги ИП в Армении»)
- **Search intent:** Calculate how much tax an individual entrepreneur (ИП) in Armenia pays under their regime (turnover tax / micro-business / general).
- **Secondary variants, grouped by intent:**
  - *Calculate / tool:*
    - калькулятор налога ИП Армения
    - налоговый калькулятор Армения ИП
    - оборотный налог армения калькулятор
    - рассчитать налог ИП Ереван онлайн
    - калькулятор налога для ИП (Армения) *(derived from SERP title: profin.am/ru)*
    - УСН Армения ИП калькулятор
  - *Rates info (year):*
    - налоги ИП в Армении 2026 *(derived from SERP titles: iworld.com, armgate.am)*
    - налог с оборота Армения 2026 ставка
    - УСН в Армении 2026 для ИП *(derived from SERP title: armgate.am)*
    - сколько налогов платит ИП в Армении *(derived from SERP title: vc.ru)*
    - ип армения налоги сколько платить в месяц
  - *Regime comparison:*
    - ИП Армения общая система или налог с оборота что выгоднее
    - микропредприниматель армения / микробизнес Армения ИП порог
    - налоговый калькулятор армения ИП ООО сравнение режимов
    - семейный бизнес Армения налог ИП
  - *Relocant / IT (large share of ru demand):*
    - ИП в Армении для айтишника налог
    - налоги для фрилансера в Армении ИП 2026
    - открыть ИП в Армении налоги 1% IT
    - какие налоги платит ИП с IT-сертификатом в Армении *(derived from SERP: armgate.am URL slug)*
  - *Payments / reporting adjacent:*
    - соцвзносы ИП Армения 2026
    - отчетность ИП Армения налог с оборота
  - *Typo/variant forms run:* «налог ип армения», «ип в армени налоги» (typo; the engine still returned the same IE cluster)
- **Observed SERP features:** None exposed by the tool, so no PAA, related searches or autocomplete were observed. Composition seen across 18 queries: habr.com (several 2022–2026 posts and comment threads), vc.ru (2 articles), armgate.am (many docs pages), iworld.com, armenian-lawyer.com/ru, taxravens.com/ru, international.business, and pravoved.ru/kontur.ru Q&A for double-taxation queries. **No petekamutner.am / src.am page appeared in any ru SERP.**
- **Competitors (top 5 for «калькулятор налога ИП Армения», in SERP order, skipping duplicates):**

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|---|---|---|---|---|---|---|
| 1 | https://taxravens.com/ru/armenia | Not confirmed; top heading "Налоги в Армении 2026: калькулятор зарплаты на руки" | "Налоги в Армении 2026 — калькулятор зарплаты" | ~2,000 | Salary/freelancer gross↔net calculator; only a "Flat" regime is selectable | **No IE regime selector** (no turnover tax, micro-business or general regime in the tool). IE regimes are only in FAQ text ("налог с оборота 1.5-10%"). Intent is closer to the salary page | Says 2026: "Актуально 2026", "Расчёт по официальным ставкам 2026 года"; one FAQ item "обновлено декабрь 2025" |
| 2 | https://habr.com/en/articles/671052 | Not fetched | Not fetched | ? | Not fetched | Not fetched | **Fetch failed (HTTP 403)**. The search summary says it covers IE registration and the 20-day regime-choice window |
| 3 | https://habr.com/ru/post/687604 | Not fetched | Not fetched | ? | Not fetched | Not fetched | **Fetch failed (HTTP 403)** |
| 4 | https://iworld.com/ru/blog/taxes-individual-entrepreneurs-in-armenia | "Налоги ИП в Армении в 2026 году — сколько платят армянские предприниматели" | "Налоги ИП в Армении" | ~2,000 | Article with worked examples; no calculator. Ends in a sales pitch for citizenship/residence services | No tool. Year-stamped 2026 but content is stale: it states income-tax brackets "Состоянием на 2024 год" (24.4% / 26% / 36%), a turnover-tax eligibility limit "не более 58,35 млн AMD", and turnover rates 3.5% / 5% / 10% | **Outdated content under a 2026 title.** "Обновление: 19 октября 2026" but quotes "Состоянием на 2024 год" |
| 5 | https://vc.ru/migration/2643093-nalogi-dlya-ip-v-armenii | "Сколько налогов платит ИП в Армении? — Миграция на vc.ru" | "Сколько налогов платит ИП в Армении?" | ~430 | Short overview of 3 regimes (micro-business / turnover tax / general); lists rates "Пример ставок (2025 год, округлённо)" | Thin. No tool. Rates rounded ("около 10%"). Says turnover ceiling "до 120 млн драм в год", which conflicts with armgate.am's 115 000 000 | Dated "10.12.2025"; rates labelled 2025 |
| alt | https://armgate.am/taxes/usn-v-armenii-dlya-ip-ooo (top 2 for «налог ип армения» and «налог с оборота Армения 2026») | "УСН в Армении 2026: особенности для ИП/ООО, налоги, отчетность" | "УСН в Армении для ИП/ООО в 2026 году: лимиты, налоги и отчетности" | ~1,500 | Strongest ru article. Rates (1% R&D/codes, 10% others), 115M limit, 20-day application, reporting calendar | No calculator. Uses the term "УСН" for turnover tax. Lead-gen for ArmGate | "Обновлено 4 января, 2026" |
| alt | https://profin.am/ru/calculator/kalkulyator-naloga-dlya-ip/ (not seen in ru SERP; found via profin.am nav) | "Калькулятор налога для ИП - Profin Consulting" | No H1; H3 "Калькулятор налога для ИП" | ~1,000 | **The only real IE calculator found.** Regimes: micro-entrepreneurship ("0% налог с оборота"), turnover tax, general system | No H1. Did not rank in any ru query I ran. See hy section for detail | "предварительную оценку налоговой нагрузки на 2026 год" |

- **Gaps / targets:**
  - **«калькулятор налога ИП Армения» / «оборотный налог армения калькулятор» / «рассчитать налог ИП Ереван онлайн»:** No ru SERP returned a working IE-regime calculator. The tool summary said so explicitly 3 times ("не нашёл отдельного онлайн-калькулятора"). TaxRavens ranks with a salary tool, and the rest are articles. **Top target.**
  - **«ИП в Армении для айтишника налог» / «открыть ИП в Армении налоги 1% IT»:** The SERP is habr comment threads, a company-registration vendor (ybcase.com) and old posts. Pages disagree on the IT rate. A "1% IT" preset with a clear effective date would answer this better than anything ranking.
  - **«ИП Армения общая система или налог с оборота что выгоднее»:** Only articles rank (habr, vc.ru, international.business), and they quote contradictory rates. A side-by-side regime-comparison calculator fills this gap.
  - **«налоги ИП в Армении 2026»:** Ranking pages carry 2026 in the title but stale content (iworld quotes 2024 rates and a 58.35M limit). Visible "last verified" dates plus source citations are a differentiator.
  - **«семейный бизнес Армения налог ИП»:** The tool found no page on the family-business regime (summary: "Поиск не дал материалов именно о налогообложении семейного бизнеса"). This is an open niche, but whether the regime currently exists must be checked against the primary source before building it.
  - **«соцвзносы ИП Армения 2026»:** The summary said no page gives the amount. Only how2b.am (hy) and vc.ru mention 5,000 AMD/month figures.
- **Difficulty:** **Low–medium.** No government or bank pages rank. The SERP is habr (strong domain, but forum-style), vc.ru (strong domain, thin article), and lead-gen consultancies (armgate, iworld, armenian-lawyer). No ru page with a working IE calculator ranked. Domain authority of habr/vc.ru makes informational head terms ("налоги ИП в Армении") medium. Calculator-intent terms look low.
- **Verify in Yandex Wordstat:** налоги ип армения; налог ип армения калькулятор; калькулятор налога ип армения; оборотный налог армения; налог с оборота армения; ип армения налог с оборота 2026; ип в армении для айтишника; ип армения it 1%; микробизнес армения; микропредприниматель армения; ип армения общая система; ип армения соцвзносы; налоги для фрилансера в армении; ип армения ндс порог; ип в армении нерезидент налоги

---

#### Language: hy

- **Primary keyword:** ԱՁ հարկերի հաշվիչ (supporting head term: շրջանառության հարկ / շրջանառության հարկ 2026)
- **Search intent:** Calculate an individual entrepreneur's (ԱՁ) tax for 2026 under micro-business, turnover tax or the general regime.
- **Secondary variants, grouped by intent:**
  - *Calculate / tool:*
    - ԱՁ հարկերի հաշվիչ *(derived from SERP title / nav label: profin.am "ԱՁ Հարկերի հաշվիչ")*
    - ԱՁ հարկային հաշվիչ օնլայն
    - շրջանառության հարկ հաշվիչ
    - շրջանառության հարկի հաշվարկ *(query attempted; search budget exhausted)*
  - *Rates info (year):*
    - շրջանառության հարկ 2026
    - շրջանառության հարկի նոր դրույքաչափեր *(derived from SERP title: hartak.am)*
    - ԱՁ շրջանառության հարկ 10 տոկոս
    - ԱՁ հարկեր 2026 / ԱՁ հարկեր
    - ՀՀ հարկային համակարգ 2026 *(derived from SERP title: profin.am)*
    - հարկային փոփոխություններ 2025 շրջանառության հարկ *(derived from SERP title: how2b.am)*
  - *Regime comparison / regimes:*
    - միկրոձեռնարկատիրություն հարկային ռեժիմ շեմ
    - միկրոձեռնարկատիրական գործունեություն ինչպես սկսել *(derived from SERP title: armenpress.am 1253081)*
    - ընտանեկան ձեռնարկատիրություն հարկ
    - անհատ ձեռնարկատեր հարկեր
  - *Registration-adjacent:*
    - ԱՁ գրանցում հարկման ռեժիմ ընտրություն
  - *Latin-script Armenian:* «harki hashvich anhat dzernarkater» and «shrjanarutyan hark AdZ 2026» returned **only unrelated results** (Algerian "harki", Indian news). The engine does not understand Latin-script Armenian. Google behaviour is unknown, so check these in Google Search Console after launch rather than optimizing for them now.
- **Observed SERP features:** None exposed by the tool. Composition: in standard mode, mostly gov.am PDFs (2012–2016 drafts), ombuds.am, armenpress.am, azg.am and evnreport.com. In extended mode for «շրջանառության հարկ 2026»: fip.am, arlis.am (SRC order), hartak.am, finport.am, 168.am, factor.am, profin.am, how2b.am and parliament.am. One SRC PDF (src.am) appeared for «ԱՁ հարկային հաշվիչ օնլայն», but it is about tax-agent income-tax forms (off-topic).
- **Competitors (top 5 for «շրջանառության հարկ 2026», extended SERP order; #2 arlis.am skipped as a legal act, not a competitor), plus the key calculator competitor:**

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|---|---|---|---|---|---|---|
| 1 | https://fip.am/40330 | "2025-ի հարկային փոփոխությունները. ի՞նչ սպասեն քաղաքացիները - FIP.AM" | "2025-ի հարկային փոփոխությունները. ի՞նչ սպասեն քաղաքացիները" | ~1,300 | News roundup of 2025 changes (fees, transport, property tax, turnover tax: trade 10%, production 7%, catering 12%) | No tool. Broad, not IE-focused. No micro-business threshold | Published "11:44, 30 Դկտ, 2024". Rates stated as effective "2025 թ. հունվարի 1-ից"; catering outside Yerevan "2026 թ. հունվարի 1-ից" |
| 2 | https://hartak.am/news/e5015ab2-3a5f-44ce-86e5-105dc36434ab/ | "Շրջանառության հարկի նոր դրույքաչափեր հունվարի 1-ից - Ծառայությունների միասնական հարթակ" | "Շրջանառության հարկի նոր դրույքաչափեր հունվարի 1-ից" | ~230 | Short rate list by activity | Thin. Lists "Տեղեկատվական տեխնոլոգիաների ոլորտում գործունեություն՝ 5%", which conflicts with how2b.am / armgate.am (1% from 2025) | Page date "հուլիսի 01, 2026" but text says changes take effect "2025 թվականի հունվարի 1-ից". **Freshness unclear / possibly stale IT rate** |
| 3 | https://finport.am/full_news.php?id=49692&lang=1 | "Շրջանառության հարկի դրույքաչափի բարձրացում և միկրոձեռնարկատիրական համակարգի շահառուների շրջանակի նեղացում. Ֆինանսների նախարարության նախագիծ \| Finport.am" | same as title (minus site) | ~1,200 | Analysis of the Jan-2024 draft (proposed rates, deductions, minimums, micro-business exclusions) | Describes a **draft**, not enacted law. No tool | "Երկուշաբթի, 22 Հունվարի 2024" (outdated as a rates source) |
| 4 | https://168.am/2024/06/12/2058356.html | Not captured; headline "ՀՀ-ում շրջանառության հարկի դրույքաչափը կրկնակի կբարձրացվի" | "ՀՀ-ում շրջանառության հարկի դրույքաչափը կրկնակի կբարձրացվի" | ~420 body | News on NA adoption of the doubling. Says the 5% IT rate continues. Thresholds 120M / 24M | News, not evergreen. IT rate and ceiling conflict with other pages | "10:41 Հունիս 12 2024" |
| 5 | https://profin.am/hh-harkayin-hamakarg-2026/ | "ՀՀ հարկային համակարգ 2026. Ի՞նչ օրենքներ \| Պրոֆին" | "ՀՀ հարկային համակարգ 2026. Ի՞նչ օրենքներ են գործում" | ~1,800 | Overview of all regimes. Cites Tax Code art. 258 (turnover rates) and art. 150. Links to the site's ԱՁ calculator | Turnover rates given only as a "1.5%-10%" range. No thresholds | No explicit date. "© 2026"; image path "2026/03" |
| 6 (how2b) | https://how2b.am/harkayin-popoxutyunner-2025-shrjanarutyan-hark/ | "Հարկային փոփոխություններ բիզնեսների համար, որոնք ուժի մեջ են մտել 2025 թվականից - How2B" | same | ~1,100 | Best hy content: before/after table of rate, deduction and minimum per activity (IT 5% → 1%), micro-business exclusions, 5,000 + 5,000 AMD fixed payments. Links to a rate calculator on the site | Article, not a tool on this page (the linked calculator was not fetched) | "14 Հունվար, 2025"; covers 2025 rules, says nothing about 2026 |
| **Key calc competitor** | https://profin.am/calculator/adz-harkeri-hashvich/ (also /en/calculator/armenia-ie-tax-calculator-2026/ and /ru/calculator/kalkulyator-naloga-dlya-ip/) | "ԱՁ Հարկերի հաշվիչ - Profin Consulting" | **No H1**; H3 "ԱՁ Հարկերի հաշվիչ" | ~850 | Regime selector (micro 0% / turnover / general), monthly/quarterly/annual input, multiple activities, documented expenses, MHI question. Outputs turnover tax, VAT, fixed income tax, social payment, stamp duty, MHI, net income. PDF/email/share. Trilingual | No H1. No family-business regime. Per-activity rates not shown. No legal sources or effective dates. Thin explanatory content. Did **not** appear in any SERP I ran (only found via profin.am nav) | "2026 թվականի կանոնների համաձայն"; asks "2025 թ. շրջանառությունը 2.4 մլն դրամից ավելի՞ է"; no last-updated date |

- **Gaps / targets:**
  - **«ԱՁ հարկերի հաշվիչ» / «շրջանառության հարկ հաշվիչ» / «ԱՁ հարկային հաշվիչ օնլայն»:** The searches returned no calculator at all. The only hy IE calculator (profin.am) has no H1, cites no sources and did not surface. **Top target**, low competition.
  - **«շրջանառության հարկ 2026»:** The SERP is dominated by 2024 news (finport, 168.am) and a 2024-12 roundup (fip.am). Only profin gives a 2026 overview, and it has no per-activity rates. An evergreen page with a per-activity rate table (rate / deduction / minimum, sourced to art. 258) plus the calculator can win this.
  - **IT rate confusion:** hartak.am (dated 2026) and 168.am say 5% for IT, while how2b.am and armgate.am say 1% from 2025. A source-cited answer (arlis.am) is a clear content win. **Do not pick a value until verified from the primary source.**
  - **«ընտանեկան ձեռնարկատիրություն հարկ»:** Results were only 2012–2014 drafts and a 2014 azg.am mention of a "family business" status. Nothing current, so the regime may not exist today. Verify before building any page section for it.
  - **«միկրոձեռնարկատիրություն շեմ»:** armenpress has an SRC step-by-step guide (article 1253081, not fetched). Ombuds/armenpress drafts give 24M. armenian-lawyer.com (ru search summary) says a plan to raise the threshold was approved in August 2026 but not yet legislated. **Time-sensitive: a threshold change may land for 2027.**
- **Difficulty:** **Low** for calculator terms (no competing tool ranked). **Medium** for «շրջանառության հարկ 2026» informational terms (news media such as armenpress, 168.am, fip.am and finport have domain strength, and SRC/arlis may rank on Google.am even though they barely appeared here).
- **Verify in Yandex Wordstat / Google Keyword Planner (hy volume is small in Wordstat, so prefer GKP):** ԱՁ հարկեր; ԱՁ հարկերի հաշվիչ; շրջանառության հարկ; շրջանառության հարկ 2026; շրջանառության հարկի դրույքաչափ; միկրոձեռնարկատիրություն; ընտանեկան ձեռնարկատիրություն; ԱՁ շրջանառության հարկ; plus Latin forms "shrjanarutyan hark", "AdZ harker", "AJ harker"

---

#### Language: en

**No English WebSearch queries were run (search budget exhausted).** Everything below comes from directly fetched English pages. SERP order is unknown.

- **Primary keyword (proposed, unverified):** armenia individual entrepreneur tax calculator
- **Search intent:** Estimate tax as an individual entrepreneur / sole proprietor in Armenia (typically a relocant, digital nomad or freelancer) under turnover tax or micro-business.
- **Secondary variants (all derived from titles/H1s of fetched English pages, NOT from SERPs; to be validated):**
  - *Calculate / tool:*
    - armenia individual entrepreneur tax calculator *(derived: profin.am/en title "Individual Entrepreneur Tax Calculator")*
    - armenia ie tax calculator 2026 *(derived: profin.am/en URL slug)*
  - *Regime info:*
    - turnover tax armenia
    - armenia micro-business tax exemption *(derived: armenian-lawyer.com title)*
    - armenia micro business threshold
  - *Relocant / registration-adjacent:*
    - how to set up as an individual entrepreneur in armenia *(derived: armenian-lawyer.com H1)*
    - armenia digital nomad individual entrepreneur tax *(derived: same)*
    - armenia sole proprietor tax
- **Observed SERP features:** None. No English searches were run.
- **Competitors (fetched pages; ranking position unknown):**

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|---|---|---|---|---|---|---|
| 1 | https://profin.am/en/calculator/armenia-ie-tax-calculator-2026/ | "Individual Entrepreneur Tax Calculator - Profin Consulting" | No H1; H3 "Individual Entrepreneur Tax Calculator" | ~700 | IE calculator: micro (0%) / turnover / general | No H1. Thin text. No sources or effective dates | "preliminary estimate of the 2026 tax burden" |
| 2 | https://taxravens.com/armenia | "Armenia Tax Calculator 2026: Net Salary & Tax Brackets" | "Armenia Tax Calculator 2026" | ~1,900 | Salary gross↔net. "freelance income" input but no IE regime | No turnover/micro selector. Salary intent | "Up to date 2026", "2026 tax year data" |
| 3 | https://armenian-lawyer.com/business-immigration/how-to-set-up-as-an-individual-entrepreneur-digital-nomad-in-armenia/ | "How to Set Up as an Individual Entrepreneur (Digital Nomad) in Armenia - …" | "How to Set Up as an Individual Entrepreneur (Digital Nomad) in Armenia" | ~1,800 body | Registration + 3 regimes + residency guide; lead-gen | No tool. States "5% turnover tax on gross revenue", while armgate.am says 5% applied "До 2024 года включительно" | "December 20, 2025", "Updated for 2025". **Likely outdated rate** |
| 4 | https://armenian-lawyer.com/business-immigration/armenias-micro-business-tax-exemptions-and-how-to-qualify/ | "Armenia's Micro-Business Tax Exemptions: Complete 2025 Guide" | "Armenia's micro-business tax exemptions and how to qualify" | ~1,400 | Micro-business guide: threshold "AMD 24 million", exclusions, FAQs | No tool. 2025 framing | "December 20, 2025"; "as of 2025" |
| 5 | Not identified | | | | No 5th English page was fetched (no SERP available) | | |

- **Gaps / targets (tentative):** English IE content is dominated by lead-gen law firms with 2025-dated rates. The only English IE calculator (profin) has no H1 and cites no sources. "turnover tax armenia calculator" and "armenia micro business tax calculator" are likely open. **Validate with a real English SERP pass.**
- **Difficulty:** **Unknown, provisionally low–medium** (inferred from the fetched competitor set only, without a SERP).
- **Verify (Google Keyword Planner / Wordstat):** armenia individual entrepreneur tax; armenia turnover tax; turnover tax armenia calculator; armenia micro business tax; armenia sole proprietor tax; armenia IT 1% turnover tax; armenia digital nomad tax; individual entrepreneur armenia

---

#### Competitor-stated conflicts (for the data team, NOT verified values)

| Point | Claim A (URL, quote) | Claim B (URL, quote) |
|---|---|---|
| IT turnover-tax rate | how2b.am/harkayin-popoxutyunner-2025-shrjanarutyan-hark/: IT 5% → **1%** from 1 Jan 2025; armgate.am/taxes/usn-v-armenii-dlya-ip-ooo: "Процентная ставка УСН с 2025 года составляет 1%" (R&D/codes) | hartak.am/news/e5015ab2-…: "Տեղեկատվական տեխնոլոգիաների ոլորտում գործունեություն՝ 5%"; 168.am/2024/06/12/2058356.html: 5% for high-tech continues |
| Turnover-tax ceiling | armgate.am/taxes/usn-v-armenii-dlya-ip-ooo: "Лимит УСН (115 000 000)"; armenian-lawyer.com IE guide: "115M AMD" | vc.ru/migration/2643093…: "Оборот до 120 млн драм в год"; 168.am: 120 million AMD |
| "Other services" rate | armgate.am / how2b.am: 10% (from 2025) | armenian-lawyer.com IE guide: "5% turnover tax on gross revenue" (Updated for 2025); iworld.com: 5% "other" (no year) |

All of the above must be resolved from SRC / arlis.am (Tax Code art. 258 per profin.am) before the calculator ships. Mark `conflict: true` in the data file if they cannot be resolved.

---

#### Boundary notes

- **«налоги в Армении 2026» / «Armenia tax calculator 2026» (taxravens):** Generic; the ranking tools are salary calculators. **Owner: salary page (a).** The entrepreneur page should target only IE/ИП/ԱՁ/turnover/micro modifiers.
- **«ИП для релокантов IT», «ИП в Армении для айтишника налог», «налоги для фрилансера в Армении ИП»:** **Owner: entrepreneur page.** The intent is self-employed turnover tax, not employment.
- **«НДФЛ в Армении», «подоходный налог 20%», IT-employee 10% salary-tax queries (e.g. habr/ybcase "льготная ставка налога на заработные платы"):** **Owner: salary page (a).**
- **Micro-business "fixed 5,000 AMD income tax per employee":** This is employee-related, but it is regime-specific. Keep it on the entrepreneur page as a regime cost line only; general employee gross↔net stays on the salary page.
- **«ИП Армения резидент РФ двойное налогообложение»:** Informational/legal. Mainly entrepreneur (FAQ section), but not a calculator keyword. Do not target it as a primary.
- **«открыть ИП в Армении», «регистрация ИП Армения»:** Registration intent, not calculation. Mention as supporting FAQ on the entrepreneur page; no other site page owns it.
- **«ИП Армения счет в банке» / receiving payments from abroad:** **Owner: transfers page (d)** if about commissions. Entrepreneur page should only link to it.
- **«ООО Армения налог на прибыль 18%» (corporate profit tax, general regime for LLC):** Borderline. Include only "small LLC on turnover/micro" on the entrepreneur page. Pure corporate-tax queries are out of scope for all 5 pages; leave them unassigned.
- **SRC "online calculator" (arka.am 2018) result for «ԱՁ հարկային հաշվիչ օնլայն»:** This is the car customs calculator. **Owner: customs page (b).**
- **Exchange rates appearing in IE content (AMD↔USD thresholds):** **Owner: currency page (c).** The entrepreneur page should link out rather than target them.

---

#### Queries run (log)

**ru (18 attempts, 16 unique queries, all "standard"):**
1. калькулятор налога ИП Армения *(1st attempt rate-limited, re-run OK)*
2. оборотный налог армения калькулятор
3. налог ип армения
4. микропредприниматель армения
5. ИП в Армении для айтишника налог *(1st attempt rate-limited, re-run OK)*
6. налог с оборота Армения 2026 ИП ставка
7. микробизнес Армения ИП 2026 порог
8. семейный бизнес Армения налог ИП
9. УСН Армения ИП калькулятор налог 10%
10. ип армения налоги сколько платить в месяц релокант
11. ИП Армения общая система или налог с оборота что выгоднее
12. соцвзносы ИП Армения 2026 налог с оборота отчет
13. налоги для фрилансера в Армении ИП 2026
14. открыть ИП в Армении налоги 1% IT
15. рассчитать налог ИП Ереван онлайн
16. ндс армения порог ип 115 миллионов
17. налог ИП Армения резидент РФ двойное налогообложение
18. ип в армени налоги (typo)
19. налоговый калькулятор армения ИП ООО сравнение режимов

**hy (13 attempts, 11 executed):**
1. շրջանառության հարկ հաշվիչ
2. ԱՁ հարկեր 2026
3. անհատ ձեռնարկատեր հարկեր շրջանառության հարկ դրույքաչափ
4. միկրոձեռնարկատիրություն հարկային ռեժիմ շեմ
5. ԱՁ շրջանառության հարկ 10 տոկոս 2025 փոփոխություն
6. ընտանեկան ձեռնարկատիրություն հարկ
7. harki hashvich anhat dzernarkater (Latin; irrelevant results)
8. ԱՁ հարկային հաշվիչ օնլայն
9. անհատ ձեռնարկատեր հարկեր
10. ԱՁ գրանցում հարկման ռեժիմ ընտրություն փետրվարի 20
11. շրջանառության հարկ 2026 (**extended**)
12. shrjanarutyan hark AdZ 2026 (Latin; irrelevant results)
13. ԱՁ հարկեր (extended): **refused, search budget exhausted**
14. շրջանառության հարկի հաշվարկ ԱՁ (extended): **refused, search budget exhausted**

**en:** none run (budget exhausted). Pages fetched directly: taxravens.com/armenia, profin.am/en/calculator/armenia-ie-tax-calculator-2026/, armenian-lawyer.com (2 English pages).

**WebFetch log:** taxravens.com/ru/armenia ✔, habr.com/en/articles/671052 ✘ 403, habr.com/ru/post/687604 ✘ 403, iworld.com/ru/blog/taxes-individual-entrepreneurs-in-armenia ✔, vc.ru/migration/2643093-nalogi-dlya-ip-v-armenii ✔, armgate.am/taxes/usn-v-armenii-dlya-ip-ooo ✔, fip.am/40330 ✔, hartak.am/news/e5015ab2-… ✔, profin.am/hh-harkayin-hamakarg-2026/ ✔, profin.am/ (nav) ✔, finport.am/full_news.php?id=49692&lang=1 ✔, profin.am/calculator/adz-harkeri-hashvich/ ✔, 168.am/2024/06/12/2058356.html ✔, profin.am/en/calculator/armenia-ie-tax-calculator-2026/ ✔, profin.am/ru/calculator/kalkulyator-naloga-dlya-ip/ ✔, taxravens.com/armenia ✔, armenian-lawyer.com/business-immigration/how-to-set-up-as-an-individual-entrepreneur-digital-nomad-in-armenia/ ✔, how2b.am/harkayin-popoxutyunner-2025-shrjanarutyan-hark/ ✔, armenian-lawyer.com/business-immigration/armenias-micro-business-tax-exemptions-and-how-to-qualify/ ✔

---

## 3. Car import customs calculator

Slug: `car-customs` · Research date: 2026-10-26 · Researcher: Claude (WebSearch + WebFetch)

**Method caveats (read first)**
- The WebSearch tool is US-based and returns a list of result links plus a model-written summary. It does **not** expose Google/Yandex "People also ask", "Related searches" or autocomplete. Every "variant" below is either a query I ran or is **derived from SERP titles/H1s** (labelled).
- No search-volume data was available. Difficulty is a judgement from SERP composition only.
- Latin-script Armenian queries (`maqsazercum hashvich`, `maqsazercman hashvich meqena`, `maqsazercum mekena`) returned only unrelated pages (Wikipedia/Hebrew/Arabic results). This shows the tool's index is weak, **not** that nobody searches this way. Check them in Google Search Console / Yandex Wordstat later.
- The search budget ran out after 55 queries, so one planned hy query (`մաքսազերծման հաշվիչ ավտո ԱՄՆ աճուրդ`) was not run.
- No rates are stated as fact in this file. Where a competitor page states a rate, it is quoted with its URL only as evidence about that page.

---

#### Language: hy

- **Primary keyword:** `ավտոմեքենայի մաքսազերծման հաշվիչ` (close form: `մեքենայի մաքսազերծման հաշվիչ`)
- **Search intent:** Transactional/tool: estimate the customs payments (duty, VAT, environmental tax) to clear a car imported into Armenia.
- **Secondary variants (grouped by intent):**
  - *calculate / tool*
    - `մաքսազերծման հաշվիչ`
    - `մաքսային վճարների հաշվիչ ավտոմեքենա`
    - `ավտոմեքենայի ներմուծման հաշվիչ` (also the H1 on iaa.am)
    - `ավտոմեքենայի մաքսազերծման վճարի հաշվիչ` (derived from SERP titles: triple-c.am H1)
    - `ավտոմեքենաների մաքսազերծման առցանց հաշվիչ` (derived from SERP titles: pan.am)
  - *cost / how much*
    - `մեքենայի մաքսազերծման արժեքը`
    - `ինչպես հաշվարկել ավտոմեքենայի մաքսազերծման արժեքը` (derived from SERP titles: YouTube video title)
  - *rules / info (year)*
    - `մեքենայի մաքսազերծում 2026`
    - `մաքսատուրք մեքենա 2026`
    - `ավտոմեքենաների մաքսազերծում ՊԵԿ պարզաբանում` (derived from SERP titles: how2b.am)
    - `հաճախ տրվող հարցեր ավտոմեքենաների մաքսազերծման վերաբերյալ` (derived from SERP titles: src.am FAQ)
  - *by origin country*
    - `մաքսազերծում ԱՄՆ-ից մեքենա`
    - `մաքսազերծում Վրաստանից մեքենա`
    - `մեքենայի մաքսազերծում Չինաստանից`
  - *by car type (EV)*
    - `էլեկտրամոբիլի մաքսազերծում`
    - `մաքսազերծում էլեկտրական մեքենա 2026 քվոտա`
  - *Latin-script (unverified, tool returned noise)*
    - `maqsazercum hashvich`
    - `maqsazercman hashvich`
    - `maqsazercum meqena`
- **Observed SERP features:** None exposed (the tool shows no PAA, related searches or autocomplete). In the extended search a YouTube video ranked in the top 3 (`Ինչպե՞ս հաշվարկել ավտոմեքենայի մաքսազերծման արժեքը հունվարի 1-ից`). An Armenian salary-calculator page (triple-c.am) also ranked, because the same site hosts a car-customs calculator.
- **Competitors (top 5 for primary).** Source: extended search `ավտոմեքենայի մաքսազերծման հաշվիչ`, in result order. The YouTube result was skipped (not fetched).

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (with evidence) |
|---|---|---|---|---|---|---|---|
| 1 | https://www.pan.am/252501 (redirect from panarmenian.net/m/arm/news/252501) | Ավտոմեքենաների մաքսազերծման առցանց հաշվիչ կգործարկվի (PAN.am) | same as title | ~150 (body) | News item announcing that SRC will launch a calculator | No tool and no calculator link. Announcement only | Stale: "27 Փետրվար 2018 - 08:18 AMT" |
| 2 | https://src.am/am/getNews/299 | (SERP title) Հաճախ տրվող հարցեր ավտոմեքենաների մաքսազերծման վերաբերյալ | Fetcher saw only site shell: "Հայաստանի Հանրապետության Պետական եկամուտների կոմիտե" | ~400 (nav only) | Official SRC FAQ on car clearance, per the SERP title and summary | Article body not retrievable by the fetcher (JS-rendered). Not a calculator | **Freshness unclear.** Only the footer "© 2021 2020" was visible |
| 3 | https://triple-c.am/arm/calculators/car-customs | (no title captured) | Ավտոմեքենայի մաքսազերծման վճարի հաշվիչ | ~200–250 | Calculator. Inputs: individual/legal entity, release year, car value (֏/$/€), engine volume (cc). Outputs: clearance amount, environmental tax, VAT | No engine type (EV/hybrid), no EAEU vs third-country origin, no excise, no rates/legal basis, no last-updated date, Armenian only. **Same site also has a salary calculator, so it is a direct multi-calculator competitor** | Footer "Copyright © 2026". Rate freshness unclear |
| 4 | https://how2b.am/avtomeqenaneri-maqsazercum/ | Ինչ է պետք իմանալ ավտոմեքենաների մաքսազերծման վերաբերյալ. ՊԵԿ-ի պարզաբանումը | same as title | ~900 | Explainer reproducing SRC clarification: state-support programme (60%/30% shares), single customs payment by age/value/engine, environmental tax by age, with a worked example | No calculator. No EV coverage. Mostly about the temporary-import support programme | "14 Դեկտեմբեր, 2023" (about 3 years old) |
| 5 | https://iaa.am/calculators | CarMark — Ավտոմեքենայի ներմուծման հաշվիչ | Ավտոմեքենայի ներմուծման հաշվիչ | ~230 | Dealer (US auctions) calculator: auction, logistics and customs preliminary estimate. hy/ru/en | Fields and outputs not visible in fetch. Lead-gen for dealer. States final amounts may change at order confirmation | Footer "© 2026 CarMark". No rate date |
| 6 (extra) | https://www.autocomplex.am/am/calculator | AUTOCOMPLEX.AM | ՀԱՇՎԻՉ | ~550 | Dealer calculator: Copart venue, value, engine type (incl. Electric/Hybrid), age band, engine volume, body type. Outputs: auction, transport, insurance, service, and a combined "customs fee + broker" line | Duty/VAT/eco tax not itemised. Year dropdown only 2019–2021 | Stale signal: "2020 թվականից գործող ԵԱՏՄ սակագներին համապատասխան". Model years 2019–2021 only |

- **Gaps / targets:**
  - The hy calculator SERP is mostly **2018 news** (pan.am) and an **official FAQ the fetcher can't read**. Only two thin tools rank (triple-c, CarMark) and neither handles EVs or origin.
  - `էլեկտրամոբիլի մաքսազերծում` and `... 2026 քվոտա` SERPs are news only (jam-news, armenpress, azat.tv, EEC page about a 2023 benefit). No tool explains EV duty/VAT treatment. This is a strong content gap; the facts must come from SRC/EEC sources.
  - By-origin queries (`ԱՄՆ-ից`, `Վրաստանից`, `Չինաստանից`) return unrelated news (Georgian plates protests, re-export bans). No page answers them.
  - `մեքենայի մաքսազերծում 2026` / `մաքսատուրք մեքենա 2026` return no Armenian 2026 page at all. A dated "2026 rates" block would have no competition in this index.
  - how2b.am (Dec 2023) is the best explainer but has no calculator.
- **Difficulty:** **Low–medium.** The SERP has few real tools, mostly news. The official src.am/exim.src.am pages carry authority, though, and Google may favour them for navigational "ՊԵԿ հաշվիչ" queries.
- **Verify in Yandex Wordstat / GSC:** `մաքսազերծման հաշվիչ`, `ավտոմեքենայի մաքսազերծման հաշվիչ`, `մեքենայի մաքսազերծում`, `էլեկտրամոբիլի մաքսազերծում`, `maqsazercum`, `maqsazercman hashvich` (Latin-script volume is unknown).

---

#### Language: ru

- **Primary keyword:** `растаможка авто в Армении калькулятор`
- **Search intent:** Transactional/tool: calculate customs payments to clear a car **into Armenia**. The SERP is split with the Armenia→Russia intent; see Boundary notes.
- **Secondary variants (grouped by intent):**
  - *calculate / tool*
    - `калькулятор растаможки автомобиля Армения`
    - `калькулятор таможенных платежей Армения автомобиль`
    - `онлайн-калькулятор растаможки автомобилей Армения` (derived from SERP titles: arka.am "В Армении появился онлайн-калькулятор растаможки автомобилей")
  - *cost*
    - `сколько стоит растаможить машину в Армении`
    - `растаможка машины в Ереване цена`
    - `пошлина на авто Армения`
    - `таможенная пошлина на ввоз автомобиля в Армению`
    - `ввоз авто в Армению пошлина НДС экологический налог`
  - *rules / info (year)*
    - `растаможка в Армении 2026`
    - `растаможка в Армении 2025 новые правила авто`
    - `ввоз автомобиля в Армению физическим лицом таможенные платежи`
    - `часто задаваемые вопросы о таможенном оформлении автомобилей` (derived from SERP titles: src.am/ru/getNews/299)
  - *by origin country*
    - `растаможка авто в Армении из США`
    - `растаможка авто из Грузии в Армению`
    - `растаможка авто из ОАЭ в Армению`
    - `растаможка авто из Китая в Армению`
    - `растаможка авто из Европы в Армению`
  - *by car type*
    - `растаможка электромобиля в Армении`
    - `растаможка гибрида в Армении`
  - *misspellings (ran; SERP identical to correct spelling)*
    - `растоможка армения`
    - `расстаможка авто армения`
- **Observed SERP features:** None exposed (no PAA, related searches or autocomplete from the tool). Observed composition: almost every ru query, even ones explicitly about import **into** Armenia, is dominated by **Armenia→Russia** pages: ucsol.ru, ppt.ru, auto.ru, kolesa.ru, autonews.ru, pravoved.ru, plus Kazakhstan pages (kgd.gov.kz, zakon.kz, kolesa.kz). App Store calculator apps (Koliq, РастаможкаАвто) also appear.
- **Competitors (top 5 for primary).** Source: extended search `растаможка авто в армении калькулятор`, in result order.

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (with evidence) |
|---|---|---|---|---|---|---|---|
| 1 | https://src.am/ru/getNews/299 | (SERP title) Часто задаваемые вопросы о таможенном оформлении автомобилей | Fetcher saw only site shell: "КОМИТЕТ ГОСУДАРСТВЕННЫХ ДОХОДОВ РЕСПУБЛИКИ АРМЕНИЯ" | ~400–500 (nav only) | Official SRC FAQ (per SERP title and summary, which mentions the 60%/30% state-support programme) | Body not retrievable by the fetcher (JS-rendered). Not a calculator | **Freshness unclear.** Only the footer "© 2021 2020" was visible |
| 2 | https://arka.am/news/business/v_armenii_poyavilsya_onlayn_kalkulyator_rastamozhki_avtomobiley/ | (SERP title) В Армении появился онлайн-калькулятор растаможки автомобилей | n/a | n/a | News about the SRC calculator; the search summary cites petekamutner.am/csOS_VehiclesCustomsValue.aspx | **Fetch failed: HTTP 403.** News item, not a tool | Not verified (403). The EN sister articles (iravaban, finport) are dated April 2018 |
| 3 | https://ucsol.ru/rastamozhka/avto/kalkulyator-rastamozhki-avto | Калькулятор растаможки Авто - расчет необходимых таможенных платежей при ввозе авто из-за границы: из Европы, США, Китая, Японии | Калькулятор растаможки автомобилей | ~3,000 (incl. nav) | **Russia** import reference/calculator (duty, excise, VAT for EV, util fee, customs fee) | Wrong country for us. Explicitly excludes Armenia: "Калькулятор не предназначен для расчёта затрат за ввоз автомобилей из стран ЕАЭС:" | Page stamp "26.10.2026". Util-fee table "C 01.01.2026 по 31.12.2026", but excise table "с 01.01.2025 по 31.12.2025" and "Таможенный сбор … в 2024-2025" (mixed freshness) |
| 4 | https://america-auto.com/calculator-rastamojka-auto | Калькулятор растаможки автомобиля стран ЕАЭС | Калькулятор растаможки | ~650 | Dealer page. Describes a calculator for import **into Armenia** (VAT paid in Armenia, eco-fee, broker in Gyumri, shipping to Poti/Batumi) | **Calculator not live:** "Калькулятор в разработке" / "скоро, ожидайте". No rates | Footer "© 2021-2026". Latest news 13.09.2026 |
| 5 | https://ncars.group/calc | Калькулятор растаможки автомобилей из Китая, Кореи, Японии онлайн - NCars | Калькулятор | ~900 | **Russia** import calculator (Korea/China/Japan origin) | Wrong country. Result area rendered "NaN" in fetch | "© 2023 - 2025 NCARS". Methodology cites "Единые ставки 2017 года и Единый таможенный тариф 2012 года" |
| extra | https://terminalzm.ru/rastamozhka-avto/armeniya/ | Растаможка авто из Армении > калькулятор для армянской машины | Растаможка авто из Армении | ~4,000 | Armenia→**Russia** calculator (duty, excise, VAT, util fee, years 2025–2030) | Re-export intent, not ours | "Текущие ставки таможенных сборов действуют с 1 января 2026 года" |
| extra | https://auto-rul.ru/armenia-calc-rastamogka | Авто из Армении в Россию: стоимость оформления и калькулятор | Расходы на ввоз автомобиля из Армении в Россию | ~1,500 | Armenia→**Russia** calculator. Also links to a separate calculator for import into Armenia | Re-export intent | "Проверено 2026-10-19" |

- **Gaps / targets:**
  - **Biggest gap of the three languages:** no working Russian-language calculator for import **into** Armenia ranks. #1 is a JS-only official FAQ, #2 a 2018-era news item (403), #4 a dealer "coming soon" stub, and #3 and #5 are for Russia.
  - By-origin queries (`из США / Грузии / ОАЭ / Китая / Европы в Армению`) return only Russia/Kazakhstan pages or 2015–2021 news. There is no direct answer.
  - `растаможка электромобиля в Армении` / `гибрида`: SERP is about the **Russia ban on EAEU-cleared EVs** (ucsol.ru) plus news (tks.ru, Aug 2026, EV quota). No calculator handles the Armenian EV treatment.
  - `растаможка в Армении 2026` returned no relevant Armenian car page. A dated "2026" page has a clear opening.
- **Difficulty:** **Medium.** It is low for the into-Armenia intent itself (thin SERP, no proper tool), but strong Russian auto/legal domains (auto.ru, autonews.ru, ppt.ru, ucsol.ru) occupy the SERP for the ambiguous head terms. Google/Yandex may keep reading `растаможка авто армения` as the Russia intent.
- **Verify in Yandex Wordstat:** `растаможка авто в армении`, `растаможка в армении калькулятор`, `растаможка армения 2026`, `растоможка армения`, `расстаможка армения`, `пошлина на авто армения`, `растаможка авто из сша в армению`, `растаможка авто из грузии в армению`, `растаможка электромобиля армения`, `растаможка авто из армении в россию` (to size the competing intent), `авто с армянским учетом`.

---

#### Language: en

- **Primary keyword:** `armenia car customs clearance calculator` (close variants: `armenia car import duty calculator`, `armenia car customs calculator`)
- **Search intent:** Transactional/tool: estimate duty, VAT, environmental tax and fees for importing a car into Armenia.
- **Secondary variants (grouped by intent):**
  - *calculate / tool*
    - `armenia car import duty calculator`
    - `armenia car customs calculator`
    - `armenia vehicle import tax environmental tax VAT calculator`
    - `vehicle customs duty calculator armenia` (derived from SERP titles: src.am "Vehicle customs duty calculator")
    - `calculate vehicle customs duty armenia` (derived from SERP titles: hartak.am)
    - `copart car to armenia customs clearance calculator`
  - *cost / how much*
    - `customs clearance car armenia cost`
    - `how much is customs for a car in armenia`
    - `armenia customs duty used cars 2026`
  - *how-to*
    - `how to import a car to armenia`
    - `how to import a car from abroad and clear customs` (derived from SERP titles: hartak.am guide)
  - *by origin country*
    - `import car from USA to Armenia customs duty`
    - `import car to armenia from georgia customs`
    - `import car from dubai to armenia customs`
  - *by car type (EV)*
    - `armenia electric car import duty 2026`
    - `armenia customs duty electric vehicle calculator VAT exemption`
- **Observed SERP features:** None exposed. Composition: news (arka.am, armenpress, iravaban, finport, civilnet, eurasianet, hetq), official SRC tools (src.am, exim.src.am), the government gateway (hartak.am), dealer calculators (autodealer.am, iaa.am, usamotors.am) and shipping brokers (a1autotransport, easyship).
- **Competitors (top 5 for primary).** Source: extended search `armenia car customs clearance calculator`, in result order.

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (with evidence) |
|---|---|---|---|---|---|---|---|
| 1 | https://arka.am/en/news/business/online_calculator_for_car_customs_clearance_appears_in_armenia_/ | (SERP title) Online calculator for car customs clearance appears in Armenia | n/a | n/a | News on the 2018 SRC calculator launch | **Fetch failed: HTTP 403.** Not a tool | Not verified. Same story elsewhere is dated April 2018 |
| 2 | https://iravaban.net/en/186824.html | The On-Line Custom Calculator for Cars on the SRC Website has been launched | same | ~150 | News: SRC calculator on petekamutner.am e-Services (brand, year, engine power → duty, env. charges, VAT) | Not a tool | "2018-04-10 / 17 59" |
| 3 | https://finport.am/full_news.php?id=34287&lang=3 | In Armenia, an online service has been activated that allows calculating the cost of customs clearance of a car \| Finport.am | same | ~150 | News, same story | Not a tool | "Wednesday, April 11 2018 11:25" |
| 4 | https://armenpress.am/en/article/924036 | Online customs value calculator for imported vehicles to be introduced soon - ARMENPRESS Armenian News Agency | Online customs value calculator for imported vehicles to be introduced soon | ~100 | Pre-launch announcement | Not a tool | "13:07, 26 February 2018" |
| 5 | https://www.src.am/en/showVehiclesSearchPage/114 | (SERP title) Vehicle customs duty calculator | Fetcher saw "STATE REVENUE COMMITTEE OF THE REPUBLIC OF ARMENIA" (site shell) | ~450–550 (nav) | Official SRC vehicle calculator (JS-rendered; no form captured by the fetcher). Search summary says it covers non-EAEU imports at rates in force since 2020 and gives a rough figure | Form not visible to the fetcher, so inputs can't be verified. Search summary says it's approximate | Footer "© 2021 2020". Freshness unclear |
| extra | https://www.autodealer.am/en/calculator | Import duty calculator — Armenia \| AutoDealer | Import duty calculator | ~200–250 | Calculator: engine type (petrol/diesel/LPG/**Electric**/3 hybrid types), volume, off-road flag, year 1990–2026, month, price + transport + other costs (USD/EUR/RUB/AMD) | No origin input, no individual/business toggle, no methodology/sources, no disclaimer | Fresh: "CBA exchange rates · 23.10.2026", years to 2026, "© 2026". Rate-table date not shown |
| extra | https://calculator.uic.am/?hl=en | EAEU customs rate calculator - Union of Informed Citizens | (no H1; H4) Customs rate calculator for lightweight passenger cars imported from third countries by individuals | ~200–250 | Calculator: engine type incl. hybrids/Electric, ICE vs e-motor power, cc, year, customs value (AMD/USD/EUR) → value, duty, VAT, environmental fee, total. Cites arlis.am, EEC tariff, cba.am | Year dropdown stops at 2020. No origin selector | Stale: "Customs rates effective from 1 January 2020", "Copyright © 2019" |
| extra | https://exim.src.am/en/transport | (H1) Calculator of import duty for passenger vehicles (HS Code 8703) | same | ~650 | **Official SRC calculator.** Inputs: purpose, origin (third country / EAEU per notes), vehicle designation, engine type, volume, year, month, acquisition cost, other expenses, exemption checkboxes. Outputs: duty, VAT, excise, environmental tax, anti-dumping, state duty, total (AMD at CBA rate) | Dense legal notes, no explanation for laypeople, no step-by-step breakdown or examples | "© 2026". Menu item "Personal calculator until 31.08.2026" (suggests a rules change for personal imports after that date; verify). Cites RA Gov. Decision 171-N (13.02.2020), EEC Council Decision No. 80 (14.09.2021) |
| extra | https://english.hartak.am/guides/car-customs-clearance | How to Import a Car from Abroad and Clear Customs? - National Services Gateway | How to Import a Car from Abroad and Clear Customs? | ~1,100 | Government gateway guide (steps, documents, payments) with links to SRC calculators for individuals and legal entities | No numeric duty/VAT rates. EVs not mentioned | "© 2026" footer only. Its linked customs-value file is named "tq_auto_customs_value_nov_2023" |

- **Does the official customs/SRC site have its own calculator? Yes, several:**
  - exim.src.am/en/transport (HS 8703 vehicle calculator; personal and business variants). This is the current, most complete official tool.
  - src.am/en/showVehiclesSearchPage/114 ("Vehicle customs duty calculator", JS-rendered).
  - The 2018 tool on petekamutner.am (`csOS_VehiclesCustomsValue.aspx`): **fetch failed (ECONNREFUSED)**; status unknown.
  - hartak.am links to SRC calculators for individuals and legal entities.
- **Gaps / targets:**
  - Positions 1–4 for the head term are **2018 news articles**. The SERP is very weak for a modern, explained calculator.
  - Official tools are accurate but unfriendly. They have no plain-English explanation, no worked examples and no EV guidance on the page, and they are JS-heavy (some can't be crawled).
  - `armenia electric car import duty 2026`: only news (arka.am, armenpress, arkatelecom) on the EV quota and VAT exemption. No calculator explains it, so it is a strong target for a tool with an EV mode, fed by facts verified from SRC/EEC pages.
  - Origin queries (`from USA / Georgia / Dubai`) are served by shipping brokers and 2015–2021 news (one broker gives a single flat percentage with no official source). Good long-tail targets.
  - `armenia customs duty used cars 2026` returned no current page.
- **Difficulty:** **Low–medium.** The SERP is mostly stale news plus official tools. The main competition is authority (src.am, hartak.am), not content quality.
- **Verify in Yandex Wordstat / Google Keyword Planner:** `armenia car import duty calculator`, `armenia car customs calculator`, `import car to armenia`, `armenia electric car import duty`, `customs clearance armenia car`, `ship car from usa to armenia customs`.

---

#### Boundary notes

- **Into Armenia vs Armenia→Russia (re-export).** Most ru queries that contain "Армения" (`растаможка авто из Армении`, `растоможка армения`, `расстаможка авто армения`, `пошлина на авто армения`, `машина на армянском учете растаможка в РФ`) return **Armenia→Russia** (or →Kazakhstan) pages: ucsol.ru, terminalzm.ru, auto-rul.ru, ppt.ru, auto.ru, autonews.ru, kp.ru, auto.mail.ru, sravni.ru. That intent is a different calculation: Russian util fee, ЕТТ duty difference, СБКТС/ЭПТС, Russian customs fee, and the Russian ban on EAEU-cleared EVs (per ucsol.ru news). It also has its own strong, fresh competitors (terminalzm "с 1 января 2026 года", auto-rul "Проверено 2026-10-19").
  - **Recommendation:** this page (`car-customs`) targets **import INTO Armenia only** in all three languages. Do **not** target `растаможка авто из Армении (в Россию)`, `авто с армянским учетом`, `утильсбор из Армении`. Record them as a **separate future page** (e.g. `armenia-to-russia-car`) if Wordstat shows meaningful volume. On this page, add a short disambiguation note ("If you're moving a car from Armenia to Russia, that is a different calculation") without targeting those keywords.
  - The ambiguous head term `растаможка авто армения` (no preposition) is SERP-dominated by the Russia intent. Target the explicit forms `растаможка авто **в** Армении` / `**в** Армению`.
- **Currency converter page:** keep `курс ЦБ / CBA exchange rate`, `dollar to dram` out of this page. Use the CBA rate only inside the calculator.
- **Salary / ИП pages:** no keyword overlap found. Note that triple-c.am ranks for both salary and car-customs calculators (a sitewide competitor).
- **Money transfer page:** no overlap. Shipping/auction-payment queries (`оплата аукциона Copart из Армении`) were not researched and should not be assigned here.
- **Temporary import / foreign plates** (Georgian-plated cars, the state-support 60%/30% programme for temporarily imported cars) fits this page as a sub-section, not a separate keyword target.

#### Queries run (log)

All "standard" unless marked (ext). 55 queries run in total; one more planned query was blocked by the search budget.

**ru (24):**
1. растаможка авто в армении калькулятор
2. растаможка в армении 2026
3. растоможка армения
4. пошлина на авто армения
5. калькулятор растаможки автомобиля Армения
6. растаможка авто в Армении из США стоимость
7. таможенная пошлина на ввоз автомобиля в Армению
8. растаможка электромобиля в Армении
9. растаможка авто из Грузии в Армению
10. калькулятор растаможки авто из Армении в Россию 2026
11. ввоз авто в Армению пошлина НДС экологический налог
12. растаможка авто из ОАЭ в Армению
13. растаможка машины в Ереване цена
14. калькулятор таможенных платежей Армения автомобиль src.am
15. растаможка авто из Китая в Армению
16. растаможка авто в армении калькулятор (ext)
17. растаможка авто из Армении в Россию
18. сколько стоит растаможить машину в Армении (ext)
19. растаможка в армении 2025 новые правила авто
20. растаможка гибрида в Армении
21. расстаможка авто армения
22. ввоз автомобиля в Армению физическим лицом таможенные платежи
23. растаможка авто из Европы в Армению
24. машина на армянском учете растаможка в РФ 2026 калькулятор

**hy (17 run + 1 blocked):**
1. մեքենայի մաքսազերծում հաշվիչ
2. մաքսազերծման հաշվիչ
3. մեքենայի մաքսազերծում 2026
4. maqsazercum hashvich
5. ավտոմեքենայի մաքսազերծման հաշվիչ (ext)
6. մաքսազերծում ԱՄՆ-ից մեքենա
7. էլեկտրամոբիլի մաքսազերծում
8. մեքենայի մաքսազերծման արժեքը
9. մաքսային վճարների հաշվիչ ավտոմեքենա
10. maqsazercman hashvich meqena
11. մաքսազերծում Վրաստանից մեքենա
12. մեքենաների մաքսազերծում ՊԵԿ հաշվիչ petekamutner
13. մաքսատուրք մեքենա 2026
14. ավտոմեքենայի ներմուծման հաշվիչ
15. maqsazercum mekena
16. մաքսազերծում էլեկտրական մեքենա 2026 քվոտա
17. մեքենայի մաքսազերծում Չինաստանից
18. ~~մաքսազերծման հաշվիչ ավտո ԱՄՆ աճուրդ~~ (blocked: search budget exhausted)

**en (14):**
1. armenia car import duty calculator
2. customs clearance car armenia cost
3. import car from USA to Armenia customs duty
4. armenia electric car import duty 2026
5. how much is customs for a car in armenia
6. armenia car customs calculator
7. armenia customs duty used cars 2026
8. import car to armenia from georgia customs
9. armenia vehicle import tax environmental tax VAT calculator
10. import car from dubai to armenia customs
11. armenia car customs clearance calculator (ext)
12. how to import a car to armenia
13. armenia customs duty electric vehicle calculator VAT exemption
14. copart car to armenia customs clearance calculator

Note: en (14) is just below the 15–25 target. The search budget was exhausted before more could run.

**Pages fetched (WebFetch):** src.am/en/showVehiclesSearchPage/114 (shell only); autodealer.am/en/calculator; calculator.uic.am/?hl=en; exim.src.am/en/personal; exim.src.am/en/transport; petekamutner.am/csOS_VehiclesCustomsValue.aspx (**failed: ECONNREFUSED**); src.am/ru/getNews/299 (shell only); src.am/am/getNews/299 (shell only); arka.am ru article (**403**); arka.am en article (**403**); ucsol.ru calculator; america-auto.com calculator; ncars.group/calc; pan.am/252501; how2b.am; iaa.am/calculators; autocomplex.am/am/calculator; triple-c.am salary + car-customs; english.hartak.am guide + individuals calculator page; iravaban.net; finport.am; armenpress.am/en/article/924036; auto-rul.ru; terminalzm.ru.

---

## 4. Currency converter (AMD/USD/EUR/RUB)

Slug: `currency` · Research date (last_verified): 2026-10-26

**Method caveats (read first)**
- The WebSearch tool is a US-based general web index. It is **not** Google.am or Yandex, does **not** expose "People also ask", related searches, or autocomplete. SERP composition below is what this tool returned, which may differ from real Google/Yandex results in Armenia/Russia.
- **The shared web-search budget for this session ran out** after 33 queries ran (21 ru, 12 hy/Latin-hy); 2 further hy queries were blocked. **No English queries could be run.** The English section is therefore built only from English-language pages that surfaced in ru queries plus direct fetches; it is not a verified EN SERP. Re-run EN queries in a follow-up session.
- Armenian-script queries returned junk in "standard" mode (foreign glossaries, Kyrgyz/Uzbek pages). "Extended" mode returned relevant Armenian SERPs (b24.am, rate.am, panorama.am, poxarjeq.com).
- No search volume data. Difficulty is a judgement from SERP composition.
- Rates quoted below are only what fetched pages displayed on 2026-10-26, with URL. They illustrate freshness and are not data for the calculator.

---

#### Language: ru

- **Primary keyword:** конвертер драм рубль *(chosen because the SERP is 100% converter/tool pages = matches the page format; head terms like "курс доллара в ереване сегодня" returned news/CBA-archive pages, not tools)*
- **Search intent:** Convert a sum between Armenian dram and ruble/dollar/euro at today's rate.
- **Secondary variants, grouped by intent** (all were queries actually run; the forms seen in SERP titles are marked "derived from SERP titles"):
  - *Convert an amount / calculator:* перевести рубли в драмы калькулятор; перевод драмов в рубли (derived from SERP titles: brobank, 1000bankov); конвертер валют армения онлайн драм доллар евро рубль; 100 долларов в драмах; 1000 рублей в драмах; сколько драм в одном рубле
  - *Today's rate, pair-specific:* курс драма к рублю; драм рубль; курс драмма к рублю на сегодня в армении (typo form); курс драма к доллару; курс доллара армения драм; курс евро к драму сегодня; курс цб армении сегодня доллар драм
  - *Local, Yerevan/bank rates:* курс доллара в ереване сегодня; курс валют армения; курс рубля в армении обменники ереван; курс рубля к драму в армении сегодня банки; курсы валют в банках армении сравнить покупка продажа; курс валют в банках еревана rate.am
  - *Best rate / where to exchange:* где выгодно поменять доллары в ереване; обмен валют ереван курс сегодня лучший курс
- **Observed SERP features:** None exposed by the tool (no PAA, related searches or autocomplete). Observed SERP composition:
  - Converter queries: Russian aggregators only (ru.myfin.by, sravni.ru, bankiros.ru, 1000bankov.ru, brobank.ru, finance.rambler.ru, profinance.ru, finance.mail.ru, ratestats.com). All use the **Bank of Russia (ЦБ РФ)** rate, not the CBA rate.
  - Amount queries ("1000 рублей в драмах") return programmatic per-amount pages (sravni.ru/valjuty/info/rub-amd-1000/, ru.myfin.by/converter/amd-rub/1000, etc.), so amount-page SEO is already in use.
  - "курс доллара в ереване сегодня", "обмен валют ереван…": old news (report.az 2014 article, armenpress.am CBA daily posts from 2024). No tool page and **rate.am did not appear** in any ru query.
  - "курсы валют в банках армении сравнить": the tool returned bankiros/myfin pages for **Армянск (Crimea)**, a city-name collision.
- **Competitors (top 5 for primary "конвертер драм рубль"):** SERP order was myfin rub-amd, myfin amd-rub, 1000bankov amd-rub, 1000bankov rub-amd, brobank, bankiros, sravni. Deduplicated by domain:

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|---|---|---|---|---|---|---|
| 1 | https://ru.myfin.by/converter/rub-amd | "Конвертер рублей (RUB) в драмы (AMD) онлайн, калькулятор российского рубля к армянскому драму, курс на сегодня" (first line; title tag not confirmed) | Конвертер российского рубля к армянскому драму | ~400 | ЦБ РФ rate, both directions, amount tables 1–10,000, history chart (7d…all), buy/sell of 4 **Russian** banks | No Armenian bank rates, no CBA rate, no cash/non-cash split, bank table units unclear | "Курс рубля к армянскому драму на 26 октября 2026 г. предоставлен сервисом www.cbr.ru"; bank rows 26.10.2026 |
| 2 | https://1000bankov.ru/kurs/rub-amd/ | Not confirmed; first line "Конвертер рубля к армянскому драму – перевод валют в онлайн-калькуляторе" | Перевод рублей в армянские драмы | ~400 | ЦБ РФ rate only; 1-year min/max table | No bank rates, no cash/non-cash; contradictory dates; instructions text mismatched | "Расчет по курсу ЦБ на 24 Октября 2026. 1 рубль = 4.48 армянский драм." while also saying "на сегодня, 26 октября 2026 года" |
| 3 | https://brobank.ru/kurs-valut-cbrf/converter/amd-rub/ | Not confirmed; first line "Перевод драмов в рубли — калькулятор, перевести армянские драмы в рубли, конвертер валют онлайн" | Перевод драмов в рубли | ~400–500 | ЦБ РФ rate; article explaining buy/sell spreads; period buttons | No bank comparison, no cash toggle, date only (no time) | "Дата обновления: 24.10.2026" |
| 4 | https://bankiros.ru/convert/rub-amd | Not present in extract | Конвертер российского рубля к армянскому драму онлайн | ~450 | ЦБ РФ + 6 **Russian** banks' buy/sell | Unrendered placeholder "…составляет :rate2_cbrf AMD."; no Armenian banks; no cash split | "Данные за 2026-10-26 13:23" |
| 5 | https://www.sravni.ru/valjuty/konverter-drama-k-rublyu | "Перевести драмы в рубли – калькулятор онлайн, конвертер валют из драма в рубли (amd-rub)" | Конвертер армянского драма к российскому рублю | ~500–600 | ЦБ РФ rate; Moscow bank finder (empty for AMD); history chart | Unrendered "{количество.предложений}"; transliterated SEO text "drama к rublyu"; no bank results | "Официальные курсы валют на26 октября 2026"; other blocks dated 24 and 25 Oct, so dates are inconsistent |

- **Gaps / targets:**
  - **No ru page in the observed SERP combines a converter with Armenian bank rates (CBA + Yerevan banks, cash vs non-cash).** All top results are Russia-centric (ЦБ РФ rate, Russian banks). A Russian-speaker in Yerevan gets the wrong reference rate.
  - "курс доллара в ереване сегодня", "обмен валют ереван курс сегодня лучший курс", "где выгодно поменять доллары в ереване": the tool returned only outdated news (2014/2024) and generic travel content. Weak SERP, so a strong target. (Real Yandex/Google likely shows rate.am; verify.)
  - "курс рубля в армении обменники ереван" / "курс рубля к драму в армении сегодня банки": no Armenian bank data in results. Cash-ruble pricing in Armenia is a real pain point: aravot.am (2026-07-15, "Մեկ ռուբլի, երեք գին. ինչու բանկերը չեն ուզում ձեր կանխիկ ռուբլին") covers it in Armenian, and nothing covers it in Russian in the observed results.
  - Amount long-tail ("100 долларов в драмах", "1000 рублей в драмах"): competitors use programmatic pages but at ЦБ РФ rate. Possible to compete with a few curated amount anchors, but beware thin-page risk.
  - City-collision noise ("армении" → Армянск) shows these SERPs are weakly matched.
- **Difficulty:** **Medium** for converter terms (many established Russian finance aggregators with high domain authority, but all have the same Russia-only weakness and several have visible template bugs). **Medium–high** for "курс доллара/валют ереван" head terms in real Yandex/Google, where rate.am and banks probably dominate (not confirmed by this tool).
- **Verify in Yandex Wordstat:** конвертер драм рубль; курс драма к рублю; драм рубль; курс рубля к драму; курс доллара в ереване; курс доллара в армении; курс валют армения; курс валют ереван; курс евро к драму; 100 долларов в драмах; 1000 рублей в драмах; рубли в драмы; драмы в рубли; курс драмма (typo); обмен валют ереван; курс рубля в армении наличные; где поменять рубли в ереване

---

#### Language: hy

- **Primary keyword:** դոլարի փոխարժեք
- **Search intent:** Find today's dollar to dram rate (CBA official and banks' buy/sell) to exchange or convert money.
- **Secondary variants, grouped by intent** (queries run; others marked as derived from SERP titles):
  - *Today's rate:* դոլարի փոխարժեք այսօր; փոխարժեք; ռուբլու կուրս այսօր; եվրոյի փոխարժեք; Դրամի փոխարժեքն այսօր (derived from SERP titles, b24.am tag)
  - *Official CBA rate:* ԿԲ փոխարժեք դոլար դրամ այսօր; Օրվա փոխարժեքներ, Կենտրոնական բանկ (derived from SERP titles, rate.am)
  - *Bank / best rate:* արտարժույթի փոխարժեքներ բանկերում; ռուբլու փոխարժեք բանկերում Երևան; rate.am փոխարժեք բանկեր Երևան; Դրամի փոխարժեք` ՀՀ բանկեր (derived from SERP titles, b24.am); Rate.am - Լավագույն փոխարժեքներ (derived from SERP titles)
  - *Converter:* արժույթի փոխարկիչ դրամ դոլար
  - *Latin-script Armenian:* dolari poxarjeq; dolari kurs ayso. Both returned **no Armenian results** in this tool. "Dolar Dram, Rubli Dram" appears in poxarjeq.com's title (derived from SERP titles), so Latin forms such as "dolar dram", "rubli dram" and "poxarjeq" are worth checking.
  - *Exchange points:* Տարադրամի փոխարժեքը … փոխանակման կետերում (derived from SERP titles, panorama.am)
- **Observed SERP features:** None exposed (no PAA, related searches or autocomplete). Standard-mode Armenian queries returned off-topic global pages. Extended mode returned: a cluster of daily b24.am news posts (CBA rate posts plus "ՀՀ բանկեր 10:50" bank-rate posts), rate.am (banks, CBA, branch search), panorama.am daily exchange-point post, vtb.am currency page, aravot.am article, poxarjeq.com, fastbank offers page, finca.am, and a rate.am Facebook page.
- **Competitors (top 5, assembled from the two extended hy SERPs "դոլարի փոխարժեք" + "ռուբլու փոխարժեք բանկերում Երևան" + "rate.am փոխարժեք բանկեր Երևան"):** The "դոլարի փոխարժեք" SERP itself was all b24.am URLs.

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|---|---|---|---|---|---|---|
| 1 | https://b24.am/finance/467953.html | Դրամի փոխարժեք` ՀՀ բանկեր. 10:50, 24/10/26 | same as title | ~600 body | Daily news post: best buy/sell for USD/EUR/RUB cash and non-cash, ~10 partner banks table, CBA rate in sidebar | No converter; one URL per day (stale next day); sidebar CBA date differs from article; misspelling "Անանխիկ" | "24/10/2026 10:50"; e.g. ACBA "Կանխիկ ԱՄՆ դոլարի առք՝ 359.00 դրամ (+0.00 դր.)" |
| 2 | https://www.rate.am/hy/armenian-dram-exchange-rates/banks | Օրվա փոխարժեքներ, Բանկեր - Rate.am | not identifiable | ~150–500 (mostly numbers) | 17 banks, cash/non-cash and direct/cross toggles, USD/EUR/RUB/GBP plus more, calculator section, branch finder, exchange-points link; hy/en/ru versions | Almost no explanatory text; no confirmed amount input in extract; no history; RUB/RUR inconsistency; accuracy disclaimer | Bank row "26 Հոկտ, 14:30"; "*Տվյալները ներկայացված են Երևանի ժամանակով" |
| 3 | https://poxarjeq.com/ | Փոխարժեք Հայաստանում. Dolar Dram, Rubli Dram \| Փոխարժեքը այսօր | Տարադրամի փոխարժեքները ՀՀ բանկերում | ~1,000–1,200 | ~20 banks, many currencies, converter, links to per-currency pages (dollar/ruble/euro/lari), loans/deposits/calculators; RU version | No cash/non-cash distinction; no CBA rate; many "-" cells; typos and mixed Latin letters; heavy disclaimers | Header "Թարմացված է: 14:30" (no date); bank rows "26 Հոկ, 13:45" |
| 4 | https://www.panorama.am/am/news/2026/10/23/դոլար-ռուբլի-եվրո/3171720 | Տարադրամի փոխարժեքը Հանրապետության փոխանակման կետերում հոկտեմբերի 23-ի դրությամբ | same | ~110 body | Daily news: bank averages + exchange-point buy/sell for USD/EUR/RUB | No converter; mixes sources; thin | "09:33 23/10/2026"; "Ռուբլու առքն էլ կազմում 4.31 դրամ, վաճառքի դեպքում միջին գինը՝ 4.55 է։" |
| 5 | https://www.rate.am/hy/armenian-dram-exchange-rates/central-bank-armenia | Օրվա փոխարժեքներ, Կենտրոնական բանկ - Rate.am | not identifiable | n/a (table) | CBA official rates for 26 currencies + gold; yearly day-by-month history grid (2000–2026), min/max/avg | No converter on this page; no chart; no dated headline sentence | No explicit "today" date string found in the extract; year grid shows 2026 |

  Also seen but not fetched: https://www.vtb.am/am/currency (bank page, undated in snippet), https://www.aravot.am/2026/07/15/1569056/ (cash-ruble article), https://offers.fastbank.am/արտարժույթի-փոխանակում.
  kurs.am returns HTTP 307 to https://www.rate.am/ (fetched 2026-10-26), so rate.am owns that domain too.

- **Gaps / targets:**
  - **Armenian-language converter plus explanation:** news sites (b24, panorama, azat.tv, news.am) rank with daily posts but have no calculator. rate.am and poxarjeq have tables but little text. A page combining a converter (CBA rate and bank buy/sell, cash/non-cash) with plain-Armenian explanation of առք/վաճառք and կանխիկ/անկանխիկ is missing.
  - **Cash vs non-cash ruble** (ռուբլու փոխարժեք կանխիկ/անկանխիկ): a real user pain point (aravot.am article; b24 shows separate cash and non-cash RUB). No tool explains it.
  - **Latin-script Armenian** ("dolari poxarjeq", "dolar dram", "rubli dram"): the tool found nothing for the first two. poxarjeq.com targets these forms in its title, so there is a niche but it is contested. Verify in Google.
  - Standard-mode searches for "փոխարժեք", "ռուբլու կուրս այսօր" and "եվրոյի փոխարժեք" returned off-topic or stale (pre-2026) news, which suggests thin indexing of Armenian-script content in this index.
- **Difficulty:** **High** for "դոլարի փոխարժեք" / "փոխարժեք" head terms (rate.am, an entrenched aggregator updated through the day, plus daily news posts from b24/panorama and bank sites). **Low–medium** for Armenian converter / explanatory long-tail and Latin-script variants.
- **Verify in Yandex Wordstat / Google Keyword Planner:** դոլարի փոխարժեք; փոխարժեք; ռուբլու փոխարժեք; ռուբլու կուրս; եվրոյի փոխարժեք; ԿԲ փոխարժեք; փոխարժեք այսօր; արժույթի փոխարկիչ; dolari poxarjeq; poxarjeq; dolar dram; rubli dram; kurs; rate am

---

#### Language: en

**No English queries were run. The session's web-search budget was exhausted before the EN batch.** Keywords below are those named in the task brief, **not SERP-verified**. Competitor rows are English pages that appeared in ru SERPs ("100 долларов в драмах") or were fetched directly. They are **not** a verified top 5 for any English query.

- **Primary keyword (proposed, unverified):** usd to amd
- **Search intent:** Convert US dollars (or EUR/RUB) to Armenian dram at today's rate.
- **Secondary variants (unverified, from brief + page titles seen):**
  - *Convert:* amd to usd; usd to amd; dram to dollar; eur to amd; rub to amd; "US dollar to Armenian drams" (derived from Wise title); "USD to AMD Exchange Rate" (derived from Pluang title)
  - *Today's rate:* armenian dram exchange rate; usd amd today ("USD/AMD Today", derived from tradersunion title seen in SERP list)
  - *Local / best rate:* exchange rates banks Armenia ("Daily exchange rates, Banks", derived from rate.am/en title)
- **Observed SERP features:** None. No EN SERP was retrieved.
- **Competitors (not a verified SERP top 5):**

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|---|---|---|---|---|---|---|
| 1 | https://www.rate.am/en/armenian-dram-exchange-rates/banks | Daily exchange rates, Banks - Rate.am | not identifiable | table-heavy | 17 Armenian banks, Cash/Non-cash and Flat/Cross toggles, converter section | Amount input not confirmed in extract; little text | "26 Oct, 14:30"; "*All dates are in Yerevan time." |
| 2 | https://wise.com/us/currency-converter/usd-to-amd-rate/history | US dollar to Armenian drams Exchange Rate History \| Currency Converter \| Wise | US dollar to Armenian drams Historical Exchange Rates | ~1,200–1,500 | Mid-market rate, history chart 48H–5Y, stats, FAQ | No Armenian bank or CBA rate; internal stat inconsistencies; transfer-focused | "October 26, 2026"; "$1 USD = 361.5 AMD" (mid-market) |
| 3 | https://pluang.com/en/tools/currency-converter/usd-amd | USD to AMD Exchange Rate: 1 USD = 361.14 AMD \| Pluang | US Dollar (USD) to Armenian Dram (AMD) Exchange Rate Today | ~1,500 | Mid-market (FMP data), ranges, averages | Indonesia-centric copy, WIB timezone, inverse-rate mismatch, no Armenian data | "Updated 26 Oct 2026 · 07:00 WIB · Mid-Market Rate" |
| 4 | https://tradersunion.com/currencies/price/usd-amd/ | "USD/AMD Today – Exchange Rate & Chart" (SERP title only) | n/a | n/a | n/a | **Fetch failed: HTTP 403** | n/a |
| 5 | — | — | — | — | Not filled; no EN SERP available | — | — |

- **Gaps / targets (hypotheses, need EN SERP check):** Global converters (Wise, Pluang) show only the mid-market rate with no CBA rate and no Armenian bank buy/sell rates. rate.am/en has the bank data but little text. An English page for expats and tourists ("best exchange rate Yerevan", "where to exchange money in Yerevan", "cash vs card rate Armenia") is a likely gap. Unverified.
- **Difficulty:** Probably **high** for "usd to amd" / "amd to usd" (global brands: Wise, and likely XE, Google's own converter widget; **not observed**, inferred only). **Low–medium** for Armenia-local English long-tail. Unverified.
- **Verify in Wordstat / Google Keyword Planner:** usd to amd; amd to usd; dram to dollar; armenian dram exchange rate; rub to amd; eur to amd; exchange rate yerevan; best exchange rate yerevan; currency exchange yerevan

---

#### Boundary notes

- **Owned by this page (currency):** rate lookup + amount conversion, CBA vs bank buy/sell, cash vs non-cash rate *as an exchange rate*, "где выгодно поменять доллары в ереване", "лучший курс", exchange points.
- **Should go to the money-transfer page (d):** anything with перевод / комиссия / transfer / Unistream / Korona / SWIFT / "отправить деньги", including "перевод из России в Армению", "how to send money to Armenia". Wise pages are transfer-oriented and are a competitor there too.
- **Ambiguous, recommend:**
  - "обмен рублей на драмы выгодно" / "где поменять рубли в ереване" → **currency**, if the query is about cash/bank exchange in Armenia. If it includes "перевод/карта/комиссия", it goes to **transfers**.
  - Card conversion fees ("конвертация по карте в армении", "курс при оплате российской картой", "комиссия за конвертацию") → **transfers (d)**, since the intent is a fee/commission. The currency page can link to it.
  - "Безналичный курс рубля" / "անկանխիկ ռուբլի" (non-cash rate) → **currency** (it is a rate). Fee comparison of how to move rubles → **transfers**.
  - CBA rate for tax/customs purposes (e.g. the rate used to value an imported car or foreign-currency income) → owned by **customs (c)** / **sole-proprietor tax (b)**. They can embed the CBA rate but must not target "курс ЦБ Армении" keywords.
  - Salary in USD → AMD net ("зарплата 1000 долларов в драмах на руки") → **salary (a)**.
- **One page per pair? Recommendation:** Keep **one primary page** (`currency`) targeting the generic intent ("конвертер валют армения", "փոխարժեք", "armenian dram exchange rate"). The SERPs show competitors using **separate URLs per pair and direction** (myfin /converter/rub-amd vs /amd-rub; 1000bankov; sravni; Wise /usd-to-amd-rate), and pair queries ("курс драма к рублю", "курс драма к доллару", "курс евро к драму") are distinct searches. If the site later allows more than 5 pages, the strongest case is RUB↔AMD (largest ru long-tail observed and the cash/non-cash pain point), then USD↔AMD, then EUR↔AMD. Each would be a sub-URL (`currency/rub-amd`) with the same single intent ("convert X↔AMD") so they do not compete with the 4 other calculators. Within the 5-page constraint: one page, with pair selector state reflected in the URL (e.g. `?from=RUB&to=AMD`) and pair-specific H2 sections. Head terms "курс доллара" (without Armenia/драм) and "курс доллара в ереване" are likely dominated by rate.am/banks (rate.am confirmed in hy SERP; not seen in ru SERP via this tool). Target them secondarily.

---

#### Queries run (log)

**ru (21 distinct queries, all returned results; 2 needed a retry after a rate-limit error):**
1. курс доллара в ереване сегодня (1st attempt: too_many_requests; retry OK)
2. конвертер драм рубль (1st attempt: too_many_requests; retry OK)
3. курс драма к рублю
4. курс валют армения
5. драм рубль
6. курс рубля в армении обменники ереван
7. курс валют в банках еревана rate.am
8. 100 долларов в драмах
9. курс евро к драму сегодня
10. где выгодно поменять доллары в ереване
11. курс цб армении сегодня доллар драм
12. курс рубля к драму в армении сегодня банки
13. перевести рубли в драмы калькулятор
14. курс доллара армения драм
15. сколько драм в одном рубле
16. обмен валют ереван курс сегодня лучший курс
17. курс драма к доллару
18. 1000 рублей в драмах
19. курс драмма к рублю на сегодня в армении
20. курсы валют в банках армении сравнить покупка продажа
21. конвертер валют армения онлайн драм доллар евро рубль

**hy / Latin-hy (14 planned; 12 ran, 2 blocked by the search budget):**
1. դոլարի փոխարժեք այսօր (standard; off-topic/stale)
2. փոխարժեք (standard; off-topic)
3. ռուբլու կուրս այսօր (standard; stale)
4. արտարժույթի փոխարժեքներ բանկերում (standard)
5. dolari poxarjeq (standard; no Armenian results)
6. եվրոյի փոխարժեք (standard; stale)
7. արժույթի փոխարկիչ դրամ դոլար (standard)
8. ԿԲ փոխարժեք դոլար դրամ այսօր (standard; stale/off-topic)
9. rate.am փոխարժեք բանկեր Երևան (extended)
10. dolari kurs ayso (standard; no Armenian results)
11. դոլարի փոխարժեք (extended; all b24.am)
12. ռուբլու փոխարժեք բանկերում Երևան (extended)
13. poxarjeq dolar dram (extended): **NOT RUN**, budget exhausted
14. փոխարժեք այսօր (extended): **NOT RUN**, budget exhausted

**en:** none run (budget exhausted). Pages fetched directly instead: rate.am/en banks, wise.com usd-to-amd history, pluang usd-amd, tradersunion usd-amd (403).

**Pages fetched (WebFetch, 2026-10-26):** ru.myfin.by/converter/rub-amd; sravni.ru/valjuty/konverter-drama-k-rublyu; bankiros.ru/convert/rub-amd; 1000bankov.ru/kurs/rub-amd/; brobank.ru/kurs-valut-cbrf/converter/amd-rub/; rate.am/hy/…/banks; rate.am/ (hy); rate.am/en/…/banks; rate.am/hy/…/central-bank-armenia; b24.am/finance/467953.html; poxarjeq.com; panorama.am 3171720; kurs.am (307 → rate.am); wise.com/us/…/usd-to-amd-rate/history; pluang.com/…/usd-amd; tradersunion.com/…/usd-amd/ (403).

---

## 5. Money transfer commission calculator

Slug: `transfers`

Research date (last_verified): 2026-10-26. Tools: WebSearch (standard mode) + WebFetch.

**Method notes (read first)**
- The WebSearch tool returns 9-10 result links plus a summary. It does **not** expose Google "People also ask", related searches or autocomplete. All "secondary variants" below are either queries I actually ran or phrases **derived from SERP titles** (labelled).
- **The search budget ran out partway** (shared per-turn limit of 200 WebSearch calls across all agents). The ru (20 queries) and hy (19 queries) runs are complete. **en: only 1 dedicated query ran** ("send money to armenia fees"). One hy query ("ինչպես գումար փոխանցել ԱՄՆ-ից Հայաստան") returned English US→AM pages, and those are used as extra en evidence. The en section is thinner than the others; rerun the en queries listed in the log under "not run".
- Several top pages could not be fetched (403 or TLS errors). These are marked "fetch failed". Where a page in the top 5 failed, I fetched the next-ranked pages for the same or a sibling query and labelled them.
- No search-volume data. Difficulty is a judgement based on what the SERP is made of.
- Fees and limits quoted below come from pages fetched in this session (with URL). Values that appeared only in search-tool summaries, without a successful fetch, are marked **(snippet only, unverified)**. They must not go into the calculator.

#### Language: ru

- **Primary keyword:** перевод денег в армению комиссия
- **Search intent:** Find out how much it costs (fee plus exchange rate) to send money to Armenia, and pick the cheapest working method.
- **Secondary variants (grouped by intent):**
  - *Compare / cheapest / calculator*
    - калькулятор перевода денег в армению (сравнение комиссий)
    - перевод в армению без комиссии
    - перевести деньги в ереван дешево
    - как выгоднее перевести деньги в армению (derived from SERP titles: visasam H2 "Как сейчас выгоднее перевести деньги в Армению из России")
    - сколько стоит перевод в армению (derived from SERP titles: sostav H2 "Сколько стоит перевод в Армению: комиссии и скрытые потери")
  - *Corridor RU→AM (how-to, current year)*
    - как перевести деньги в армению из россии 2026
    - перевод в армению в драмах (derived from SERP title, sostav.ru)
    - перевод денег в армению из россии в долларах
    - перевод в арменю деньги с россии (typo variant; SERP was identical to the correct spelling)
  - *Corridor AM→RU*
    - как перевести деньги из армении в россию
    - перевод из армении в россию комиссия idram
  - *Corridor US/EU→AM (ru-speaking diaspora)*
    - как отправить деньги в армению из сша или европы
  - *By provider / bank*
    - юнистрим армения комиссия
    - перевод в армению золотая корона (комиссия)
    - контакт перевод в армению тарифы
    - перевод в армению вестерн юнион
    - перевод денег в армению сбербанк по номеру телефона (комиссия)
    - перевод в армению т-банк лимит комиссия
    - idpay комиссия (derived from SERP titles: sostav "рассказываем о сервисе IDpay")
  - *By method*
    - перевод с карты на карту армения из россии
    - swift перевод в армению комиссия
  - *Limits / rules*
    - лимит перевода в армению из россии 2026
- **Observed SERP features:** The tool exposed no PAA, related searches or autocomplete. What the SERPs show: (1) many results put the year in the title ("в 2026 году", "2025"); (2) Habr, DTF and vc.ru UGC/blog posts rank high, several of them promotional (DTF promotes Oplatym-Exchange; sostav promotes VedHonest); (3) bank landing pages (vtb.ru) and the Sovcombank journal rank; (4) news about the Zolotaya Korona stop and Unistream sanctions ranks for provider queries.
- **Competitors (top 5 for primary "перевод денег в армению комиссия"):**

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|-----|-------|----|--------|--------------|-----------|----------------------|
| 1 | https://habr.com/ru/articles/1066470/ | Как я перевожу деньги в Армению из России: разбор всех способов, которые пробовал за два года / Хабр | same as title | ~900-1,000 | Personal review of VTB ATM, Unistream→Unibank cash, exchangers, T-Bank→VTB, idpay, SWIFT, P2P/crypto. Covers several providers. | No table, no calculator, no figures for FX markup ("зависит от курса конвертации"). Anecdotal. | Byline "4 авг" with no year; text says summer 2026. Fresh. |
| 2 | https://journal.sovcombank.ru/sberezheniya/kak-perevesti-dengi-v-armeniiu-iz-rossii | (fetch failed: TLS cert error) | n/a | n/a | Per search summary: a methods overview (IDpay, bank transfer, MTS) | Not verifiable | Search summary says it mentions the end-of-July-2026 Korona stop **(snippet only, unverified)** |
| 3 | https://www.revolut.com/ru-EE/money-transfer/send-money-to-armenia/ | (fetch failed: 403) | n/a | n/a | Single-provider landing page (EUR from Estonia). The search summary mentions a fixed EUR fee **(snippet only, unverified)**. | Single provider. Not relevant to RU senders. | unknown |
| 4 | https://habr.com/ru/articles/668312/ | (fetch failed: 403) | n/a | n/a | Older Habr article. The ID is about the 2022 era (inference from ID ordering, unverified) | n/a | freshness unclear |
| 5 | https://www.vtb.ru/personal/platezhi-i-perevody/perevody-v-armeniju/ | (fetch failed: TLS cert error) | n/a | n/a | Single-bank landing page (VTB). Per search summary: phone, card or account transfers | Single provider | freshness unclear |

  *Next-ranked pages, fetched instead (they rank for the primary's sibling queries "как перевести деньги в армению из россии 2026" and "калькулятор перевода… сравнение комиссий"):*

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|-----|-------|----|--------|--------------|-----------|----------------------|
| 6 | https://visasam.ru/samotur/finansy/kak-perevesti-dengi-v-armeniyu-iz-rossii.html | Как перевести деньги в Армению из России в 2026 году: на карту и банковский счет | same | ~3,500 | Broadest guide. Covers banks (T-Bank, VTB, Sber, Raiffeisen, Gazprombank, OTP…), IDPay, Avosend, KWIKPAY, Unistream, SWIFT, a Kyrgyz-card route. Quotes fees, e.g. "Комиссия Avosend для переводов в Армению – 79 рублей", "Комиссия Райффайзен Банка за перевод по реквизитам в рублях за границу – 0,75%". Mentions FX: "Возможна нулевая явная комиссия, но банк или сервис все равно зарабатывает на обменном курсе." | No table, no calculator. FX cost not quantified. Prose only. | "02.10.2026" publication date. Fresh. Strongest competitor. |
| 7 | https://www.sostav.ru/blogs/289834/91033 | Перевод в Армению в драмах в 2026 году: топ-5 лучших способов перевести деньги | same | ~3,000 | Compares method types. Gives ranges: "у систем переводов это обычно 1–3% от суммы", FX "хуже рыночного на 1–4%", SWIFT intermediary "может удержать 15–50 долларов" | Promotional (VedHonest, UTM links). No named-provider comparison. No calculator. | "2026-06-15 17:01:52" |
| 8 | https://dtf.ru/howto/5019305-perevody-v-armeniu-iz-rossii | Переводы в Армению и из Армении в Россию: полное руководство 2026 года — Гайды на DTF | Переводы в Армению и из Армении в Россию: полное руководство 2026 года | ~2,000-2,500 | Promotes Oplatym-Exchange. Lists Korona, Unistream, Contact, SWIFT, crypto. | Promotional with no ad label. No fee numbers ("Переводы без комиссии в Армению не существуют"). States "Золотая Корона — широко представлена в Армении через банки-агенты", which contradicts other sources (see conflict note). | "25 апр" with no year. "2026" in title. Korona claim likely outdated. |
| 9 | https://brobank.ru/perevody-v-armeniyu | Перевод денег в Армению в 2026, через банки и системы переводов | Перевод денег в Армению: все возможные способы | ~1,400 | Bank-by-bank (Sber, Fora, Tinkoff, VTB, MTS) and Unistream. Quotes e.g. Sber "комиссия за операцию — 1%, минимально 30 рублей", VTB "комиссия — 0,5-1,5%…" | No table or calculator. Stale: Fora/Tinkoff branding. | Title says 2026, but the page says "Последнее обновление: 15.04.24". Mismatch, outdated. |

- **Gaps / targets:**
  - **No ru page has a working cost calculator or comparison table.** Every top page is prose (visasam, sostav, brobank, DTF, Habr). Query "калькулятор перевода денег в армению сравнение комиссий" returned only articles; the search summary said plainly that no calculator with a comparison table was found.
  - **FX markup is mentioned but never computed.** visasam and sostav both say providers earn on the rate, but neither shows "you send X ₽ → recipient gets Y ֏". A "total cost incl. FX" calculator is unoccupied.
  - **Provider status is contradictory or outdated.** Zolotaya Korona: easypay.world (published and updated 17.08.2026) says "«Золотая Корона» 24 июля 2026 года остановила переводы в Грузию, Армению и Казахстан". visasam (02.10.2026) and brobank say it can't be used. DTF says it is "широко представлена". **conflict: true.** Provider queries ("золотая корона армения", "контакт армения") have no clear, dated status page. Opportunity: a status column in the calculator.
  - **Year-stamped titles with stale content** (brobank: "2026" in title, last update 15.04.24). Freshness is a weak point we can win on.
  - **Provider-specific SERPs are thin:** "контакт перевод в армению тарифы" returned no current tariff (old dengi.ua, off-topic telecom results). "юнистрим армения комиссия" returned reviews and sanctions news, with no official tariff in the SERP.
  - **AM→RU direction** ("как перевести деньги из армении в россию") is served by RU→AM articles and Habr. No dedicated page.
  - **Limits query** ("лимит перевода в армению из россии 2026"): the search summary found no concrete limit page.
- **Difficulty:** **Medium.** The SERP is mostly blogs, UGC and aggregators (Habr, DTF, vc.ru, sostav, brobank, visasam), plus bank landing pages. No dedicated tool ranks. visasam is strong and fresh, and bank/media domains have authority. But the intent ("комиссия", compare) is not met by any tool, and content goes stale fast.
- **Verify in Yandex Wordstat:**
  - перевод денег в армению
  - перевод денег в армению комиссия
  - перевод в армению из россии
  - как перевести деньги в армению
  - как перевести деньги в армению из россии 2026
  - перевод в армению без комиссии
  - калькулятор перевода в армению
  - перевод в армению юнистрим / юнистрим армения
  - золотая корона армения / корона пей армения
  - контакт армения перевод
  - перевод с карты на карту армения
  - перевод в армению сбербанк / т-банк / втб
  - idpay армения
  - swift перевод в армению
  - как перевести деньги из армении в россию
  - перевод в ереван
  - перевод в арменю (typo check)

#### Language: hy

- **Primary keyword:** դրամական փոխանցում Ռուսաստանից Հայաստան միջնորդավճար (proposed; see note)
  - Note: Armenian-script SERPs are very thin and mostly return bank PDFs and news. Shorter heads ("դրամական փոխանցումներ", "փոխանցման միջնորդավճար") returned off-topic results (remittance statistics, merchant card fees). Pick the final hy primary only after Wordstat/Google Keyword Planner checks.
- **Search intent:** Find out the fee for sending or receiving money between Armenia and abroad (mainly Russia, also the USA) and pick the cheapest system.
- **Secondary variants (grouped by intent):**
  - *Compare / cheapest / calculator*
    - գումար փոխանցել արտասահման ամենաէժան
    - փոխանցման միջնորդավճարի հաշվիչ
    - փոխանցման միջնորդավճար
  - *By corridor*
    - փող ուղարկել Ռուսաստանից Հայաստան
    - ինչպես գումար փոխանցել ԱՄՆ-ից Հայաստան
    - դրամական փոխանցումներ Հայաստան
  - *By provider / system*
    - Ունիստրիմ փոխանցում միջնորդավճար
    - Idram փոխանցում Ռուսաստան միջնորդավճար
    - Զոլոտայա Կորոնա փոխանցումներ Հայաստան
    - Western Union Հայաստան փոխանցում
    - դրամական փոխանցումների համակարգեր Հայաստանում սակագներ
    - արագ դրամական փոխանցումներ (Unistream / Contact / Korona)
  - *By method*
    - SWIFT փոխանցում միջնորդավճար
    - միջազգային փոխանցումներ սակագներ բանկ
    - փոխանցում քարտից քարտ արտերկիր
  - *Latin-script Armenian*
    - poxancum rusastan hayastan mijnordavchar
    - gumar poxancel rusastanic hayastan inchpes
- **Observed SERP features:** The tool exposed no PAA, related searches or autocomplete. Observed: hy SERPs are dominated by **bank tariff PDFs** (unibank.am, idbank.am, acba.am, vtb.am), **news** (armenpress, news.am) and English pages from Armenian banks. Latin-script queries go off-topic: "dramakan poxancum rusastanic hayastan" returned only **RUB→AMD converter pages** (moneyconvert, valutafx, wise converter), and "poxancum rusastan hayastan mijnordavchar" returned political news.
- **Competitors (top 5 for primary):**

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|-----|-------|----|--------|--------------|-----------|----------------------|
| 1 | https://armenpress.am/hy/article/1022664 | Առաջինը տարածաշրջանում Հայփոստը գործարկում է դրամական փոխանցումների նոր համակարգ | same | ~230 | News: HayPost + Russian Post "PosTransfer" launch, "ընդամենը 1,2% միջնորդավճարով" | News item. Single provider. No tool. | 22 July 2020. Outdated. |
| 2 | https://ameriabank.am/userfiles/file/corporate/Openning_and_service_of_Bank_accounts_leaflet_arm.pdf | (PDF, text not extractable via fetch) | n/a | n/a | Corporate account-service tariff leaflet (path "/corporate/") | Corporate. Not a remittance comparison. | PDF metadata created 2022-12-22. Likely outdated. |
| 3 | https://www.unibank.am/hy/reports/ubpay-05.03.25.pdf | (no title. Heading: "UBPay համակարգի միջոցով նոր երկրներ փոխանցումներ կատարելիս հաճախորդներից գանձվող միջնորդավճարների չափը") | n/a | ~80 (one table) | Fee table. Row: Ռուսաստան / փոխանցումներ հեռախոսահամարով / AMD, USD, EUR, RUB → RUB / **2.00%** | Single system. Bare table. | Filename "05.03.25". PDF metadata 2025-02-20. |
| 4 | https://news.am/hy/news/24412 | (fetch failed: 403) | n/a | n/a | n/a | n/a | freshness unclear |
| 5 | https://www.unibank.am/en/news/8164/ | UBPay money transfers are now available on the Unibank mobile app | same | ~300 | Bank news (English): UBPay AM↔RU via Kwikpay. "The fee is 0% if the currency of payment for the transfer differs from the currency of payout", "1% if the currency is not converted." | English. Single provider. | 30.09.2024. Differs from the 2.00% in the 05.03.25 PDF (row #3); the dates differ, so this may be a tariff change rather than a conflict. **Mark conflict: true until verified.** |

- **Gaps / targets:**
  - **No Armenian-language comparison article or calculator appeared in any hy SERP.** The whole hy space is bank PDFs, English bank pages and old news. This is the clearest gap of all three languages.
  - **Latin-script Armenian queries** return converters or off-topic news. Real users who type Latin Armenian get no relevant page. A low-competition target, if volume exists.
  - **Outdated items rank:** HayPost 2020 news; Converse Bank Zolotaya Korona tariffs from 2011 (seen in search summary, not fetched); IDBank Unistream PDFs from 2022.
  - **Provider queries in Armenian script** (Զոլոտայա Կորոնա, Western Union) returned nothing relevant.
  - **The hy SERP for "ինչպես գումար փոխանցել ԱՄՆ-ից Հայաստան" was English** (Remitly, Ria, Xe, World Bank, Finder, IDBank Moneytun). No Armenian-language answer exists.
- **Difficulty:** **Low.** No direct competitor in Armenian. Ranking pages are PDFs and news that don't satisfy a "how much will it cost" intent. The risk is low search volume, not competition.
- **Verify in Yandex Wordstat (and Google Keyword Planner for hy):**
  - դրամական փոխանցում / դրամական փոխանցումներ
  - փոխանցման միջնորդավճար
  - փող ուղարկել Ռուսաստանից
  - գումար փոխանցել արտասահման
  - Ունիստրիմ / Unistream Հայաստան
  - Idram փոխանցում
  - SWIFT փոխանցում
  - poxancum / dramakan poxancum / gumar poxancel (Latin)

#### Language: en

- **Primary keyword:** send money to armenia fees
- **Search intent:** Compare the fees and exchange rates of providers for sending money to Armenia (mainly from the US) and pick the cheapest.
- **Secondary variants (grouped by intent).** Only one en query ran before the search budget ran out. Variants below come from that query plus the en results of the hy US→AM query, **derived from SERP titles**.
  - *Compare / cheapest*
    - send money to armenia fees (run)
    - cheapest way to send money to armenia (derived from SERP titles: Finder H3 "Cheapest way to send money to Armenia". Planned query, not run)
    - best way to send money to armenia (derived from Finder title "Best ways to send money to Armenia in 2026")
    - compare the best ways to send money from united states to armenia (derived from moneytransfers.com H1)
  - *By corridor*
    - send money to armenia from the united states (derived from Remitly title "Send money to Armenia from the United States")
    - transfer money to armenia from usa (planned, not run)
  - *By provider*
    - wise armenia / send money to armenia wise (derived from wise.com result)
    - remitly armenia rates and fees (derived from Remitly title)
    - ria send money to armenia, moneygram armenia, revolut send money to armenia, xe send money to armenia (derived from SERP result URLs/titles)
  - *By speed / size*
    - fastest way to send money to armenia; large money transfers to armenia (derived from Finder H3s)
- **Observed SERP features:** The tool exposed no PAA or related searches. The SERP is almost entirely **provider landing pages** (MoneyGram, Ria, Wise, Revolut, Remitly, Xe, TransferGo) plus **affiliate comparison sites** (Finder, moneytransfers.com) and the World Bank Remittance Prices corridor page (remittanceprices.worldbank.org/corridor/US/AM, fetch failed: 403).
- **Competitors (top 5 for primary "send money to armenia fees"):**

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|-----|-------|----|--------|--------------|-----------|----------------------|
| 1 | https://www.finder.com/international-money-transfers/send-money-internationally/send-money-to-armenia | Best ways to send money to Armenia in 2026 \| Finder | Find the best way to send money to Armenia | ~1,700 | Affiliate comparison table (US→AM only): Remitly, Revolut, MoneyGram, HSBC, Airwallex, Xe, CurrencyFair, PayPal. States "US banks generally add a 3% to 6% markup onto exchange rates." | US-only. No RU→AM, no EU. No amount-based calculator visible. Affiliate ranking. | No date. "2026" in title, footer © 2026. |
| 2 | https://www.moneygram.com/br/en/corridor/armenia | (fetch failed: 403) | n/a | n/a | Single-provider corridor page | Single provider | unknown |
| 3 | https://www.riamoneytransfer.com/en-us/send-money-to-armenia/ | (fetch failed: 403) | n/a | n/a | Single provider. Search summary mentions a first-transfer promo **(snippet only, unverified)** | Single provider | unknown |
| 4 | https://wise.com/vn/send-money/send-money-to-armenia | Send Money đến Armenia \| Money Transfer đến Armenia - Wise | Send money đến Armenia | ~800-900 core | Single-provider calculator (Vietnam→AM, USD). "We use the mid-market exchange rate — the fairest rate — and always show your fees upfront." | Wrong locale (Vietnam) ranks in a US-only search. Single provider. Internally inconsistent fee figures (49,33 vs 49,67 USD). | © 2026, live calculator |
| 5 | https://www.xe.com/compare/best-amd-exchange-rates | Best Armenian Dram exchange rate \| Xe | Best Armenian Dram exchange rate | ~600-700 body | Provider comparison tool for USD→AMD. **Table empty: "We currently don't have data for this currency."** | Comparison tool exists, but shows no AMD data. | No date. © 1995-2026 |

  *Additional fetched (ranked for the hy US→AM query, en results):*

| # | URL | Title | H1 | ~Words | What it does | Weaknesses | Freshness (evidence) |
|---|-----|-------|----|--------|--------------|-----------|----------------------|
| 6 | https://moneytransfers.com/send-money/armenia/usa | Send Money to Armenia from US \| Best USD-AMD Exchange Rates | Compare the best ways to send money from United States to Armenia | ~3,000-3,500 | **Real comparison with FX margin vs mid-market** (e.g. Wise "+0.21%", Xe "+5.82%") and recipient amount | US only. Few providers (inconsistent count: 3 vs 5). Two different mid-market rates on one page. A copy-paste error ("sending USD to Mexico"). | "Last updated on 28 September 2026" (weekly). **Strongest en competitor.** |
| 7 | https://www.remitly.com/us/en/armenia/pricing | Rates and fees when sending from the United States to Armenia \| Remitly | Remitly new customer rates for sending from the United States to Armenia | ~1,300 | Single-provider fee table (e.g. "Below $200: $6.99 / $7.99") | Contradicts itself ("The fee for all transfers is $3.99" vs the tiered table). No FX markup disclosed. | © 2012-2026. No date. |

- **Gaps / targets:**
  - **No en page covers RU→AM or AM→abroad.** Finder and moneytransfers.com are US-centric. Relocants and expats in Armenia sending out (AM→EU/US) have no comparison page (from what was observed; the en sample is small).
  - **Xe's AMD comparison has no data.** A provider comparison with total cost in AMD is an open niche even in English.
  - **Provider pages contradict themselves** (Remitly $3.99 vs tiered table; Wise 49,33 vs 49,67 USD). A neutral calculator showing total cost (fee + FX margin) has room.
  - **SWIFT from Armenian banks:** no en/hy page compares the outgoing SWIFT tariffs of Armenian banks (hy query "SWIFT փոխանցում միջնորդավճար…" found only Unibank's tariff page and a notice; the notice was not fetched).
- **Difficulty:** **High** for "send money to armenia" heads, which belong to global brands (Wise, Remitly, MoneyGram, Ria, Revolut, Xe) and affiliates (Finder, moneytransfers.com). **Medium** for long-tail ones: "send money from armenia to …", "russia to armenia transfer fees", "swift fees armenian banks", and "wise vs unistream armenia" (the comparison term is a hypothesis, not observed).
- **Verify in Yandex Wordstat / Google Keyword Planner:**
  - send money to armenia
  - send money to armenia fees
  - cheapest way to send money to armenia
  - transfer money to armenia from usa
  - send money from armenia
  - wise armenia
  - remitly armenia
  - money transfer to armenia from russia
  - western union armenia

---

#### Boundary notes

- **Currency converter page (d) owns:** "курс драма к рублю", "rub to amd", "usd to amd", "best armenian dram exchange rate" (Xe title), and Latin-script "dramakan poxancum rusastanic hayastan". That SERP returned only RUB→AMD converter pages (moneyconvert, valutafx, wise converter), so Google treats it as a rate intent. Transfers should **link to** the converter for the mid-market rate and must not target these terms.
- **Ambiguous, recommend transfers owns:** "перевод в армению в драмах", "перевод денег в армению в долларах". These ask about payout currency within a transfer, not the rate.
- **Ambiguous, recommend converter owns:** "курс юнистрим армения" / "курс перевода" (rate-only phrasing, not observed in SERPs; hypothesis).
- **Sole-proprietor/ИП page (b) owns:** "платежи в армению для юридических лиц и ИП" (tochka.com ranked for the ru primary with a B2B page) and business-account transfer tariffs (Ameriabank corporate leaflet).
- **Not this site:** remittance statistics queries ("переводы из россии в армению объем", CBA statistics) are news intent and appear in SERPs (finance.mail.ru, armenpress). No page should target them.
- **Car import page (c):** cash import declaration (sostav mentions "свыше 10 000 долларов в эквиваленте" cash declaration) is customs or cash, not transfers. Leave it out of transfers, or link to (c) only if (c) covers cash declaration.

#### Conflicts / unverified items to carry into data work (do not use as values)
- **Zolotaya Korona status in Armenia: conflict: true.** easypay.world (fetched, 17.08.2026): stopped 24.07.2026. visasam (02.10.2026) and brobank: not usable. DTF 5019305 ("25 апр", year unclear): "широко представлена". A Wikipedia snippet saying activities ended in October 2012 was snippet only, not fetched.
- **Western Union in Armenia:** a search summary cited azatutyun.am (https://www.azatutyun.am/a/1597018.html) that the CBA banned Western Union. **Snippet only, unverified; not fetched.**
- **UBPay fee:** unibank.am news 30.09.2024 says "0% … / 1% …"; the UBPay PDF ("05.03.25") says Russia 2.00%. **conflict: true** until a current unibank.am tariff is fetched.
- **Unistream in Armenia:** a search summary of interfax.ru/world/914321 says 8 of 18 Armenian banks stopped working with Unistream (date not shown). **Snippet only.**

#### Queries run (log)

**ru (20)**
1. перевод денег в армению комиссия (first attempt: too_many_requests error; second attempt succeeded)
2. как перевести деньги в армению из россии 2026
3. перевод в армению золотая корона комиссия
4. юнистрим армения комиссия
5. перевод с карты на карту армения из россии
6. перевести деньги в ереван дешево
7. калькулятор перевода денег в армению сравнение комиссий
8. переводы в армению корона пей остановила (off-topic: coronavirus results)
9. контакт перевод в армению тарифы
10. перевод из армении в россию комиссия idram
11. перевод денег в армению сбербанк по номеру телефона комиссия
12. перевод в армению т-банк лимит комиссия
13. как отправить деньги в армению из сша или европы
14. перевод в армению без комиссии
15. перевод денег в армению из россии в долларах
16. перевод в армению вестерн юнион
17. перевод в арменю деньги с россии (typo)
18. swift перевод в армению комиссия банк
19. лимит перевода в армению из россии 2026
20. как перевести деньги из армении в россию

**hy (19)**
1. դրամական փոխանցում Ռուսաստանից Հայաստան միջնորդավճար
2. փոխանցման միջնորդավճար
3. դրամական փոխանցումներ Հայաստան
4. գումար փոխանցել արտասահման ամենաէժան
5. Ունիստրիմ փոխանցում միջնորդավճար
6. միջազգային փոխանցումներ սակագներ բանկ
7. dramakan poxancum rusastanic hayastan (Latin; converter results)
8. Idram փոխանցում Ռուսաստան միջնորդավճար
9. փող ուղարկել Ռուսաստանից Հայաստան
10. Զոլոտայա Կորոնա փոխանցումներ Հայաստան (off-topic: gold trade)
11. SWIFT փոխանցում միջնորդավճար ԱՄՆ դոլար բանկ Հայաստան
12. արագ դրամական փոխանցումներ բանկ միջնորդավճար Unistream Contact Korona
13. փոխանցում քարտից քարտ արտերկիր
14. poxancum rusastan hayastan mijnordavchar (Latin; off-topic)
15. ինչպես գումար փոխանցել ԱՄՆ-ից Հայաստան (returned en pages)
16. Western Union Հայաստան փոխանցում (no Armenia results)
17. դրամական փոխանցումների համակարգեր Հայաստանում սակագներ
18. փոխանցման միջնորդավճարի հաշվիչ
19. gumar poxancel rusastanic hayastan inchpes (Latin)

**en (1 run; 3 blocked by the search budget)**
1. send money to armenia fees (run)
2. cheapest way to send money to armenia (blocked: budget exhausted)
3. transfer money to armenia from usa (blocked)
4. wise armenia send money amd (blocked)
- Planned but not run, to rerun later: send money from armenia to usa, money transfer russia to armenia, western union armenia, swift transfer armenia fees, best way to send money to armenia, remitly armenia, send money to yerevan, unistream armenia, idram international transfer, send money to armenia from uk / germany.

**Pages fetched (WebFetch):** habr 1066470 OK; sovcombank journal FAIL (TLS); revolut ru-EE FAIL 403; habr 668312 FAIL 403; vtb.ru FAIL (TLS); dtf 5019305 OK; sostav 91033 OK; brobank OK; visasam OK; easypay.world OK; armenpress 1022664 OK; unibank ubpay PDF OK (read locally); news.am 24412 FAIL 403; unibank news 8164 OK; ameriabank PDF downloaded but text not extractable; finder OK; moneygram FAIL 403; ria FAIL 403; wise vn OK; xe compare OK; remitly pricing OK; moneytransfers.com OK; worldbank remittanceprices FAIL 403; revolut en-SI FAIL 403.

---

## Verify in Yandex Wordstat: ru master list

Paste the monthly volume (Wordstat "Россия + Армения", or say which region you used) into the Volume column. I will then re-pick primaries where a variant beats the current one and re-rank the targets. These merge the per-language lists from each section.

| Page | Keyword | Volume (paste) |
|---|---|---|
| salary | калькулятор зарплаты армения | |
| salary | калькулятор зп армения | |
| salary | зарплата на руки армения | |
| salary | зарплата чистыми армения | |
| salary | грязная зарплата армения | |
| salary | из чистой в грязную армения | |
| salary | подоходный налог армения | |
| salary | подоходный налог армения 2026 | |
| salary | налоги с зарплаты армения | |
| salary | налог на зарплату в армении | |
| salary | пенсионный взнос армения | |
| salary | гербовый сбор армения | |
| salary | медстраховка армения зарплата | |
| salary | калькулятор зарплаты ереван | |
| salary | налоговый калькулятор армения (ownership: your call) | |
| entrepreneur | налоги ип армения | |
| entrepreneur | налог ип армения калькулятор | |
| entrepreneur | калькулятор налога ип армения | |
| entrepreneur | оборотный налог армения | |
| entrepreneur | налог с оборота армения | |
| entrepreneur | ип армения налог с оборота 2026 | |
| entrepreneur | ип в армении для айтишника | |
| entrepreneur | ип армения it 1% | |
| entrepreneur | микробизнес армения | |
| entrepreneur | микропредприниматель армения | |
| entrepreneur | ип армения общая система | |
| entrepreneur | ип армения соцвзносы | |
| entrepreneur | налоги для фрилансера в армении | |
| entrepreneur | ип армения ндс порог | |
| entrepreneur | ип в армении нерезидент налоги | |
| car-customs | растаможка авто в армении | |
| car-customs | растаможка в армении калькулятор | |
| car-customs | растаможка армения 2026 | |
| car-customs | растоможка армения (typo) | |
| car-customs | расстаможка армения (typo) | |
| car-customs | пошлина на авто армения | |
| car-customs | растаможка авто из сша в армению | |
| car-customs | растаможка авто из грузии в армению | |
| car-customs | растаможка электромобиля армения | |
| car-customs | растаможка авто из армении в россию (sizing only: future page) | |
| car-customs | авто с армянским учетом (sizing only: future page) | |
| currency | конвертер драм рубль | |
| currency | курс драма к рублю | |
| currency | драм рубль | |
| currency | курс рубля к драму | |
| currency | рубли в драмы | |
| currency | драмы в рубли | |
| currency | курс драмма (typo) | |
| currency | курс доллара в ереване | |
| currency | курс доллара в армении | |
| currency | курс валют армения | |
| currency | курс валют ереван | |
| currency | курс евро к драму | |
| currency | 100 долларов в драмах | |
| currency | 1000 рублей в драмах | |
| currency | обмен валют ереван | |
| currency | где поменять рубли в ереване | |
| currency | курс рубля в армении наличные | |
| transfers | перевод денег в армению | |
| transfers | перевод денег в армению комиссия | |
| transfers | перевод в армению из россии | |
| transfers | как перевести деньги в армению | |
| transfers | как перевести деньги в армению из россии 2026 | |
| transfers | перевод в армению без комиссии | |
| transfers | калькулятор перевода в армению | |
| transfers | перевод в ереван | |
| transfers | перевод в арменю (typo) | |
| transfers | юнистрим армения | |
| transfers | золотая корона армения | |
| transfers | корона пей армения | |
| transfers | контакт армения перевод | |
| transfers | перевод с карты на карту армения | |
| transfers | перевод в армению сбербанк | |
| transfers | перевод в армению т-банк | |
| transfers | перевод в армению втб | |
| transfers | idpay армения | |
| transfers | swift перевод в армению | |
| transfers | как перевести деньги из армении в россию | |

### hy / en: check in Google Keyword Planner (Wordstat hy volume is small)

Full lists are in each section's "Verify" line. Priority:

- **salary:** աշխատավարձի հաշվիչ · մաքուր աշխատավարձ · ashxatavardzi hashvich · armenia salary calculator · net salary armenia · take home pay armenia
- **entrepreneur:** ԱՁ հարկեր · ԱՁ հարկերի հաշվիչ · շրջանառության հարկ · շրջանառության հարկ 2026 · միկրոձեռնարկատիրություն · armenia turnover tax · armenia individual entrepreneur tax
- **car-customs:** մաքսազերծման հաշվիչ · մեքենայի մաքսազերծում · էլեկտրամոբիլի մաքսազերծում · maqsazercum · armenia car import duty calculator · import car to armenia · armenia electric car import duty
- **currency:** դոլարի փոխարժեք · ռուբլու փոխարժեք · փոխարժեք · poxarjeq · dolar dram · rubli dram · usd to amd · amd to usd · armenian dram exchange rate · best exchange rate yerevan
- **transfers:** դրամական փոխանցում · փոխանցման միջնորդավճար · poxancum · send money to armenia · cheapest way to send money to armenia · send money from armenia · money transfer to armenia from russia

## Conflicts found on competitor pages (for the data/rates work, not keyword work)

These came up during research. They are competitor claims only and must be resolved from SRC / arlis.am / CBA / the providers before any calculator ships. Details and URLs are in each section.

- **Salary:** stamp duty: nativeteams.com says "AMD 1,500 to AMD 15,000"; hrdrone.am, how2b.am, b24.am and rivermate.com say 1,000 AMD up to 1,000,000. `conflict: true`.
- **Entrepreneur:** IT turnover-tax rate (1% on how2b.am / armgate.am vs 5% on hartak.am / 168.am); turnover ceiling (115M on armgate.am vs 120M on vc.ru / 168.am); "other services" rate (10% vs 5%). Family-business regime: no current source found, so it may not exist. A micro-business threshold change may land for 2027 (unconfirmed). `conflict: true`.
- **Car customs:** exim.src.am has a menu item "Personal calculator until 31.08.2026", which may mean a rules change for personal imports. Verify before building.
- **Transfers:** Zolotaya Korona status in Armenia (stopped 24.07.2026 per easypay.world vs "широко представлена" per DTF); UBPay fee (0% / 1% in 2024 news vs 2.00% in 2025 PDF). Western Union ban and the Unistream bank exits are snippet only, unverified. `conflict: true`.

## Next steps

1. **Finish English** (next session, fresh search budget). Planned queries are in the "Queries run (log)" of salary, entrepreneur, currency and transfers. Priority: entrepreneur and currency, which have 0 English queries.
2. **Wordstat volumes:** paste into the table above. I'll update primaries and difficulty notes.
3. **Ownership decision:** "налоговый калькулятор армения / armenia tax calculator" (default: salary).
4. **Future page candidate:** `armenia-to-russia-car` (растаможка авто из Армении в Россию), only if Wordstat shows meaningful volume.
5. **Spot-check top SERPs** for the 5 ru primaries in real Yandex/Google from Armenia. This tool's index is not Google.am.

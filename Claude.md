# Research rules
- Never state a rate, threshold, fee or law from memory. Every number must come from a page you fetched in this session.
- Every value is saved with: source_url, source_name, effective_from, last_verified (today's date), and a short quote or table location proving it.
- Prefer primary sources: Armenian State Revenue Committee (petekamutner.am), arlis.am, Customs (SRC), Central Bank of Armenia (cba.am), bank websites.
- If two sources conflict, keep both and mark conflict: true. If nothing is found, write null. Never guess.
- Sources may be in Armenian or Russian: read them in the original language.

# Design and build rules
- /docs/design.md is the main source of truth for visuals, but it also can be overwrited if user wants. Never invent colors, fonts, spacing or components that contradict it. If something is missing from it, pick the simplest option, and list the assumption in /docs/design-gaps.md.
- All design values live as tokens (CSS variables / Tailwind theme), never hardcoded in components.
- Fonts must fully support Armenian, Cyrillic and Latin glyphs (check this before choosing; Noto Sans Armenian or a family with real Armenian coverage). Self-host them.
- Mobile-first. Test at 360px, 768px, 1280px.
- Numbers, rates and text come only from /src/data/*.json and i18n files.
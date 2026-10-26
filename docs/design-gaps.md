# Design gaps and assumptions

Required by `CLAUDE.md`: where `docs/DESIGN.md` doesn't specify something, the
simplest option was taken and recorded here. Every entry says what the design
doc says, what was built, and why.

Last updated: 2026-10-26 (project skeleton).

---

## 1. Typeface substituted: OTSono → Noto Sans + Noto Sans Armenian

**DESIGN.md says:** OTSono is the sole typeface, covering every size from 10px
labels to 90px display. "Do not use system fonts as fallback for display sizes
— OTSono at 60px+ with -0.03em tracking is signature."

**CLAUDE.md says:** "Fonts must fully support Armenian, Cyrillic and Latin
glyphs (check this before choosing…). Self-host them."

**Conflict:** OT Sono is a commercial 2023 release from Omnitype. No licensed
files are available to this project, and its Armenian coverage is unverified.
DESIGN.md's own fallback suggestion (Inter) has no Armenian coverage either.

**Decision (confirmed with the project owner):** use Noto Sans for Latin and
Cyrillic, Noto Sans Armenian for Armenian.

**Coverage verified 2026-10-26** against the Google Fonts CDN before the files
were committed:

| Family | Version | Subsets used | Range confirmed |
|---|---|---|---|
| Noto Sans | v42 | latin, latin-ext, cyrillic, cyrillic-ext | Cyrillic `U+0400-045F` |
| Noto Sans Armenian | v47 | armenian | Armenian `U+0530-058F` |

Both are variable fonts covering weight 400–500 in a single file, so each
subset is declared once with `font-weight: 400 500` rather than shipped twice.
The weights match DESIGN.md's 400/500-only rule. Total: 5 files, 324 KB, and
`unicode-range` means a Russian page never downloads the Armenian file.

**Token naming:** `--font-sans` is the real token. `--font-otsono` is kept as
an alias pointing at it, so any component or future snippet written against
DESIGN.md's token name still resolves. If OTSono is licensed later, only
`--font-sans` in `src/styles/tokens.css` and the `@font-face` block in
`global.css` need to change.

**Open:** every other DESIGN.md token (colors, radii, spacing, weights,
tracking) is used verbatim. Only the family changed.

---

## 2. Layout values given as ranges

**DESIGN.md says:** section gap 80–120px, card padding 32–48px, element gap
16–24px.

**Built:** both ends kept as separate tokens (`--section-gap-min` /
`--section-gap-max`, and so on) rather than picking a number and losing the
range. Components use the min at mobile and the max from 768px up. No
component hardcodes a pixel value.

---

## 3. Type scale is desktop-sized; mobile steps down

**DESIGN.md says:** display 90px, heading-lg 60px, heading 28px. It does not
give responsive behaviour, and `CLAUDE.md` requires mobile-first with testing
at 360/768/1280px.

**Built:** the home page `h1` uses `--text-heading` (28px) below 768px and
`--text-heading-lg` (60px) above. The 90px display size is defined as a token
but not yet used; it needs a viewport where it doesn't overflow 360px.

---

## 4. White card needs a border that DESIGN.md doesn't mention

**DESIGN.md says:** surfaces are white → parchment → lime → dark island,
separated by tone, never by shadow.

**Problem:** a white card on the white page canvas has no tonal difference, so
it isn't visible as a surface.

**Built:** `Card surface="white"` gets a 1px `--color-ash` border, which is
the token DESIGN.md already assigns to "borders, dividers, subtle structural
lines". No shadow was added. The parchment and dark variants need no border.

---

## 5. Focus states are unspecified

**DESIGN.md says:** nothing about keyboard focus.

**Built:** `:focus-visible` draws a 2px `--color-off-black-ink` outline with a
2px offset. Ink rather than lime, because lime on the lime button would be
invisible. A skip link uses the lime pill treatment, matching the primary
button spec.

---

## 6. No dark mode

**DESIGN.md says:** "Theme: light", and the palette has no dark-mode values.

**Built:** light only. No `prefers-color-scheme` handling. The "dark island"
surface is a design element within the light theme, not a dark theme.

---

## 7. Favicon and OG image are placeholders

**DESIGN.md says:** the logo is an OTSono wordmark; no favicon or social image
spec.

**Built:** `public/favicon.svg` is a lime rounded square with three ink rules,
built from palette tokens only. `og:image` points at `/og-default.png`, **which
does not exist yet** — social previews will show no image until it is added.

---

## 8. Root redirect: two mechanisms, one deliberate winner

Not a design question, but it belongs with the recorded decisions.

The site prefixes every locale (`/ru/`, `/hy/`, `/en/`), so `/` has no content.

- `public/_redirects` issues a **302** at the Cloudflare edge. 302 rather than
  301 because the default locale is a product decision that may change, and a
  cached permanent redirect is hard to take back.
- `src/pages/index.astro` is the fallback for anything that bypasses the edge
  rule and for `astro preview`. It is `noindex`, carries a canonical pointing
  at `/ru/`, and refreshes at **0 seconds**.

**Verified 2026-10-26:** Astro's built-in `redirectToDefaultLocale` was tried
first and rejected. It overrode `index.astro` and emitted a **2-second** meta
refresh, which is slow for readers and read as a soft redirect by search
engines. The option is now explicitly `false`, which also removed a
route-conflict warning from the build.

**Still to confirm on a real deployment:** whether Cloudflare Pages serves the
built `/index.html` in preference to the `_redirects` rule. Both paths lead to
`/ru/`, so the behaviour is correct either way; only the status code differs
(302 at the edge versus 200 plus a client-side refresh).

---

## 9. `x-default` points at `/ru/`, not `/`

hreflang `x-default` points at the default locale's real page rather than the
bare root. Pointing it at `/` would send search engines through a redirect to
reach a page they were already told about. Asserted in `tests/seo.test.ts`.

---

## 10. Node version pinned

Astro 7.4.2 requires Node ≥22.23.4; the machine had 22.23.3 and the build
refused to run. Node 22.23.4 was installed via nvm and pinned in `.nvmrc`.
TypeScript is held at 6.x because `astro check` does not yet support
TypeScript 7.

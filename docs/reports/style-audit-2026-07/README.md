# Style Audit — July 2026

> Focused audit of **style bugs** across the portfolio: text sizes that render too
> small, colors that bypass the semantic token system, heading-hierarchy violations,
> and the test-suite false positives that let all of this ship unnoticed — **while
> preserving the pixel-art retro-gaming identity**.

- **Audited build:** Astro `^6.4.8` · Tailwind CSS `^4.3.1` · TypeScript `5.9.3` · Bun
- **Date:** 2026-07-05 · **Base commit:** `4dba60c` (develop)
- **Scope:** Static analysis of `src/**/*.astro` + `src/app/styles/*` + `tests/**` (class-level
  grep sweep + file-by-file reading). Fixes land on branch `claude/style-bugs-text-sizing-fg813f`.
- **Method note:** The existing automated test suite was **not** used as evidence — it produces
  verified false positives (see [`04-test-false-positives.md`](./04-test-false-positives.md)).
- **Related:** [`../portfolio-audit-2026-06/01-design-system.md`](../portfolio-audit-2026-06/01-design-system.md)
  already graded typography as the weakest part of the design system; this audit turns that
  observation into a file:line inventory and an enforceable standard.

---

## How to read this report

| # | File | What it covers |
|---|------|----------------|
| — | [`README.md`](./README.md) | This index, summary, severity scoreboard |
| 01 | [`01-typography.md`](./01-typography.md) | Tiny-text inventory (8–11px), body copy below 16px, target classes per finding |
| 02 | [`02-colors.md`](./02-colors.md) | Raw palette colors bypassing semantic tokens, hardcoded status colors, low-contrast combos, token-naming stutter |
| 03 | [`03-headings.md`](./03-headings.md) | Missing `h1` on sub-pages, heading/body size inversions, wrong heading levels in cards |
| 04 | [`04-test-false-positives.md`](./04-test-false-positives.md) | Tests that pass regardless of implementation, and their repairs |

**Evidence convention:** every finding is ✅ **Verified** — confirmed by reading the source
file (path:line given against base commit `4dba60c`).

The prescriptive standard that resolves these findings lives in
[`../../STYLE-GUIDE.md`](../../STYLE-GUIDE.md) (typography scale, token naming, heading rules)
and is enforced by `tests/e2e/typography.spec.ts`.

---

## Executive summary

The design system has strong **color tokens** (`light-dark()` semantic tokens in
`src/app/styles/colors.css`) but **no typography scale at all**: no size tokens, no global
heading sizes, no documented floor. Sizing is 100% ad-hoc per component, and it drifted small:
**82× `text-xs`, 42× `text-[10px]`, 8× `text-[9px]`, 6× `text-[8px]`, 2× `text-[11px]`**
across 14 files — including real reading copy (card descriptions, About bio, Research prose,
footer, HUD readouts, terminal output) at 14px or below, rendered in pixel fonts (VT323,
Press Start 2P) that read visually smaller than their nominal size.

On the color side, the semantic tokens exist but are widely bypassed with raw
`neutral-*`/`gray-*` utilities and hardcoded status colors (`emerald`, `red-500`,
`yellow-500`, `green-500`), plus a handful of sub-AA opacity combos
(`text-red-400/40` at 9px). The token names themselves stutter in Tailwind 4 utilities
(`--color-text-main` → `text-text-main`, `--color-border-subtle` → `border-border-subtle`).

Heading structure is correct on the home page but broken on every sub-page (no `h1`), and
inverted in `ResearchContent.astro` where `h2` headings render at body-text size on mobile.

None of this was caught because the style-adjacent tests either assert nothing (theme-toggle
test with zero `expect`s) or are skipped in CI (all visual-regression tests).

## Severity scoreboard

| Area | Severity | Count | Verdict |
|------|:--------:|:-----:|---------|
| Typography floor | **High** | 58 sub-12px + widespread 12–14px body copy | Real reading text below legibility floor |
| Color tokens | **Medium** | ~60 raw-palette usages + 6 low-contrast combos | Tokens exist, adoption incomplete |
| Token naming | **Medium** | 189 stuttering utility usages | `text-text-*` / `border-border-*` confusing |
| Heading hierarchy | **High** | every sub-page (EN+ES) | A11y/SEO: no `h1`, level inversions |
| Test suite | **High** | 6 false-positive patterns | Green suite ≠ working styles |

## Resolution (this branch)

1. **Standard:** body ≥ 16px (`text-base`), secondary ≥ 14px (`text-sm`), absolute floor
   12px (`text-xs`, decorative labels only). Arbitrary `text-[Npx]` with N < 12 banned.
2. **Tokens renamed:** `--color-text-*` → `--color-content*`, `--color-border-*` →
   `--color-edge-*` (utilities: `text-content-strong`, `border-edge-subtle`, …).
3. **Headings:** exactly one `h1` per page; no skipped levels; heading ≥ its body text.
4. **Enforcement:** new `tests/e2e/typography.spec.ts` (written first, TDD red → green) +
   repaired false-positive tests.

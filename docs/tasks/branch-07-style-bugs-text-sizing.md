# Branch: claude/style-bugs-text-sizing-fg813f

**Base**: `origin/develop` (`4dba60c`)
**Prefix**: `fix/` (style/a11y bug-fix work; branch name fixed by the session)
**Priority**: High
**Why**: Reading text across the site renders too small (58 elements below 12px, body copy at
14px in pixel fonts), colors bypass the semantic token system, sub-pages have no `h1`, and the
E2E suite reports green without asserting any of it (verified false positives). Full findings:
[`../reports/style-audit-2026-07/`](../reports/style-audit-2026-07/README.md). New standard:
[`../STYLE-GUIDE.md`](../STYLE-GUIDE.md).

---

## Task 7.1 — Document the audit + prescriptive standard

**Scope**: `docs/reports/style-audit-2026-07/`, `docs/STYLE-GUIDE.md`, `CLAUDE.md`, `docs/tasks/`
**Action**: Write the file:line audit (typography, colors, headings, test false positives) and
the prescriptive STYLE-GUIDE (16/14/12 scale, token naming, heading rules, VT323 +1 rule).

### Checklist

- [x] `docs/reports/style-audit-2026-07/` — README + 01-typography + 02-colors + 03-headings + 04-test-false-positives
- [x] `docs/STYLE-GUIDE.md` — prescriptive typography/color/heading standard
- [x] `CLAUDE.md` — Styling section links the scale; Accessibility section pins "one h1, no skips"
- [x] `docs/tasks/README.md` — branch-07 row added

### Acceptance Criteria

- Every fix in tasks 7.3–7.6 traces back to a documented finding with a target class

## Task 7.2 — TDD: typography spec first, repair false positives

**Scope**: `tests/e2e/`
**Action**: Write `typography.spec.ts` BEFORE touching components (must fail red against
`4dba60c`), and give the false-positive tests real assertions. The legacy suite is not used as
evidence.

### Checklist

- [x] `tests/e2e/typography.spec.ts`: ≥12px floor, content `p` ≥16px, one `h1`, no level skips, heading ≥ body — EN+ES key pages, desktop + mobile viewports, chromium-only
- [x] Record the red run (failures against unfixed components) in this file
- [x] `homepage.spec.ts`: theme-toggle test asserts the `dark` class flip; `await setViewportSize`; assert the Hero `h1` specifically
- [x] `pages.spec.ts`: navigation test actually navigates; links test cannot pass with 0 assertions

**TDD red run (against base `4dba60c`, chromium): 50 failed / 14 passed.**
Failure classes matched the audit exactly — 16× "expected exactly one h1, got 0" (every
sub-page EN+ES, both viewports), sub-12px floor violations (project-card tags 9px, feature
chips 8px, blog/devlog tag chips 9px, hero/atena labels 10px), and reading copy at 14px
(About bio, hero credential). The run also surfaced offenders the static sweep missed:
devlog timeline `sprint`/`release` labels (9px) and version numbers (10px), and
Experience "COMPANY / ORGANIZATION" labels (10px) — added to the 7.4 fix scope.

### Acceptance Criteria

- Typography spec fails against base commit, passes after 7.3–7.6
- Repaired tests fail if the theme toggle or nav links break

## Task 7.3 — Rename semantic tokens (utility stutter)

**Scope**: `src/app/styles/colors.css`, `src/app/styles/global.css`, all `src/**/*.astro`
**Action**: `--color-text-main/body/muted` → `--color-content-strong/content/content-muted`;
`--color-border-subtle/strong` → `--color-edge-subtle/edge-strong`; update every utility usage
(189) and every `var(--color-…)` reference (body color, retro shadow scale, scrollbar, inline
arbitrary shadows).

### Checklist

- [x] Tokens renamed in `colors.css` (including `-light`/`-dark` component vars)
- [x] `global.css` scrollbar refs updated
- [x] Mass replace in `src`: `text-text-*` → `text-content*`, `border-border-*` → `border-edge-*`, `var(--color-border-strong)` → `var(--color-edge-strong)`
- [x] `grep -rn 'text-text-\|border-border-\|--color-text-\|--color-border-' src` returns 0 matches

### Acceptance Criteria

- `bun run build` green; retro shadows still render (they depend on the renamed var)

## Task 7.4 — Enforce the 16/14/12 typography floor

**Scope**: 14 files listed in [`01-typography.md`](../reports/style-audit-2026-07/01-typography.md) §3
**Action**: Apply the Target column: body copy → `text-base`, secondary → `text-sm`, decorative
labels → `text-xs`; delete every `text-[8px]/[9px]/[10px]/[11px]`.

### Checklist

- [x] All §3.1 body-copy findings at `text-base` (HUD/terminal reading text `text-sm` per VT323 exception table)
- [x] All §3.2 labels at `text-xs` minimum; zero arbitrary sub-12px sizes in `src`
- [x] `atena.astro` EN/ES mirrors identical
- [x] HUD and terminal layouts verified at 1280px and 375px

### Acceptance Criteria

- `grep -rn 'text-\[8px\]\|text-\[9px\]\|text-\[10px\]\|text-\[11px\]' src` returns 0 matches
- Typography spec floor assertions pass

## Task 7.5 — Semantic color tokens everywhere

**Scope**: files listed in [`02-colors.md`](../reports/style-audit-2026-07/02-colors.md) §2–4
**Action**: raw `neutral-*`/`gray-*` text colors → `content` tokens; hardcoded status colors →
`success/warning/error` tokens; remove sub-80% opacity on small text. Terminal hexes stay.

### Checklist

- [x] §2 table applied (incl. `TitleSection` + dead `font-semibold` removed)
- [x] §3 status colors tokenized (incl. JS strings in RecruiterHUD)
- [x] §4 contrast fixes applied

### Acceptance Criteria

- No `text-gray-*`/`text-neutral-*` on body text in the §2 files; a11y spec (chromium) not worse

## Task 7.6 — Heading hierarchy

**Scope**: files listed in [`03-headings.md`](../reports/style-audit-2026-07/03-headings.md)
**Action**: promote the top heading of each sub-page (EN+ES) to `h1`; BlogCard/DevlogCard
`h2` → `h3`; ResearchContent `h2` sizes → `text-xl sm:text-2xl`.

### Checklist

- [x] One `h1` per page across EN+ES key pages
- [x] No skipped levels (verify after card demotions)
- [x] ResearchContent headings larger than their body text at all breakpoints

### Acceptance Criteria

- Typography spec heading assertions pass on every key page

## Task 7.7 — Verification & delivery

### Checklist

- [x] `bun run build` (astro check) green
- [x] `typography.spec.ts` green (chromium); repaired `homepage`/`pages` specs green; `a11y.spec.ts` chromium not worse
- [x] `bun run lint` + `bun run format`
- [x] Visual snapshot baselines: regenerated for chromium + Mobile Chrome (18 green); firefox/webkit/Mobile Safari baselines are known-stale (those browsers cannot run in this sandbox) — regenerate with `bun run test:snapshots:all` on a full local setup
- [x] Conventional commits (docs / test / refactor / fix split); push; draft PR → `develop`

---

## Commit Messages

```
docs(reports): add style audit 2026-07 (typography, colors, headings, tests)
docs(style): add STYLE-GUIDE and typography standard to CLAUDE.md
test(e2e): add typography floor spec and fix false-positive assertions
refactor(styles): rename semantic tokens to avoid utility stutter
fix(styles): enforce 16/14/12 typography floor
fix(styles): replace raw palette colors with semantic tokens
fix(a11y): restore heading hierarchy (one h1 per page, card h3)
```

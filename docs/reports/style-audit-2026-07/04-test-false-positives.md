# 04 · Test False Positives — Why the Suite Stayed Green

[← Back to index](./README.md) · Related: [`../portfolio-audit-2026-06/07-testing.md`](../portfolio-audit-2026-06/07-testing.md) ·
[`../../TESTING.md`](../../TESTING.md)

**Overall: D.** The E2E suite reports green while asserting almost nothing about styles — and
in several cases nothing at all. This is how 58 sub-12px text elements, token bypasses, and
missing `h1`s shipped without a single red test. Per the audit method, the suite was **not**
used as evidence for any style finding; everything in 01–03 was verified by reading source.

All findings ✅ verified at base commit `4dba60c`.

---

## 1. Tests that cannot fail

| File:line | Test | Defect | Repair (this branch) |
|---|---|---|---|
| `tests/e2e/homepage.spec.ts:49-58` | "should have theme toggle functionality" | Entire body wrapped in `if (await themeToggle.isVisible())`, **zero `expect` calls**. Toggle missing → silently passes. Toggle present → clicks, asserts nothing. | Assert the toggle exists, click it, assert `<html>` `dark` class flips, click again, assert it flips back |
| `tests/e2e/pages.spec.ts:54-74` | "should have working links" | Doubly guarded (`if (href && href !== '#')` + `if (response !== null)`): can execute the loop with **0 assertions** and pass | Assert `links.length > 0` first; assert every checked response status < 400 without null-swallowing |
| `tests/e2e/pages.spec.ts:44-52` | "should navigate between English pages" | Never navigates — only asserts `links.count() > 0` | Actually click a nav link and assert the URL and the target page's `h1` |

## 2. Tests weaker than their name claims

| File:line | Defect | Repair |
|---|---|---|
| `tests/e2e/homepage.spec.ts:27` | `page.setViewportSize(...)` not awaited — the mobile assertion races the resize | `await` it |
| `tests/e2e/homepage.spec.ts:11-13,45-46` | "proper heading hierarchy" comment, but the assertion is "any h1–h6 is visible" | Assert the specific Hero `h1`; real hierarchy checks move to `typography.spec.ts` |

## 3. Style coverage that never runs

- `tests/e2e/visual.spec.ts:79,101` — **every** visual-regression test is
  `test.skip(!!process.env.CI, …)`: the only tests capable of catching size/color regressions
  never run in CI, while the suite reports green. Locally, `maxDiffPixelRatio: 0.05` lets up to
  5% of pixels change silently.
- No test anywhere asserts a computed `font-size`, a color token, or a heading outline.
- Unit-test coverage thresholds (90%) apply **only** to `src/shared/lib/i18n/**` and
  `src/shared/config/i18n/**` (`vitest.config.ts:15-18`) — all UI code is outside coverage.

**Scope note:** the CI-skip in `visual.spec.ts` is documented but intentionally **not changed**
in this branch (changing CI behavior is a separate decision). The 45 committed PNG baselines
will be stale after the typography fixes; regenerate with `bun run test:snapshots`.

## 4. Bug the false positive was hiding: no theme-toggle UI exists

Repairing the theme-toggle test (§1) exposed why it was written assertion-free: **the
`ThemeToggle` feature slice (`src/features/theme-toggle/`) is dead code — it is imported
nowhere.** `Header.astro:11` still documents "Features: ThemeToggle, LanguagePicker" but
renders neither; the LanguagePicker was intentionally moved into the RecruiterHUD panel
(PR #83), while the ThemeToggle was never mounted after the FSD migration. The site applies
the persisted theme via `Layout.astro`'s inline script, but ships **no UI to change it**.

The repaired test now asserts the mechanism that actually exists (localStorage → `dark`
class on load). 💡 **Follow-up decision for the owner:** mount `ThemeToggle` (e.g. in the
header actions or the HUD panel, next to the language picker) or delete the dead slice and
update `docs/features-catalog.md` + the `Header.astro` comment.

## 5. New enforcement added (TDD)

`tests/e2e/typography.spec.ts` (written **before** the component fixes; red against base
commit, green after):

1. Every visible text element ≥ **12px** computed font-size.
2. Content paragraphs ≥ **16px**; any `main p` ≥ 14px.
3. Exactly **one `h1`** per page.
4. No skipped heading levels in DOM order.
5. Headings (h1–h3) ≥ the page's body text size.

Runs chromium-only (computed px sizes are engine-independent) over the key EN+ES pages at
desktop (1280×720) and mobile (375×667) viewports.

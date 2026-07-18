# Testing & Quality Tools

Reference for the tools this project actually uses to test performance, accessibility, and
cross-browser/device rendering. See [`docs/testing/`](./testing/README.md) for how to run them
locally and [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) for how they run in CI.

---

## 1. Performance, Accessibility, Best Practices, SEO — Lighthouse CI

The project uses **[`@lhci/cli`](https://github.com/GoogleChrome/lighthouse-ci)**, not the
standalone `lighthouse` CLI, so runs are reproducible and config-driven.

- **Config**: [`.lighthouserc.json`](../.lighthouserc.json) — audits 10 pages (`/`, `/about`,
  `/projects`, `/blog`, `/blog/building-this-portfolio-with-astro-and-fsd/` + `/es` mirrors),
  3 runs averaged per page. Blog list and one article detail page per locale are in the audit
  set to catch `.prose`/MDX render regressions.
- **Thresholds** (enforced, `error` severity): Performance ≥ 90, Accessibility ≥ 95,
  Best Practices ≥ 90, SEO ≥ 90.
- **Run locally**:
    ```bash
    bun run build
    bun run lighthouse:collect
    bun run lighthouse:assert
    ```
- **In CI**: the `lighthouse` job in `ci.yml` runs this over the prebuilt `dist/`, uploads
  reports as the `lighthouse-reports` artifact (7-day retention).

## 2. Accessibility — `@axe-core/playwright`

Accessibility is scanned as part of the Playwright suite, not with a separate axe CLI.

- **Test file**: [`tests/e2e/a11y.spec.ts`](../tests/e2e/a11y.spec.ts) — runs `AxeBuilder` (WCAG
  2.0/2.1 A+AA tags) against 8 key routes (home, about, projects, research — both EN and ES),
  once in dark theme and once in light theme.
- **CI gate**: fails the build on any new `critical` or `serious` violation.
- **Run locally**: `bun run test tests/e2e/a11y.spec.ts`.

## 3. Cross-browser / cross-device — Playwright

- **Config**: [`playwright.config.ts`](../playwright.config.ts) — 5 projects: Chromium, Firefox,
  WebKit, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12).
- Also used for visual-regression screenshots (`tests/e2e/visual.spec.ts`) and general
  navigation/smoke tests (`tests/e2e/homepage.spec.ts`, `pages.spec.ts`).
- **Run locally**:
    ```bash
    bun run test          # all projects
    bun run test:ui       # interactive mode
    bun run test:local    # chromium + firefox + Mobile Chrome only (faster local loop)
    ```

## 4. Risk-based unit coverage — Vitest

- **Measured scope**: deterministic shared i18n behavior and content-ID locale helpers selected
  in `unitCoverageScope` inside [`vitest.config.ts`](../vitest.config.ts).
- **Thresholds**: 90% for lines, functions, branches and statements within that measured scope.
- **Meaning**: the percentage is not whole-repository coverage and does not include Astro
  components, browser interaction, static content or runtime-bound Content Collection queries.
- **Policy and behavior inventory**:
  [`docs/testing/UNIT-COVERAGE.md`](./testing/UNIT-COVERAGE.md).
- **Run locally**: `bun run test:unit` / `bun run test:unit:coverage`.
- **CI artifact**: `coverage-report`, retained for 7 days.

## 5. Bundle size

- `astro.config.mjs` wires `rollup-plugin-visualizer` — every `astro build` emits a treemap at
  `bundle-analysis/index.html`.
- `bun run bundle:analyze` (`scripts/analyze-bundle.js`) writes a plain-text size breakdown to
  `bundle-analysis/report.txt` (same logic CI runs inline in the `build` job).
- CI checks total `dist/` size against a 5MB threshold — logs a warning, does not fail the build.

---

## Not used by this project

Generic recommendations you'll see elsewhere (standalone `lighthouse`/`axe-cli`/`pa11y` CLIs,
`LinkChecker`, `structured-data-testing-tool`) are **not** part of this toolchain — the
equivalents above already cover the same ground in CI. Reach for one of those only if evaluating
a new tool to replace or complement the current setup.

---

## Contact

For questions about this testing setup:

- Email: hello@sandovaldavid.com
- Email: dev@sandovaldavid.com

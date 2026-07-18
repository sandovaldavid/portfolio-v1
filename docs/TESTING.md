# Testing and quality assurance

The portfolio uses a risk-based test pyramid with executable architecture rules, unit tests, browser tests, accessibility scans, generated-link validation, Lighthouse and bundle reporting.

## Local setup

```bash
bun install
```

## Repository quality

```bash
bun run check
```

This runs repository-wide Prettier validation, ESLint, the Feature-Sliced Design boundary checker, Astro diagnostics and strict tooling type-checking.

## Unit tests

```bash
bun run test:unit:ci
bun run test:unit:coverage
bun run test:unit:ui
```

The coverage thresholds apply only to the documented risk-based pure-unit scope in [`testing/UNIT-COVERAGE.md`](testing/UNIT-COVERAGE.md), not to the complete Astro repository.

## Playwright

```bash
bun run test:e2e:smoke
bun run test:e2e:desktop
bun run test:e2e:extended
RUN_VISUAL_TESTS=true bun run test:e2e:visual
bun run test:ui
bun run test:debug
```

- `test:e2e:smoke` checks critical English and Spanish routes in Chromium and blocks serious or critical axe violations.
- `test:e2e:desktop` runs Chromium, Firefox and WebKit.
- `test:e2e:extended` adds Mobile Chrome and Mobile Safari.
- `test:e2e:visual` validates the maintained Chromium, Firefox and Mobile Chrome snapshot baselines. Visual tests remain skipped in ordinary CI unless `RUN_VISUAL_TESTS=true`.

Playwright retains the first retry trace, failure screenshots and failure videos. CI uploads `playwright-report/`, `test-results/`, JSON and JUnit reports even when tests fail.

## Production build and generated links

```bash
bun run build
bun run check:links
```

`check:links` validates internal `href` and `src` references emitted into `dist/**/*.html`. External URLs are intentionally excluded to avoid making branch protection depend on third-party availability.

## Lighthouse

```bash
bun run build
bun run lighthouse:collect
bun run lighthouse:assert
```

The thresholds in `.lighthouserc.json` are:

- Performance: 90 or higher.
- Accessibility: 95 or higher.
- Best practices: 90 or higher.
- SEO: 90 or higher.

## Bundle analysis

```bash
bun run build
bun run bundle:analyze
```

The report is written to `bundle-analysis/report.txt`; the build also emits the Rollup visualizer output in `bundle-analysis/index.html`.

## CI policy

CI depth follows the branch lifecycle instead of running every expensive suite on every feature PR. The workflows, required check names, cache policy and artifact retention are documented in [`CI.md`](CI.md).

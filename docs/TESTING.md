# Testing and quality assurance

The portfolio uses executable repository rules, focused unit tests, browser tests, accessibility scans, documentation/generated-link validation, Lighthouse and route-level performance budgets.

## Local setup

```bash
bun install --frozen-lockfile
```

## Repository quality

```bash
bun run check
```

`check` runs repository-wide Prettier validation, active-document link validation, ESLint, the Feature-Sliced Design boundary checker, Astro diagnostics and strict tooling type-checking.

Documentation links can also be checked independently:

```bash
bun run check:docs
```

The documentation checker validates maintained Markdown and the archive indexes. Frozen historical report bodies are excluded because their point-in-time references are intentionally preserved.

## Unit tests

```bash
bun run test:unit:ci
bun run test:unit:coverage
bun run test:unit:ui
```

Coverage thresholds apply only to the risk-based pure-unit scope in [testing/UNIT-COVERAGE.md](testing/UNIT-COVERAGE.md), not the complete Astro repository.

## Playwright

```bash
bun run test:e2e:smoke
bun run test:e2e:desktop
bun run test:e2e:extended
RUN_VISUAL_TESTS=true bun run test:e2e:visual
bun run test:ui
bun run test:debug
```

- `test:e2e:smoke` checks critical English and Spanish routes in Chromium and blocks serious or critical Axe violations.
- `test:e2e:desktop` runs Chromium, Firefox and WebKit.
- `test:e2e:extended` adds Mobile Chrome and Mobile Safari.
- `test:e2e:visual` validates maintained Chromium, Firefox and Mobile Chrome snapshots and remains skipped in ordinary CI unless `RUN_VISUAL_TESTS=true`.

Playwright retains first-retry traces, failure screenshots and failure videos. CI uploads HTML, JSON and JUnit diagnostics even when tests fail.

## Production build and generated links

```bash
bun run build
bun run check:links
```

`check:links` validates internal `href` and `src` references emitted into `dist/**/*.html`. External URLs are excluded so branch protection does not depend on third-party availability.

## Lighthouse

```bash
bun run build
bun run lighthouse:collect
bun run lighthouse:assert
```

Thresholds are owned by `.lighthouserc.json`; do not duplicate or weaken them in prose.

## Route performance budgets

```bash
bun run build
bun run performance:check
```

Configuration lives in `performance-budgets.json`; methodology lives in [PERFORMANCE.md](PERFORMANCE.md). The gate measures representative English and Spanish home, about, projects and blog routes.

## Bundle inspection

```bash
bun run build
bun run bundle:analyze
bun run bundle:visualize
```

`bundle:analyze` produces an informational emitted-file inventory. `bundle:visualize` explicitly enables the Rollup treemap; route budgets remain the blocking performance gate.

## CI policy

Validation depth follows the branch lifecycle rather than running every expensive suite on every feature PR. Workflow responsibilities, stable required-check names, cache policy and artifact retention are documented in [CI.md](CI.md).

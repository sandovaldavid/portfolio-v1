# Testing and quality assurance

The portfolio uses executable repository rules, focused unit tests, browser tests, accessibility scans, documentation/generated-link validation, Lighthouse and route-level performance budgets.

## Local setup

```bash
bun install --frozen-lockfile
```

## Recommended command guide

The script list is intentionally broader than a minimal Astro project because it represents different validation depths. Use these groups instead of treating every command as part of the daily loop.

### Daily development

```bash
bun run dev:host
bun run check
bun run test:unit:ci
bun run build
bun run test:e2e:smoke
bun run test:e2e:report
```

- `dev:host` starts Astro on `0.0.0.0`; the Dev Container publishes it only on host loopback at `http://localhost:4321`.
- `check` is the main non-mutating quality gate and matches the PR validation contract.
- `test:unit:ci` is the deterministic one-shot unit suite.
- `test:e2e:smoke` is the fastest browser and accessibility gate.
- `test:e2e:report` serves the generated Playwright HTML report at `http://localhost:9323`.

### Focused quality commands

The `format:*`, `lint:*`, `typecheck:*`, `check:docs`, `check:devcontainer` and `check:links` scripts exist so a failing part of `check` can be reproduced independently. `format` and `lint:fix` modify files; their corresponding check commands do not.

### Browser test depth

- `test`, `test:local`, `test:e2e:desktop` and `test:e2e:extended` intentionally cover progressively broader browser/device matrices.
- `test:ui` and `test:debug` are interactive diagnostics.
- `test:e2e:visual` is a fast host-sensitive comparison; `test:e2e:visual:docker` is the reproducible merge-grade visual gate.
- `test:snapshots` and `test:snapshots:all` modify visual baselines and must be used only for deliberate, reviewed updates.

### Performance and bundle diagnostics

- `lighthouse` runs the complete Lighthouse CI flow; `lighthouse:collect` and `lighthouse:assert` expose its phases for diagnosis.
- `performance:check` is the blocking route-budget gate.
- `bundle:analyze` creates the emitted-file report; `bundle:visualize` additionally enables the Rollup treemap.

### VS Code Dev Container workflow

From **Run and Debug**, select **Portfolio: Dev Server + Host Browser**. VS Code starts `bun run dev:host`, waits for Astro and opens `http://localhost:4321` in the host browser.

Useful tasks are available through **Tasks: Run Task**, including quality checks, build, unit tests, Playwright smoke tests and the report server. **Portfolio: Serve Playwright Report on Host** serves the report on port `9323`; **Portfolio: Open Playwright Report** opens it in the host browser.

## Repository quality

```bash
bun run check
```

`check` runs repository-wide Prettier validation, active-document link validation, Dev Container contract validation, ESLint, the Feature-Sliced Design boundary checker, Astro diagnostics and strict tooling type-checking.

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
bun run test:e2e:report
bun run test:e2e:desktop
bun run test:e2e:extended
RUN_VISUAL_TESTS=true bun run test:e2e:visual
bun run test:e2e:visual:docker
bun run test:ui
bun run test:debug
```

- `test:e2e:smoke` checks critical English and Spanish routes in Chromium and blocks serious or critical Axe violations.
- `test:e2e:report` serves the latest local HTML report on `http://localhost:9323` from the rebuilt Dev Container.
- `test:e2e:desktop` runs Chromium, Firefox and WebKit.
- `test:e2e:extended` adds Mobile Chrome and Mobile Safari.
- `test:e2e:visual` runs maintained Chromium, Firefox and Mobile Chrome snapshots directly on the host. Use it for fast diagnostics when the host matches the baseline environment.
- `test:e2e:visual:docker` is the merge-grade local Linux comparison. It builds the pinned Ubuntu 24.04 Playwright image, pins Bun to the repository version, enables CI-style single-worker execution and compares the maintained snapshots without update mode.

Screenshot rendering can vary with the host operating system, browser build, font stack, hardware and headless configuration. A native mismatch is not evidence that a committed baseline should be replaced when the same head passes in the pinned Docker and CI environments. Never run `--update-snapshots` merely to make a host-specific failure pass.

The Docker visual command must finish with all 27 maintained tests passing and must leave `tests/e2e/visual.spec.ts-snapshots/` unchanged. The image version in `Dockerfile.test` must remain aligned with the resolved `@playwright/test` version in `bun.lock`.

Any deliberate baseline update must be generated inside the same pinned Docker environment, limited to reviewed cases and followed by a complete `bun run test:e2e:visual:docker` run without update mode. Passing only the snapshot-update command is not validation.

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

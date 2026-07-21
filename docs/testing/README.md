# Testing support files

This directory contains maintained testing helpers and focused policy documents. The primary testing guide is [docs/TESTING.md](../TESTING.md).

## Maintained content

- [UNIT-COVERAGE.md](UNIT-COVERAGE.md) — risk-based Vitest coverage scope and interpretation.
- `capture-screenshots.mjs` — local screenshot helper invoked by `bun run screenshots`.
- Screenshot and report directories are generated locally and excluded from version control.

## Common commands

```bash
bun run check
bun run test:unit:ci
bun run test:e2e:smoke
bun run build
bun run performance:check
```

Use [docs/TESTING.md](../TESTING.md) for the complete command matrix and [docs/CI.md](../CI.md) for workflow responsibilities and artifact retention.

## Screenshots

Start the development server and run the maintained helper:

```bash
bun run dev
bun run screenshots
```

Generated screenshots belong under `docs/testing/screenshots/` and remain untracked. Use Playwright visual regression tests for maintained automated baselines rather than committing ad-hoc report output.

## Lighthouse and other reports

Lighthouse, coverage, Playwright, bundle and route-budget reports are CI or local build artifacts. Their thresholds are owned by versioned configuration, and their retention is owned by the workflows. Do not copy current scores or thresholds into this directory.

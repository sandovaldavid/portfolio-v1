# Testing & Quality Assurance

Complete testing infrastructure for the portfolio including Lighthouse CI, Playwright E2E tests, and bundle analysis.

## Overview

The project includes comprehensive testing and monitoring:

- **Lighthouse CI**: Performance, accessibility, and best practices audits
- **Playwright**: End-to-end testing across multiple browsers and devices
- **Vitest**: Unit tests with coverage (i18n modules)
- **Bundle Analysis**: Track bundle size and identify optimization opportunities
- **CI Artifacts**: Test reports delivered as workflow run artifacts, linked from the unified PR comment

## Running Tests Locally

### Prerequisites

```bash
bun install
```

### Lighthouse Audits

Generate Lighthouse reports for production build:

```bash
# Build the project
bun run build

# Run Lighthouse CI
bun run lighthouse:collect

# Assert against performance thresholds
bun run lighthouse:assert
```

Configuration: `.lighthouserc.json`

**Thresholds:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 90

### Playwright Tests

Run end-to-end tests:

```bash
# Run all tests
bun run test

# Run with UI (interactive mode)
bun run test:ui

# Debug mode
bun run test:debug

# Run specific test file
bun run test tests/e2e/homepage.spec.ts

# Run tests by tag
bun run test --grep @smoke

# Run unit tests + E2E together
bun run test:all
```

Configuration: `playwright.config.ts`

**Test Coverage:**
- Homepage rendering
- Navigation functionality
- Responsive design (mobile, tablet, desktop)
- Accessibility compliance
- Theme toggle
- Page load performance
- Language switching (en/es)

### Bundle Analysis

Analyze bundle size:

```bash
bun run build
bun run bundle:analyze
```

Output: `bundle-analysis/report.txt` (`scripts/analyze-bundle.js`, mirrors the same check CI runs
inline in the `build` job). `astro.config.mjs` also wires `rollup-plugin-visualizer`, so every
`bun run build` additionally emits an interactive treemap at `bundle-analysis/index.html`.

**Size Thresholds:**
- Total dist: ≤ 5MB (reported as a warning in CI, does not block the build)

[info] Per-page JS/CSS/image budgets are defined in `lighthouse-budget.json` (50-70KB script per
page) but are not currently wired into any CI assertion — treat them as reference targets, not
an enforced gate.

## CI/CD Pipeline

### Continuous Integration Workflow

All testing runs in a single consolidated workflow:

```bash
.github/workflows/ci.yml
```

Triggers on:
- Push to `main` or `develop`
- Pull requests

Jobs:
1. **validate** — ESLint, Prettier check, Conventional Commits validation
2. **test-unit** — Vitest with coverage
3. **build** — Astro check + build, bundle size analysis (5MB warning threshold)
4. **lighthouse** — Lighthouse CI (3 runs, averages score) over the prebuilt dist
5. **playwright** — E2E tests (5 browsers/devices)
6. **pr-summary** — unified PR comment with job statuses and artifact links

## Test Reports (CI Artifacts)

Reports are NOT published to GitHub Pages. Each CI run uploads them as
artifacts, and the unified PR comment links directly to their download pages:

- **coverage-report** — Vitest coverage (7-day retention)
- **lighthouse-reports** — Lighthouse HTML/JSON reports (7-day retention)
- **playwright-report** — Playwright HTML report (7-day retention)
- **bundle-analysis** — bundle size report (7-day retention)

To review them locally:

```bash
# Download and extract all artifacts from a run
gh run download <run-id>

# Serve the reports
npx serve .lighthouseci/
bunx playwright show-report playwright-report
npx serve coverage/
```

## Configuration Files

### Lighthouse CI (`.lighthouserc.json`)

[info] Audits 6 pages in multiple languages
[info] Runs 3 audits and averages results for stability
[info] Checks Core Web Vitals thresholds
[info] Upload results to temporary storage

### Playwright (`playwright.config.ts`)

[info] Tests in Chromium, Firefox, and WebKit
[info] Mobile testing (iPhone, Pixel 5)
[info] Screenshots and videos on failure
[info] HTML, JSON, and JUnit reports

### Bundle Analysis (`.github/workflows/ci.yml`, build job)

[info] Tracks JS and CSS bundle sizes
[info] Publishes the size report in the unified PR comment
[warning] The 5MB total size threshold logs a warning only — it does not fail the build

## Test Results Interpretation

### Lighthouse Scores

- **90-100**: Excellent
- **50-89**: Good
- **0-49**: Poor

### Playwright Results

- **Passed**: All assertions met
- **Failed**: One or more assertions failed
- **Skipped**: Test marked with @skip
- **Flaky**: Passed/failed on retries

## Troubleshooting

### Lighthouse CI Fails

[warning] Check internet connection (required for Lighthouse)
[warning] Verify dev server is running on port 4321
[warning] Check `.lighthouserc.json` configuration

```bash
# Debug with verbose output
lhci collect --verbose
```

### Playwright Tests Timeout

[warning] Increase timeout in playwright.config.ts:
```typescript
use: {
  navigationTimeout: 30000,
  actionTimeout: 10000,
}
```

[warning] Check if dev server is running:
```bash
bun run preview
```

### Bundle Size Exceeds Threshold

[info] Analyze large files:
```bash
# Check individual file sizes
du -sh dist/_astro/*
```

[warning] Consider:
- Code splitting
- Lazy loading components
- Removing unused dependencies
- Minification

## Continuous Improvement

[info] Review test reports regularly
[warning] Add new tests when adding features
[warning] Update thresholds as performance improves
[info] Monitor bundle size trends over time

## Contact

For issues or questions:
- Email: hello@sandovaldavid.com
- Email: dev@sandovaldavid.com

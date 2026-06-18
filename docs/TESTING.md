# Testing & Quality Assurance

Complete testing infrastructure for the portfolio including Lighthouse CI, Playwright E2E tests, and bundle analysis.

## Overview

The project includes comprehensive testing and monitoring:

- **Lighthouse CI**: Performance, accessibility, and best practices audits
- **Playwright**: End-to-end testing across multiple browsers and devices
- **Bundle Analysis**: Track bundle size and identify optimization opportunities
- **GitHub Pages Reports**: Published test results available at `/test-reports`

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

Output: `bundle-analysis/report.txt`

**Size Thresholds:**
- Total dist: ≤ 2MB
- Critical JS: ≤ 100KB

## CI/CD Pipeline

### Testing CI Workflow

Triggers on:
- Push to `main` or `develop`
- Pull requests

Runs:
1. Lighthouse CI (3 runs, averages score)
2. Playwright E2E tests (multiple browsers)
3. Performance summary

```bash
.github/workflows/testing-ci.yml
```

### Publishing Reports

Automatically publishes test results to GitHub Pages after successful Testing CI run.

Access at: `https://<user>.github.io/<repo>/test-reports/`

```bash
.github/workflows/publish-reports.yml
```

### Bundle Analysis Workflow

Analyzes bundle size on every push/PR, comments with size comparison.

```bash
.github/workflows/bundle-analysis.yml
```

## GitHub Pages Reports

Test reports are automatically published to GitHub Pages:

- **Lighthouse Reports**: `/test-reports/lighthouse/`
- **Playwright Reports**: `/test-reports/playwright/`
- **Test Results**: `/test-reports/index.html`

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

### Bundle Analysis (`.github/workflows/bundle-analysis.yml`)

[info] Tracks JS and CSS bundle sizes
[info] Compares sizes in pull requests
[info] Enforces 2MB total size threshold

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

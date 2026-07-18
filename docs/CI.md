# Continuous integration policy

The repository uses proportional pipelines: fast feedback for ordinary pull requests, complete desktop and Lighthouse validation around `main`, and an extended scheduled/manual audit.

## Pipeline levels

| Context | Workflow | Purpose |
|---|---|---|
| Pull request to `develop` | `Continuous Integration` | Fast critical gates: repository checks, unit tests, production build, Chromium smoke and axe scans. |
| Pull request to `main` and push to `main` | `Main Quality` | Full Chromium, Firefox and WebKit suite, unit coverage, generated-link validation, bundle report and Lighthouse. |
| Weekly or manual | `Scheduled Extended Quality` | Complete desktop/mobile matrix, visual regression, generated-link audit, coverage and bundle artifacts. |
| Pull request/push to `main`, weekly or manual | `CodeQL` | Security and quality analysis without charging every feature PR. |

No workflow uses path filters. Documentation-only changes still exercise the build because content and metadata can affect generated routes.

## Required checks for `develop`

Branch protection should require these stable PR check names:

- `Code Quality & Commits`
- `Unit Tests (Vitest)`
- `Build & Bundle Analysis`
- `Playwright Chromium Smoke`

`PR Summary Report` is informational and should not be required. Update branch protection only after the renamed workflow has completed successfully on a representative pull request.

## Main integration policy

A pull request targeting `main` runs `Main Quality` before merge. The same workflow runs again after the merge commit lands on `main`, providing validation on both sides of production integration. Production deployment remains a separate workflow and must not replace these quality checks.

## Scheduled and manual policy

`Scheduled Extended Quality` runs every Monday at 03:00 UTC and can be started with `workflow_dispatch`. It covers:

- all configured desktop and mobile Playwright projects;
- visual snapshots on Chromium, Firefox and Mobile Chrome;
- internal references in generated HTML;
- risk-based unit coverage;
- bundle reporting.

CodeQL runs separately every Sunday and can also be started manually.

## Reusable setup and caching

`.github/actions/setup-bun/action.yml` owns the pinned Bun version, Bun cache and frozen dependency installation used by quality workflows.

Only dependency and `.astro` caches are used. `dist/` is always rebuilt and is transferred between jobs as a short-lived artifact; it is not treated as an incremental cache.

## Failure artifacts

Playwright uploads the HTML report plus `test-results/`, JSON and JUnit output with `if: always()`. Traces, screenshots and retained videos therefore survive failed smoke, desktop and extended runs. Coverage, Lighthouse and bundle reports are retained by the workflows that generate them.

## Local equivalents

```bash
bun run check
bun run test:unit:ci
bun run build
bun run check:links
bun run test:e2e:smoke
bun run test:e2e:desktop
bun run test:e2e:extended
RUN_VISUAL_TESTS=true bun run test:e2e:visual
bun run lighthouse
```

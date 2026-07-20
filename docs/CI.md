# Continuous integration policy

The repository uses proportional pipelines around one authoritative branch: fast feedback for pull requests to `main`, complete validation after integration into `main`, and an extended scheduled/manual audit.

## Pipeline levels

| Context                           | Workflow                      | Purpose                                                                                                          |
| --------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Pull request to `main`            | `Continuous Integration`      | Fast critical gates: repository checks, unit tests, production build, Chromium smoke and axe scans.              |
| Push to `main` or manual run      | `Main Quality`                | Full Chromium, Firefox and WebKit suite, unit coverage, generated-link validation, bundle report and Lighthouse. |
| Weekly or manual                  | `Scheduled Extended Quality`  | Complete desktop/mobile matrix, visual regression, generated-link audit, coverage and bundle artifacts.          |
| Pull request/push to `main`       | `CodeQL`                      | Security and quality analysis for the production branch lifecycle.                                               |
| Successful `Main Quality` on push | `Deploy to Vercel Production` | Deploys the exact validated `main` SHA; resume-only dispatches explicitly rebuild the latest `main`.             |

No workflow uses path filters. Documentation-only changes still exercise the build because content and metadata can affect generated routes.

## Required checks for `main`

The branch ruleset should require these stable pull-request check names:

- `Code Quality & Commits`
- `Unit Tests (Vitest)`
- `Build & Bundle Analysis`
- `Playwright Chromium Smoke`
- `Analyze Security`

`PR Summary Report` and the Vercel preview deployment are informative and should not be required. The required job names are an external contract with branch protection and must not change without a coordinated ruleset update.

Repository settings should also:

- require pull requests before merging;
- require branches to be up to date before merge;
- allow squash merge only;
- automatically delete merged branches;
- block direct pushes and force pushes to `main`.

The connector cannot version these GitHub-hosted settings, so [DELIVERY.md](DELIVERY.md) contains the post-merge verification checklist.

## Main integration policy

Ordinary pull requests target `main` and run the fast critical gate. After a squash merge lands on `main`, `Main Quality` validates the integrated SHA with the complete desktop-browser, coverage, link, performance and Lighthouse suites.

Production deployment is a separate workflow triggered by the successful completion of `Main Quality` for a `push` event on `main`. It checks out `github.event.workflow_run.head_sha`, verifies that exact revision and deploys it with Vercel's production environment. Manual or resume-asset dispatches explicitly check out the current tip of `main`.

## Scheduled and manual policy

`Scheduled Extended Quality` runs every Monday at 03:00 UTC and can be started with `workflow_dispatch`. It covers:

- all configured desktop and mobile Playwright projects;
- visual snapshots on Chromium, Firefox and Mobile Chrome;
- internal references in generated HTML;
- risk-based unit coverage;
- bundle reporting.

CodeQL runs separately every Sunday and can also be started manually.

## Reusable setup and caching

`.github/actions/setup-bun/action.yml` owns the pinned Bun version, Bun cache and frozen dependency installation used by quality and deployment workflows.

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

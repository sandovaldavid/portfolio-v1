# Continuous integration policy

This document describes the workflows currently versioned in `.github/workflows/` and distinguishes configured automation from validation that actually ran.

## Branch lifecycle

The repository currently uses two long-lived branches:

- `develop` is the integration branch for ordinary implementation pull requests;
- `main` is the default and production branch and receives focused promotion pull requests from `develop`.

The existing pull-request CI and Vercel preview workflows are configured for pull requests targeting `main`. They therefore validate promotion pull requests, not ordinary pull requests targeting `develop`.

## Configured workflows

| Trigger | Workflow | Implemented purpose |
| --- | --- | --- |
| Pull request to `main` | `Continuous Integration` | Repository checks, unit tests, production build, route budgets, Chromium smoke and Axe gates. |
| Pull request to `main` | `Deploy to Vercel Preview` | Builds and deploys the exact pull-request head to a Vercel preview when credentials are available. |
| Pull request or push to `main`; scheduled/manual | `CodeQL` | Security and code-quality analysis. |
| Push to `main` or manual run | `Main Quality` | Repository checks, scoped coverage, build, generated-link validation, route budgets, full desktop browser suite and Lighthouse. |
| Weekly or manual | `Scheduled Extended Quality` | Extended desktop/mobile, visual, coverage, generated-link and bundle audits. |
| Dev Container changes or manual run | `Build Dev Container` | Validates the versioned development environment. |
| Successful `Main Quality` push run; manual/resume dispatch | `Deploy to Vercel Production` | Deploys the validated `main` revision or the explicitly selected current `main` revision. |

Workflow YAML is **Implemented** configuration. A workflow result is evidence only when a run exists for the exact commit and completes successfully.

## Develop pull-request policy

Ordinary feature, fix, documentation and maintenance pull requests target `develop`. Because the current pull-request workflows do not trigger for that base branch, the pull request must include local evidence.

Minimum local gate:

```bash
bun install --frozen-lockfile
bun run check
bun run test:unit:ci
bun run build
```

Add the exact change-specific commands from [TESTING.md](TESTING.md), for example:

```bash
bun run check:links
bun run performance:check
bun run test:e2e:smoke
bun run test:e2e:desktop
bun run test:e2e:extended
bun run test:e2e:visual:docker
bun run lighthouse
```

The pull-request description must state:

- exact branch head or commit tested;
- environment, including Dev Container or host details when relevant;
- commands executed;
- pass/fail result and any intentionally unavailable gate.

A skipped, absent, disabled or quota-blocked Actions run is **Blocked**, not successful.

## Promotion pull requests to main

A focused `develop` → `main` pull request is the production promotion boundary.

When GitHub Actions are enabled and quota is available, the promotion pull request is expected to run:

- `Code Quality & Commits`;
- `Unit Tests (Vitest)`;
- `Build & Bundle Analysis`;
- `Playwright Chromium Smoke`;
- `Analyze Security`;
- the informative Vercel preview and PR summary jobs.

The stable job names are an external contract with branch protection. Do not rename them without coordinating repository rulesets.

If hosted automation is unavailable, do not infer success from the workflow configuration. Record the automation as **Blocked**, execute the closest local equivalents and require explicit maintainer review before promotion.

## Main integration and production

After a promotion is merged into `main`:

1. `Main Quality` validates the integrated SHA when Actions can run;
2. the production workflow listens for a successful `Main Quality` push run;
3. the deployment checks out `github.event.workflow_run.head_sha`, verifies the exact revision and deploys it with the production Vercel environment;
4. manual and resume-asset dispatches explicitly rebuild the current `main` tip;
5. canonical English and Spanish resume URLs are verified after deployment.

No feature branch or failed-quality SHA is part of the normal production path.

## Scheduled and visual policy

`Scheduled Extended Quality` runs weekly when automation is available and can also be started manually. The pinned Docker image is authoritative for maintained visual snapshots. Native host runs are diagnostics only when the host differs from the baseline environment.

## Reusable setup and caching

`.github/actions/setup-bun/action.yml` owns the pinned Bun setup, dependency cache and frozen installation used by workflows.

Only dependency and `.astro` caches are used. `dist/` is rebuilt and transferred as a short-lived artifact; it is not an incremental cache. The visual Docker route separately pins Playwright and Bun in `Dockerfile.test`.

## Failure artifacts

Playwright workflows upload reports, traces, screenshots, videos, JSON and JUnit diagnostics with `if: always()`. Coverage, Lighthouse, route-budget and bundle reports are retained by the workflows that generate them.

## GitHub-hosted settings

Branch rulesets, required checks, workflow enablement, Actions quota and secrets are not versioned in the repository. Their current state is **Unconfirmed** until inspected in GitHub. See [STATUS.md](STATUS.md).

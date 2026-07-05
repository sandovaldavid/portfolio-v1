# Tasks Master Index

> Generated: 2026-07-01
> Updated: 2026-07-05 (branch-06 implemented: RSS E2E tests + blog pages in Lighthouse CI; docs reconciled with current state)
> Based on audit of `docs/` vs current project state

## Summary

The project FSD migration is 100% complete, but historical docs still report 30% and do not reflect the current architecture (16+ widgets, 4 features, 5+ entities). This task list reconciles documentation with reality and closes architectural gaps.

## Branches (from `origin/develop`)

| Branch                            | Priority       | Purpose                                                               | Tasks | Status |
| --------------------------------- | -------------- | --------------------------------------------------------------------- | ----- | ------ |
| `docs/update-fsd-historical-docs` | **High**       | Archive obsolete migration docs, update copilot instructions          | 3     | ✅     |
| `feat/widgets-barrel-export`      | **Medium**     | Create central widgets barrel for better DX                           | 3     | ✅     |
| `docs/project-documentation`      | **Medium-Low** | Catalog current widgets/features, update TESTING.md                   | 3     | ✅     |
| `chore/testing-verification`      | **Low**        | Run full test suite, record results, report discrepancies             | 3     | ✅     |
| `feat/blog`                       | **Medium**     | Add native MDX blog (i18n + RSS) that feeds the GitHub profile widget | 7     | ✅     |
| `test/blog-rss-lighthouse`        | **Low**        | Cover RSS endpoints with E2E tests, add blog pages to Lighthouse CI   | 2     | ✅     |

## Completion Tracking

- [x] Branch 1 merged into `develop` (Tasks 1.1/1.2 shipped in `3a296e0`; Task 1.3 — `docs/tools.md` rewritten to a project-specific reference)
- [x] Branch 2 merged into `develop` (`src/widgets/index.ts` barrel + adopted in `index.astro`, `es/index.astro`, `Layout.astro`)
- [x] Branch 3 merged into `develop` (`docs/widgets-catalog.md`, `docs/features-catalog.md`, `docs/TESTING.md` reconciled, `scripts/analyze-bundle.js` fixed)
- [x] Branch 4 merged into `develop` (see [`testing-verification-2026-07-01.md`](../reports/testing-verification-2026-07-01.md))
- [x] Branch 5 (`feat/blog`) implemented, tested, and merged into `develop` (PR #75, squash-merged as `edcd117`).
      Note: the profile repo's `blog-posts.yml` `feed_list` still needs to be pointed at
      `https://sandovaldavid.com/rss.xml` — that's a change in a different repository, out of scope here.
- [x] Branch 6 (`test/blog-rss-lighthouse`) implemented and verified locally — 18 RSS E2E
      tests pass on chromium; Lighthouse CI audits 10 pages (added `/blog`, `/es/blog` and one
      article detail page per locale), all thresholds pass (perf=99, a11y=97-100, bp=96, seo=100).
      PR to `develop` pending. See `branch-06-blog-test-coverage.md`.
- [x] All tasks in `docs/tasks/` branches 1–5 marked done
- [x] Final `bun run build` passes
- [x] Final `bun run test:all` passes — unit tests are 100% green (78 tests); Playwright is
      green on chromium (86 tests including 18 new RSS tests); WebKit/Mobile Safari can't
      launch in this sandbox (missing system deps) and a few visual-regression snapshots
      mismatch on firefox/Mobile Chrome — see the verification report for the full breakdown
      and why this isn't expected to reproduce in CI

## Files in this folder

- `branch-01-docs-fsd-historical.md` — Archive migration docs, update copilot instructions
- `branch-02-widgets-barrel.md` — Central widgets barrel export
- `branch-03-project-docs.md` — Catalog new widgets/features, reconcile TESTING.md
- `branch-04-testing-verification.md` — Execute and record test results
- `branch-05-blog.md` — Native MDX blog: content collection, entity/widget slices, bilingual routes, RSS
- `branch-06-blog-test-coverage.md` — RSS endpoint E2E tests + blog pages in Lighthouse CI (✅ verified locally)

---

**Contact**: hello@sandovaldavid.com | dev@sandovaldavid.com

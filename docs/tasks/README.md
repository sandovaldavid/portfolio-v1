# Tasks Master Index

> Generated: 2026-07-01
> Updated: 2026-07-02 (added branch-05: `feat/blog`)
> Based on audit of `docs/` vs current project state

## Summary

The project FSD migration is 100% complete, but historical docs still report 30% and do not reflect the current architecture (16+ widgets, 4 features, 5+ entities). This task list reconciles documentation with reality and closes architectural gaps.

## Branches (from `origin/develop`)

| Branch | Priority | Purpose | Tasks |
|--------|----------|---------|-------|
| `docs/update-fsd-historical-docs` | **High** | Archive obsolete migration docs, update copilot instructions | 3 |
| `feat/widgets-barrel-export` | **Medium** | Create central widgets barrel for better DX | 3 |
| `docs/project-documentation` | **Medium-Low** | Catalog current widgets/features, update TESTING.md | 3 |
| `chore/testing-verification` | **Low** | Run full test suite, record results, report discrepancies | 3 |
| `feat/blog` | **Medium** | Add native MDX blog (i18n + RSS) that feeds the GitHub profile widget | 7 |

## Completion Tracking

- [x] Branch 1 merged into `develop` (Tasks 1.1/1.2 shipped in `3a296e0`; Task 1.3 — `docs/tools.md` rewritten to a project-specific reference)
- [x] Branch 2 merged into `develop` (`src/widgets/index.ts` barrel + adopted in `index.astro`, `es/index.astro`, `Layout.astro`)
- [x] Branch 3 merged into `develop` (`docs/widgets-catalog.md`, `docs/features-catalog.md`, `docs/TESTING.md` reconciled, `scripts/analyze-bundle.js` fixed)
- [x] Branch 4 merged into `develop` (see [`testing-verification-2026-07-01.md`](../reports/testing-verification-2026-07-01.md))
- [x] Branch 5 (`feat/blog`) implemented, tested, and merged into `develop` (PR #75, squash-merged as `edcd117`).
      Note: the profile repo's `blog-posts.yml` `feed_list` still needs to be pointed at
      `https://sandovaldavid.com/rss.xml` — that's a change in a different repository, out of scope here.
- [x] All tasks in `docs/tasks/` marked done
- [x] Final `bun run build` passes
- [ ] Final `bun run test:all` passes — unit tests are 100% green; Playwright is green on
      chromium but WebKit/Mobile Safari can't launch in this sandbox (missing system deps) and a
      few visual-regression snapshots mismatch on firefox/Mobile Chrome — see the verification
      report for the full breakdown and why this isn't expected to reproduce in CI

## Files in this folder

- `branch-01-docs-fsd-historical.md` — Archive migration docs, update copilot instructions
- `branch-02-widgets-barrel.md` — Central widgets barrel export
- `branch-03-project-docs.md` — Catalog new widgets/features, reconcile TESTING.md
- `branch-04-testing-verification.md` — Execute and record test results
- `branch-05-blog.md` — Native MDX blog: content collection, entity/widget slices, bilingual routes, RSS

---

**Contact**: hello@sandovaldavid.com | dev@sandovaldavid.com

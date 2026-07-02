# Tasks Master Index

> Generated: 2026-07-01
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

## Completion Tracking

- [ ] Branch 1 merged into `develop`
- [ ] Branch 2 merged into `develop`
- [ ] Branch 3 merged into `develop`
- [ ] Branch 4 merged into `develop`
- [ ] All tasks in `docs/tasks/` marked done
- [ ] Final `bun run build` passes
- [ ] Final `bun run test:all` passes

## Files in this folder

- `branch-01-docs-fsd-historical.md` — Archive migration docs, update copilot instructions
- `branch-02-widgets-barrel.md` — Central widgets barrel export
- `branch-03-project-docs.md` — Catalog new widgets/features, reconcile TESTING.md
- `branch-04-testing-verification.md` — Execute and record test results

---

**Contact**: hello@sandovaldavid.com | dev@sandovaldavid.com

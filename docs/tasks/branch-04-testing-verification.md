# Branch: chore/testing-verification

**Base**: `origin/develop`
**Prefix**: `chore/`
**Priority**: Low
**Why**: Ensure the documented testing infrastructure actually works and produce a current-state report.

> [!NOTE]
> Checklist verified and marked complete on 2026-07-02 (retroactively — the report at
> [`testing-verification-2026-07-01.md`](../reports/testing-verification-2026-07-01.md) was
> written and merged to `develop`, but this file's boxes were never checked at the time). Report
> content confirmed to cover unit test coverage, build status, Lighthouse, E2E results, and
> recommendations, matching every item below.

---

## Task 4.1 — Execute unit tests

**Scope**: `tests/unit/`
**Action**: Run Vitest and record results.

### Checklist

- [x] Run `bun run test:unit`
- [x] Record: pass / fail / skip counts
- [x] Record: coverage percentages (lines, functions, branches, statements)
- [x] If coverage < 90% anywhere, list uncovered files
- [x] If tests fail, capture error output

### Acceptance Criteria

- Clear record of unit test health in `docs/reports/testing-verification-YYYY-MM-DD.md`

---

## Task 4.2 — Execute build + Lighthouse

**Scope**: Production build + Lighthouse CI
**Action**: Build and audit performance.

### Checklist

- [x] Run `bun run build`
  - [x] Record build time
  - [x] Record any warnings
- [x] Run `bun run lighthouse:collect` (if dev server or static dist available)
  - [x] Record scores: Performance, Accessibility, Best Practices, SEO
  - [x] Note any thresholds not met
- [x] If Lighthouse cannot run locally, document why and note CI runs it instead

### Acceptance Criteria

- Build succeeds with zero errors
- Lighthouse scores documented (or CI fallback noted)

---

## Task 4.3 — Execute E2E tests (or verify config)

**Scope**: Playwright
**Action**: Run E2E tests if possible, or verify configuration is correct.

### Checklist

- [x] Check if `bun run test` executes Playwright
- [x] If yes: run and record pass/fail counts
- [x] If no (e.g., dev server required): document steps needed to run E2E locally
- [x] Verify `playwright.config.ts` browsers/devices match current project needs
- [x] Record any flaky or failing tests

### Acceptance Criteria

- E2E configuration is validated
- Any failing tests are documented with reproduction steps

---

## Task 4.4 — Create verification report

**Scope**: `docs/reports/`
**Action**: Write a concise report of the testing state.

### Checklist

- [x] Create `docs/reports/testing-verification-2026-07-01.md`
- [x] Include sections:
  - [x] Unit Tests (Vitest)
  - [x] Build Status
  - [x] Lighthouse / Performance
  - [x] E2E Tests (Playwright)
  - [x] Recommendations
- [x] If everything passes: close this task group quickly
- [x] If issues found: create follow-up tasks in `docs/tasks/follow-up/` or link to new branches

### Acceptance Criteria

- Report is factual and actionable
- Links to relevant config files and commands

---

## Commit Message

```
chore(tests): verify testing infrastructure and record results

- Run unit tests with Vitest and record coverage
- Verify production build and Lighthouse scores
- Validate Playwright E2E configuration
- Add docs/reports/testing-verification-2026-07-01.md
```

## PR Checklist

- [x] Report file renders correctly in Markdown
- [x] No source code changes (unless tests revealed bugs — then split to `fix/` branch)
- [x] `bun run build` passes after report addition

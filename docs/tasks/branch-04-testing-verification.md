# Branch: chore/testing-verification

**Base**: `origin/develop`
**Prefix**: `chore/`
**Priority**: Low
**Why**: Ensure the documented testing infrastructure actually works and produce a current-state report.

---

## Task 4.1 — Execute unit tests

**Scope**: `tests/unit/`
**Action**: Run Vitest and record results.

### Checklist

- [ ] Run `bun run test:unit`
- [ ] Record: pass / fail / skip counts
- [ ] Record: coverage percentages (lines, functions, branches, statements)
- [ ] If coverage < 90% anywhere, list uncovered files
- [ ] If tests fail, capture error output

### Acceptance Criteria

- Clear record of unit test health in `docs/reports/testing-verification-YYYY-MM-DD.md`

---

## Task 4.2 — Execute build + Lighthouse

**Scope**: Production build + Lighthouse CI
**Action**: Build and audit performance.

### Checklist

- [ ] Run `bun run build`
  - [ ] Record build time
  - [ ] Record any warnings
- [ ] Run `bun run lighthouse:collect` (if dev server or static dist available)
  - [ ] Record scores: Performance, Accessibility, Best Practices, SEO
  - [ ] Note any thresholds not met
- [ ] If Lighthouse cannot run locally, document why and note CI runs it instead

### Acceptance Criteria

- Build succeeds with zero errors
- Lighthouse scores documented (or CI fallback noted)

---

## Task 4.3 — Execute E2E tests (or verify config)

**Scope**: Playwright
**Action**: Run E2E tests if possible, or verify configuration is correct.

### Checklist

- [ ] Check if `bun run test` executes Playwright
- [ ] If yes: run and record pass/fail counts
- [ ] If no (e.g., dev server required): document steps needed to run E2E locally
- [ ] Verify `playwright.config.ts` browsers/devices match current project needs
- [ ] Record any flaky or failing tests

### Acceptance Criteria

- E2E configuration is validated
- Any failing tests are documented with reproduction steps

---

## Task 4.4 — Create verification report

**Scope**: `docs/reports/`
**Action**: Write a concise report of the testing state.

### Checklist

- [ ] Create `docs/reports/testing-verification-2026-07-01.md`
- [ ] Include sections:
  - [ ] Unit Tests (Vitest)
  - [ ] Build Status
  - [ ] Lighthouse / Performance
  - [ ] E2E Tests (Playwright)
  - [ ] Recommendations
- [ ] If everything passes: close this task group quickly
- [ ] If issues found: create follow-up tasks in `docs/tasks/follow-up/` or link to new branches

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

- [ ] Report file renders correctly in Markdown
- [ ] No source code changes (unless tests revealed bugs — then split to `fix/` branch)
- [ ] `bun run build` passes after report addition

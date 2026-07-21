# Branch: docs/project-documentation

**Base**: `origin/develop`
**Prefix**: `docs/`
**Priority**: Medium-Low
**Why**: The project has grown beyond the original 7 widgets / 2 features / 4 entities documented in 2025. There is no single source of truth for the current architecture.

> [!NOTE]
> Checklist verified and marked complete on 2026-07-02 (retroactively — `docs/widgets-catalog.md`,
> `docs/features-catalog.md`, and the `docs/TESTING.md` reconciliation shipped and merged to
> `develop`, but this file's boxes were never checked at the time). `widgets-catalog.md` has since
> been updated once more, for the `blog` widget added by `feat/blog`.

---

## Task 3.1 — Create `docs/widgets-catalog.md`

**Scope**: `src/widgets/`
**Action**: Document every widget slice: purpose, dependencies, and public API.

### Checklist

- [x] List all widget slices with one-line description
- [x] For each widget, document:
  - [x] Purpose (what user-visible section it renders)
  - [x] Layer dependencies (which features/entities/shared it imports)
  - [x] Public API exports (from `index.ts`)
- [x] Include new widgets not in original docs:
  - [x] `tech-stack`
  - [x] `recruiter-hud`
  - [x] `contact-sidebar`
  - [x] `research`
  - [x] `research-content`
  - [x] `about-content`
  - [x] `devlog`
  - [x] `project-case-study`
  - [x] `vision`
- [x] Mark original 7 widgets for reference

### Template per widget

```markdown
### `{widget-name}`

- **Purpose**: ...
- **Dependencies**: `@shared/ui`, `@entities/...`, `@features/...`
- **Public API**: `export { WidgetName } from './ui'`
- **Used in**: `src/pages/es/index.astro` (slot: ...)
```

### Acceptance Criteria

- A new developer can read this file and understand what every widget does without opening code
- Dependency arrows are documented (useful for FSD validation)

---

## Task 3.2 — Create `docs/features-catalog.md`

**Scope**: `src/features/`
**Action**: Document all feature slices.

### Checklist

- [x] Document `theme-toggle`
  - [x] Purpose: dark/light/system theme switching
  - [x] Client-side logic: localStorage, system preference
  - [x] Public API exports
- [x] Document `language-picker`
  - [x] Purpose: language switching (es/en)
  - [x] Integration with `@shared/lib/i18n`
  - [x] Public API exports
- [x] Document `cli-terminal`
  - [x] Purpose: interactive terminal UI
  - [x] Client-side logic summary
  - [x] Public API exports
- [x] Document `splash-screen`
  - [x] Purpose: initial loading experience
  - [x] Public API exports
- [x] Add FSD rule reminder: features may import entities and shared only

### Acceptance Criteria

- All feature slices are cataloged
- Client-side functionality is summarized for testing reference

---

## Task 3.3 — Reconcile `docs/TESTING.md` with current setup

**Scope**: `docs/TESTING.md`
**Action**: Compare documented test setup with reality and fix discrepancies.

### Checklist

- [x] Verify commands listed still exist in `package.json`
  - [x] `bun run test`
  - [x] `bun run test:ui`
  - [x] `bun run test:debug`
  - [x] `bun run lighthouse:collect`
  - [x] `bun run lighthouse:assert`
  - [x] `bun run bundle:analyze`
- [x] Verify configuration files still exist
  - [x] `.lighthouserc.json`
  - [x] `playwright.config.ts`
  - [x] `vitest.config.ts`
- [x] Update "Test Coverage" section if new features/widgets are missing
- [x] Update CI job descriptions if `ci.yml` has changed since doc was written
- [x] Add note about `tests/e2e/` and `tests/unit/` directories
- [x] Check if `bun run test:all` exists and document it if so

### Acceptance Criteria

- A developer can follow `docs/TESTING.md` step-by-step and all commands work
- No references to deleted pages like `en/index.astro` unless they exist

---

## Commit Message

```
docs(docs): catalog current widgets/features and reconcile testing docs

- Add docs/widgets-catalog.md documenting all 16+ widgets and dependencies
- Add docs/features-catalog.md documenting all 4+ features
- Reconcile docs/TESTING.md with current package.json scripts and CI jobs
- Remove stale references to non-existent pages or commands
```

## PR Checklist

- [x] `docs/widgets-catalog.md` renders correctly
- [x] `docs/features-catalog.md` renders correctly
- [x] `docs/TESTING.md` commands verified against `package.json`
- [x] No broken internal links

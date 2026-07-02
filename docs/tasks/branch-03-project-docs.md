# Branch: docs/project-documentation

**Base**: `origin/develop`
**Prefix**: `docs/`
**Priority**: Medium-Low
**Why**: The project has grown beyond the original 7 widgets / 2 features / 4 entities documented in 2025. There is no single source of truth for the current architecture.

---

## Task 3.1 — Create `docs/widgets-catalog.md`

**Scope**: `src/widgets/`
**Action**: Document every widget slice: purpose, dependencies, and public API.

### Checklist

- [ ] List all widget slices with one-line description
- [ ] For each widget, document:
  - [ ] Purpose (what user-visible section it renders)
  - [ ] Layer dependencies (which features/entities/shared it imports)
  - [ ] Public API exports (from `index.ts`)
- [ ] Include new widgets not in original docs:
  - [ ] `tech-stack`
  - [ ] `recruiter-hud`
  - [ ] `contact-sidebar`
  - [ ] `research`
  - [ ] `research-content`
  - [ ] `about-content`
  - [ ] `devlog`
  - [ ] `project-case-study`
  - [ ] `vision`
- [ ] Mark original 7 widgets for reference

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

- [ ] Document `theme-toggle`
  - [ ] Purpose: dark/light/system theme switching
  - [ ] Client-side logic: localStorage, system preference
  - [ ] Public API exports
- [ ] Document `language-picker`
  - [ ] Purpose: language switching (es/en)
  - [ ] Integration with `@shared/lib/i18n`
  - [ ] Public API exports
- [ ] Document `cli-terminal`
  - [ ] Purpose: interactive terminal UI
  - [ ] Client-side logic summary
  - [ ] Public API exports
- [ ] Document `splash-screen`
  - [ ] Purpose: initial loading experience
  - [ ] Public API exports
- [ ] Add FSD rule reminder: features may import entities and shared only

### Acceptance Criteria

- All feature slices are cataloged
- Client-side functionality is summarized for testing reference

---

## Task 3.3 — Reconcile `docs/TESTING.md` with current setup

**Scope**: `docs/TESTING.md`
**Action**: Compare documented test setup with reality and fix discrepancies.

### Checklist

- [ ] Verify commands listed still exist in `package.json`
  - [ ] `bun run test`
  - [ ] `bun run test:ui`
  - [ ] `bun run test:debug`
  - [ ] `bun run lighthouse:collect`
  - [ ] `bun run lighthouse:assert`
  - [ ] `bun run bundle:analyze`
- [ ] Verify configuration files still exist
  - [ ] `.lighthouserc.json`
  - [ ] `playwright.config.ts`
  - [ ] `vitest.config.ts`
- [ ] Update "Test Coverage" section if new features/widgets are missing
- [ ] Update CI job descriptions if `ci.yml` has changed since doc was written
- [ ] Add note about `tests/e2e/` and `tests/unit/` directories
- [ ] Check if `bun run test:all` exists and document it if so

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

- [ ] `docs/widgets-catalog.md` renders correctly
- [ ] `docs/features-catalog.md` renders correctly
- [ ] `docs/TESTING.md` commands verified against `package.json`
- [ ] No broken internal links

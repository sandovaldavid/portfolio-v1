# Branch: feat/widgets-barrel-export

**Base**: `origin/develop`
**Prefix**: `feat/`
**Priority**: Medium
**Why**: Historical docs and FSD best practices recommend a central barrel export. Currently pages import from individual slices. A barrel improves DX and reduces refactor noise when paths change.

> [!NOTE]
> Checklist verified and marked complete on 2026-07-02 (retroactively — the work shipped in the
> `src/widgets/index.ts` barrel merged to `develop`, but this file's boxes were never checked at
> the time). Confirmed: barrel exports all 16 widgets present at merge time (17 after `feat/blog`
> added a 17th), no circular imports, `bun run build` / `astro check` / `bun run format:check` all
> pass on current `develop`.

---

## Task 2.1 — Create `src/widgets/index.ts`

**Scope**: `src/widgets/`
**Action**: Add a central barrel that re-exports all widget public APIs.

### Checklist

- [x] Audit all widget slices in `src/widgets/`
  - [x] `about-content`
  - [x] `about-me`
  - [x] `badges`
  - [x] `contact-sidebar`
  - [x] `devlog`
  - [x] `experience`
  - [x] `footer`
  - [x] `header`
  - [x] `hero`
  - [x] `project-case-study`
  - [x] `projects`
  - [x] `recruiter-hud`
  - [x] `research`
  - [x] `research-content`
  - [x] `tech-stack`
  - [x] `vision`
- [x] Create `src/widgets/index.ts`
- [x] Export each widget using its public API name
  ```typescript
  export { AboutMe } from './about-me';
  export { Badges } from './badges';
  export { ContactSidebar } from './contact-sidebar';
  // ... etc
  ```
- [x] Verify no circular imports are created (widgets must not import from `src/widgets/index.ts` internally)

### Acceptance Criteria

- `import { Hero, Projects, Header } from '@widgets';` works from pages
- No build or TypeScript errors introduced
- Individual slice imports (`@widgets/hero`) still work (backward compatible)

---

## Task 2.2 — Update pages to use barrel where beneficial

**Scope**: `src/pages/**/*.astro`
**Action**: Simplify imports in pages that import many widgets. Do not force barrel usage where it reduces clarity.

### Checklist

- [x] Review `src/pages/es/index.astro`
  - [x] If it imports >= 3 widgets, consider switching to barrel
- [x] Review `src/pages/en/index.astro` (if exists) or other page files
- [x] Review `src/app/layouts/Layout.astro`
  - [x] Currently imports: Header, Footer, TechStack, RecruiterHUD, ContactSidebar
  - [x] Candidate for partial barrel usage (group related widgets)
- [x] Preserve single-widget imports where the barrel adds no value

### Acceptance Criteria

- Pages remain readable
- No performance regression (barrel exports are tree-shakeable by Astro/Vite)
- Build passes

---

## Task 2.3 — Verify build and type safety

**Scope**: Project-wide
**Action**: Ensure the new barrel does not break anything.

### Checklist

- [x] Run `bun run build`
- [x] Run `astro check`
- [x] Verify no new TypeScript errors
- [x] Verify no new lint errors (`bun run lint` or `bun run format:check`)

### Acceptance Criteria

- Zero build errors
- Zero new lint/format violations

---

## Commit Message

```
feat(widgets): add central barrel export and adopt in pages

- Create src/widgets/index.ts re-exporting all widget public APIs
- Update pages/layouts to use barrel imports where they improve readability
- Preserve backward compatibility of direct slice imports
```

## PR Checklist

- [x] `astro check` passes
- [x] `bun run build` passes
- [x] `bun run format:check` passes
- [x] No circular imports introduced

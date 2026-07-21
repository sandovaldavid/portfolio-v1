# Branch: docs/update-fsd-historical-docs

**Base**: `origin/develop`
**Prefix**: `docs/`
**Priority**: High
**Why**: Historical docs report migration at 30% and describe a project state that no longer exists. This confuses new contributors and AI agents.

---

## Task 1.1 — Archive FSD-Architecture migration docs

**Scope**: `docs/FSD-Architecture/*.md` (8 files)
**Action**: Add an archived banner to every file and update the status paragraph.

### Checklist

- [x] Update `00-overview.md`
  - [x] Replace `> 📜 **Documento histórico** — ... La migración está **completa**...` with explicit archive notice
  - [x] Add `**Status**: ARCHIVED — Migration completed 2025-10. Do not use for current development.`
- [x] Update `01-shared-layer.md` with same archive banner
- [x] Update `02-entities-layer.md` with same archive banner
- [x] Update `03-features-layer.md` with same archive banner
- [x] Update `04-widgets-layer.md` with same archive banner
- [x] Update `05-pages-migration.md` with same archive banner
- [x] Update `06-astro-tips.md` with same archive banner
- [x] Update `07-checklist.md` with same archive banner
- [x] Update `FSD-IMPLEMENTATION-PLAN.md`
  - [x] Change `Current Status: ⚠️ 30% Complete` to `Current Status: ✅ 100% Complete (archived)`
  - [x] Add archive banner at top
  - [x] Add note: "This document is preserved for historical reference only. The project has fully migrated to FSD."

### Acceptance Criteria

- Every `.md` in `docs/FSD-Architecture/` starts with an unambiguous archived notice
- No file suggests the migration is still ongoing

---

## Task 1.2 — Update `docs/README-COPILOT-INSTRUCTIONS.md`

**Scope**: `docs/README-COPILOT-INSTRUCTIONS.md`
**Action**: Reflect the current project structure instead of the migration-era structure.

### Checklist

- [x] Update "Migration Actual" section
  - [x] Change `🚧 Migración de componentes existentes en progreso` to `✅ Migración completada`
  - [x] Change `🚧 Refactoring de imports y dependencias` to `✅ Sin violaciones de importación`
- [x] Update "Próximos Pasos"
  - [x] Remove items that are already done (e.g., "Migrar componentes de src/components/")
  - [x] Replace with current next steps: "Documentar nuevos widgets y features", "Mantener tests actualizados"
- [x] Update layer examples to include current slices
  - [x] Widgets example: mention `tech-stack`, `recruiter-hud`, `research`, `devlog`, `project-case-study`
  - [x] Features example: mention `cli-terminal`, `splash-screen`
- [x] Update "Colaboracion / Para Nuevos Colaboradores"
  - [x] Remove references to `src/components/`
  - [x] Confirm `src/i18n/` is gone (verify it does not exist)

### Acceptance Criteria

- A new contributor reading this file understands the current architecture, not a 2025 migration
- No references to `src/components/` or unfinished migration work remain

---

## Task 1.3 — Verify and update `docs/tools.md` context

**Scope**: `docs/tools.md`
**Action**: Determine whether this file belongs in the project docs or should be moved/removed.

### Checklist

- [x] Evaluate if `docs/tools.md` provides project-specific value
  - [x] If yes: add a header linking it to the portfolio testing setup (`docs/testing/`, CI workflows)
  - [ ] ~~If no: move to `docs/archive/tools-generic-reference.md` or delete after confirming no links point to it~~ (not applicable — rewritten in place instead)
- [x] Ensure no broken internal links from other docs to `tools.md`

### Acceptance Criteria

- `docs/tools.md` either has clear project context or is archived/removed

---

## Commit Message

```
docs(docs): archive FSD migration guides and update copilot instructions

- Mark all FSD-Architecture docs as archived (migration completed)
- Update README-COPILOT-INSTRUCTIONS to reflect 100% FSD state
- Remove obsolete migration references (src/components/, src/i18n/)
- Add current widgets/features examples to layer documentation
```

## PR Checklist

- [x] All modified docs render correctly in Markdown preview
- [x] No stale migration references remain
- [x] `bun run build` still passes (docs-only change, but verify)

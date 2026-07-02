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

- [ ] Update `00-overview.md`
  - [ ] Replace `> 📜 **Documento histórico** — ... La migración está **completa**...` with explicit archive notice
  - [ ] Add `**Status**: ARCHIVED — Migration completed 2025-10. Do not use for current development.`
- [ ] Update `01-shared-layer.md` with same archive banner
- [ ] Update `02-entities-layer.md` with same archive banner
- [ ] Update `03-features-layer.md` with same archive banner
- [ ] Update `04-widgets-layer.md` with same archive banner
- [ ] Update `05-pages-migration.md` with same archive banner
- [ ] Update `06-astro-tips.md` with same archive banner
- [ ] Update `07-checklist.md` with same archive banner
- [ ] Update `FSD-IMPLEMENTATION-PLAN.md`
  - [ ] Change `Current Status: ⚠️ 30% Complete` to `Current Status: ✅ 100% Complete (archived)`
  - [ ] Add archive banner at top
  - [ ] Add note: "This document is preserved for historical reference only. The project has fully migrated to FSD."

### Acceptance Criteria

- Every `.md` in `docs/FSD-Architecture/` starts with an unambiguous archived notice
- No file suggests the migration is still ongoing

---

## Task 1.2 — Update `docs/README-COPILOT-INSTRUCTIONS.md`

**Scope**: `docs/README-COPILOT-INSTRUCTIONS.md`
**Action**: Reflect the current project structure instead of the migration-era structure.

### Checklist

- [ ] Update "Migration Actual" section
  - [ ] Change `🚧 Migración de componentes existentes en progreso` to `✅ Migración completada`
  - [ ] Change `🚧 Refactoring de imports y dependencias` to `✅ Sin violaciones de importación`
- [ ] Update "Próximos Pasos"
  - [ ] Remove items that are already done (e.g., "Migrar componentes de src/components/")
  - [ ] Replace with current next steps: "Documentar nuevos widgets y features", "Mantener tests actualizados"
- [ ] Update layer examples to include current slices
  - [ ] Widgets example: mention `tech-stack`, `recruiter-hud`, `research`, `devlog`, `project-case-study`
  - [ ] Features example: mention `cli-terminal`, `splash-screen`
- [ ] Update "Colaboracion / Para Nuevos Colaboradores"
  - [ ] Remove references to `src/components/`
  - [ ] Confirm `src/i18n/` is gone (verify it does not exist)

### Acceptance Criteria

- A new contributor reading this file understands the current architecture, not a 2025 migration
- No references to `src/components/` or unfinished migration work remain

---

## Task 1.3 — Verify and update `docs/tools.md` context

**Scope**: `docs/tools.md`
**Action**: Determine whether this file belongs in the project docs or should be moved/removed.

### Checklist

- [ ] Evaluate if `docs/tools.md` provides project-specific value
  - [ ] If yes: add a header linking it to the portfolio testing setup (`docs/testing/`, CI workflows)
  - [ ] If no: move to `docs/archive/tools-generic-reference.md` or delete after confirming no links point to it
- [ ] Ensure no broken internal links from other docs to `tools.md`

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

- [ ] All modified docs render correctly in Markdown preview
- [ ] No stale migration references remain
- [ ] `bun run build` still passes (docs-only change, but verify)

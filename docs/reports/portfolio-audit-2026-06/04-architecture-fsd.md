# 04 · Architecture — Feature-Sliced Design (FSD)

[← Back to index](./README.md) · Related: [Bugs](./05-bugs.md) · [Backlog](./08-backlog.md)

**Overall: A−.** This is the strongest dimension of the project. The FSD layer model
(`app → pages → widgets → features → entities → shared`) is applied with real discipline. The
issues are cosmetic — naming and import-alias consistency — not architectural.

---

## What's excellent ✅

- **Layer direction is respected — zero violations found.** A sweep of imports across
  `src/**/*.{astro,ts}` turned up **no** widget→widget, feature→feature, page→page, or
  lower→higher imports, and no circular dependencies.
- **Public APIs via `index.ts`** — slices are consumed through their barrel, not via deep
  paths (e.g. `import { Header } from '@widgets/header'`, not `…/ui/Header.astro`). No
  public-API bypasses found.
- **Relative imports stay within slice boundaries** (`'../model'`, `'./BrandLogo.astro'`),
  cross-slice imports use aliases. Correct.
- **`tsconfig` path aliases** are fully configured (`@app/* @pages/* @widgets/* @features/*
  @entities/* @shared/* @assets/*`) and match real usage.
- **Layer inventory** (updated 2026-07-02, was 13 widgets/4 entities at audit time): ~12 routes
  (+ `/es` mirror), **16 widgets**, 4 features (cli-terminal, language-picker, splash-screen,
  theme-toggle), **5 entities** (badge, devlog, experience, project, technology), shared
  ui/lib/config.

---

## Issues (all minor / cosmetic)

> ✅ **Update 2026-07-02**: `P2-1`, `P2-2`, and `P2-3` below were all resolved in
> [PR #51](https://github.com/sandovaldavid/portfolio-v1/pull/51) (see
> [`08-backlog.md`](./08-backlog.md)). Kept here for historical context of what the audit found.

### 1. Generic `@/` alias instead of explicit layer aliases ✅ `P2-1` — Resolved (PR #51)

~22 imports use the catch-all `@/` instead of the semantic layer alias. Both resolve to the
same path, but CLAUDE.md prescribes explicit aliases, and they're more self-documenting (you
can see the layer at the import site).

Representative offenders:

| File | Current | Should be |
|------|---------|-----------|
| `src/app/layouts/Layout.astro:16` | `@/shared/ui` | `@shared/ui` |
| `src/widgets/projects/ui/Projects.astro:2-3` | `@/entities/project`, `@/shared/lib/i18n` | `@entities/project`, `@shared/lib/i18n` |
| `src/entities/project/model/data.ts:4-7` | `@/assets/projects/…` | `@assets/projects/…` |
| `src/entities/project/ui/ProjectCard.astro:2-4` | `@/assets/…`, `@/shared/ui` | `@assets/…`, `@shared/ui` |
| `src/pages/404.astro:2-5` | `@/assets/icons/…` | `@assets/icons/…` |
| `src/widgets/footer/ui/Footer.astro:8` | `@/assets/icons/Code.astro` | `@assets/icons/Code.astro` |
| several `src/pages/**` + `src/pages/es/**` | `@/shared/ui` | `@shared/ui` |

💡 A lint rule (`eslint-plugin-import` / a custom `no-restricted-imports`) could forbid `@/…`
that crosses a layer, making this self-enforcing.

### 2. Component file naming ✅ `P2-2` — Resolved (PR #51)

Three `shared/ui` components are lowercase/kebab, violating the PascalCase rule for components:

| Current | Should be |
|---------|-----------|
| `src/shared/ui/avatar/avatar.astro` | `Avatar.astro` |
| `src/shared/ui/badge/badge.astro` | `Badge.astro` |
| `src/shared/ui/social-pill/social-pill.astro` | `SocialPill.astro` |

(All other components correctly use PascalCase; utilities in `shared/lib` correctly use
camelCase.) Rename + update the slice's `index.ts` re-export.

### 3. Loose widgets outside the slice structure ✅ `P2-3` — Resolved (PR #51)

Two components live directly under `src/widgets/` rather than in a slice with `ui/` + `index.ts`:

- `src/widgets/AboutContent.astro` (imported by `pages/about.astro`, `pages/es/about.astro`)
- `src/widgets/ResearchContent.astro` (imported by `pages/research.astro`, `pages/es/research.astro`)

💡 Wrap them in proper slices (`widgets/about-content/ui/AboutContent.astro` +
`widgets/about-content/index.ts`) for consistency, or document why they're intentionally loose.
Low priority — purely structural.

---

## Note: hand-rolled i18n vs Astro built-ins 💡

The project implements its own i18n helpers in `@shared/lib/i18n` (`getLangFromUrl`,
`useTranslations`, `getLocalizedPath`) on top of the `astro.config.mjs` `i18n` config. That's a
valid choice and keeps i18n logic in `shared` (FSD-clean). Astro also ships `astro:i18n`
helpers (`getRelativeLocaleUrl`, `getAbsoluteLocaleUrlList`) — worth using at least for
**hreflang emission** (see [performance/SEO](./06-performance-seo.md), `P2-4`). Not an
architecture problem, just an opportunity.

---

## FSD compliance summary

| Rule | Status |
|------|:------:|
| Layer import direction | ✅ Pass |
| No widget→widget / feature→feature / page→page | ✅ Pass |
| Public API via `index.ts` (no deep imports) | ✅ Pass |
| No circular dependencies | ✅ Pass |
| Explicit path aliases | ✅ Resolved — was ~22 `@/` instances (`P2-1`, PR #51) |
| Component naming (PascalCase) | ✅ Resolved — was 3 files (`P2-2`, PR #51) |
| Slice structure | ✅ Resolved — was 2 loose widgets (`P2-3`, PR #51) |

---

[← Back to index](./README.md) · Next: [05 · Bugs & Defects →](./05-bugs.md)

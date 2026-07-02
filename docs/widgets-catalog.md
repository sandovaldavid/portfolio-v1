# Widgets Catalog

Every slice under `src/widgets/` (16 total), what it renders, what it depends on, and where it's
actually used. Generated 2026-07-02 by reading each slice's `index.ts`, imports, and callers —
see [`docs/tasks/branch-03-project-docs.md`](./tasks/branch-03-project-docs.md).

> [!NOTE]
> Two widgets (`badges`, `vision`) exist and are fully implemented but are **not currently
> imported by any page or layout** — see their entries below. Verified by grepping every
> `.astro`/`.ts` file under `src/` for each widget's public export name.

---

### `about-content`

- **Purpose**: The full standalone "About" page body — bio card and focus-areas list.
- **Dependencies**: `@shared/ui`, `@shared/lib/i18n`, `@shared/config/i18n`, `@app/layouts/Layout.astro`
- **Public API**: `export { AboutContent } from './ui/AboutContent.astro'` (re-exported via `default as`)
- **Used in**: `src/pages/about.astro`, `src/pages/es/about.astro`

### `about-me`

- **Purpose**: Homepage teaser card — bio paragraph, profile image, "read more" link to `/about`.
- **Dependencies**: `@shared/lib/i18n`, `@shared/config/i18n`
- **Public API**: `export { AboutMe } from './ui'`
- **Used in**: `src/pages/index.astro`, `src/pages/es/index.astro` (via the `@widgets` barrel)

### `badges` ⚠️ not currently used

- **Purpose**: Horizontally-wrapped list of certification badge links, rendering
  `CertificationBadge` from the `badge` entity.
- **Dependencies**: `@entities/badge`, `@shared/lib/i18n`
- **Public API**: `export { Badges } from './ui'`
- **Used in**: nothing. `src/pages/components.astro` has a "Badges" demo section, but it renders
  the generic `Badge` atom from `@shared/ui`, not this widget. No page currently imports
  `@widgets/badges`.

### `contact-sidebar`

- **Purpose**: Fixed floating left-side bar with social icon links (GitHub, LinkedIn, Email, Link Hub).
- **Dependencies**: `@shared/config/site.config`, `@shared/lib/i18n`
- **Public API**: `export { ContactSidebar } from './ui/ContactSidebar.astro'`
- **Used in**: `src/app/layouts/Layout.astro` (via the `@widgets` barrel)

### `devlog`

- **Purpose**: Two components for the devlog feature — `DevlogCard` (compact list item) and
  `DevlogDetail` (full post view).
- **Dependencies**: `@entities/devlog`, `@shared/ui`
- **Public API**: `export { DevlogCard, DevlogDetail } from './ui'`
- **Used in**: `src/pages/devlog.astro` / `es/devlog.astro` (`DevlogCard`);
  `src/pages/devlog/[slug].astro` / `es/devlog/[slug].astro` (`DevlogDetail`)

### `experience`

- **Purpose**: Tabbed work-experience section — vertical tab list + role detail panels.
- **Dependencies**: `@entities/experience`, `@shared/lib/i18n`, `@shared/config/i18n`, `@shared/ui`
- **Public API**: `export { Experience } from './ui'`
- **Used in**: `src/pages/index.astro`, `src/pages/es/index.astro` (via the `@widgets` barrel)

### `footer`

- **Purpose**: Site footer — social icon links + copyright year.
- **Dependencies**: `@shared/config/site.config`, `@shared/lib/i18n`
- **Public API**: `export { Footer } from './ui'`
- **Used in**: `src/app/layouts/Layout.astro` (via the `@widgets` barrel)

### `header`

- **Purpose**: Fixed top navigation — brand logo, desktop nav, resume button, language picker, mobile menu.
- **Dependencies**: `@features/language-picker`, `@shared/config/i18n`, `@shared/config/site.config`, `@shared/lib/i18n`, `@shared/ui`
- **Public API**: `export { default as Header } from './ui/Header.astro'`
- **Used in**: `src/app/layouts/Layout.astro` (via the `@widgets` barrel)
- **Note**: `Header.astro`'s own JSDoc comment lists "Features: ThemeToggle, LanguagePicker", but
  only `LanguagePicker` is actually imported — the `ThemeToggle` mention is stale (see
  [`features-catalog.md`](./features-catalog.md) for where theme toggling actually lives today).

### `hero`

- **Purpose**: Homepage hero banner — animated title, subtitle, retro banner strip.
- **Dependencies**: `@shared/lib/i18n`, `@shared/config/i18n`
- **Public API**: `export { Hero } from './ui'`
- **Used in**: `src/pages/index.astro`, `src/pages/es/index.astro` (via the `@widgets` barrel)

### `project-case-study`

- **Purpose**: Full project case-study detail page (problem → approach → trade-offs → outcome).
- **Dependencies**: `@entities/project`, `@shared/ui`
- **Public API**: `export { ProjectCaseStudy } from './ui'`
- **Used in**: `src/pages/projects/[slug].astro`, `src/pages/es/projects/[slug].astro`

### `projects`

- **Purpose**: Responsive grid of project cards, filterable to "featured only" via a `showAll` prop.
- **Dependencies**: `@entities/project`, `@shared/lib/i18n`
- **Public API**: `export * from './ui'` → `Projects`
- **Used in**: `src/pages/index.astro`, `src/pages/es/index.astro` (featured subset, via the
  `@widgets` barrel); `src/pages/projects.astro`, `src/pages/es/projects.astro` (full listing,
  imported directly as `ProjectsWidget`)

### `recruiter-hud`

- **Purpose**: Fixed bottom-right gamified HUD — mock "recruit the architect" quest, resume/email
  CTAs, and a "system cheats" menu (matrix rain, secret stats, autopilot tour, live GitHub stats).
- **Dependencies**: `@shared/config/i18n`, `@shared/config/site.config`, `@shared/lib/i18n`
- **Public API**: `export { RecruiterHUD } from './ui/RecruiterHUD.astro'`
- **Used in**: `src/app/layouts/Layout.astro` (via the `@widgets` barrel)

### `research`

- **Purpose**: Homepage summary card for the BiLSTM/GitHub-mining thesis research.
- **Dependencies**: `@shared/config/i18n`, `@shared/lib/i18n`
- **Public API**: `export * from './ui'` → `Research`
- **Used in**: `src/pages/index.astro`, `src/pages/es/index.astro` (via the `@widgets` barrel)

### `research-content`

- **Purpose**: Full standalone "Research" page — hypothesis, approach, dataset, metrics, pipeline.
- **Dependencies**: `@shared/lib/i18n`, `@shared/config/i18n`, `@shared/config/site.config`, `@app/layouts/Layout.astro`
- **Public API**: `export { ResearchContent } from './ui/ResearchContent.astro'`
- **Used in**: `src/pages/research.astro`, `src/pages/es/research.astro`

### `tech-stack`

- **Purpose**: Two side-by-side cards of core frontend/backend tech pills + link to `/skills`.
- **Dependencies**: `@entities/technology`, `@shared/ui`, `@shared/lib/i18n`, `@shared/config/i18n`
- **Public API**: `export { TechStack } from './ui'`
- **Used in**: `src/app/layouts/Layout.astro` (via the `@widgets` barrel)

### `vision` ⚠️ not currently used

- **Purpose**: List of "vision" cards (LeetCode, writing, ML lab) with icon/title/description/link.
- **Dependencies**: `@shared/lib/i18n`, `@shared/config/i18n`
- **Public API**: `export * from './ui'` → `Vision`
- **Used in**: nothing. No page or layout currently imports `@widgets/vision`.

---

## Original 7 widgets (2025 migration, for historical reference)

Per the archived [`FSD-Architecture/04-widgets-layer.md`](./FSD-Architecture/04-widgets-layer.md),
the initial FSD migration covered 7 widgets: `hero`, `header`, `footer`, `about-me`, `experience`,
`projects`, `badges`. All 7 still exist above; the other 9 (`about-content`, `contact-sidebar`,
`devlog`, `project-case-study`, `recruiter-hud`, `research`, `research-content`, `tech-stack`,
`vision`) were added afterward and are documented here for the first time.

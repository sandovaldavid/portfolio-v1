# Granular UI catalog implementation

This document describes the executable UI-catalog foundation introduced by issue #132 and the shared-shell migration completed by issue #133. The architectural ownership rules remain in [I18N.md](I18N.md) and [ADR-0001](adr/0001-granular-bilingual-content-architecture.md).

## Scope

The catalog is for short, reusable UI strings and interactive shell messages. Profile, biography, experience records, projects, case studies, blog posts and devlog entries remain outside this API and migrate to schema-validated content sources in later roadmap issues.

The legacy monolithic dictionaries and `useTranslationsList()` remain temporarily for consumers that have not yet migrated. They are compatibility debt and must not receive new domains.

## Mirrored module layout

English and Spanish modules live below:

```text
src/shared/config/i18n/locales/{locale}/
├── accessibility.json
├── breadcrumbs.json
├── cli.json
├── common.json
├── errors.json
├── footer.json
├── navigation.json
├── recruiter.json
├── splash.json
├── theme.json
└── sections/
    ├── hero.json
    ├── about.json
    ├── badges.json
    ├── experience.json
    ├── projects.json
    ├── research.json
    ├── vision.json
    └── tech-stack.json
```

Every module contains scalar strings only. The Spanish catalog is checked against the English shape at compile time, while runtime validation checks flattened-key parity, unique namespaces and non-empty values.

## Shared shell ownership

The following production surfaces consume granular catalogs directly:

- desktop and mobile navigation;
- resume and menu controls;
- language and theme pickers;
- skip links, dialog labels and shared accessibility text;
- breadcrumbs and portfolio preview alternative text;
- footer and contact sidebar;
- recruiter quick links;
- optional retro splash screen;
- 404 page;
- experience-tab accessibility label;
- CLI terminal, shortcuts and secret-mode messages;
- home hero, About, Research, Vision, Tech Stack, badges and section headings.

The CLI uses `cli.json` for all visible and runtime-generated text. `CLITerminalCatalog.astro` passes one locale namespace to `model/runtime.ts`; the runtime owns behavior and interpolation but contains no parallel English/Spanish copy map. Repository-authored terminal markup is assembled in code around escaped scalar translations instead of storing HTML inside locale files.

## Public API

`src/shared/config/i18n/catalog.ts` exports:

- `translateUi(locale, key)` for one strongly typed key;
- `createUiTranslator(locale)` for a locale-bound translator;
- `getUiCatalog(locale)` for the complete flattened catalog;
- `getUiCatalogNamespace(locale, namespace)` for one module;
- `createScopedUiTranslator(locale, namespace)` for namespace-relative keys;
- `validateUiCatalogs()` for executable parity and value validation;
- `UiCatalogKey`, `UiCatalogNamespace` and scoped key types inferred from the English catalog.

Example:

```ts
import { createScopedUiTranslator, Language } from '@shared/config/i18n';

const tNavigation = createScopedUiTranslator(Language.SPANISH, 'navigation');
const projectsLabel = tNavigation('projects');
```

## Missing translations

Missing and empty values are build defects. The new catalog never returns the key and never falls back from Spanish to English. `translateUi()` throws `MissingUiTranslationError` with the locale and key so development, tests and production builds fail visibly.

The legacy `useTranslations()` key-returning behavior remains only until its consumers migrate and issue #143 removes it.

## Adding a module or key

1. Choose one cohesive domain and a semantic camelCase key.
2. Add the same module path and key to English and Spanish.
3. Keep the value a complete scalar string without HTML.
4. Register a new module path in `UI_CATALOG_MODULES` and in both catalog objects when adding a file.
5. Export no component-specific parallel translator.
6. Interpolate dynamic values in the consumer and escape them before generating trusted markup.
7. Run the repository checks and unit tests.

```bash
bun run check
bun run test:unit:ci
bun run build
```

Issue #141 will add repository-wide hardcoded-copy and counterpart enforcement after the migration issues have moved production consumers to this API.

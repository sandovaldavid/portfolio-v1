# Granular UI catalog implementation

This document describes the executable UI-catalog foundation introduced by issue #132. The architectural ownership rules remain in [I18N.md](I18N.md) and [ADR-0001](adr/0001-granular-bilingual-content-architecture.md).

## Scope

The catalog is only for short, reusable UI strings. Profile, biography, experience, projects, case studies, blog posts and devlog entries remain outside this API and migrate to schema-validated content sources in later roadmap issues.

The legacy monolithic dictionaries and `useTranslationsList()` remain temporarily for consumers that have not yet migrated. They are compatibility debt and must not receive new domains.

## Mirrored module layout

English and Spanish modules live below:

```text
src/shared/config/i18n/locales/{locale}/
├── common.json
├── navigation.json
├── accessibility.json
├── theme.json
├── errors.json
├── recruiter.json
├── splash.json
└── sections/
    ├── hero.json
    ├── about.json
    ├── research.json
    ├── vision.json
    └── tech-stack.json
```

Every module contains scalar strings only. The Spanish catalog is checked against the English shape at compile time, while runtime validation checks flattened-key parity, unique namespaces and non-empty values.

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
6. Run the repository checks and unit tests.

```bash
bun run check
bun run test:unit:ci
bun run build
```

Issue #141 will add repository-wide hardcoded-copy and counterpart enforcement after the migration issues have moved production consumers to this API.

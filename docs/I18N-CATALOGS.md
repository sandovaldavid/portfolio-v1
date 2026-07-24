# Granular UI catalog implementation

This document describes the current UI-catalog API and its relationship to localized Content Collections. Ownership and prohibited patterns are defined in [I18N.md](I18N.md).

## Scope

The catalog is for short, reusable UI strings and interactive shell messages. Profile, biography, experience records, projects and case studies live in schema-validated Content Collections. Blog posts and devlog entries remain localized editorial Content Collections paired through stable translation identities.

The root legacy dictionaries and `useTranslationsList()` are **Deprecated** compatibility paths tracked by issue #143. They must not receive new domains or consumers.

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
├── metadata.json
├── navigation.json
├── recruiter.json
├── splash.json
├── theme.json
└── sections/
    ├── about.json
    ├── badges.json
    ├── experience.json
    ├── hero.json
    ├── projects.json
    ├── research.json
    ├── tech-stack.json
    └── vision.json
```

Every module contains non-empty scalar strings only. English and Spanish must expose identical module paths and keys. Runtime and source validation reject missing modules, duplicate keys, empty values, records, arrays and HTML.

## Current consumers

Granular catalogs own reusable copy for:

- desktop and mobile navigation;
- resume, menu, language and theme controls;
- skip links, dialogs and shared accessibility text;
- breadcrumbs, metadata and portfolio preview alternatives;
- footer, contact sidebar and recruiter controls;
- optional splash and static 404 behavior;
- experience and project reusable labels;
- CLI terminal, shortcuts and secret-mode messages;
- home sections such as Hero, About, Research, Vision, Tech Stack and badges.

Components receive a locale or scoped namespace and own behavior, interpolation, markup and styling. They must not define a second English/Spanish message map.

## Public API

`src/shared/config/i18n/catalog.ts` exports:

- `translateUi(locale, key)` for one strongly typed key;
- `createUiTranslator(locale)` for a locale-bound translator;
- `getUiCatalog(locale)` for the complete flattened catalog;
- `getUiCatalogNamespace(locale, namespace)` for one module;
- `createScopedUiTranslator(locale, namespace)` for namespace-relative keys;
- `validateUiCatalogs()` for executable parity and value validation;
- inferred catalog key, namespace and scoped-key types.

Example:

```ts
import { createScopedUiTranslator, Language } from '@shared/config/i18n';

const tNavigation = createScopedUiTranslator(Language.SPANISH, 'navigation');
const projectsLabel = tNavigation('projects');
```

Missing or empty values throw an actionable error. The catalog does not return a missing key and does not fall back from Spanish to English.

## Localized structured content

The current structured sources are:

```text
src/content/
├── portfolio-profile/{locale}/profile.json
├── experience/{locale}/<experience-id>.json
└── projects/{locale}/<project-id>.json
```

- profile entries own localized biography, positioning, availability and page metadata;
- experience entries own localized company presentation, role, date label and achievements;
- project entries own localized summary, image alternative, case-study narrative, duration, role and evidence copy;
- TypeScript metadata owns language-neutral URLs, dates, assets, technology IDs, ordering and feature flags.

Entity APIs join localized entries and technical metadata by stable IDs and reject duplicates or missing required counterparts.

## Editorial translation identities

Every blog and devlog entry has an immutable, language-neutral `translationKey`. Entity APIs validate duplicate identities and resolve verified counterparts through that key. Filenames and localized slugs are not used as translation identity.

An intentionally absent or draft-only counterpart is disabled in the language picker instead of receiving a generated link.

## Adding a module or key

1. Choose one cohesive domain and a semantic camelCase key.
2. Add the same module path and key to English and Spanish.
3. Store one complete plain-text grammatical unit.
4. Register a new module in the catalog module list and both locale objects.
5. Keep interpolation in the consumer and escape dynamic values before assembling trusted markup.
6. Add or update the relevant unit or browser regression.
7. Run the focused and canonical checks.

```bash
bun run check:i18n:catalogs
bun run check:i18n
bun run check
bun run test:unit:ci
bun run build
```

## Compatibility cleanup

Issue #143 owns deleting:

- root monolithic locale dictionaries;
- the old flattening/mixed-value translator;
- `useTranslationsList()` and its remaining consumers;
- exact hardcoded-copy debt entries for the six legacy routes.

Until that issue merges, do not broaden the compatibility layer or describe it as the supported implementation.

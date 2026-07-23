# Granular UI catalog implementation

This document describes the executable UI-catalog foundation introduced by issue #132, the shared-shell migration completed by issue #133, the home-section migration implemented by issue #134 and the structured profile, experience, project and editorial migrations completed by issues #135–#138. The architectural ownership rules remain in [I18N.md](I18N.md) and [ADR-0001](adr/0001-granular-bilingual-content-architecture.md).

## Scope

The catalog is for short, reusable UI strings and interactive shell messages. Profile, biography, experience records, projects and case studies live in schema-validated content collections. Blog posts and devlog entries remain localized editorial Content Collections paired through explicit stable identities; they do not move into the UI catalog.

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

## Catalog consumers

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
- experience-tab accessibility and action labels;
- project-card actions, card types, case-study labels and project-catalog metadata;
- CLI terminal, shortcuts and secret-mode messages;
- home hero, About, Research, Vision, Tech Stack, badges and section headings.

Home-section copy has no duplicate entries in the legacy dictionaries. Those compatibility dictionaries retain only domains that are still awaiting later roadmap migrations. Each focused home module is owned by its corresponding widget or by the application layout when the copy labels a page section.

The CLI uses `cli.json` for all visible and runtime-generated text. `CLITerminalCatalog.astro` passes one locale namespace to `model/runtime.ts`; the runtime owns behavior and interpolation but contains no parallel English/Spanish copy map. Repository-authored terminal markup is assembled in code around escaped scalar translations instead of storing HTML inside locale files.

## Locale-aware catalog consumers

Issue #139 makes Astro the source of truth for locale routing. Astro components read `Astro.currentLocale` and convert it through `getLanguageFromLocale()` only when the catalog API requires the typed `Language` enum.

`Layout.astro` creates ordinary English and Spanish route paths with `astro:i18n` and passes the resolved map through `RecruiterHUD` to `LanguagePicker`. Editorial detail routes may replace that map with verified `translationKey` counterparts. The picker owns labels and unavailable-state presentation, but it does not parse locale prefixes or generate routes.

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

## Structured profile content

Issue #135 moves long-form profile and biography records out of UI catalogs and legacy dictionaries. The authoritative localized entries are:

```text
src/content/portfolio-profile/
├── en/profile.json
└── es/profile.json
```

The `portfolioProfile` collection validates stable identity, locale, SEO metadata, summary, biography paragraphs, focus areas, availability, location, work mode, research positioning and the current-role summary. Language-neutral identity and contact values remain in `siteConfig`.

Consumers load the entry through the public `@entities/profile` API. UI catalogs retain only headings, labels, actions and accessibility text; they do not own long biography records.

The home About widget reuses the localized profile summary, while `/about` and `/es/about` use the corresponding biography, focus areas and SEO metadata from the same entry.

## Structured experience content

Issue #136 moves professional experience out of the mixed-value translator and into one validated entry per stable role and locale:

```text
src/content/experience/
├── en/
│   ├── atena-software-engineer.json
│   ├── chirasoft-fullstack-developer.json
│   └── municipality-piura-software-developer.json
└── es/
    └── ... mirrored entries
```

Each entry owns localized company presentation, role title, date label and achievement bullets. `src/entities/experience/model/metadata.ts` owns language-neutral dates, ordering, featured status and technology IDs. The entity joins both sources by `experienceId`, rejects duplicates or missing locale counterparts and exposes deterministic records to the experience widget.

Technical tags intentionally use stable language-neutral labels in both locales. The `sections.experience` UI module owns only reusable labels such as the section title and optional evidence-link action.

## Structured project content

Issue #137 moves project summaries and case studies into one validated entry per stable project and locale:

```text
src/content/projects/
├── en/
│   └── <project-id>.json
└── es/
    └── <project-id>.json
```

Each entry owns localized title, description, category, image alternative text, case-study narrative, duration, role and optional evidence copy. `src/entities/project/model/metadata.ts` owns slugs, repository and demo URLs, image imports, technology IDs, ordering, featured state and evidence-source URLs.

The project entity joins both sources by `projectId`, rejects duplicate or missing locale entries and rejects localized evidence sources without matching language-neutral URLs. Project lists and detail routes consume the public entity API asynchronously. The `sections.projects` UI module owns only reusable card, action, case-study and catalog labels.

The previous project records in `en.json` and `es.json`, the dictionary-backed `model/data.ts` builder and the special Yukidoke dictionary merge have been removed.

## Editorial translation identities

Issue #138 adds an explicit `translationKey` to every blog and devlog entry. The identity is immutable and language-neutral; filenames and public slugs remain locale-owned and may differ.

The blog and devlog entity APIs validate duplicate keys per locale and resolve counterparts through `translationKey`. Detail routes pass only verified paths to the language picker. An intentionally absent translation, or a draft-only blog counterpart in production, is rendered as unavailable instead of receiving a mechanically generated link.

Editorial content remains outside the UI catalog. RSS continues to read published blog entries independently for English and Spanish.

`useTranslationsList()` remains transitional only because the unmigrated research detail still consumes structured arrays. Experience and projects are no longer consumers, and the helper must not receive new domains before issue #143 removes the legacy runtime.

# ADR-0001: Granular bilingual content architecture

- Status: Accepted and implemented
- Date: 2026-07-21
- Implementation completed: 2026-07-24
- Decision owners: repository maintainer
- Related issues: #131 and roadmap #144

## Context

The portfolio supports English and Spanish, but the previous implementation had multiple competing owners:

- monolithic `en.json` and `es.json` dictionaries;
- project-specific JSON merged into the same flattened runtime dictionary;
- bilingual `copy` objects inside Astro components;
- user-facing strings hardcoded in templates, metadata and TypeScript records;
- blog and devlog entries paired implicitly by paths rather than stable translation identities.

The generic translation layer accepted both strings and arrays, so it was used for UI labels and domain records at the same time. This produced stale duplicate copy, mixed-language pages and unclear ownership.

The portfolio is a statically generated bilingual site. It does not require a client-side translation runtime, remote translation service or arbitrary locale switching after hydration.

## Decision drivers

The solution must:

- keep English and Spanish synchronized;
- avoid a replacement monolithic file per language;
- remain proportional to a two-locale static portfolio;
- preserve Astro's built-in i18n routing;
- support typed keys and schema validation;
- separate reusable UI copy from professional and editorial content;
- support localized slugs without losing translation relationships;
- include accessibility, SEO and structured metadata;
- make incomplete localization fail before deployment.

## Decision

Adopt a hybrid architecture with one canonical source per responsibility.

### 1. Typed locale and routing configuration

Astro's i18n configuration is authoritative for supported locales, default locale and prefix behavior. Shared TypeScript configuration exposes those values without creating a second routing contract.

Ordinary route switching uses `Astro.currentLocale` and `astro:i18n` helpers. Domain-specific counterpart resolution is allowed only for localized content entries.

### 2. Granular UI catalogs

Short reusable UI strings live in mirrored, domain-focused locale modules under `src/shared/config/i18n/locales/{locale}/`.

Catalogs:

- contain scalar plain-text values only;
- use identical module paths and semantic keys in English and Spanish;
- derive namespaces from file paths;
- are loaded behind one typed public API;
- reject missing modules, keys and empty values before production build.

A single catch-all `en.json` and `es.json` is prohibited.

### 3. Schema-validated structured portfolio content

Profile, biography, experience, research, projects and case studies live in Astro Content Collections.

Each localized entry uses a stable, language-neutral identity such as `profileId`, `experienceId`, `researchId` or `projectId`. Experience, research and projects use one focused entry per stable identity and locale.

### 4. Language-neutral technical metadata

URLs, image references, technology IDs, ordering and feature flags remain in TypeScript records. Localized entries join that metadata through stable IDs instead of duplicating it in every locale.

### 5. Localized editorial content

Blog and devlog remain localized Content Collections. Entries use explicit `translationKey` identities so localized slugs can diverge safely.

The language switcher never generates an editorial target route that does not exist.

### 6. Rich content safety

UI catalogs contain no HTML. Long-form or markup-bearing content uses Markdown, MDX with repository-owned components or validated structured blocks.

Raw translation strings are never rendered through `set:html`, and translated sentences are not assembled from fragments around markup.

### 7. Missing translation policy

Missing translations are build defects, not normal fallback cases.

Validation fails for missing or empty values. The implementation does not silently fall back from Spanish to English and does not ship raw key names on public pages.

### 8. One supported runtime

The migration is complete. Production has one localization runtime:

- typed granular scalar catalogs;
- schema-validated localized content collections;
- Astro-native locale and route APIs;
- verified editorial counterpart resolution.

The monolithic locale files, flattening helper, mixed `string | string[]` translator, `useTranslations()`, `useTranslationsList()` and temporary hardcoded-copy debt baseline were removed by #143. They must not be reintroduced.

Operational rules, paths and naming conventions are maintained in [docs/I18N.md](../I18N.md).

## Alternatives considered

### Keep one monolithic file per locale

Rejected. It couples unrelated UI and domain content, increases merge conflicts and preserves ambiguous ownership.

### Keep translations next to every component

Rejected as the default. Component-local copy maps duplicate shared facts, make parity checks difficult and allow professional statements to diverge across routes.

Components own presentation and behavior; localized copy belongs to the catalog or content source responsible for its meaning.

### Store all localized content in TypeScript

Rejected. TypeScript is appropriate for language-neutral configuration and type-safe loaders, but it is a poor editorial source for biographies, experience narratives, research records, case studies and articles.

### Introduce i18next or another client-side framework

Rejected for the current requirements. The site is statically generated, supports two known locales and already uses Astro routing. A client runtime would add bundle weight, hydration complexity and another routing/content abstraction without solving ownership.

A future need for runtime locale loading, external translation management or advanced pluralization requires a new ADR.

### Store all content in Content Collections

Rejected. Small cross-cutting UI labels do not benefit from editorial schemas, while language-neutral technical metadata should not be duplicated across localized entries.

## Consequences

### Positive

- Each localized value has one documented owner.
- Catalogs remain small and reviewable.
- Structured records gain schema validation and stable identities.
- Localized slugs can change independently.
- Missing Spanish content is detectable before deployment.
- Accessibility and SEO text follow the same contract as visible text.
- Astro remains the only routing framework.
- Removed compatibility paths are protected by regression tests.

### Negative

- Catalog loaders must preserve type inference across multiple modules.
- Content schemas and parity checks add implementation work.
- Contributors must classify content before choosing a file.
- Stable IDs are a compatibility contract and require deliberate migration when changed.

### Risks and mitigations

- **Risk:** a second runtime or monolithic dictionary returns. **Mitigation:** unit tests reject removed files, symbols, helper names and direct locale imports.
- **Risk:** over-fragmented catalogs. **Mitigation:** split by cohesive ownership, not one file per component or string.
- **Risk:** missing translated content creates broken switching. **Mitigation:** stable identity pairing and target-existence validation.
- **Risk:** rich text returns to unsafe HTML strings. **Mitigation:** plain-text catalogs and schema-reviewed Markdown, MDX or structured blocks.
- **Risk:** manual routing survives beside Astro. **Mitigation:** ordinary prefix parsing is prohibited and tested; custom logic is limited to verified domain counterparts.

## Compliance

Implementation work conforms to this decision when:

- locale directory structures and keys are mirrored;
- generic UI translation values are scalar strings;
- structured professional content uses schemas and stable IDs;
- technical metadata is not unnecessarily duplicated by locale;
- missing translations fail validation;
- no monolithic dictionary or mixed translator exists;
- no component-local bilingual copy map is introduced;
- no route switch points to an unverified target;
- active guidance in [docs/I18N.md](../I18N.md) remains accurate.

A change to these boundaries requires updating this ADR or superseding it with a new accepted decision.

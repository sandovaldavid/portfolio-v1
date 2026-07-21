# ADR-0001: Granular bilingual content architecture

- Status: Accepted
- Date: 2026-07-21
- Decision owners: repository maintainer
- Related issues: #131 and roadmap #144

## Context

The portfolio supports English and Spanish, but localized content currently has multiple competing owners:

- monolithic `en.json` and `es.json` dictionaries;
- additional project-specific JSON merged into the same flattened runtime dictionary;
- bilingual `copy` objects inside Astro components;
- user-facing strings hardcoded in templates, metadata and TypeScript records;
- blog and devlog entries paired implicitly by paths rather than stable translation identities.

The generic translation layer accepts both strings and arrays, so it is being used for UI labels and domain records at the same time. This has produced stale duplicate copy, mixed-language pages and unclear ownership.

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
- enable incremental migration without a high-risk big-bang rewrite.

## Decision

Adopt a hybrid architecture with one canonical source per responsibility.

### 1. Typed locale and routing configuration

Astro's i18n configuration remains authoritative for supported locales, default locale and prefix behavior. Shared TypeScript configuration exposes those values to application code without creating a second routing contract.

Ordinary route switching uses `Astro.currentLocale` and `astro:i18n` helpers. Domain-specific counterpart resolution is allowed only for localized content entries.

### 2. Granular UI catalogs

Short reusable UI strings live in mirrored, domain-focused locale modules under `src/shared/config/i18n/locales/{locale}/`.

Catalogs:

- contain scalar plain-text values only;
- use identical module paths and semantic keys in English and Spanish;
- derive namespaces from file paths;
- are loaded behind one typed public API;
- reject missing modules, missing keys and empty required values before production build.

A single catch-all `en.json` and `es.json` is prohibited.

### 3. Schema-validated structured portfolio content

Profile, biography, experience, projects and case studies live in Astro Content Collections or an equivalent schema-validated content mechanism.

Each localized entry uses a stable, language-neutral `translationKey`. Experience and projects use one focused entry per stable identity and locale.

### 4. Language-neutral technical metadata

URLs, image references, technology IDs, ordering and feature flags remain in TypeScript records. Localized entries join that metadata through stable IDs instead of duplicating it in every locale.

### 5. Localized editorial content

Blog and devlog remain localized Content Collections. Entries gain explicit translation identities so localized slugs can diverge safely.

The language switcher must never generate a target route that does not exist.

### 6. Rich content safety

UI catalogs contain no HTML. Long-form or markup-bearing content uses Markdown, MDX with repository-owned components, or validated structured blocks.

Raw translation strings are never rendered through `set:html`, and translated sentences are not assembled from fragments around markup.

### 7. Missing translation policy

Missing translations are build defects, not normal fallback cases.

The target implementation fails validation for missing or empty values. It does not silently fall back from Spanish to English and does not ship raw key names on public pages.

### 8. Incremental migration

The existing dictionaries, flattening helper, mixed list translator and component-local copy maps remain temporarily for unmigrated consumers. New work must not extend those patterns.

Issue #143 removes the legacy system only after replacement consumers and automated checks are complete.

The detailed operational rules, target paths, naming conventions and migration sequence are maintained in [docs/I18N.md](../I18N.md).

## Alternatives considered

### Keep one monolithic file per locale

Rejected. It keeps unrelated UI and domain content coupled, increases merge conflicts, allows stale sections to remain hidden and preserves the current ambiguous ownership.

### Keep translations next to every component

Rejected as the default. Component-local copy maps duplicate shared facts, make parity checks difficult and allow the same professional statement to diverge across routes.

Components may own presentation and behavior, but localized copy belongs to the catalog or content source responsible for its meaning.

### Store all localized content in TypeScript

Rejected. TypeScript is appropriate for language-neutral configuration and type-safe loaders, but it is a poor editorial source for long biographies, experience narratives, case studies and articles.

### Introduce i18next or another client-side framework

Rejected for the current requirements. The site is statically generated, supports two known locales and already uses Astro routing. A client runtime would add bundle weight, hydration complexity and another routing/content abstraction without solving source ownership.

A future need for runtime locale loading, external translation management or pluralization beyond the current static requirements would require a new ADR.

### Store all content in Content Collections

Rejected. Small cross-cutting UI labels do not benefit from editorial schemas, while language-neutral technical metadata should not be duplicated across localized entries.

## Consequences

### Positive

- Each localized value has one documented owner.
- Catalogs remain small and reviewable.
- Experience and project records gain schema validation and stable identities.
- Localized slugs can change independently.
- Missing Spanish content becomes detectable before deployment.
- Accessibility and SEO text follow the same contract as visible text.
- Astro remains the only routing framework.
- Migration can proceed through focused pull requests.

### Negative

- The repository will temporarily contain legacy and target mechanisms during migration.
- Loaders must merge multiple catalog modules and preserve type inference.
- Content schemas and parity checks add implementation work.
- Contributors must classify content before choosing a file.
- Stable IDs become a compatibility contract and require deliberate migration when changed.

### Risks and mitigations

- **Risk:** temporary duplication becomes permanent. **Mitigation:** #143 is the explicit cleanup gate and #141 adds executable checks.
- **Risk:** over-fragmented catalogs. **Mitigation:** split by cohesive ownership, not one file per component or string.
- **Risk:** missing translated content creates broken switching. **Mitigation:** explicit `translationKey` pairing and target-existence validation.
- **Risk:** rich text returns to unsafe HTML strings. **Mitigation:** plain-text catalogs and schema-reviewed Markdown, MDX or structured blocks.
- **Risk:** manual routing survives beside Astro. **Mitigation:** #139 removes ordinary prefix parsing and centralizes counterpart-specific logic.

## Compliance

Implementation work conforms to this decision when:

- locale directory structures and keys are mirrored;
- generic UI translation values are scalar strings;
- structured professional content uses schemas and stable IDs;
- technical metadata is not unnecessarily duplicated by locale;
- missing translations fail validation;
- no new component-local bilingual copy map is introduced;
- no route switch points to an unverified target;
- the active guidance in [docs/I18N.md](../I18N.md) remains accurate.

A change to these boundaries requires updating this ADR or superseding it with a new accepted decision.

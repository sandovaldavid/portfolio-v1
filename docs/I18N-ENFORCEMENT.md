# Internationalization enforcement

This document owns the executable quality gates that enforce the localization architecture defined in [I18N.md](I18N.md) and [ADR-0001](adr/0001-granular-bilingual-content-architecture.md). It documents checks, exceptions and contributor diagnostics; it does not redefine content ownership.

## Commands

```bash
bun run check:i18n:catalogs
bun run check:i18n:content
bun run check:i18n:hardcoded
bun run check:i18n

bun run build
bun run check:i18n:routes
```

`bun run check` includes the three source-level checks through `check:i18n`. `bun run check:links` runs the generated-link checker and then `check:i18n:routes`, so route validation always evaluates fresh `dist` output after `bun run build`.

## Catalog enforcement

`scripts/i18n/check-catalogs.mjs` validates the mirrored modules below `src/shared/config/i18n/locales/{locale}/`.

It rejects:

- unsupported locale directories;
- a module present in only one supported locale;
- case-insensitive module-path collisions;
- duplicate JSON keys;
- missing keys across English and Spanish;
- empty values;
- arrays, records or other non-scalar leaf values;
- HTML inside catalog strings;
- locale modules that are not registered by `catalog.ts`.

Errors include the locale module, key and source line when available.

## Structured and editorial content enforcement

`scripts/i18n/check-content.mjs` validates schema-owned localized content without replacing Astro Content Collection validation.

For profile, experience and projects it verifies:

- only `en` and `es` locale directories exist;
- each JSON entry declares the locale represented by its directory;
- stable IDs use the documented lowercase kebab-case contract;
- IDs are unique inside a locale;
- every stable ID has English and Spanish counterparts.

For blog and devlog it verifies:

- every entry has a valid `translationKey`;
- translation identities are unique inside each locale;
- missing counterparts are rejected unless the entry is explicitly documented as intentionally single-language.

The only current intentional exception is the unpublished English `draft-rss-test` fixture. Exceptions live in `scripts/i18n/config.mjs` and require an exact collection/key plus a concrete reason. Stale exceptions fail validation.

## Hardcoded-copy enforcement

`scripts/i18n/check-hardcoded.mjs` scans production `.astro`, `.ts` and `.tsx` files outside canonical locale catalogs, content entries and assets.

It rejects high-confidence user-facing patterns:

- literal visible text nodes containing complete phrases;
- literal `aria-label`, `aria-description`, `alt`, `title` and `placeholder` values;
- literal DOM text and accessibility sinks;
- local `copy`, `labels`, `messages` or `translations` objects with both `en` and `es` branches;
- locale ternaries that select complete English and Spanish messages.

The scanner intentionally focuses on syntactic user-facing sinks instead of treating every TypeScript string as translatable. URLs, identifiers, CSS classes, source-code commands and language-neutral technical metadata remain outside this rule.

### Allowlist policy

The allowlist in `scripts/i18n/config.mjs` accepts only exact `file` + `value` entries with a non-empty reason. Broad directory exclusions, generic regular expressions and unexplained phrases are prohibited. A stale entry fails the check so temporary exceptions cannot remain indefinitely.

Prefer moving real UI copy to the owning catalog or Content Collection over adding an exception.

## Generated-route enforcement

`scripts/i18n/check-routes.mjs` reads built HTML from `dist` and validates the deployed contract rather than source-code intent.

It verifies:

- the representative English/Spanish route matrix was generated;
- `404.html` exists;
- `<html lang>` matches the emitted route;
- canonical URLs are self-referential;
- every emitted `hreflang` target exists;
- `x-default` matches the verified English route when English is available;
- every rendered language-picker target exists;
- Spanish pages do not contain the known English-only accessibility and error phrases listed in the versioned policy.

Missing editorial counterparts remain valid: unavailable locales render disabled controls and do not emit fabricated alternate links.

## Browser regression matrix

`tests/e2e/i18n-enforcement.spec.ts` runs inside `bun run test:e2e:smoke` against the built preview. It covers:

- home;
- about;
- research;
- projects and a project case study;
- blog index and article;
- devlog index and entry;
- English and Spanish 404 behavior.

Each paired route validates the active locale, self-referential canonical, `en`/`es`/`x-default` targets and language-picker route map. Spanish HTML is checked against the known English-only phrase policy.

## Contributor workflow

When changing localized content or routes:

1. update the canonical English and Spanish owners together;
2. run the focused source check for the changed category;
3. run `bun run check` and `bun run test:unit:ci`;
4. remove `dist`, run `bun run build`, then `bun run check:links`;
5. run `bun run test:e2e:smoke`;
6. inspect the full diff and do not bypass a failure with a broad allowlist.

A diagnostic is actionable when it names the affected file and the missing locale, namespace, key, stable ID, route or prohibited literal. Missing translations are build defects and are not resolved through English fallback.

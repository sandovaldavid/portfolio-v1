# Internationalization enforcement

This document owns the executable quality gates for the localization architecture defined in [I18N.md](I18N.md). It documents checks, exact exceptions and contributor diagnostics; it does not redefine content ownership.

## Commands

```bash
bun run check:i18n:catalogs
bun run check:i18n:content
bun run check:i18n:hardcoded
bun run check:i18n

bun run build
bun run check:i18n:routes
```

`bun run check` includes the three source-level checks through `check:i18n`. `bun run check:links` runs generated-link validation and then `check:i18n:routes`, so route validation evaluates fresh `dist` output after `bun run build`.

## Catalog enforcement

`scripts/i18n/check-catalogs.mjs` validates mirrored modules below `src/shared/config/i18n/locales/{locale}/`.

It rejects:

- unsupported locale directories;
- a module present in only one supported locale;
- case-insensitive module-path collisions;
- duplicate JSON keys;
- missing English/Spanish keys;
- empty values;
- arrays, records or other non-scalar leaves;
- HTML inside catalog strings;
- locale modules not registered by `catalog.ts`.

Diagnostics identify the locale module, key and source line when available.

## Structured and editorial content enforcement

`scripts/i18n/check-content.mjs` complements Astro Content Collection validation.

For profile, experience and projects it verifies:

- only supported locale directories exist;
- each entry locale matches its directory;
- stable IDs use the documented lowercase kebab-case contract;
- identities are unique inside a locale;
- every required stable ID has English and Spanish counterparts.

For blog and devlog it verifies:

- every entry has a valid `translationKey`;
- translation identities are unique inside each locale;
- missing counterparts are rejected unless the entry is explicitly documented as intentionally single-language.

The current intentional content exception is the unpublished English `draft-rss-test` fixture. Exceptions live in `scripts/i18n/config.mjs` and require an exact collection/key plus a concrete reason. Stale exceptions fail validation.

## Hardcoded-copy enforcement

`scripts/i18n/check-hardcoded.mjs` scans production `.astro`, `.ts` and `.tsx` files outside canonical locale catalogs, content entries and assets.

It rejects high-confidence user-facing patterns:

- literal visible phrases;
- literal `aria-label`, `aria-description`, `alt`, `title` and `placeholder` values;
- literal DOM text and accessibility sinks in TypeScript, Astro frontmatter and client scripts;
- local `copy`, `labels`, `messages` or `translations` objects with both locale branches;
- locale ternaries selecting complete messages.

The scanner targets user-facing sinks instead of treating every TypeScript string as translatable. URLs, locale codes, identifiers, CSS classes, source-code commands and decorative single-token metadata remain outside this rule.

### Intentional allowlist

The intentional allowlist accepts only exact `file` + `value` entries with a non-empty reason. It is reserved for proper names, official product/company names and genuinely decorative non-linguistic copy.

Broad directory exclusions, generic regular expressions and unexplained phrases are prohibited. Stale allowlist entries fail the check. Prefer moving real UI copy to its canonical catalog or Content Collection.

### Temporary migration-debt baseline

The source-level enforcement is **Implemented**. Issue #143 is **In progress** and owns removal of the remaining compatibility debt.

`HARD_CODED_COPY_DEBT_BASELINE` currently freezes the exact diagnostics for six known legacy route files:

- English and Spanish Atena routes;
- English and Spanish component-showcase routes;
- English and Spanish skills routes.

Each entry stores the exact file, diagnostic count, SHA-256 digest and reason. The digest is calculated from sorted diagnostics, so formatting-only line movement does not change it while added, removed or modified copy does.

This is not a directory bypass:

- unregistered files always fail;
- a new finding changes the digest and fails;
- removing migrated debt changes the digest and requires deleting the matching baseline entry;
- duplicate, stale, unexplained or malformed entries fail;
- no additional debt file may be added merely to make the gate pass.

The baseline and underlying legacy copy are **Deprecated** and must be removed together by #143.

## Generated-route enforcement

`scripts/i18n/check-routes.mjs` reads built HTML from `dist` and validates the deployed contract.

It verifies:

- the representative English/Spanish route matrix exists;
- `404.html` exists;
- `<html lang>` matches each emitted route;
- canonical URLs are self-referential;
- every emitted `hreflang` target exists;
- `x-default` matches the verified English route when English is available;
- every rendered language-picker target exists;
- Spanish output excludes known English-only accessibility and error phrases.

Missing editorial counterparts remain valid: unavailable locales render disabled controls and do not emit fabricated alternate links.

## Browser regression matrix

`tests/e2e/i18n-enforcement.spec.ts` runs inside `bun run test:e2e:smoke` against built output. It covers home, About, research, project index/detail, blog index/article, devlog index/entry and English/Spanish 404 behavior.

Each paired route validates locale, canonical, `en`/`es`/`x-default` targets and the language-picker route map.

## Contributor workflow

When changing localized content or routes:

1. update the canonical English and Spanish owners together;
2. run the focused source check for the changed category;
3. run `bun run check` and `bun run test:unit:ci`;
4. run `bun run build` and `bun run check:links`;
5. run `bun run test:e2e:smoke`;
6. inspect the diff and do not bypass failures with broad allowlists or unreviewed debt changes.

A diagnostic is actionable when it names the affected file and missing locale, namespace, key, stable ID, route or prohibited literal. Missing translations are build defects and are not resolved through English fallback.

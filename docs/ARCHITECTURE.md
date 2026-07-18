# Executable architecture rules

This document is the active source of truth for the repository's pragmatic Feature-Sliced Design boundaries. Historical migration material under `docs/FSD-Architecture/` is archived and does not override these rules.

## Dependency direction

Astro file-based routes are framework entry points, so they sit above application composition:

```text
src/pages → app → widgets → features → entities → shared
```

`src/assets` contains static resources and is not an architectural layer.

- Route files may compose the app layout and any lower layer.
- App composition may import widgets, features, entities and shared code.
- Widgets may import features, entities and shared code.
- Features may import entities and shared code.
- Entities may import shared code only.
- Shared code must not depend on product layers.

## Slice isolation and public APIs

The following rules are executable through `bun run lint:architecture` and therefore through `bun run lint`, `bun run check` and CI. The checker parses imports and re-exports in TypeScript, JavaScript and Astro frontmatter, including dynamic imports. Each violation identifies the importing file, source line, module specifier and failed rule.

1. Widgets, features and entities cannot import another slice in the same layer.
2. Cross-layer relative imports are forbidden.
3. Cross-slice relative imports are forbidden in widgets, features and entities.
4. Cross-layer imports use semantic aliases such as `@widgets/header` and `@entities/project`.
5. Slice internals such as `/ui/`, `/model/` and `/lib/` are private; consumers import from the slice `index.ts`.
6. Shared imports target a segment or slice public API such as `@shared/ui` or `@shared/lib/i18n`.
7. The catch-all `@/` alias and the retired `@components`, `@pages` and `@styles` aliases are forbidden.
8. The root `@widgets` barrel is forbidden because it hides slice ownership.

Relative imports remain valid inside the same slice.

## Shared technology vocabulary

Technology labels, icons and tag metadata are shared configuration at `src/shared/config/technology`. They are consumed by projects, pages and widgets but do not have independent domain behavior, so they are not an entity. This removes the former entity-to-entity dependency from `project` to `technology`.

## Layout safety

`Layout.astro` defaults to an internal-page layout. Home routes must opt in with the explicit `isHome` prop. Omitting the prop therefore renders the default slot instead of the homepage-only named slots.

Playwright regression tests assert that representative English and Spanish internal routes render one unique `<h1>` and do not render homepage sections.

## Growth policy

The current layers are frozen. Do not add another architectural layer, cross-entity exception or root aggregate barrel unless real product complexity requires it. A change to these boundaries requires:

1. a concrete use case that cannot be represented by the current layers;
2. an ADR describing alternatives and trade-offs;
3. an update to the executable checker and its tests.

## Commands

```bash
bun run lint:architecture
bun run lint
bun run check
```

When the checker reports a violation, move shared behavior downward or import through the target slice's public API. Do not add ad hoc exclusions.

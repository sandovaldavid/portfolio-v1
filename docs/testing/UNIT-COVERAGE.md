# Risk-based unit coverage policy

Vitest coverage in this repository measures a deliberately selected set of deterministic TypeScript modules. It is **not** a whole-repository coverage percentage.

The source of truth for the executable scope is `unitCoverageScope` in [`vitest.config.ts`](../../vitest.config.ts).

## Measured scope

The coverage denominator currently includes:

| Module group                                  | Why it is unit-tested                                                                                                               |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `src/shared/lib/i18n/**/*.ts`                 | Pure language, interpolation, path and translation behavior used across every route.                                                |
| `src/shared/config/i18n/**/*.ts`              | Language metadata and dictionary selection that directly affect localized output. Locale JSON files are excluded as static content. |
| `src/shared/lib/content/locale-content-id.ts` | Pure normalization and locale matching shared by blog and devlog content queries.                                                   |

The enforced baseline is 90% for lines, functions, branches and statements **within this measured scope only**. The threshold protects established behavior from regression; it must not be presented as 90% coverage of the application or repository.

## Behavior inventory and test strategy

| Behavior category                                                  | Primary verification                            | Unit coverage denominator |
| ------------------------------------------------------------------ | ----------------------------------------------- | ------------------------- |
| Pure i18n transformations and lookups                              | Vitest behavior and edge-case tests             | Included                  |
| Pure content ID normalization and locale matching                  | Vitest behavior and edge-case tests             | Included                  |
| Astro Content Collection queries for blog/devlog                   | Route, RSS and production-build E2E tests       | Excluded                  |
| Localized entity data factories and static catalogs                | Type checking plus rendered page/E2E assertions | Excluded                  |
| Astro component frontmatter and browser-side interaction           | Astro Check, Playwright and Axe                 | Excluded                  |
| Route generation, RSS endpoints and MDX rendering                  | Production build plus Playwright RSS/page tests | Excluded                  |
| Type-only modules, barrel exports, locale JSON and generated files | Type checking or schema validation              | Excluded                  |

Runtime-bound modules are excluded from the unit denominator when testing them would mostly reproduce Astro, browser or content-collection internals. Their behavior must still be covered at the appropriate integration boundary.

## Adding or changing the scope

Add a module to `unitCoverageScope` when all of the following are true:

1. it contains meaningful deterministic behavior, transformation or state logic;
2. it can be tested without mocking most of Astro or the browser;
3. tests can assert public behavior and edge cases rather than implementation details;
4. its regression risk justifies maintaining the tests.

Before expanding the glob, add tests for the newly eligible behavior and run the measured baseline. Do not lower thresholds only to make a broader but untested denominator pass. If a module is intentionally excluded, document its integration-level verification in the inventory above.

## Running and interpreting coverage

```bash
bun run test:unit:coverage
```

The command prints an explicit scope notice before the Vitest summary. CI uploads `coverage-report` for seven days with HTML, LCOV, JSON and JSON-summary output.

Interpret the percentages as:

> coverage of the risk-based pure-unit scope defined in `vitest.config.ts`

Do not interpret them as:

> percentage of all Astro components, routes, content, UI behavior or repository files covered by tests

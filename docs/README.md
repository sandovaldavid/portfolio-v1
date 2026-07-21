# Documentation index

English is the primary repository documentation language. Spanish is maintained for the root project guide and user-facing content.

## Active documentation

| Document                                                                                                   | Owns                                                       |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [README.md](../README.md)                                                                                  | Recruiter/developer overview, demo, CV and quick start     |
| [AGENTS.md](../AGENTS.md)                                                                                  | Shared working rules for humans and AI agents              |
| [ARCHITECTURE.md](ARCHITECTURE.md)                                                                         | Current FSD boundaries and executable architecture policy  |
| [DEVCONTAINER.md](DEVCONTAINER.md)                                                                         | Reproducible development environment and commands          |
| [I18N.md](I18N.md)                                                                                         | English/Spanish content ownership and localization rules   |
| [adr/0001-granular-bilingual-content-architecture.md](adr/0001-granular-bilingual-content-architecture.md) | Accepted localization architecture decision and trade-offs |
| [TESTING.md](TESTING.md)                                                                                   | Test strategy and local commands                           |
| [CI.md](CI.md)                                                                                             | PR, main and scheduled pipeline behavior                   |
| [DELIVERY.md](DELIVERY.md)                                                                                 | Branch, preview, production and release policy             |
| [TOOLCHAIN.md](TOOLCHAIN.md)                                                                               | Version and dependency classification policy               |
| [PERFORMANCE.md](PERFORMANCE.md)                                                                           | Route-budget methodology and loading decisions             |
| [STYLE-GUIDE.md](STYLE-GUIDE.md)                                                                           | Maintained visual tokens and typography rules              |
| [testing/UNIT-COVERAGE.md](testing/UNIT-COVERAGE.md)                                                       | Measured Vitest coverage scope                             |

Catalogs such as [features-catalog.md](features-catalog.md) and [widgets-catalog.md](widgets-catalog.md) describe current slices but do not redefine architecture rules.

## Historical documentation

Completed migration plans and point-in-time audits are frozen references. Start at [archive/README.md](archive/README.md). Do not use historical metrics or recommendations as current repository guarantees.

## Ownership and update policy

1. Update the owning document instead of copying the same guidance elsewhere.
2. `package.json`, `bun.lock` and executable configuration own versions and thresholds.
3. Quantitative statements require a reproducible command, versioned configuration or artifact methodology.
4. Tool-specific instruction files may contain only tool/path deltas and must reference [AGENTS.md](../AGENTS.md).
5. Consequential decisions should be recorded once in the nearest active document or a concise ADR.
6. Historical documents are not silently rewritten to match the present; add a correction banner only when necessary.
7. Run `bun run check:docs` after adding, removing or moving documentation.

The active documentation owner is the repository maintainer. Any PR changing behavior must update the owning document in the same change when the contract changes.

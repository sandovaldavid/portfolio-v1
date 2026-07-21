# Repository guidelines for agents

`AGENTS.md` is the canonical source for shared repository-working rules. Tool-specific files may add only tool or path-specific behavior and must link back here instead of copying these rules.

## 1. Sources of truth

| Concern                         | Canonical source                                                             |
| ------------------------------- | ---------------------------------------------------------------------------- |
| Product and repository overview | [README.md](README.md)                                                       |
| Architecture boundaries         | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and `bun run lint:architecture` |
| Tool and dependency versions    | [package.json](package.json) and `bun.lock`                                  |
| Testing                         | [docs/TESTING.md](docs/TESTING.md)                                           |
| CI behavior                     | [docs/CI.md](docs/CI.md)                                                     |
| Branches, releases, deployment  | [docs/DELIVERY.md](docs/DELIVERY.md)                                         |
| Performance budgets             | [docs/PERFORMANCE.md](docs/PERFORMANCE.md) and `performance-budgets.json`    |
| Documentation ownership         | [docs/README.md](docs/README.md)                                             |
| Contribution flow               | [CONTRIBUTING.md](CONTRIBUTING.md)                                           |

Do not copy version numbers, thresholds or architecture prose into another active document. Link to the canonical source.

## 2. Before changing code

1. Start from an updated `main` branch.
2. Read the issue, nearby implementation and relevant active documentation.
3. Keep one coherent concern per short-lived branch and pull request.
4. Determine the correct FSD layer before creating files.
5. Identify the regression test and bilingual impact before implementation.

Never work directly on `main`. Feature, fix and maintenance branches target `main`; preview deployments provide the repository's staging environment.

## 3. Architecture and code

The enforced dependency direction is:

```text
pages → app → widgets → features → entities → shared
```

Required practices:

- consume slices through semantic aliases and public `index.ts` APIs;
- do not import peer slices from `widgets`, `features` or `entities`;
- avoid catch-all aliases, deep imports and root layer barrels;
- use strict TypeScript and prefer `unknown` over `any`;
- type component props and non-trivial function boundaries;
- keep Astro route files focused on routing and composition;
- explain non-obvious decisions, not self-evident syntax.

`bun run lint:architecture` is authoritative when prose and implementation disagree.

## 4. User-facing changes

- Update English and Spanish content together.
- Use the existing i18n utilities and locale files; do not introduce a parallel translation mechanism.
- Preserve keyboard navigation, semantic HTML, reduced-motion behavior and light/dark themes.
- Add browser coverage for interactions, navigation lifecycle or responsive behavior.
- Do not add seniority, impact or performance claims without verifiable evidence.

## 5. Testing by change type

| Change              | Minimum validation                                                     |
| ------------------- | ---------------------------------------------------------------------- |
| Documentation only  | `bun run check:docs` and `bun run format:check`                        |
| Pure logic          | Unit tests plus `bun run test:unit:ci`                                 |
| Astro/UI behavior   | Relevant Playwright regression plus Chromium smoke                     |
| Architecture        | `bun run lint:architecture` and affected tests                         |
| Performance/loading | `bun run build`, `bun run performance:check` and relevant browser test |
| CI/tooling          | `bun run check`, the changed command locally, and final GitHub checks  |

Coverage percentages apply only to the scope documented in [docs/testing/UNIT-COVERAGE.md](docs/testing/UNIT-COVERAGE.md).

## 6. Documentation rules

- Keep the root README concise and recruiter/developer oriented.
- Update the owning active document instead of repeating guidance elsewhere.
- Quantitative claims require a versioned configuration, reproducible command or linked artifact methodology.
- Historical audits and completed migration plans are frozen; use [docs/archive/README.md](docs/archive/README.md) as their entry point.
- Run `bun run check:docs` after changing links or moving files.
- Consequential decisions belong in a concise ADR or the nearest owning active document.

## 7. Git and pull requests

Use Conventional Commits:

```text
<type>(<scope>): <description>
```

Common branch prefixes are `feat/`, `fix/`, `docs/`, `refactor/`, `perf/`, `test/`, `chore/`, `ci/`, `deps/` and `security/`.

A pull request should state:

- what changed and why;
- user/developer impact;
- validation performed;
- risks or trade-offs;
- `Closes #<issue>` when the merge should close an issue.

Use squash merge so the validated PR title becomes the single commit on `main`. Do not merge unless explicitly requested. Before marking a PR ready, confirm the final head is mergeable and every required check is green.

## 8. Canonical local gate

```bash
bun install --frozen-lockfile
bun run check
bun run test:unit:ci
bun run build
```

Add the relevant Playwright, Lighthouse or performance command based on the change. The exact commands are maintained in [package.json](package.json).

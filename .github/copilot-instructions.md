# GitHub Copilot repository instructions

Use [AGENTS.md](../AGENTS.md) as the canonical source for architecture, coding, testing, documentation and pull-request rules.

Copilot-specific behavior:

- apply the matching path-specific file under `.github/instructions/`;
- suggest existing semantic aliases and slice public APIs rather than deep imports;
- derive tool versions and commands from `package.json` instead of copied documentation;
- keep generated suggestions bilingual when they change user-facing text;
- propose tests with behavior changes;
- avoid unsupported seniority, impact, coverage or performance claims.

Architecture is enforced by `bun run lint:architecture`; repository validation begins with `bun run check`.

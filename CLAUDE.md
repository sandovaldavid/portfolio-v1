# Claude Code guidance

Use [AGENTS.md](AGENTS.md) as the canonical source for repository architecture, coding standards, testing expectations and documentation rules.

Claude-specific notes:

- Use Bun for dependency installation and project commands.
- Preserve the Feature-Sliced Design import direction documented in `AGENTS.md`.
- Keep English and Spanish user-facing content synchronized.
- Add regression tests for behavior changes, including Astro client-navigation lifecycles where relevant.
- Do not introduce professional claims, performance metrics or seniority labels without verifiable evidence.
- Prefer focused pull requests that address one issue or one coherent release group.

## Common commands

```bash
bun install
bun run dev
bun run build
bun run format:check
bun run lint
bun run test:unit
bun run test:local
```

For architecture details, active documentation and repository structure, start with [README.md](README.md), [AGENTS.md](AGENTS.md) and the relevant file under `docs/`.

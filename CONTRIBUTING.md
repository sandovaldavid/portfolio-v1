# Contributing

Contributions are welcome. Keep changes focused, reproducible and aligned with the active repository documentation.

## Setup

Use the Bun version declared in [package.json](package.json).

```bash
git clone https://github.com/sandovaldavid/portfolio-v1.git
cd portfolio-v1
bun install --frozen-lockfile
bun run dev
```

## Workflow

1. Update `develop` and create a prefixed branch from it.
2. Read [AGENTS.md](AGENTS.md) and the owning document for the area being changed.
3. Implement one coherent concern.
4. Add the relevant unit or browser regression.
5. Keep English and Spanish user-facing content synchronized.
6. Run the canonical checks and any change-specific checks.
7. Open a pull request into `develop` using a Conventional Commit title.

```bash
bun run check
bun run test:unit:ci
bun run build
```

See [docs/TESTING.md](docs/TESTING.md) for browser, accessibility, coverage and performance commands.

## Pull requests

A pull request should include:

- the problem and root cause;
- the chosen solution and trade-offs;
- the validation performed;
- screenshots for visible changes;
- `Closes #<issue>` when appropriate.

All required checks must pass. Do not bypass architecture, testing, accessibility or performance gates by weakening configuration without documenting and justifying the change.

## Documentation

[docs/README.md](docs/README.md) defines ownership and update rules. Avoid copying versions, thresholds or common agent guidance. Historical audits and completed plans are read-only references indexed through [docs/archive/README.md](docs/archive/README.md).

## Conduct

Be respectful, keep reviews specific and evidence-based, and separate technical disagreement from personal criticism.

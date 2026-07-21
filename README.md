# David Sandoval — Software Engineering Portfolio

[![Live portfolio](https://img.shields.io/badge/live-sandovaldavid.com-0096ff)](https://sandovaldavid.com)
[![CI](https://github.com/sandovaldavid/portfolio-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/sandovaldavid/portfolio-v1/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A bilingual, static-first portfolio for presenting software-engineering experience, project evidence, research and technical writing.

## Quick access

| Resource                 | Link                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| Live demo                | [sandovaldavid.com](https://sandovaldavid.com)                                                |
| English CV               | [david-sandoval-resume.pdf](https://sandovaldavid.com/resume/david-sandoval-resume.pdf)       |
| Spanish CV               | [david-sandoval-resume-es.pdf](https://sandovaldavid.com/resume/david-sandoval-resume-es.pdf) |
| Spanish repository guide | [README.es.md](README.es.md)                                                                  |

## Engineering decisions

- **Static-first delivery:** Astro renders professional content as HTML; JavaScript is limited to progressive enhancements.
- **Feature-Sliced Design:** dependencies follow `app → widgets → features → entities → shared` and are enforced by an architecture checker.
- **Bilingual routing:** English is the default locale and Spanish routes use `/es`, with localized metadata, content and RSS feeds.
- **Evidence over claims:** performance and coverage statements are tied to versioned configuration and reproducible commands.
- **Intentional loading:** route-level performance budgets, selective prefetch and self-hosted fonts protect representative recruiter journeys.

## Quality gates

| Area                       | Enforcement                                                     |
| -------------------------- | --------------------------------------------------------------- |
| Formatting, lint and types | `bun run check`                                                 |
| Documentation links        | `bun run check:docs`                                            |
| Unit behavior              | Vitest with a documented risk-based coverage scope              |
| Browser flows              | Playwright across proportional PR, main and scheduled pipelines |
| Accessibility              | Axe gates for serious and critical violations                   |
| Performance                | Route budgets plus Lighthouse CI                                |
| Deployment                 | Vercel previews and production resume checks                    |

The exact scope and thresholds live in repository configuration, not in marketing copy.

## Architecture

```text
src/pages → src/app → src/widgets → src/features → src/entities → src/shared
```

Astro route files are framework entry points. Application code consumes lower layers through semantic aliases and slice public APIs. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the executable rules.

## Local development

Use the Bun version declared by `packageManager` in [package.json](package.json).

```bash
git clone https://github.com/sandovaldavid/portfolio-v1.git
cd portfolio-v1
bun install --frozen-lockfile
bun run dev
```

Common validation commands:

```bash
bun run check
bun run test:unit:ci
bun run build
bun run performance:check
bun run test:e2e:smoke
```

## Documentation

- [Documentation index and ownership](docs/README.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Testing](docs/TESTING.md)
- [CI policy](docs/CI.md)
- [Toolchain](docs/TOOLCHAIN.md)
- [Performance methodology](docs/PERFORMANCE.md)
- [Agent guidelines](AGENTS.md)
- [Contribution workflow](CONTRIBUTING.md)
- [Historical material](docs/archive/README.md)

## License

[MIT](LICENSE)

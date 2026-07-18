# David Sandoval — Software Engineering Portfolio

[![Live portfolio](https://img.shields.io/badge/live-sandovaldavid.com-0096ff)](https://sandovaldavid.com)
[![CI](https://github.com/sandovaldavid/portfolio-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/sandovaldavid/portfolio-v1/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A bilingual portfolio built with Astro, TypeScript and Tailwind CSS to present professional experience, engineering case studies and software-engineering research.

**Primary profile:** Software Engineer focused on Angular, .NET and TypeScript. Based in Lima, Peru (UTC-5), and open to remote opportunities across Europe and Latin America.

- **Live site:** https://sandovaldavid.com
- **English resume:** https://sandovaldavid.com/resume/david-sandoval-resume.pdf
- **Spanish resume:** https://sandovaldavid.com/resume/david-sandoval-resume-es.pdf
- **Spanish documentation:** [README.es.md](README.es.md)

The resume URLs are stable, public and served by the portfolio domain. Validated PDFs are generated in the private resume repository and synchronized to the dedicated `resume-assets` branch before production deployment.

## What this repository demonstrates

### Astro application architecture

The site uses Astro for static generation and progressive enhancement. Interactive behavior is isolated to the controls that need it, while professional content remains available without waiting for a client-side application to initialize.

Astro route files are framework entry points above the application composition layers:

```text
routes → app → widgets → features → entities → shared
```

`bun run lint:architecture` enforces dependency direction, slice isolation, semantic aliases and public APIs. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the executable rules.

### Internationalization and content

- English is the default locale.
- Spanish routes use the `/es` prefix.
- Project case studies describe the problem, approach, trade-offs, outcome and lessons learned.
- Blog and devlog content use Astro Content Collections and MDX/Markdown.
- RSS feeds are generated for both languages.

### Recruiter-focused experience

The default first visit exposes the role, core stack, selected work, email, resume, GitHub and LinkedIn immediately. The retro boot sequence is an optional experience available through the `Launch retro mode` action instead of blocking access to the portfolio.

### Quality gates

The repository includes automated checks for:

- Astro and TypeScript validation;
- formatting and linting;
- unit tests with Vitest;
- browser flows with Playwright;
- accessibility checks with Axe;
- Lighthouse audits;
- production builds and deployment previews;
- public resume availability, PDF signatures and response headers after production deployment.

`bun run check` is the canonical local and CI quality gate. It checks repository-wide formatting, lints JavaScript, TypeScript and Astro files, runs Astro diagnostics, and type-checks tests, scripts and supported configuration files.

The scope and thresholds of each check are defined in the repository configuration and GitHub Actions workflows. Vitest percentages cover the [risk-based pure-unit scope](docs/testing/UNIT-COVERAGE.md), not the whole repository. Generated output, imported agent knowledge and historical audit material are explicitly excluded from formatting; maintained source, tests, tooling, configuration and documentation remain covered. Reports are uploaded as CI artifacts where applicable.

## Main technologies

- Astro
- TypeScript
- Tailwind CSS
- Bun
- Vitest
- Playwright
- Axe
- Lighthouse CI
- Vercel

## Repository structure

```text
src/
├── app/          # layouts and global styles
├── pages/        # Astro routes and locale mirrors
├── widgets/      # page-level interface sections
├── features/     # interactive user capabilities
├── entities/     # project, experience and content models
├── shared/       # reusable UI, configuration and utilities
└── content/      # blog and devlog collections

tests/
├── unit/
└── e2e/

docs/
├── architecture and testing references
├── active implementation tasks
└── archived audits and migration notes
```

## Local development

### Requirements

- Bun 1.3.14, declared by `packageManager` in `package.json`
- Git

### Setup

```bash
git clone https://github.com/sandovaldavid/portfolio-v1.git
cd portfolio-v1
bun install
bun run dev
```

The development server is available at `http://localhost:4321`.

### Common commands

```bash
bun run dev                 # development server
bun run check               # complete formatting, lint and type-check gate
bun run typecheck           # Astro plus tests/tooling type-checking
bun run build               # Astro check and production build
bun run preview             # preview the production build
bun run format:check        # verify repository formatting
bun run lint                # lint JavaScript, TypeScript and Astro
bun run test:unit           # unit tests
bun run test:unit:coverage  # risk-based unit coverage report
bun run test:local          # Chromium, Firefox and Mobile Chrome
bun run test                # complete Playwright matrix
bun run lighthouse          # Lighthouse CI
```

The versioning and dependency-classification rules are documented in [docs/TOOLCHAIN.md](docs/TOOLCHAIN.md).

## Engineering decisions

### Static-first delivery

Professional content is rendered as HTML by Astro. JavaScript is used for progressive enhancements such as navigation controls, theme persistence and optional retro interactions.

### Optional retro interface

The retro visual system is part of the portfolio identity, but it is not a prerequisite for accessing essential information. This keeps the distinctive design while reducing first-visit friction for recruiters and hiring managers.

### Bilingual routing

English and Spanish share the same component architecture while exposing locale-specific routes, metadata, RSS feeds and content.

### Automated regression checks

Critical navigation, responsive behavior, accessibility and client-navigation lifecycles are tested in browsers. Changes to interactive components should include a regression test that covers both initial load and Astro client navigation when relevant.

### Isolated resume delivery

The private resume repository publishes only generated PDFs and provenance metadata to the public `resume-assets` branch. Production deployment checks out those assets, places them under `public/resume`, and verifies the canonical URLs after Vercel deployment.

## Contributing

This is a personal portfolio, but issues and constructive reviews are welcome. Development conventions and agent guidance live in [AGENTS.md](AGENTS.md). Active technical decisions should be documented close to the relevant code or as concise ADRs.

## License

[MIT](LICENSE)

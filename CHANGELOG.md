# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Comprehensive testing infrastructure (Lighthouse CI, Playwright E2E)
- GitHub Pages publishing for test reports
- Bundle size analysis workflow
- Vitest unit testing framework
- CodeQL security scanning
- Dependabot configuration for dependency updates
- Pre-commit git hook for linting and formatting
- Contributing guidelines (CONTRIBUTING.md)
- Performance budgets (lighthouse-budget.json)
- Semantic versioning configuration (release-it)

### Changed
- Updated Astro from 5.15.3 to 5.17.1
- Updated TypeScript from 5.7.2 to 5.9.3
- Updated Tailwind CSS from 4.1.13 to 4.1.18
- Enhanced validation workflow to include unit tests and security audit
- Improved pre-commit hook implementation

### Security
- Added CodeQL analysis for security vulnerabilities
- Added npm audit to CI/CD pipeline
- Configured Dependabot for automated security patches

---

## [0.1.0] - 2026-06-17

### Initial Release

### Added
- Astro 5.15.3 static site generator
- TypeScript 5.7.2 strict mode
- Tailwind CSS 4.1.13 with dark mode support
- Feature-Sliced Design (FSD) architecture
- Internationalization (i18n) - Spanish/English
- Responsive design (mobile-first)
- Dark/light theme system
- Vercel deployment integration
- ESLint and Prettier configuration
- Commitlint for conventional commits
- Husky git hooks
- Lighthouse performance reporting
- Screenshot automation with Playwright
- GitHub Actions workflows for CI/CD
- Comprehensive documentation
  - Architecture (FSD) guide
  - Development workflow
  - Deployment procedures
  - Testing guidelines

### Features
- Multi-language support (ES/EN)
- Adaptive theme detection
- Performance-optimized static generation
- Semantic HTML and accessibility
- SEO-optimized with meta tags and JSON-LD
- Analytics integration with Vercel
- Robots.txt generation

### Performance
- Lighthouse Performance Score: 91/100
- Lighthouse Accessibility Score: 97/100
- Lighthouse Best Practices Score: 96/100
- Lighthouse SEO Score: 100/100
- Zero JavaScript in critical path
- Optimized images (WebP format)

---

## Release Process

Releases are automated using semantic versioning:

```bash
npm run release
# or with pre-release
npm run release -- --preRelease=beta
```

Changes are tracked using Conventional Commits:
- `feat:` generates MINOR version bump
- `fix:` generates PATCH version bump
- `BREAKING CHANGE:` generates MAJOR version bump

For detailed contributing guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

**Maintainer:** David Sandoval
**Email:** hello@sandovaldavid.com | dev@sandovaldavid.com
**Repository:** https://github.com/sandovaldavid/portfolio-v1

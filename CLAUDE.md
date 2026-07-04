# CLAUDE.md - Portfolio V1 Development Guide

Comprehensive development guidance for Portfolio V1. This file is essential for understanding project structure, workflows, and best practices.

**Contact:** hello@sandovaldavid.com | dev@sandovaldavid.com

---

## Project Overview

Personal portfolio website built with Astro, TypeScript, and Tailwind CSS. 
**Live:** https://sandovaldavid.com

**Tech Stack:**
- Astro 6.4.8 (Static Site Generator)
- TypeScript 5.9.3 (strict mode)
- Tailwind CSS 4.3.1 with @tailwindcss/vite
- Bun 1.3.14 (package manager and runtime)
- Playwright 1.61.0 (E2E testing)
- Vitest 4.1.9 (Unit testing)

---

## Quick Start

[INFO] Always use Bun, never npm or yarn:

```bash
# Development
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:4321)
bun run build            # Type check + build for production
bun run preview          # Preview production build

# Code Quality
bun run format           # Format code with Prettier
bun run format:check     # Check formatting
bun run lint             # Run ESLint
bun run lint:fix         # Auto-fix linting errors

# Testing
bun run test:unit        # Unit tests with Vitest
bun run test:unit:ui     # Interactive Vitest UI
bun run test:unit:coverage  # Coverage report
bun run test             # E2E tests with Playwright
bun run test:ui          # Interactive Playwright UI
bun run test:all         # Run all tests

# Performance
bun run lighthouse       # Lighthouse CI
bun run bundle:analyze   # Bundle size analysis
```

---

## Architecture: Feature-Sliced Design (FSD)

The project strictly follows FSD with proper layer hierarchy:

```
src/
├── app/                 # Global layouts, config, styles
│   ├── layouts/
│   │   └── Layout.astro
│   └── styles/
│       ├── global.css
│       └── colors.css
├── pages/               # Route handlers (astro pages)
│   ├── index.astro
│   ├── about.astro
│   ├── projects.astro   # + projects/ (case studies)
│   ├── skills.astro
│   ├── research.astro
│   ├── devlog.astro     # + devlog/ (posts)
│   ├── blog.astro       # + blog/ (MDX posts) + rss.xml.ts
│   ├── atena.astro
│   ├── components.astro # dev showcase
│   ├── 404.astro
│   └── es/              # Spanish mirrors of all pages
├── widgets/             # Large reusable UI blocks
│   ├── header/
│   ├── footer/
│   ├── hero/
│   ├── blog/
│   └── [17 widgets total]
├── features/            # Business features
│   ├── theme-toggle/
│   ├── language-picker/
│   ├── cli-terminal/
│   └── splash-screen/
├── entities/            # Business domain entities
│   ├── project/
│   ├── experience/
│   ├── badge/
│   ├── technology/
│   ├── devlog/
│   └── blog/            # queries over src/content/blog (MDX collection)
└── shared/              # Shared utilities
    ├── ui/              # UI components
    ├── lib/             # Utilities and helpers
    └── config/          # Configuration
```

### FSD Rules (STRICT)

[INFO] **Import Direction:** app → pages → widgets → features → entities → shared

1. Each layer can ONLY import from layers below it
2. Pages cannot import other pages
3. Widgets cannot import other widgets
4. Features cannot import other features
5. Each slice has `index.ts` exporting public API
6. No circular dependencies

**Example - Correct:**
```typescript
// ✓ Widget importing from Entity
import { ProjectCard } from '@entities/project';

// ✓ Page importing Widget
import { ProjectsWidget } from '@widgets/projects';

// ✓ Feature importing shared
import { Button } from '@shared/ui';
```

**Example - Incorrect:**
```typescript
// ✗ Widget importing another Widget
import { Header } from '@widgets/header';  // WRONG!

// ✗ Shared importing from higher layer
import { ProjectCard } from '@entities/project';  // WRONG!

// ✗ Page importing Page
import { ProjectPage } from '@pages/projects';  // WRONG!
```

### Path Aliases

```typescript
@/              // src/
@app/*          // src/app/*
@pages/*        // src/pages/*
@widgets/*      // src/widgets/*
@features/*     // src/features/*
@entities/*     // src/entities/*
@shared/*       // src/shared/*
```

---

## Internationalization (i18n)

**Status:** English (default, no prefix) | Spanish (/es prefix)

```typescript
// In components
import { getLangFromUrl, useTranslations } from '@shared/lib/i18n';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

// Usage
<h1>{t('page.title')}</h1>
```

**Adding translations:**

1. Update `src/shared/config/i18n/locales/en.json`:
   ```json
   {
     "feature.myFeature.title": "My Feature"
   }
   ```

2. Update `src/shared/config/i18n/locales/es.json`:
   ```json
   {
     "feature.myFeature.title": "Mi Feature"
   }
   ```

3. Use in component:
   ```astro
   {t('feature.myFeature.title')}
   ```

---

## Code Standards

### TypeScript

[REQUIRED] Strict mode enabled:
- Always type function parameters and return types
- Prefer `interface` over `type` for object shapes
- Use `const` over `let` where possible
- No `any` (use `unknown` or specific type)

```typescript
// ✓ Correct
interface ComponentProps {
  title: string;
  description?: string;
}

function getConfig(props: ComponentProps): ConfigType {
  return { ...props };
}

// ✗ Incorrect
function getConfig(props) {  // No type!
  return props;
}
```

### Astro Components

- File extension: `.astro`
- Component names: PascalCase
- Props: Always typed with interface
- Keep frontmatter clean (separate imports)

```astro
---
import Layout from '@app/layouts/Layout.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<Layout title={title}>
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</Layout>
```

### Styling

- Primary: Tailwind CSS utility classes
- Mobile-first responsive design
- Support dark mode with `dark:` prefix
- Prefer scoped styles over global
- Use semantic color tokens from colors.css

```astro
<div class="text-sm dark:text-gray-300 md:text-base">
  Content
</div>
```

### File Naming

- Components: PascalCase (`Hero.astro`, `ThemeToggle.astro`)
- Pages: kebab-case (`about-me.astro`)
- Utilities: camelCase (`translations.ts`)
- Constants: UPPER_SNAKE_CASE

---

## Testing Strategy

[INFO] Three levels of testing:

### Unit Tests (Vitest)

**Location:** `tests/unit/**/*.spec.ts`

[REQUIRED] for:
- Utility functions (i18n, helpers)
- Data transformations
- Business logic

```typescript
import { describe, it, expect } from 'vitest';
import { getLangFromUrl } from '@shared/lib/i18n';

describe('getLangFromUrl', () => {
  it('should return "en" for root URL', () => {
    const url = new URL('http://localhost:4321/');
    expect(getLangFromUrl(url)).toBe('en');
  });
});
```

**Run:**
```bash
bun run test:unit          # All tests
bun run test:unit:ui       # Interactive
bun run test:unit:coverage # Coverage
```

**Coverage targets:** 90% (lines, functions, branches, statements)

[INFO] Coverage scope is currently limited to the i18n modules (`src/shared/lib/i18n/**`, `src/shared/config/i18n/**`) in `vitest.config.ts` — the 90% threshold applies only to those files.

### E2E Tests (Playwright)

**Location:** `tests/e2e/**/*.spec.ts`

[REQUIRED] for:
- User-facing features
- Critical user flows
- Multi-page navigation
- Form submissions
- Accessibility compliance

```typescript
import { test, expect } from '@playwright/test';

test('homepage should load', async ({ page }) => {
  await page.goto('/');
  
  // Navigation
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  
  // Interaction
  const button = page.locator('button').first();
  await button.click();
});
```

**Run:**
```bash
bun run test               # All tests
bun run test:ui            # Interactive
bun run test tests/e2e/my.spec.ts  # Specific test
```

**Coverage:** All new features must have E2E tests

### Performance Tests (Lighthouse)

**Location:** `.lighthouserc.json`

[REQUIRED] thresholds (enforced by `.lighthouserc.json`):
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: ≥90

[INFO] Resource/timing budgets (LCP ≤2.5s, CLS ≤0.1) are defined in `lighthouse-budget.json` as reference targets — they are not currently wired into the Lighthouse CI assertions.

```bash
bun run lighthouse         # Run Lighthouse CI
```

---

## Adding New Features

### Step 1: Plan

Before coding:
- Which FSD layer?
- What dependencies?
- Needs i18n?
- Needs tests?
- Needs documentation?

### Step 2: Create Slice

```bash
src/features/my-feature/
├── index.ts              # Public API
├── model/
│   └── types.ts          # Types and interfaces
└── ui/
    ├── MyFeature.astro   # Component
    └── index.ts          # Export component
```

### Step 3: Implement

```typescript
// model/types.ts
export interface MyFeatureProps {
  title: string;
  description?: string;
}
```

```astro
--- // ui/MyFeature.astro
import type { MyFeatureProps } from '../model/types';

interface Props extends MyFeatureProps {}
const { title, description } = Astro.props;
---

<div>
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>
```

```typescript
// index.ts
export { default as MyFeature } from './ui/MyFeature.astro';
export type { MyFeatureProps } from './model/types';
```

### Step 4: Add Tests

**Unit tests** (if logic):
```bash
tests/unit/features/my-feature.spec.ts
```

**E2E tests** (if UI):
```bash
tests/e2e/my-feature.spec.ts
```

### Step 5: Add Translations

If text content:
```json
// locales/en.json
{
  "feature.myFeature.title": "My Feature Title"
}

// locales/es.json
{
  "feature.myFeature.title": "Título de Mi Feature"
}
```

### Step 6: Document

Update relevant docs:
- CONTRIBUTING.md - If changing workflow
- docs/TESTING.md - If adding tests
- README.md - If user-facing

---

## Git Workflow & Commits

### Branch Strategy

```
main
 └── develop          ← base para todo el trabajo
       ├── feat/...
       ├── fix/...
       ├── docs/...
       └── ...
```

**Reglas:**
1. Todas las ramas nuevas salen de `develop`, no de `main`
2. Las PRs van siempre a `develop`
3. Solo `develop` hace PR a `main` (producción)
4. Nunca trabajar directamente en `main` ni en `develop`

**Flujo estándar:**
```bash
# 1. Asegurarse de estar en develop actualizado
git checkout develop
git pull origin develop

# 2. Crear rama desde develop
git checkout -b feat/my-feature

# 3. Desarrollar, commitear
git add .
git commit -m "feat(scope): description"

# 4. Push y abrir PR hacia develop
git push origin feat/my-feature
# Abrir PR: feat/my-feature → develop
```

### Branch Naming

```
feat/feature-name           # Nueva funcionalidad
fix/issue-description       # Corrección de bug
docs/what-changed           # Documentación
refactor/component-name     # Refactorización
perf/optimization-name      # Performance
test/test-coverage          # Tests
chore/maintenance           # Mantenimiento
ci/pipeline-change          # CI/CD
deps/package-update         # Dependencias
security/fix-description    # Seguridad
```

### Conventional Commits

[REQUIRED] Format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Refactoring
- `perf` - Performance
- `test` - Tests
- `chore` - Maintenance
- `ci` - CI/CD
- `deps` - Dependencies
- `security` - Security

**Examples:**
```
feat(i18n): add French language support
fix(header): resolve mobile menu toggle
docs: update README with new features
test(unit): add i18n utility tests
chore(deps): update Astro to v6.4.8
```

[INFO] Pre-commit hook auto-formats and lints before commit
[INFO] Husky validates commit message format

---

## CI/CD Pipelines

### Flujo de despliegue

```
feat/* / fix/* / ...
        │
        │  PR → develop
        ▼
    develop  ──→  Preview en Vercel (automático)
        │
        │  PR → main (solo desde develop)
        ▼
      main   ──→  Producción en Vercel (automático)
```

### ci.yml — Continuous Integration

Runs on: Push to main/develop, Pull requests

Jobs:
1. **validate** — ESLint, Prettier check, Conventional Commits validation (PRs)
2. **test-unit** — Vitest with coverage (artifact: `coverage-report`)
3. **build** — Astro check + build, bundle size analysis (5MB threshold, warning only), uploads `dist` and `bundle-analysis` artifacts
4. **lighthouse** — Lighthouse CI over the prebuilt dist (artifact: `lighthouse-reports`)
5. **playwright** — E2E on 5 browsers/devices (artifact: `playwright-report`)
6. **pr-summary** — posts a unified PR comment with job statuses and direct download links to all artifacts

[REQUIRED] All must pass before merge

[INFO] Reports are NOT published to GitHub Pages — they are delivered as run
artifacts, linked from the unified PR comment. Download locally with
`gh run download <run-id>`.

### codeql.yml

Runs on: Push, PRs, weekly schedule (Sundays)

Analyzes:
- JavaScript/TypeScript code (`security-and-quality` queries)
- Security vulnerabilities
- Code quality issues

### deploy-preview.yml

Runs on: Push to develop, Pull requests to main/develop (skips dependabot)

- Builds with `vercel build` and deploys `--prebuilt` to Vercel Preview
- Creates a GitHub Deployment with full status lifecycle (PRs)
- Posts/updates a PR comment with the preview URL

### deploy-production.yml

Runs on: Push to main

- Builds with `vercel build --prod` and deploys `--prebuilt --prod` to Vercel Production

### release-please.yml

Runs on: Push to main/develop

- Automates versioning and CHANGELOG via googleapis/release-please-action
- Dual config: `release-please-config.json` (main) and `release-please-config-develop.json` (develop, beta pre-releases)

### build-devcontainer.yml

Builds and publishes the devcontainer image used for local Playwright testing.

---

## Deployment

### Preview (develop branch)

Automatically deployed to Vercel Preview on:
- Push to develop
- Pull requests

### Production (main branch)

Automatically deployed to Vercel Production on:
- Push to main

[WARNING] Ensure all checks pass before pushing to main

**Vercel Configuration:**
```json
{
  "installCommand": "bun install --frozen-lockfile",
  "buildCommand": "bun run build",
  "deploymentEnabled": false  // Manual via Actions
}
```

---

## Performance Guidelines

### Bundle Size

[TARGET] dist/ ≤ 5MB

Monitor:
```bash
bun run build
bun run bundle:analyze
```

### Lighthouse Targets

[TARGET] All pages:
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: ≥90

### Images

- Use WebP format
- Optimize dimensions before adding
- Use responsive images
- Lazy load below-the-fold

---

## Accessibility Requirements

[REQUIRED] All features must:
- Support keyboard navigation
- Have proper alt text
- Use semantic HTML
- Maintain heading hierarchy
- Pass WCAG 2.1 Level AA
- Not rely on color alone

---

## Documentation

### Key Files

- **CLAUDE.md** - This file (development guide)
- **CONTRIBUTING.md** - Contributing guidelines
- **CHANGELOG.md** - Version history
- **docs/TESTING.md** - Testing guide
- **docs/widgets-catalog.md** - Catalog of the 17 widget slices
- **docs/features-catalog.md** - Catalog of the 4 feature slices
- **docs/tasks/** - Task tracking per branch (latest: branch-06, pending)
- **docs/reports/** - Audit reports (latest: portfolio-audit-2026-06)
- **docs/FSD-Architecture/** - FSD documentation (historical migration guides)

### Creating New Docs

- Use Markdown format
- Include examples
- Add table of contents for long docs
- Link to related documentation
- Update CONTRIBUTING.md if relevant

---

## Troubleshooting

### Tests failing locally

```bash
# Clear cache
rm -rf node_modules .bun dist

# Reinstall
bun install

# Run tests
bun run test:all
```

### Build failing

```bash
# Check for type errors
bun run build

# Run linting
bun run lint

# Format code
bun run format
```

### Playwright issues

```bash
# Install browsers
bunx playwright install --with-deps

# Run specific test
bun run test tests/e2e/homepage.spec.ts --debug
```

---

## Common Tasks

### Fix linting errors
```bash
bun run lint:fix
```

### Format all code
```bash
bun run format
```

### Update dependencies
```bash
bun update
```

### Check TypeScript
```bash
bun run build
```

### View test coverage
```bash
bun run test:unit:coverage
```

---

## Performance Checklist

Before merging:
- [ ] Unit tests passing
- [ ] E2E tests passing
- [ ] Lighthouse ≥90 on all categories
- [ ] Bundle size within limits
- [ ] No TypeScript errors
- [ ] ESLint passes
- [ ] Prettier formatted
- [ ] Accessibility checks pass
- [ ] Documentation updated

---

## Getting Help

[INFO] Questions or issues?
- Email: hello@sandovaldavid.com
- Email: dev@sandovaldavid.com
- Create GitHub Discussion
- Check docs/reports/ for detailed audit info

---

**Last Updated:** July 4, 2026
**Status:** Active Development
**Maturity:** 4.5/5 (Production Ready)
**CI/CD:** Consolidated in ci.yml + deploy workflows (Vercel via Actions)

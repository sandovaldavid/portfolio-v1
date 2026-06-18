# Contributing to Portfolio V1

Thank you for your interest in contributing! This document provides guidelines for submitting changes to the project.

**Contact:** hello@sandovaldavid.com | dev@sandovaldavid.com

---

## Getting Started

### Prerequisites

- Bun ≥1.3.14
- Node.js ≥22.0.0 (for running tools if needed)
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-v1.git
   cd portfolio-v1
   ```

3. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

4. Install dependencies:
   ```bash
   bun install
   ```

5. Start development server:
   ```bash
   bun run dev
   ```

---

## Development Workflow

### Before You Commit

1. **Format code:**
   ```bash
   bun run format
   ```

2. **Fix linting errors:**
   ```bash
   bun run lint:fix
   ```

3. **Run unit tests:**
   ```bash
   bun run test:unit
   ```

4. **Run E2E tests:**
   ```bash
   bun run test
   ```

5. **Build to verify:**
   ```bash
   bun run build
   ```

**Note:** The pre-commit hook will automatically run format and lint:fix before each commit.

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style (formatting, semicolons, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build, dependencies, tooling
- `ci` - CI/CD pipeline changes
- `revert` - Reverting previous commit
- `build` - Build system changes
- `deps` - Dependency updates
- `security` - Security fixes
- `hotfix` - Critical production fixes

**Examples:**
```
feat(i18n): add French language support
fix(header): resolve mobile menu toggle issue
docs: update README with deployment instructions
test(unit): add coverage for i18n utilities
chore(deps): update Astro to v5.17.1
ci(testing): add CodeQL security scanning
```

**Scope (optional):**
- `header` - Header widget
- `footer` - Footer widget
- `projects` - Projects page/entity
- `i18n` - Internationalization
- `theme` - Theme system
- `build` - Build configuration
- `testing` - Testing infrastructure

---

## Code Standards

### TypeScript

- Use strict mode (required)
- Always type function parameters and return types
- Prefer `interface` over `type` for object shapes
- Use `const` over `let` where possible

**Example:**
```typescript
interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function getHeaderConfig(props: HeaderProps): HeaderConfig {
  // Implementation
}
```

### Astro Components

- File extension: `.astro`
- Component names: PascalCase
- Props: Always use typed interfaces

**Example:**
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

- Use Tailwind CSS utility classes
- Mobile-first responsive design
- Support both light and dark modes
- Prefer scoped styles over global

### File Organization (FSD)

Follow Feature-Sliced Design rules:

```
src/
├── app/         # Global config, layouts
├── pages/       # Route handlers
├── widgets/     # Large UI blocks
├── features/    # Business features
├── entities/    # Business entities
└── shared/      # Shared utilities
```

[INFO] Import rule: Layers can only import from layers below them
[INFO] Each slice has index.ts exporting public API
[INFO] No circular dependencies between slices

---

## Adding Features

### Step 1: Plan

Before starting, consider:
- Which FSD layer does this belong to?
- What entities does it depend on?
- Do I need to add i18n strings?
- Should this have unit/E2E tests?

### Step 2: Implement

1. Create slice structure:
   ```bash
   src/features/my-feature/
   ├── index.ts          # Public API
   ├── model/
   │   └── types.ts      # Type definitions
   └── ui/
       ├── MyFeature.astro
       └── index.ts
   ```

2. Export public API in `index.ts`:
   ```typescript
   export { default as MyFeature } from './ui/MyFeature.astro';
   export type { MyFeatureProps } from './model/types';
   ```

### Step 3: Add Tests

**Unit tests** (if needed):
```bash
tests/unit/features/my-feature.spec.ts
```

**E2E tests** (if user-facing):
```bash
tests/e2e/my-feature.spec.ts
```

### Step 4: Add Translations

If your feature has UI text:

1. Update `src/shared/config/i18n/locales/en.json`:
   ```json
   {
     "feature.myFeature.title": "My Feature Title",
     "feature.myFeature.description": "Feature description"
   }
   ```

2. Update `src/shared/config/i18n/locales/es.json`:
   ```json
   {
     "feature.myFeature.title": "Título de Mi Feature",
     "feature.myFeature.description": "Descripción de feature"
   }
   ```

3. Use in component:
   ```astro
   ---
   import { useTranslations } from '@shared/lib/i18n';
   const t = useTranslations(lang);
   ---
   <h1>{t('feature.myFeature.title')}</h1>
   ```

### Step 5: Documentation

Update relevant docs:
- `CLAUDE.md` - If modifying architecture
- `docs/TESTING.md` - If adding tests
- README.md - If user-facing feature
- Feature-specific comments in code

---

## Testing

### Unit Tests (Vitest)

```bash
bun run test:unit           # Run all unit tests
bun run test:unit:ui       # Interactive UI
bun run test:unit:coverage # With coverage report
```

**Test file location:** `tests/unit/**/*.spec.ts`

**Example:**
```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '@shared/lib/my-lib';

describe('myFunction', () => {
  it('should return expected value', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
});
```

### E2E Tests (Playwright)

```bash
bun run test                # Run all E2E tests
bun run test:ui            # Interactive UI
bun run test:debug         # Debug mode
```

**Test file location:** `tests/e2e/**/*.spec.ts`

**Coverage requirement:**
- All new user-facing features must have E2E tests
- Critical user flows must be tested
- Responsive design tested across mobile/tablet/desktop

### Lighthouse Audits

```bash
bun run lighthouse          # Run Lighthouse CI
```

**Thresholds (must pass):**
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: ≥90

---

## Pull Request Process

### Before Submitting

1. Ensure all tests pass:
   ```bash
   bun run test:all
   ```

2. Verify build succeeds:
   ```bash
   bun run build
   ```

3. Check Lighthouse scores:
   ```bash
   bun run build && bun run preview
   # Then in another terminal:
   bun run lighthouse:collect
   ```

4. Update documentation if needed

### Creating a PR

1. Push your feature branch:
   ```bash
   git push origin feat/your-feature-name
   ```

2. Create PR on GitHub
3. Fill in PR template with:
   - What changed
   - Why it changed
   - How to test it
   - Screenshots (if UI changes)

### Review Process

- [INFO] At least one approval required before merge
- [WARNING] All CI/CD checks must pass
- [INFO] Code review focus:
  - Correctness (does it work?)
  - Performance (is it efficient?)
  - Maintainability (is it clear?)
  - Testing (is it tested?)
  - Documentation (is it documented?)

### After Approval

- Squash commits if needed for clean history
- Merge to appropriate branch (main/develop)
- Delete feature branch

---

## Performance Guidelines

### Bundle Size

[INFO] Target: dist/ size ≤ 2MB

Monitor with:
```bash
bun run build
bun run bundle:analyze
```

### Image Optimization

- Use WebP format
- Optimize dimensions before adding
- Use responsive images where appropriate
- Lazy load below-the-fold images

### Code Performance

- Avoid unnecessary re-renders
- Use Astro static generation when possible
- Minimize JavaScript bundle
- Prefer CSS over JavaScript solutions

---

## Accessibility Requirements

All new features must:

- [REQUIRED] Support keyboard navigation
- [REQUIRED] Have proper alt text for images
- [REQUIRED] Use semantic HTML
- [REQUIRED] Maintain heading hierarchy
- [REQUIRED] Pass WCAG 2.1 Level AA
- [REQUIRED] Test with screen readers (optional but encouraged)

**Test with:**
```bash
bun run lighthouse:collect
# Check Accessibility score ≥95
```

---

## Questions?

[INFO] Open a GitHub Discussion
[INFO] Email: hello@sandovaldavid.com
[INFO] Email: dev@sandovaldavid.com

---

## Code of Conduct

- Be respectful to all contributors
- Provide constructive feedback
- Accept criticism gracefully
- Help others learn and grow

Thank you for contributing! 🚀

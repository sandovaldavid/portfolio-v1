# AGENTS.md - AI Agent Guidelines

Comprehensive guidelines for AI agents (Claude Code, Copilot, etc.) working on Portfolio V1.

**Contact:** hello@sandovaldavid.com | dev@sandovaldavid.com

---

## Agent Role & Responsibilities

AI agents assist with:

- Code implementation following FSD architecture
- Testing (unit, E2E, performance)
- Documentation and guides
- Code review and refactoring
- CI/CD workflow management
- Performance optimization

**Always refer to:** CLAUDE.md, CONTRIBUTING.md, docs/TESTING.md

---

## Code Generation Rules

### 1. Architecture Compliance

[REQUIRED] All code must follow FSD rules:

✓ **Correct layer imports:**

```typescript
// Component in feature layer
import { ProjectCard } from '@entities/project'; // ✓ From layer below
import { Button } from '@shared/ui'; // ✓ From shared
```

✗ **Incorrect layer imports:**

```typescript
// Feature importing another feature
import { LanguagePicker } from '@features/language-picker'; // ✗ WRONG

// Widget importing widget
import { Header } from '@widgets/header'; // ✗ WRONG
```

### 2. TypeScript Standards

[REQUIRED] Always:

- Type all function parameters
- Type all return values
- Use `interface` for object shapes
- Enable strict mode in tsconfig
- No `any` type (use `unknown` or specific type)

```typescript
// ✓ Correct
interface GetUserOptions {
	id: string;
	includeProjects?: boolean;
}

function getUser(options: GetUserOptions): Promise<User | null> {
	// Implementation
}

// ✗ Incorrect
function getUser(options) {
	// No types!
	return null as any; // Type: any
}
```

### 3. Component Structure

[REQUIRED] Astro components:

```astro
---
// 1. Imports first
import Layout from '@app/layouts/Layout.astro';
import { MyComponent } from '@entities/my-entity';

// 2. Type interface
interface Props {
	title: string;
	description?: string;
}

// 3. Extract props
const { title, description } = Astro.props;

// 4. Logic/processing
const processed = description?.trim() || 'Default';
---

<!-- 5. Template -->
<Layout {title}>
	<h1>{title}</h1>
	{description && <p>{processed}</p>}
</Layout>

<!-- 6. Optional scoped styles -->
<style>
	h1 {
		color: var(--text-main);
	}
</style>
```

### 4. Naming Conventions

```typescript
// Components: PascalCase
src / features / my - feature / ui / MyFeature.astro;
src / widgets / header / ui / Header.astro;

// Pages: kebab-case
src / pages / about - me.astro;
src / pages / projects.astro;

// Utilities: camelCase
src / shared / lib / getLocalizedPath.ts;
src / shared / lib / useTranslations.ts;

// Constants: UPPER_SNAKE_CASE
const MAX_PROJECTS = 10;
const DEFAULT_LANGUAGE = 'en';

// Types/Interfaces: PascalCase
interface ProjectItem {}
type HeaderConfig = {};
```

### 5. Index File Pattern

[REQUIRED] Each slice must export public API:

```typescript
// src/features/my-feature/index.ts
export { default as MyFeature } from './ui/MyFeature.astro';
export type { MyFeatureProps } from './model/types';
export { getFeatureConfig } from './model/config';
```

---

## Testing Requirements

### When to Add Tests

[REQUIRED] Unit tests for:

- Utility functions
- Data transformations
- Business logic
- Helper functions

[REQUIRED] E2E tests for:

- New user-facing features
- Page navigation
- Form submissions
- Interactive elements
- Critical user flows

[REQUIRED] Lighthouse audits for:

- New pages
- Major layout changes
- Performance-critical features

### Test File Location

```
tests/
├── unit/                          # Unit tests
│   ├── features/
│   │   └── my-feature.spec.ts
│   └── lib/
│       └── utilities.spec.ts
└── e2e/                           # E2E tests
    ├── features/
    │   └── my-feature.spec.ts
    ├── pages.spec.ts
    └── homepage.spec.ts
```

### Test Coverage Template

**Unit Test (Vitest):**

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '@shared/lib/my-lib';

describe('myFunction', () => {
	it('should return expected value', () => {
		const result = myFunction('input');
		expect(result).toBe('expected');
	});

	it('should handle edge cases', () => {
		const result = myFunction('');
		expect(result).toBe(null);
	});
});
```

**E2E Test (Playwright):**

```typescript
import { test, expect } from '@playwright/test';

test.describe('MyFeature', () => {
	test('should render correctly', async ({ page }) => {
		await page.goto('/');

		const element = page.locator('[data-testid="my-feature"]');
		await expect(element).toBeVisible();
	});

	test('should be interactive', async ({ page }) => {
		await page.goto('/');

		const button = page.locator('button').first();
		await button.click();

		const result = page.locator('[data-result]');
		await expect(result).toContainText('Success');
	});
});
```

### Test Execution

```bash
# All tests
bun run test:all

# Unit only
bun run test:unit

# E2E only
bun run test

# Specific file
bun run test:unit tests/unit/my-feature.spec.ts

# With coverage
bun run test:unit:coverage
```

### Coverage Targets

[TARGET] Minimum 90% coverage:

- Lines: ≥90%
- Functions: ≥90%
- Branches: ≥90%
- Statements: ≥90%

---

## Documentation Requirements

### When to Document

[REQUIRED] Document:

- New FSD slices (purpose, dependencies)
- Public APIs (parameters, return types)
- Complex algorithms
- Non-obvious design decisions
- Testing strategy

[OPTIONAL] Document:

- Simple getters/setters
- Self-explanatory code
- Standard patterns

### Documentation Format

```typescript
/**
 * Gets localized path for given route
 * @param path - Route path (e.g., '/about-me')
 * @param lang - Language code ('en' or 'es')
 * @returns Localized path (e.g., '/es/sobre-mi')
 *
 * @example
 * getLocalizedPath('/about-me', 'es')  // '/es/sobre-mi'
 * getLocalizedPath('/projects', 'en')  // '/projects'
 */
export function getLocalizedPath(path: string, lang: Language): string {
	// Implementation
}
```

### Comment Style

[INFO] Avoid obvious comments:

```typescript
// ✗ Bad: States what code does
const count = items.length; // Get length of items

// ✓ Good: Explains why
const count = items.length; // Filter out inactive items for display

// ✓ Good: Explains complex logic
// Cache projection to avoid recalculation in hot loop
const projections = items.map(i => project(i));
```

---

## Git & Version Control

### Branch Strategy (REQUIRED)

```
main
 └── develop          ← base para todo el trabajo
       ├── feat/...
       ├── fix/...
       ├── docs/...
       └── ...
```

**Reglas estrictas:**

1. **Todas las ramas nuevas salen de `develop`**, nunca de `main`
2. **Las PRs van siempre a `develop`**, nunca directamente a `main`
3. **Solo `develop` hace PR a `main`** para desplegar a producción
4. **Nunca trabajar directamente** en `main` ni en `develop`

**Flujo que debe seguir el agente:**

```bash
# 1. Asegurarse de estar en develop actualizado
git checkout develop
git pull origin develop

# 2. Crear rama desde develop con prefijo correcto
git checkout -b feat/my-feature   # o fix/, docs/, etc.

# 3. Implementar y commitear
git add <files>
git commit -m "feat(scope): description"

# 4. Push y crear PR hacia develop
git push origin feat/my-feature
# → PR: feat/my-feature → develop  (NUNCA → main directamente)
```

**Prefijos obligatorios según el tipo de cambio:**

| Prefijo     | Cuándo usarlo                                |
| ----------- | -------------------------------------------- |
| `feat/`     | Nueva funcionalidad                          |
| `fix/`      | Corrección de bug                            |
| `docs/`     | Solo documentación                           |
| `refactor/` | Refactorización sin cambio de comportamiento |
| `perf/`     | Mejora de performance                        |
| `test/`     | Agregar o corregir tests                     |
| `chore/`    | Mantenimiento, tooling                       |
| `ci/`       | Cambios en CI/CD                             |
| `deps/`     | Actualización de dependencias                |
| `security/` | Correcciones de seguridad                    |

### Commit Messages

[REQUIRED] Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `test` - Tests
- `refactor` - Refactoring
- `perf` - Performance
- `chore` - Maintenance
- `ci` - CI/CD
- `deps` - Dependencies
- `security` - Security

**Examples:**

```
feat(features): add CLI terminal component

- Implement CLI terminal with command history
- Add syntax highlighting for outputs
- Support mobile responsiveness

Closes #123
```

```
fix(i18n): resolve Spanish path translation

Spanish locale paths were not being translated correctly
for project routes. Updated getLocalizedPath to handle
all route patterns.
```

### Branch Naming

```
feat/feature-name           # New feature
fix/bug-description         # Bug fix
docs/what-updated           # Docs
refactor/component-name     # Refactoring
perf/optimization-name      # Performance
test/feature-coverage       # Tests
chore/maintenance           # Maintenance
```

### Pre-commit Checks

[AUTOMATIC] Pre-commit hook runs:

1. `bun run format`
2. `bun run lint:fix`
3. Stages changes

If checks fail, fix and re-commit.

---

## Performance Guidelines

### Bundle Size

[TARGET] dist/ ≤ 5MB

When adding:

- Large libraries → consider tree-shaking
- New fonts → use variable fonts
- Images → optimize to WebP
- JavaScript → lazy load if possible

### Lighthouse Targets

[TARGET] All pages:

```
Performance:     ≥90
Accessibility:   ≥95
Best Practices:  ≥90
SEO:             ≥90
LCP:             ≤2.5s
CLS:             ≤0.1
FID:             ≤100ms
```

### Performance Budgets

See `lighthouse-budget.json` for page-specific budgets:

- Homepage: 200KB total
- About page: 250KB total
- Projects page: 300KB total

---

## i18n Integration

### Adding Translations

[REQUIRED] When text is user-facing:

1. Add to `src/shared/config/i18n/locales/en.json`:

    ```json
    {
    	"feature.myFeature.title": "Feature Title",
    	"feature.myFeature.description": "Feature description"
    }
    ```

2. Add to `src/shared/config/i18n/locales/es.json`:

    ```json
    {
    	"feature.myFeature.title": "Título Feature",
    	"feature.myFeature.description": "Descripción feature"
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

### Translation Keys

[CONVENTION] Use dot notation:

```
<domain>.<feature>.<element>.<property>
```

Examples:

- `navigation.home.label`
- `feature.themeToggle.darkMode`
- `entity.project.title`
- `page.about.hero.subtitle`

---

## Code Review Checklist

When reviewing changes, verify:

### Architecture

- [ ] Correct FSD layer used
- [ ] Imports follow layer hierarchy
- [ ] No circular dependencies
- [ ] Public APIs properly exported

### Code Quality

- [ ] TypeScript strict mode
- [ ] No `any` types
- [ ] Proper error handling
- [ ] No console logs (except errors)

### Testing

- [ ] Unit tests added (if logic)
- [ ] E2E tests added (if UI)
- [ ] Tests cover happy path + edge cases
- [ ] Coverage ≥90%

### Documentation

- [ ] README updated (if user-facing)
- [ ] Code comments (if complex)
- [ ] Types properly documented
- [ ] No stale comments

### Performance

- [ ] No performance regressions
- [ ] Bundle size within limits
- [ ] Images optimized
- [ ] Lighthouse checks pass

### Accessibility

- [ ] Keyboard navigation works
- [ ] Alt text for images
- [ ] Color contrast ≥4.5:1
- [ ] WCAG 2.1 AA compliant

### i18n

- [ ] Translations added for all languages
- [ ] No hardcoded strings
- [ ] Consistent key naming
- [ ] Both en/es locales updated

---

## Common Patterns

### Feature Implementation

```
src/features/my-feature/
├── index.ts
├── model/
│   └── types.ts
└── ui/
    ├── MyFeature.astro
    └── index.ts
```

### Entity with UI

```
src/entities/my-entity/
├── index.ts
├── model/
│   ├── types.ts
│   └── data.ts
└── ui/
    ├── MyEntityCard.astro
    ├── MyEntityDetails.astro
    └── index.ts
```

### Utility Library

```
src/shared/lib/my-lib/
├── index.ts
├── myFunction.ts
├── myFunction.spec.ts
└── types.ts
```

---

## Troubleshooting for Agents

### Issue: "Cannot find module '@features/...'"

**Cause:** Wrong import path
**Solution:** Check FSD layer and use correct alias

```typescript
// ✗ Wrong
import { Header } from '@features/header';

// ✓ Correct
import { Header } from '@widgets/header';
```

### Issue: "TypeScript error: Parameter 'x' implicitly has an 'any' type"

**Cause:** Missing type annotation
**Solution:** Add explicit type

```typescript
// ✗ Wrong
function myFunc(param) {}

// ✓ Correct
function myFunc(param: string): void {}
```

### Issue: Tests failing with "Cannot find module"

**Cause:** Vitest can't resolve alias
**Solution:** Ensure vitest.config.ts extends Astro config

```typescript
import { getViteConfig } from 'astro/config';
export default defineConfig(
  getViteConfig({ test: { ... } })
);
```

### Issue: "Page not loading in Playwright"

**Cause:** Dev server not running
**Solution:** Start with `bun run preview` before E2E tests

```bash
# Terminal 1
bun run preview

# Terminal 2
bun run test
```

---

## Agent Interaction Patterns

### When Starting a Feature

1. Read CLAUDE.md for current patterns
2. Check CONTRIBUTING.md for guidelines
3. Verify FSD layer placement
4. Create proper slice structure
5. Implement with TypeScript types
6. Add tests (unit + E2E)
7. Add translations
8. Update documentation
9. Run full test suite
10. Create conventional commit

### When Fixing Bugs

1. Understand root cause
2. Write failing test first
3. Implement fix
4. Verify test passes
5. Check no regressions
6. Update related documentation
7. Create fix commit

### When Optimizing Performance

1. Measure current metrics
2. Identify bottleneck
3. Implement optimization
4. Measure improvement
5. Verify no regressions
6. Update documentation
7. Document trade-offs
8. Create perf commit

---

## Resources

- **CLAUDE.md** - Development guide
- **CONTRIBUTING.md** - Contribution guidelines
- **docs/reports/** - Audit reports (latest: portfolio-audit-2026-06)
- **docs/TESTING.md** - Testing guide
- **docs/FSD-Architecture/** - FSD details
- **CHANGELOG.md** - Version history

---

**Last Updated:** July 1, 2026
**Status:** Active
**Maintained by:** hello@sandovaldavid.com

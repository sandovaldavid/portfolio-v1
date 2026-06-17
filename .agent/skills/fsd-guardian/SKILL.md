---
name: fsd-guardian
description: "Guardian of Feature-Sliced Design (FSD) architecture for the technical portfolio project. Use this skill when creating, modifying, or reviewing components to ensure they follow FSD principles. Triggers when: (1) Creating new components or features, (2) Moving/refactoring existing code, (3) Reviewing architecture compliance, (4) Validating import dependencies, (5) Questions about where code should live, (6) Migrating legacy components to FSD, or (7) Any architecture-related decisions."
---

# FSD Guardian

## Overview

This skill enforces Feature-Sliced Design (FSD) architecture principles for the technical portfolio built with Astro. It ensures components are placed in the correct layers, follow proper import rules, and maintain architectural integrity.

## Core Responsibilities

1. **Validate component placement** - Ensure components are in the correct FSD layer
2. **Enforce import rules** - Prevent violations of layer dependency rules
3. **Guide refactoring** - Help migrate legacy code to FSD structure
4. **Review architecture** - Check for architectural compliance
5. **Provide templates** - Offer patterns for common component types

## When to Use This Skill

Activate this skill when:

- Creating ANY new component, feature, or entity
- Moving components between directories
- Reviewing pull requests for architecture compliance
- User asks "where should this component go?"
- Refactoring legacy `src/components/` code
- Validating import statements for layer violations
- Setting up Public APIs (`index.ts`)

## Quick Start Guide

### Step 1: Identify Component Type

Before creating or moving a component, classify it:

**Ask these questions**:
1. Does it have business logic or domain knowledge?
2. Is it reusable across different features?
3. Is it an interactive feature users can activate?
4. Does it represent data/entity or a large composite section?

**Quick Classification**:
- **Generic, no business logic** → `shared/`
- **Data model/entity** → `entities/`
- **Interactive feature with logic** → `features/`
- **Large section composing multiple parts** → `widgets/`

For detailed classification, see [references/component-placement.md](references/component-placement.md).

### Step 2: Validate Layer Dependencies

**The Golden Rule**: Lower layers CANNOT import from higher layers.

```
app → pages → widgets → features → entities → shared
```

**Allowed imports**:
- ✅ `shared` → nothing (no imports from other layers)
- ✅ `entities` → `shared`
- ✅ `features` → `shared`, `entities`
- ✅ `widgets` → `shared`, `entities`, `features`
- ✅ `pages` → `shared`, `entities`, `features`, `widgets`, `app`

**Forbidden patterns**:
- ❌ Widget importing another widget
- ❌ Entity importing from feature or widget
- ❌ Feature importing from widget
- ❌ Any layer importing from pages

### Step 3: Create Proper Structure

Every component slice must have:

1. **Proper directory structure**:
   ```
   layer-name/
   └── component-name/
       ├── model/        # Types, data (if needed)
       ├── ui/           # UI components
       │   └── components/  # Internal components only (widgets)
       ├── lib/          # Utilities (if needed)
       ├── assets/       # Component-specific assets (if needed)
       └── index.ts      # Public API (REQUIRED)
   ```

2. **Public API (`index.ts`)**:
   ```typescript
   // Export what other layers can use
   export { default as ComponentName } from './ui/ComponentName.astro';
   export type { ComponentProps } from './model/types';
   ```

3. **TypeScript types** (in `model/types.ts` if complex):
   ```typescript
   export interface ComponentProps {
     title: string;
     // ... props
   }
   ```

## Workflow

### Creating a New Component

1. **Classify the component** using Step 1 above
2. **Choose the correct layer** based on classification
3. **Check dependencies** - what will it import from?
4. **Create directory structure**:
   ```bash
   mkdir -p src/{layer}/{component-name}/{model,ui}
   ```
5. **Create component file** following Astro patterns
6. **Create Public API** (`index.ts`)
7. **Validate** - Run build, check for errors

**Example**: Creating a new "Newsletter" feature

```bash
# 1. Classify: Interactive feature → features/
# 2. Check dependencies: Will use shared UI, maybe user entity
# 3. Create structure
mkdir -p src/features/newsletter/{model,ui}

# 4. Create files
touch src/features/newsletter/model/types.ts
touch src/features/newsletter/ui/Newsletter.astro
touch src/features/newsletter/index.ts
```

For detailed patterns, see [references/astro-fsd-patterns.md](references/astro-fsd-patterns.md).

### Migrating Legacy Components

When moving components from `src/components/` to FSD:

1. **Identify the component's purpose**
2. **Classify using component-placement guide**
3. **Extract hardcoded data** to entities (if any)
4. **Extract types** to model/types.ts
5. **Move component** to correct layer
6. **Create Public API**
7. **Update all imports** using path aliases
8. **Test build** before deleting legacy file

### Reviewing Architecture

Use this checklist to validate FSD compliance:

**Layer Placement**:
- [ ] Component is in the correct layer
- [ ] No business logic in `shared/`
- [ ] No data hardcoded in widgets
- [ ] Features are truly interactive, not just UI

**Import Rules**:
- [ ] No imports from higher layers
- [ ] No cross-widget imports
- [ ] Using path aliases (`@shared/`, `@entities/`, etc.)
- [ ] Public APIs used (not direct file imports)

**Structure**:
- [ ] Public API (`index.ts`) exists
- [ ] Types in `model/types.ts` (if complex)
- [ ] Data in `model/data.ts` (for entities)
- [ ] Internal components in `ui/components/` (widgets only)

**Build**:
- [ ] `bun run build` passes
- [ ] 0 TypeScript errors
- [ ] No circular dependencies

## Common Patterns

### Pattern 1: Shared UI Component

```astro
<!-- shared/ui/badge/Badge.astro -->
---
import type { HTMLAttributes } from 'astro/types';

interface Props extends HTMLAttributes<'span'> {
  title: string;
}

const { title, class: className, ...rest } = Astro.props;
---

<span class:list={['badge', className]} {...rest}>
  {title}
</span>
```

```typescript
// shared/ui/badge/index.ts
export { default as Badge } from './Badge.astro';
```

### Pattern 2: Entity with Data

```typescript
// entities/project/model/types.ts
export interface Project {
  id: string;
  title: string;
  technologies: string[];
}
```

```typescript
// entities/project/model/data.ts
import type { Project } from './types';

export const PROJECTS: Project[] = [
  { id: '1', title: 'Portfolio', technologies: ['Astro', 'React'] },
];
```

```typescript
// entities/project/index.ts
export { PROJECTS } from './model/data';
export type { Project } from './model/types';
```

### Pattern 3: Interactive Feature

```astro
<!-- features/theme-toggle/ui/ThemeToggle.astro -->
<button id="theme-toggle" aria-label="Toggle theme">
  🌙
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
</script>
```

### Pattern 4: Widget Composition

```astro
<!-- widgets/header/ui/Header.astro -->
---
import { ThemeToggle } from '@features/theme-toggle';
import { LanguagePicker } from '@features/language-picker';
---

<header>
  <nav><!-- Navigation --></nav>
  <ThemeToggle />
  <LanguagePicker />
</header>
```

## Validation Commands

After making changes, always validate:

```bash
# Build check
bun run build

# TypeScript check
bunx astro check

# Dev server (verify functionality)
bun run dev
```

## Common Violations and Fixes

### ❌ Violation 1: Cross-widget Import

```astro
<!-- widgets/header/ui/Header.astro -->
import { Footer } from '@widgets/footer'; // ❌ NO!
```

**Fix**: Extract shared logic to `features/` or `shared/`:

```astro
<!-- features/navigation/ui/Navigation.astro -->
export { Navigation };

<!-- widgets/header/ and widgets/footer/ both use it -->
import { Navigation } from '@features/navigation';
```

### ❌ Violation 2: Business Logic in Shared

```astro
<!-- shared/ui/project-card/ProjectCard.astro -->
<!-- ❌ ProjectCard is domain-specific, not generic UI -->
```

**Fix**: Move to entity or widget:

```astro
<!-- entities/project/ui/ProjectCard.astro -->
<!-- or -->
<!-- widgets/projects/ui/components/ProjectCard.astro (internal) -->
```

### ❌ Violation 3: Hardcoded Data in Widget

```astro
<!-- widgets/projects/ui/Projects.astro -->
---
const PROJECTS = [/* data */]; // ❌ NO!
---
```

**Fix**: Extract to entity:

```typescript
// entities/project/model/data.ts
export const PROJECTS = [/* data */];
```

```astro
<!-- widgets/projects/ui/Projects.astro -->
---
import { PROJECTS } from '@entities/project';
---
```

### ❌ Violation 4: No Public API

```astro
<!-- Direct import without index.ts -->
import Badge from '@shared/ui/badge/Badge.astro'; // ❌ NO!
```

**Fix**: Create Public API and use it:

```typescript
// shared/ui/badge/index.ts
export { default as Badge } from './Badge.astro';
```

```astro
import { Badge } from '@shared/ui/badge'; // ✅ YES!
```

## Reference Documentation

For detailed information, consult these reference files:

- **[references/fsd-layers.md](references/fsd-layers.md)** - Complete layer hierarchy, rules, and validation
- **[references/astro-fsd-patterns.md](references/astro-fsd-patterns.md)** - Astro-specific patterns, templates, and best practices
- **[references/component-placement.md](references/component-placement.md)** - Decision tree and placement guide

## Project-Specific Documentation

The project's FSD migration documentation is located at:
`/vault/Workspaces/devsandoval/technical-portfolio-v2/docs/FSD-Architecture/`

Key files:
- `00-overview.md` - Migration roadmap and current status
- `01-shared-layer.md` - Shared layer migration guide
- `02-entities-layer.md` - Entities layer migration guide
- `03-features-layer.md` - Features layer migration guide
- `04-widgets-layer.md` - Widgets layer migration guide
- `07-checklist.md` - Complete migration checklist

**Always reference these docs** when working on migration tasks to understand project-specific context and progress.

## Quick Decision Tree

```
IS IT GENERIC UI WITH NO BUSINESS LOGIC?
├─ YES → shared/ui/
└─ NO ↓

DOES IT REPRESENT DATA/ENTITY?
├─ YES → entities/entity-name/
└─ NO ↓

IS IT AN INTERACTIVE FEATURE?
├─ YES → features/feature-name/
└─ NO ↓

IS IT A LARGE COMPOSITE SECTION?
├─ YES → widgets/widget-name/
└─ NO → Re-evaluate classification
```

## Enforcement Principles

1. **Zero tolerance for layer violations** - Always enforce import rules
2. **Public APIs are mandatory** - Every slice must export through `index.ts`
3. **No exceptions for "small violations"** - Architecture debt compounds quickly
4. **Educate, don't just fix** - Explain WHY when correcting violations
5. **Build must always pass** - Never leave broken TypeScript or builds

## Success Metrics

A component is correctly implemented when:

- ✅ Located in the appropriate FSD layer
- ✅ Has Public API (`index.ts`)
- ✅ No import violations
- ✅ Uses path aliases
- ✅ TypeScript types defined
- ✅ Build passes without errors
- ✅ Follows Astro best practices

---

**Remember**: This skill is the guardian of architectural integrity. When in doubt about placement, consult the reference documentation and decision tree. Architecture decisions made early are difficult to change later, so enforce the rules strictly.

# Copilot Instructions - Technical Portfolio V2

## Project Overview

This is a personal portfolio website built with Astro, TypeScript, and Tailwind CSS. The project showcases development skills, experiences, and projects of Juan David Sandoval Salvador. The site is designed to be modern, clean, and responsive with both light and dark mode support.

**Live site**: https://sandovaldavid.com

## Architecture Guidelines - Feature-Sliced Design (FSD)

This project **STRICTLY FOLLOWS** **Feature-Sliced Design (FSD)** architectural methodology. All new code MUST adhere to FSD principles.

### FSD Layer Structure (IMPLEMENTED)

The project is organized according to FSD layers (from top to bottom):

1. **App** (`src/app`) - ✅ IMPLEMENTED
    - `app/layouts/` - Layout.astro (main layout wrapper)
    - `app/styles/` - global.css, colors.css (OKLCH color system)

2. **Pages** (`src/pages`) - ✅ IMPLEMENTED
    - Astro pages and route handlers
    - `/index.astro` (Spanish homepage), `/en/index.astro` (English homepage)
    - `/404.astro` (Error page with i18n support)
    - Only composition, NO business logic or data

3. **Widgets** (`src/widgets`) - ✅ IMPLEMENTED
    - `widgets/header/` - Site header with navigation
    - `widgets/hero/` - Hero section
    - `widgets/about-me/` - About me section
    - `widgets/experience/` - Experience timeline
    - `widgets/projects/` - Projects showcase
    - `widgets/badges/` - Certifications/badges section
    - `widgets/footer/` - Site footer
    - All widgets have `index.ts` public API

4. **Features** (`src/features`) - ✅ IMPLEMENTED
    - `features/theme-toggle/` - Dark/light mode switcher
    - `features/language-picker/` - Language selection
    - All features have `model/` and `ui/` folders with `index.ts`

5. **Entities** (`src/entities`) - ✅ IMPLEMENTED
    - `entities/badge/` - Badge entity with data and UI
    - `entities/experience/` - Experience entity
    - `entities/project/` - Project entity
    - `entities/technology/` - Technology entity
    - All entities have `model/` (types, data) and optional `ui/` folders

6. **Shared** (`src/shared`) - ✅ IMPLEMENTED
    - `shared/ui/` - Design system components (Avatar, Badge, Button, LinkButton, etc.)
    - `shared/lib/i18n/` - i18n utilities (useTranslations, getLangFromUrl, etc.)
    - `shared/config/i18n/` - i18n configuration and dictionaries
    - `shared/assets/` - Icons and static assets (LEGACY: currently at `src/assets`)

### FSD Rules (STRICTLY ENFORCED)

- **Import Rule**: Layers can ONLY import from layers BELOW them
    - ❌ NEVER: `shared/` importing from `entities/`, `features/`, `widgets/`, `pages/`, or `app/`
    - ❌ NEVER: `entities/` importing from `features/`, `widgets/`, `pages/`, or `app/`
    - ✅ ALWAYS: Import downwards (Pages → Widgets → Features → Entities → Shared)

- **Layer Independence**: Slices within the same layer CANNOT depend on each other
    - ❌ NEVER: `widgets/header/` importing from `widgets/footer/`
    - ✅ ALWAYS: Extract shared logic to lower layers (Shared, Entities, or Features)

- **Public API**: ALL imports MUST go through index files
    - ❌ NEVER: `import Component from '@/widgets/hero/ui/Hero.astro'`
    - ✅ ALWAYS: `import { Hero } from '@/widgets/hero'`
    - Every slice MUST have `index.ts` exporting public API

- **Data and Logic Separation**:
    - ✅ Data and types go in `model/` folder
    - ✅ UI components go in `ui/` folder
    - ✅ Each slice exports through `index.ts`

## Technology Stack

- **Framework**: Astro 5.14.1 (Static Site Generator)
- **Styling**: Tailwind CSS 4.1.13 with @tailwindcss/vite
- **Language**: TypeScript 5.7.2
- **Fonts**: Onest Variable Font (@fontsource-variable/onest)
- **Internationalization**: astro-i18n
- **SEO**: astro-robots-txt
- **Code Formatting**: Prettier with prettier-plugin-astro
- **Runtime**: Bun (package manager and runtime)

## Project Structure (CURRENT IMPLEMENTATION)

```
src/
├── app/                    # ✅ App layer - IMPLEMENTED
│   ├── layouts/
│   │   └── Layout.astro        # Main layout wrapper
│   └── styles/
│       ├── global.css          # Global styles
│       └── colors.css          # OKLCH color system
│
├── pages/                  # ✅ Pages layer - IMPLEMENTED
│   ├── index.astro             # Spanish homepage
│   ├── 404.astro               # Error page (multi-language)
│   ├── components.astro        # Component showcase
│   └── en/
│       ├── index.astro         # English homepage
│       └── components.astro    # Component showcase (EN)
│
├── widgets/                # ✅ Widgets layer - IMPLEMENTED
│   ├── header/
│   │   ├── index.ts           # Public API
│   │   └── ui/Header.astro
│   ├── hero/
│   │   ├── index.ts
│   │   └── ui/Hero.astro
│   ├── about-me/
│   ├── experience/
│   ├── projects/
│   ├── badges/
│   └── footer/
│
├── features/               # ✅ Features layer - IMPLEMENTED
│   ├── theme-toggle/
│   │   ├── index.ts
│   │   ├── model/
│   │   └── ui/ThemeToggle.astro
│   └── language-picker/
│       ├── index.ts
│       ├── model/
│       └── ui/LanguagePicker.astro
│
├── entities/               # ✅ Entities layer - IMPLEMENTED
│   ├── badge/
│   │   ├── index.ts
│   │   ├── model/             # types.ts, data.ts
│   │   └── ui/                # CertificationBadge.astro
│   ├── experience/
│   │   ├── index.ts
│   │   └── model/             # types.ts, data.ts
│   ├── project/
│   │   ├── index.ts
│   │   └── model/             # types.ts, data.ts
│   └── technology/
│       ├── index.ts
│       └── model/             # types.ts, data.ts
│
├── shared/                 # ✅ Shared layer - IMPLEMENTED
│   ├── ui/                    # Design system components
│   │   ├── index.ts           # Public API for all UI components
│   │   ├── avatar/
│   │   │   ├── index.ts
│   │   │   └── Avatar.astro
│   │   ├── badge/
│   │   │   ├── index.ts
│   │   │   └── Badge.astro
│   │   ├── button/
│   │   │   ├── index.ts
│   │   │   ├── Button.astro
│   │   │   ├── button.css      # Shared button styles
│   │   │   └── README.md
│   │   ├── link-button/
│   │   │   ├── index.ts
│   │   │   ├── LinkButton.astro
│   │   │   └── README.md
│   │   ├── link-inline/
│   │   ├── section-container/
│   │   ├── social-pill/
│   │   └── title-section/
│   │
│   ├── lib/                   # Utility functions
│   │   └── i18n/
│   │       ├── index.ts       # Public API
│   │       ├── translations.ts      # useTranslations()
│   │       ├── url-lang.ts          # getLangFromUrl()
│   │       ├── localized-path.ts    # getLocalizedPath()
│   │       └── interpolation.ts     # String interpolation
│   │
│   ├── config/                # Configuration files
│   │   └── i18n/
│   │       ├── index.ts       # Public API
│   │       ├── languages.ts   # Language enum and config
│   │       └── dictionaries/
│   │           ├── index.ts           # Combines all dictionaries
│   │           ├── navigation.ts      # Nav translations
│   │           ├── hero.ts            # Hero translations
│   │           ├── about-me.ts        # About me translations
│   │           ├── experience.ts      # Experience translations
│   │           ├── projects.ts        # Projects translations
│   │           ├── badges.ts          # Badges translations
│   │           ├── footer.ts          # Footer translations
│   │           ├── theme.ts           # Theme translations
│   │           ├── avatar.ts          # Avatar translations
│   │           └── not-found.ts       # 404 page translations
│   │
│   └── assets/                # ⚠️ LEGACY - Should be moved here
│       └── icons/             # (Currently at src/assets)
│
└── assets/                 # ⚠️ LEGACY - Migrate to shared/assets
    └── icons/                 # Icon components (Astro components)
```

## Development Commands

**Always use Bun as the package manager and runtime:**

- `bun install` - Install dependencies
- `bun run dev` - Start development server at localhost:4321
- `bun run build` - Build for production (includes type checking)
- `bun run preview` - Preview production build locally
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting

## Build and Deployment

1. **Development**: Run `bun run dev` to start the development server
2. **Type Checking**: Always run `astro check` before building
3. **Build Process**: `bun run build` runs type checking and builds the project
4. **Preview**: Use `bun run preview` to test the production build locally
5. **Deployment**: The site deploys automatically to GitHub Pages via GitHub Actions

## Code Standards and Conventions

### TypeScript

- Use strict TypeScript configuration
- Always type function parameters and return types
- Use interface over type for object shapes
- Prefer `const` over `let` where possible

### Astro Components

- Use `.astro` extension for Astro components
- Place component logic in the frontmatter section
- Use TypeScript in component scripts
- Follow Astro's component structure: frontmatter, template, style

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Implement both light and dark mode support
- Use CSS custom properties for theme switching
- Keep styles scoped to components when possible

### File Naming Conventions

- Use PascalCase for component files (e.g., `Hero.astro`, `ThemeToggle.astro`)
- Use kebab-case for page files (e.g., `about-me.astro`)
- Use camelCase for utility functions and variables
- Use UPPER_SNAKE_CASE for constants

### Code Organization

- Group related functionality into FSD slices
- Keep components small and focused
- Extract reusable logic into shared utilities
- Use meaningful names for variables and functions
- Add JSDoc comments for complex functions

## UI/UX Guidelines

- **Design System**: Modern, clean, and professional
- **Color Scheme**: Support both light and dark modes
- **Typography**: Use Onest variable font for consistency
- **Responsive**: Mobile-first approach, works on all devices
- **Accessibility**: Follow WCAG guidelines, proper semantic HTML
- **Performance**: Optimize images, lazy loading, minimal JavaScript

## Internationalization (i18n) - IMPLEMENTED SYSTEM

### ✅ Current i18n Architecture

The project uses a **centralized dictionary-based i18n system** following FSD architecture:

**Configuration**: `shared/config/i18n/`

- `languages.ts` - Language enum and metadata

    ```typescript
    export enum Language {
    	ENGLISH = 'en',
    	SPANISH = 'es',
    }
    export const DEFAULT_LANGUAGE = Language.SPANISH;
    ```

- `dictionaries/` - Translation dictionaries organized by domain
    - Each file exports translations for both languages
    - Pattern: `{ [Language.ENGLISH]: {...}, [Language.SPANISH]: {...} }`
    - Files: `navigation.ts`, `hero.ts`, `about-me.ts`, `experience.ts`, `projects.ts`, `badges.ts`, `footer.ts`, `theme.ts`, `avatar.ts`, `not-found.ts`
    - `index.ts` - Combines all dictionaries into a single translations object

**Utilities**: `shared/lib/i18n/`

- `useTranslations(lang)` - Returns translation function `t(key)`
- `getLangFromUrl(url)` - Detects language from URL
- `getLocalizedPath(path, lang)` - Generates localized URLs
- `interpolation.ts` - String interpolation utilities

### How to Use i18n

**In Astro Components:**

```astro
---
import { getLangFromUrl, useTranslations } from '@shared/lib/i18n';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t('hero.title')}</h1>
<p>{t('hero.description')}</p>
```

### How to Add New Translations

**ALWAYS follow this pattern:**

1. **Create dictionary file** in `shared/config/i18n/dictionaries/my-feature.ts`:

```typescript
import { Language } from '../languages';

export const myFeatureTranslations = {
	[Language.ENGLISH]: {
		'my-feature.title': 'My Title',
		'my-feature.description': 'My description',
	},
	[Language.SPANISH]: {
		'my-feature.title': 'Mi Título',
		'my-feature.description': 'Mi descripción',
	},
} as const;
```

2. **Import and combine** in `shared/config/i18n/dictionaries/index.ts`:

```typescript
import { myFeatureTranslations } from './my-feature';

function combineTranslations(lang: Language): Record<string, string> {
	return {
		...existingTranslations[lang],
		...myFeatureTranslations[lang], // Add here
	};
}
```

3. **Use in components** with the translation key:

```astro
{t('my-feature.title')}
```

### ❌ NEVER Do This:

- Don't create inline translation objects in pages or components
- Don't duplicate translation logic
- Don't create separate i18n utilities - use existing ones
- Don't hardcode language detection - use `getLangFromUrl()`

## Performance Optimization

- Use Astro's static site generation capabilities
- Optimize images with proper formats and sizes
- Minimize JavaScript bundle size
- Implement lazy loading for non-critical content
- Use Astro's built-in optimizations

## Testing and Quality Assurance

- Run `astro check` for TypeScript errors
- Use `bun run format:check` to verify code formatting
- Test responsive design on different screen sizes
- Verify both light and dark mode functionality
- Check accessibility with screen readers

## Current Architecture Patterns

### Path Aliases (ALWAYS USE THESE)

Use configured path aliases for clean imports:

```typescript
// ✅ CORRECT - Use FSD path aliases
import { Button, LinkButton, Badge } from '@shared/ui';
import { useTranslations, getLangFromUrl } from '@shared/lib/i18n';
import { Language } from '@shared/config/i18n';
import { Hero } from '@/widgets/hero';
import { ThemeToggle } from '@/features/theme-toggle';
import { EXPERIENCES } from '@/entities/experience';

// ❌ WRONG - Don't use relative paths
import Button from '../../../shared/ui/button/Button.astro';
import { useTranslations } from '../../../shared/lib/i18n/translations';
```

### Theme System (IMPLEMENTED)

Theme switching uses CSS custom properties with localStorage persistence:

```astro
<script is:inline>
	document.documentElement.classList.toggle(
		'dark',
		localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
	);
</script>
```

**Color tokens** are defined in `app/styles/colors.css` using OKLCH color space:

```css
--color-brand: oklch(62.005% 0.18129 259.39);
--color-surface: light-dark(oklch(100% 0 0), oklch(20% 0 0));
```

### Internationalization Pattern (IMPLEMENTED)

Always use the centralized i18n system:

```astro
---
import { getLangFromUrl, useTranslations } from '@shared/lib/i18n';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t('section.title')}</h1>
<p>{t('section.description')}</p>
```

### Component Props Pattern

Strongly typed component interfaces:

```astro
---
interface Props {
	title: string;
	description: string;
	variant?: 'primary' | 'secondary';
}
const { title, description, variant = 'primary' } = Astro.props;
---
```

### Shared UI Components (DESIGN SYSTEM)

**Available components in `shared/ui/`:**

- `Avatar` - User avatar with sizes (xs, sm, md, lg, xl, responsive)
- `Badge` - Label badges with variants (default, info, success, warning, danger)
- `Button` - Action button (primary, secondary variants)
- `LinkButton` - Navigation button styled as link
- `LinkInline` - Inline text links
- `SectionContainer` - Page section wrapper
- `SocialPill` - Social media link pills
- `TitleSection` - Section title component

**Import pattern:**

```astro
---
import { Button, LinkButton, Badge, Avatar } from '@shared/ui';
---

<Button variant="primary">Click me</Button>
<LinkButton href="/about">Learn more</LinkButton>
<Badge variant="success">Active</Badge>
<Avatar size="md" />
```

**Shared styles:**

- Button styles use `shared/ui/button/button.css` with Tailwind @apply
- Both `Button` and `LinkButton` share the same visual styles
- Classes: `.btn-base`, `.btn-primary`, `.btn-secondary`

## Migration to FSD Notes

**Current State**: The project has successfully migrated to FSD architecture. All layers are implemented and functioning.

**✅ COMPLETED Migration Tasks**:

1. ✅ Established App layer with layouts and global styles
2. ✅ Organized Pages layer for routing (index.astro, 404.astro, /en/ routes)
3. ✅ Created Widgets layer (header, hero, about-me, experience, projects, badges, footer)
4. ✅ Implemented Features layer (theme-toggle, language-picker)
5. ✅ Structured Entities layer (badge, experience, project, technology)
6. ✅ Built comprehensive Shared layer (ui/, lib/i18n/, config/i18n/)
7. ✅ Created proper Public APIs (index.ts) for all slices
8. ✅ Implemented centralized i18n system with dictionaries
9. ✅ Established shared UI component library
10. ✅ Enforced FSD import rules and layer independence

**⚠️ LEGACY Items (Do NOT use)**:

- `src/i18n/` - Old i18n folder (REPLACED by `shared/config/i18n/` and `shared/lib/i18n/`)
- Inline translations in components (MUST use `shared/config/i18n/dictionaries/`)
- Direct component imports without public API (MUST use index.ts exports)

**Key FSD Principles in This Project**:

- **Layer Import Rule**: Pages → Widgets → Features → Entities → Shared (downward only)
- **Slice Independence**: Widgets don't import from other widgets (use Shared layer for common code)
- **Public API Pattern**: All imports through index.ts (e.g., `from '@shared/ui'` not `from '@shared/ui/button/Button.astro'`)
- **Composition over Implementation**: Widgets compose Features/Entities, don't duplicate logic

## Important Notes

- Always run type checking before committing code
- Follow FSD import rules strictly - no cross-layer violations
- Use the Public API pattern - all imports go through index files
- Keep the mobile-first, responsive design approach
- Maintain both light and dark mode support
- Use semantic HTML and follow accessibility best practices
- Test changes on multiple screen sizes and browsers
- Keep the design modern, clean, and professional
- Prioritize performance and loading speed
- Document architectural decisions and maintain FSD compliance

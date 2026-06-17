# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Astro, TypeScript, and Tailwind CSS. Live at <https://sandovaldavid.com>

**Tech Stack:**

- Astro 5.14.1 (Static Site Generator)
- TypeScript 5.7.2 (strict mode)
- Tailwind CSS 4.1.13 with @tailwindcss/vite
- Bun (package manager and runtime)
- astro-i18n (i18n support for es/en)

## Development Commands

**Always use Bun (not npm):**

```bash
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:4321)
bun run build            # Type check + build for production
bun run preview          # Preview production build
bun run format           # Format code with Prettier
bun run format:check     # Check code formatting
```

## Architecture: Feature-Sliced Design (FSD)

The project follows **Feature-Sliced Design** methodology with strict layer hierarchy:

```bash
src/
├── app/         # Global config, providers, layouts, styles
├── pages/       # Astro pages (route handlers)
├── widgets/     # Large UI blocks (Header, Hero, Footer sections)
├── features/    # Reusable business features (ThemeToggle, etc)
├── entities/    # Business entities (projects, badges)
└── shared/      # Reusable utilities, UI components, config
    ├── ui/      # Design system components
    ├── lib/     # Utility functions
    ├── config/  # Configuration (i18n, constants)
    └── api/     # External integrations
```

### FSD Critical Rules

1. **Import Rule**: Layers can ONLY import from layers below them (app → pages → widgets → features → entities → shared)
2. **Slice Independence**: Slices within the same layer CANNOT depend on each other
3. **Public API**: Each slice must expose its API through `index.ts` files
4. **No Cross-References**: Never import directly between slices at the same level

### Path Aliases (tsconfig.json)

```typescript
@/           // src/
@app/*       // src/app/*
@pages/*     // src/pages/*
@widgets/*   // src/widgets/*
@features/*  // src/features/*
@entities/*  // src/entities/*
@shared/*    // src/shared/*
@components/*  // src/components/* (LEGACY - migrating to FSD)
```

## Internationalization (i18n)

- **Supported languages**: Spanish (es, default), English (en)
- **Configuration**: `astro.config.mjs` with prefixDefaultLocale: false
- **Translation utilities**: `src/shared/lib/i18n/`
- **Dictionaries**: `src/shared/config/i18n/dictionaries/`

**Usage pattern:**

```typescript
import { getLangFromUrl, useTranslations } from '@shared/lib/i18n';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
// t('hero.title'), t('navigation.home'), etc.
```

## Theme System

- **Modes**: Light/Dark with system preference detection
- **Implementation**: CSS custom properties + localStorage
- **Color System**: OKLCH-based with semantic naming in `src/app/styles/colors.css`
- **Toggle**: ThemeToggle component with client-side hydration

## Code Standards

### TypeScript

- Strict mode enabled
- Always type function parameters and return types
- Prefer `interface` over `type` for object shapes
- Use `const` over `let` where possible

### Astro Components

- File extension: `.astro`
- Structure: frontmatter (TypeScript) → template → scoped styles
- Props: Always use typed interfaces

```astro
---
interface Props {
	title: string;
	description?: string;
}
const { title, description } = Astro.props;
---
```

### Styling

- **Primary**: Tailwind CSS utility classes
- **Approach**: Mobile-first responsive design
- **Themes**: Support both light and dark modes
- **Scoping**: Prefer scoped component styles

### File Naming

- Components: PascalCase (`Hero.astro`, `ThemeToggle.astro`)
- Pages: kebab-case (`about-me.astro`)
- Utilities: camelCase (`translations.ts`)
- Constants: UPPER_SNAKE_CASE

## Migration Status

**Current State**: Migrating from legacy `src/components/` structure to FSD architecture.

**Legacy paths** (still in use):

- `src/components/` → Gradually moving to appropriate FSD layers
- `src/i18n/` → Migrated to `src/shared/config/i18n/` and `src/shared/lib/i18n/`

**When adding new code:**

1. Always place in appropriate FSD layer based on business logic level
2. Create proper public API exports via `index.ts`
3. Follow layer import rules strictly
4. Use path aliases for clean imports

## Build & Deployment

1. Type checking runs automatically in `bun run build` via `astro check`
2. Production builds go to `dist/`
3. Deployment: Automatic via GitHub Actions → GitHub Pages
4. Site URL: <https://sandovaldavid.com>

## Key Patterns

### Component Props Pattern

```astro
---
interface Props {
	title: string;
	img_preview: string;
}
const { title, img_preview } = Astro.props;
---
```

### Theme Toggle Script

```astro
<script is:inline>
	// Client-side theme detection and application
	document.documentElement.classList.toggle(
		'dark',
		localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
	);
</script>
```

## Important References

- **FSD Documentation**: `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md`
- **Layer-specific rules**: Each FSD layer has detailed instructions in `.github/instructions/`
- **Conventional Commits**: `.github/instructions/conventional-commit.prompt.md`

# FSD Architecture Implementation Plan

> 📜 **Documento histórico** — Guía de la migración a FSD (octubre 2025). La migración está **completa**: 16 widgets, 4 features, 5 entities. Este documento se conserva como referencia del proceso y no refleja el estado actual del proyecto.

## Technical Portfolio V2 - Complete Migration Strategy

**Project:** technical-portfolio-v2  
**Branch:** refactor/fsd-architecture  
**Generated:** October 30, 2025  
**Current Status:** ⚠️ 30% Complete  
**Estimated Time:** 10-12 hours

---

## 📊 Executive Summary

This project is **30% migrated** to Feature-Sliced Design architecture. The foundation exists with partial Shared and Entities layers, but **Features and Widgets layers are 100% missing**.

**Key Metrics:**

- **16 legacy components** in `src/components/` need migration
- **~800 lines of code** in old structure
- **7 widgets** to be created
- **2 features** to be implemented
- **4 entity models** to be extracted/completed
- **12 FSD violations** currently present

---

## 🎯 Current State Analysis

### Layer Implementation Status

| Layer        | Completion | Files             | Status                     |
| ------------ | ---------- | ----------------- | -------------------------- |
| **App**      | 60%        | 2/2 layouts       | ⚠️ Imports need fixing     |
| **Pages**    | 0%         | 0/3 pages         | ❌ All need import updates |
| **Widgets**  | 0%         | 0/7 widgets       | ❌ All need creation       |
| **Features** | 0%         | 0/2 features      | ❌ All need creation       |
| **Entities** | 30%        | 1/4 entities      | ⚠️ 3 need completion       |
| **Shared**   | 50%        | 7/7 UI components | ⚠️ 4 need proper structure |

### Critical Violations Found

#### 1. Cross-Layer Import Violations

**Location:** `src/app/layouts/Layout.astro:4-5`

```astro
import Header from '@/components/Header.astro'; // ❌ VIOLATION import Footer from
'@/components/Footer.astro'; // ❌ VIOLATION
```

**Fix:** Move to `@widgets/header` and `@widgets/footer`

#### 2. Pages Importing Legacy Components

**Location:** `src/pages/es/index.astro` and `src/pages/en/index.astro`

```astro
import Experience from '../../components/Experience.astro'; // ❌ import Projects from
'../../components/Projects.astro'; // ❌ import AboutMe from '../../components/AboutMe.astro'; // ❌
import Badges from '../../components/Badges.astro'; // ❌ import Hero from
'../../components/Hero.astro'; // ❌
```

**Fix:** Migrate all to widgets layer

#### 3. Hardcoded Business Data in UI Components

- **Projects.astro:29-125** - 24 technology tags
- **Projects.astro:126-384** - 24+ projects
- **Badges.astro:13-58** - 8 certification badges
- **Experience.astro:8-39** - 5 experience entries

**Fix:** Extract to entity model layers

#### 4. Dual i18n Systems

- Legacy: `src/i18n/utils.ts`
- New: `src/shared/lib/i18n/`

**Fix:** Consolidate to shared layer only

---

## 🗺️ Migration Roadmap

### Phase 1: Complete Shared Layer (2-3 hours)

**Priority: HIGH** - Foundation for everything else

#### Task 1.1: Restructure Flat-File Components

Move these components to proper folder structures with Public APIs:

1. **link-button**

    ```
    src/shared/ui/link-button/
    ├── LinkButton.astro      (rename from link-button.astro)
    ├── index.ts              (export { default as LinkButton })
    └── README.md             (optional documentation)
    ```

2. **link-inline**

    ```
    src/shared/ui/link-inline/
    ├── LinkInline.astro
    ├── index.ts
    └── README.md
    ```

3. **section-container**

    ```
    src/shared/ui/section-container/
    ├── SectionContainer.astro
    ├── index.ts
    └── README.md
    ```

4. **title-section**
    ```
    src/shared/ui/title-section/
    ├── TitleSection.astro
    ├── index.ts
    └── README.md
    ```

#### Task 1.2: Update Central Barrel Export

Update `src/shared/ui/index.ts`:

```typescript
// Existing exports
export { default as Avatar } from './avatar';
export { default as Badge } from './badge';
export { default as SocialPill } from './social-pill';

// Add new exports
export { default as LinkButton } from './link-button';
export { default as LinkInline } from './link-inline';
export { default as SectionContainer } from './section-container';
export { default as TitleSection } from './title-section';
```

#### Task 1.3: Update Imports in Existing Code

Search for all uses of these components and update imports to use Public API.

---

### Phase 2: Extract Entity Models (1-2 hours)

**Priority: HIGH** - Required by widgets

#### Task 2.1: Create Technology Entity

**Structure:**

```
src/entities/technology/
├── model/
│   ├── index.ts           (Public API)
│   ├── types.ts           (TypeScript interfaces)
│   └── data.ts            (Technology definitions)
└── ui/                    (Future: Technology tag component)
```

**Extract from:** `src/components/Projects.astro:29-125`

**Data to extract:**

```typescript
export const TAGS = {
	PYTHON: { name: 'Python', class: '...', icon: Python },
	DJANGO: { name: 'Django', class: '...', icon: Django },
	// ... 24 total tags
};
```

**TypeScript interface:**

```typescript
export interface Technology {
	name: string;
	class: string;
	icon: any; // Astro component type
}

export type TechnologyKey = keyof typeof TAGS;
```

#### Task 2.2: Create/Complete Project Entity

**Structure:**

```
src/entities/project/
├── model/                 (rename from models/)
│   ├── index.ts           (Public API)
│   ├── types.ts           (TypeScript interfaces)
│   └── data.ts            (Project definitions)
└── ui/                    (Project card component)
```

**Extract from:** `src/components/Projects.astro:126-384`

**Data structure:**

```typescript
export interface Project {
	title: string;
	description: string;
	link?: string;
	github?: string;
	image: string;
	tags: TechnologyKey[];
}

export interface ProjectsData {
	es: Project[];
	en: Project[];
}
```

**Actions:**

- Rename `models/` → `model/` (singular per FSD)
- Extract PROJECTS_DATA
- Create TypeScript interfaces
- Add Public API

#### Task 2.3: Create Badge Entity

**Structure:**

```
src/entities/badge/
├── model/
│   ├── index.ts           (Public API)
│   ├── types.ts           (TypeScript interfaces)
│   └── data.ts            (Badge definitions)
└── ui/
    └── certification-badge.astro (already exists)
```

**Extract from:** `src/components/Badges.astro:13-58`

**Data structure:**

```typescript
export interface BadgeItem {
	title: string;
	image: string;
	link: string;
}

export type BadgesByLanguage = Record<string, BadgeItem[]>;
```

#### Task 2.4: Create Experience Entity

**Structure:**

```
src/entities/experience/
├── model/
│   ├── index.ts           (Public API)
│   ├── types.ts           (TypeScript interfaces)
│   └── data.ts            (Experience definitions)
└── ui/                    (Future: Experience item component)
```

**Extract from:** `src/components/Experience.astro:8-39`

**Data structure:**

```typescript
export interface ExperienceItem {
	date: string;
	title: string;
	company: string;
	description: string;
	link?: string;
}

export type ExperienceList = ExperienceItem[];
```

**Note:** Consider renaming `entities/jobs/` to `entities/experience/` or removing empty `jobs/` folder.

---

### Phase 3: Create Features Layer (1-2 hours)

**Priority: MEDIUM** - Needed by widgets

#### Task 3.1: Migrate ThemeToggle Feature

**Complexity:** HIGH (121 lines, complex client-side logic)

**Structure:**

```
src/features/theme-toggle/
├── ui/
│   ├── ThemeToggle.astro     (main component)
│   └── index.ts              (export component)
├── model/
│   ├── types.ts              (Theme type definitions)
│   └── index.ts              (export types)
└── index.ts                  (Public API)
```

**Extract from:** `src/components/ThemeToggle.astro`

**Critical requirements:**

- Preserve localStorage logic
- Maintain system preference detection
- Keep all three theme states (light, dark, system)
- Test thoroughly - this is interactive functionality

**Public API:**

```typescript
// src/features/theme-toggle/index.ts
export { default as ThemeToggle } from './ui';
export type { Theme } from './model';
```

#### Task 3.2: Migrate LanguagePicker Feature

**Complexity:** LOW (simple selector)

**Structure:**

```
src/features/language-picker/
├── ui/
│   ├── LanguagePicker.astro
│   └── index.ts
├── model/
│   ├── types.ts
│   └── index.ts
└── index.ts                  (Public API)
```

**Extract from:** `src/components/LanguagePicker.astro`

**Requirements:**

- Integrate with i18n system
- Show current language
- Switch between available languages

---

### Phase 4: Build Widgets Layer (3-4 hours)

**Priority: HIGH** - Main UI composition

#### Task 4.1: Simple Widgets First

**4.1.1: Hero Widget**

```
src/widgets/hero/
├── ui/
│   ├── Hero.astro
│   └── index.ts
└── index.ts
```

**Extract from:** `src/components/Hero.astro`  
**Dependencies:** `@shared/ui` (Avatar, SocialPill), `@shared/lib/i18n`  
**Complexity:** MEDIUM (76 lines, i18n integration)

**4.1.2: Footer Widget**

```
src/widgets/footer/
├── ui/
│   ├── Footer.astro
│   └── index.ts
└── index.ts
```

**Extract from:** `src/components/Footer.astro`  
**Dependencies:** `@shared/lib/i18n`  
**Complexity:** LOW (simple copyright footer)

**4.1.3: AboutMe Widget**

```
src/widgets/about-me/
├── ui/
│   ├── AboutMe.astro
│   └── index.ts
└── index.ts
```

**Extract from:** `src/components/AboutMe.astro`  
**Dependencies:** `@shared/ui`, `@shared/lib/i18n`  
**Complexity:** LOW (simple text section)

#### Task 4.2: Complex Widgets

**4.2.1: Header Widget**

```
src/widgets/header/
├── ui/
│   ├── Header.astro
│   └── index.ts
└── index.ts
```

**Extract from:** `src/components/Header.astro`  
**Dependencies:**

- `@features/theme-toggle` (ThemeToggle)
- `@features/language-picker` (LanguagePicker)
- `@shared/lib/i18n`

**Complexity:** HIGH (150+ lines)

- Mobile menu functionality
- IntersectionObserver for nav highlighting
- Multiple event listeners
- Responsive design

**4.2.2: Experience Widget**

```
src/widgets/experience/
├── ui/
│   ├── Experience.astro
│   ├── ExperienceItem.astro   (nested component)
│   └── index.ts
└── index.ts
```

**Extract from:**

- `src/components/Experience.astro`
- `src/components/ExperienceItem.astro`

**Dependencies:**

- `@entities/experience` (data model)
- `@shared/ui` (SectionContainer, TitleSection)
- `@shared/lib/i18n`

**Complexity:** MEDIUM (two-component widget)

#### Task 4.3: Data-Heavy Widgets

**4.3.1: Projects Widget**

```
src/widgets/projects/
├── ui/
│   ├── Projects.astro
│   └── index.ts
└── index.ts
```

**Extract from:** `src/components/Projects.astro` (443 lines!)  
**Dependencies:**

- `@entities/project` (project data)
- `@entities/technology` (technology tags)
- `@shared/ui` (LinkButton, SectionContainer, TitleSection)
- `@shared/lib/i18n`

**Complexity:** VERY HIGH

- Largest component (443 lines)
- Complex rendering logic
- Image optimization needs
- Multiple data dependencies

**4.3.2: Badges Widget**

```
src/widgets/badges/
├── ui/
│   ├── Badges.astro
│   └── index.ts
└── index.ts
```

**Extract from:** `src/components/Badges.astro`  
**Dependencies:**

- `@entities/badge` (badge data)
- `@entities/badge/ui` (CertificationBadge component)
- `@shared/ui` (SectionContainer)

**Complexity:** MEDIUM (data integration)

---

### Phase 5: Update Pages and Cleanup (1 hour)

**Priority: MEDIUM** - Final integration

#### Task 5.1: Update Page Imports

**5.1.1: Spanish Page**
**File:** `src/pages/es/index.astro`

**Current imports (legacy):**

```astro
import Experience from '../../components/Experience.astro'; import Projects from
'../../components/Projects.astro'; import AboutMe from '../../components/AboutMe.astro'; import
Badges from '../../components/Badges.astro'; import Hero from '../../components/Hero.astro';
```

**New imports (FSD):**

```astro
import {Hero} from '@widgets/hero'; import {AboutMe} from '@widgets/about-me'; import {Experience} from
'@widgets/experience'; import {Projects} from '@widgets/projects'; import {Badges} from '@widgets/badges';
```

**5.1.2: English Page**
**File:** `src/pages/en/index.astro`
Apply same import updates as Spanish page.

**5.1.3: Update Layout**
**File:** `src/app/layouts/Layout.astro`

**Current imports (legacy):**

```astro
import Header from '@/components/Header.astro'; import Footer from '@/components/Footer.astro';
```

**New imports (FSD):**

```astro
import {Header} from '@widgets/header'; import {Footer} from '@widgets/footer';
```

#### Task 5.2: Consolidate i18n System

**Actions:**

1. Verify all components use `@shared/lib/i18n`
2. Update any remaining uses of old `../i18n/utils`
3. Remove `src/i18n/` folder entirely
4. Update imports in all files

**Affected files to check:**

- All widget components
- Page files
- Any remaining legacy component references

#### Task 5.3: Delete Legacy Code

**Delete these folders/files:**

```bash
src/components/          # Entire folder (16 .astro files)
src/i18n/               # Old i18n system
```

**Verify before deletion:**

- All components migrated to FSD layers
- All imports updated to use new paths
- Build succeeds with `bun run build`
- No references to deleted files remain

#### Task 5.4: Final Verification

**Build checks:**

```bash
bun run format:check    # Code formatting
astro check             # TypeScript errors
bun run build           # Production build
bun run preview         # Test production locally
```

**Manual testing:**

- [ ] All pages render correctly
- [ ] Theme toggle works (light/dark/system)
- [ ] Language picker switches (es/en)
- [ ] Mobile navigation works
- [ ] All images load
- [ ] All links functional
- [ ] No console errors

---

## 📋 Detailed Component Migration Map

### From Legacy to FSD Layers

| Legacy Component       | Destination                 | Layer    | Dependencies                 |
| ---------------------- | --------------------------- | -------- | ---------------------------- |
| `ThemeToggle.astro`    | `@features/theme-toggle`    | Features | -                            |
| `LanguagePicker.astro` | `@features/language-picker` | Features | `@shared/lib/i18n`           |
| `Header.astro`         | `@widgets/header`           | Widgets  | ThemeToggle, LanguagePicker  |
| `Footer.astro`         | `@widgets/footer`           | Widgets  | `@shared/lib/i18n`           |
| `Hero.astro`           | `@widgets/hero`             | Widgets  | Avatar, SocialPill           |
| `AboutMe.astro`        | `@widgets/about-me`         | Widgets  | `@shared/ui`                 |
| `Experience.astro`     | `@widgets/experience`       | Widgets  | Experience entity            |
| `ExperienceItem.astro` | `@widgets/experience/ui`    | Widgets  | (nested)                     |
| `Projects.astro`       | `@widgets/projects`         | Widgets  | Project, Technology entities |
| `Badges.astro`         | `@widgets/badges`           | Widgets  | Badge entity                 |

### Shared UI (Already Migrated or Need Structure Fix)

| Component                 | Status      | Action Required                 |
| ------------------------- | ----------- | ------------------------------- |
| `Avatar`                  | ✅ Complete | None                            |
| `Badge`                   | ✅ Complete | None                            |
| `SocialPill`              | ✅ Complete | None                            |
| `link-button.astro`       | ⚠️ Partial  | Add folder structure + index.ts |
| `link-inline.astro`       | ⚠️ Partial  | Add folder structure + index.ts |
| `section-container.astro` | ⚠️ Partial  | Add folder structure + index.ts |
| `title-section.astro`     | ⚠️ Partial  | Add folder structure + index.ts |

### Entity Models to Create

| Entity     | Source File        | Lines   | Data Items   |
| ---------- | ------------------ | ------- | ------------ |
| Technology | `Projects.astro`   | 29-125  | 24 tags      |
| Project    | `Projects.astro`   | 126-384 | 24+ projects |
| Badge      | `Badges.astro`     | 13-58   | 8 badges     |
| Experience | `Experience.astro` | 8-39    | 5 entries    |

---

## ⚠️ Risk Assessment & Mitigation

### High Risk Items

#### 1. i18n System Migration

**Risk Level:** 🔴 HIGH  
**Impact:** Breaking translations across entire site  
**Mitigation:**

- Migrate one component at a time
- Test each component after migration
- Keep both systems temporarily during transition
- Create comprehensive translation tests

#### 2. Client-Side Script Functionality

**Risk Level:** 🔴 HIGH  
**Impact:** Breaking interactive features (theme toggle, navigation)  
**Components affected:**

- ThemeToggle (localStorage, system preferences)
- Header (IntersectionObserver, mobile menu)

**Mitigation:**

- Thorough testing of all scripts post-migration
- Preserve `is:inline` and script placement
- Test across browsers and devices
- Verify localStorage persistence

#### 3. Image Path Breaking

**Risk Level:** 🟡 MEDIUM  
**Impact:** Broken images after component relocation  
**Mitigation:**

- Use Astro's `<Image>` component consistently
- Use absolute paths from `/public`
- Test all image loads after migration
- Document image path patterns

### Medium Risk Items

#### 4. TypeScript Type Safety

**Risk Level:** 🟡 MEDIUM  
**Impact:** Runtime errors from data mismatches  
**Mitigation:**

- Define strict interfaces before extracting data
- Use TypeScript strict mode
- Run `astro check` frequently
- Add JSDoc comments for complex types

#### 5. Build Performance

**Risk Level:** 🟡 MEDIUM  
**Impact:** Slow development experience  
**Mitigation:**

- Consider Astro Content Collections for large datasets
- Monitor build times
- Optimize image processing
- Use dynamic imports where appropriate

### Low Risk Items

#### 6. Import Path Updates

**Risk Level:** 🟢 LOW  
**Impact:** Build errors from wrong paths  
**Mitigation:**

- Use TypeScript path aliases (already configured)
- Use find-and-replace carefully
- Let TypeScript catch errors
- Test build frequently

---

## ✅ Success Criteria

### Structural Criteria

- [ ] **0 files** remaining in `src/components/`
- [ ] **7 widgets** implemented in `src/widgets/`
- [ ] **2 features** in `src/features/`
- [ ] **4 complete entities** with model layer
- [ ] **All slices** have Public APIs (`index.ts`)
- [ ] **0 direct file imports** (all via Public APIs)
- [ ] **Single i18n system** (`@shared/lib/i18n` only)

### Code Quality Criteria

- [ ] **0 TypeScript errors** from `astro check`
- [ ] **0 formatting errors** from `bun run format:check`
- [ ] **All imports** use path aliases (`@layer/slice`)
- [ ] **0 cross-layer violations** (layers only import from below)
- [ ] **0 hardcoded data** in UI components
- [ ] **All entity data** in model layers

### Functional Criteria

- [ ] **Build successful:** `bun run build` passes
- [ ] **All pages render** correctly (es, en, root)
- [ ] **i18n works:** Language switching functional
- [ ] **Theme toggle** works (light/dark/system)
- [ ] **Mobile navigation** opens and closes
- [ ] **All images load** correctly
- [ ] **All links work** (internal and external)
- [ ] **No console errors** in browser DevTools

### Performance Criteria

- [ ] **Lighthouse Performance** score > 90
- [ ] **Lighthouse Accessibility** score > 95
- [ ] **Build time** < 10 seconds
- [ ] **No runtime errors** in production build
- [ ] **First Contentful Paint** < 1.5s

---

## 🔧 Tools & Commands Reference

### Development Commands

```bash
# Install dependencies
bun install

# Start dev server (localhost:4321)
bun run dev

# Type checking
astro check

# Format code
bun run format
bun run format:check

# Build for production
bun run build

# Preview production build
bun run preview
```

### Migration Helper Commands

```bash
# Find all imports of a component
grep -r "from.*Header.astro" src/

# Find all uses of old i18n
grep -r "from.*i18n/utils" src/

# Count legacy components
ls src/components/*.astro | wc -l

# Check for cross-layer imports (should return empty after migration)
grep -r "@widgets.*@features" src/
grep -r "@shared.*@entities" src/
```

### Path Aliases (tsconfig.json)

```typescript
{
  "@/*": ["./src/*"],
  "@app/*": ["./src/app/*"],
  "@pages/*": ["./src/pages/*"],
  "@widgets/*": ["./src/widgets/*"],
  "@features/*": ["./src/features/*"],
  "@entities/*": ["./src/entities/*"],
  "@shared/*": ["./src/shared/*"],
  "@assets/*": ["./src/assets/*"]
}
```

---

## 📊 Progress Tracking

### Overall Progress: 30% → 100%

```
[████████░░░░░░░░░░░░░░░░░░░░] 30%

Phase 1: Shared Layer      [███████████░░░░░░░░░] 50% → 100%
Phase 2: Entities          [██████░░░░░░░░░░░░░░] 30% → 100%
Phase 3: Features          [░░░░░░░░░░░░░░░░░░░░]  0% → 100%
Phase 4: Widgets           [░░░░░░░░░░░░░░░░░░░░]  0% → 100%
Phase 5: Pages & Cleanup   [░░░░░░░░░░░░░░░░░░░░]  0% → 100%
```

### Task Checklist

#### Phase 1: Complete Shared Layer

- [ ] Restructure `link-button` with folder + index.ts
- [ ] Restructure `link-inline` with folder + index.ts
- [ ] Restructure `section-container` with folder + index.ts
- [ ] Restructure `title-section` with folder + index.ts
- [ ] Update central `shared/ui/index.ts` barrel
- [ ] Update all imports to use Public APIs
- [ ] Test all shared components render

#### Phase 2: Extract Entities

- [ ] Create `entities/technology/model/` with data & types
- [ ] Complete `entities/project/model/` (rename models → model)
- [ ] Create `entities/badge/model/` with data & types
- [ ] Create `entities/experience/model/` with data & types
- [ ] Add Public APIs for all entities
- [ ] Add TypeScript interfaces for all data
- [ ] Test data imports in temporary files

#### Phase 3: Create Features

- [ ] Migrate `ThemeToggle` to `features/theme-toggle/`
- [ ] Test theme switching (light/dark/system)
- [ ] Test localStorage persistence
- [ ] Migrate `LanguagePicker` to `features/language-picker/`
- [ ] Test language switching
- [ ] Add Public APIs for both features

#### Phase 4: Build Widgets

- [ ] Create `widgets/hero/` from Hero.astro
- [ ] Create `widgets/footer/` from Footer.astro
- [ ] Create `widgets/about-me/` from AboutMe.astro
- [ ] Create `widgets/header/` from Header.astro
- [ ] Test mobile menu functionality
- [ ] Test nav highlighting
- [ ] Create `widgets/experience/` from Experience + ExperienceItem
- [ ] Create `widgets/projects/` from Projects.astro
- [ ] Create `widgets/badges/` from Badges.astro
- [ ] Test all widgets render correctly
- [ ] Add Public APIs for all widgets

#### Phase 5: Pages & Cleanup

- [ ] Update `pages/es/index.astro` imports
- [ ] Update `pages/en/index.astro` imports
- [ ] Update `app/layouts/Layout.astro` imports
- [ ] Consolidate to single i18n system
- [ ] Remove `src/i18n/` folder
- [ ] Delete `src/components/` folder
- [ ] Run `astro check` - 0 errors
- [ ] Run `bun run build` - success
- [ ] Manual testing - all features work
- [ ] Performance testing - Lighthouse scores

---

## 📚 FSD Architecture Reference

### Layer Import Rules

**Allowed imports (top to bottom):**

```
App     → Pages, Widgets, Features, Entities, Shared
Pages   →        Widgets, Features, Entities, Shared
Widgets →                 Features, Entities, Shared
Features→                           Entities, Shared
Entities→                                     Shared
Shared  → (nothing - lowest layer)
```

**Forbidden:**

- ❌ Lower layer importing from upper layer
- ❌ Same layer slice importing another slice (use composition)
- ❌ Direct file imports (must use Public APIs)

### Public API Pattern

Every slice must expose a Public API through `index.ts`:

```typescript
// ❌ BAD: Direct import
import Hero from '@widgets/hero/ui/Hero.astro';

// ✅ GOOD: Public API import
import { Hero } from '@widgets/hero';
```

### Folder Structure Template

```
src/entities/example-entity/
├── model/              # Business logic & data
│   ├── types.ts        # TypeScript interfaces
│   ├── data.ts         # Entity data
│   ├── helpers.ts      # Business logic functions
│   └── index.ts        # Public API (exports)
├── ui/                 # Visual components
│   ├── ExampleCard.astro
│   ├── ExampleList.astro
│   └── index.ts        # Public API (exports)
└── index.ts            # Slice Public API (re-exports)
```

---

## 🎯 Open Questions & Decisions Needed

### 1. i18n Consolidation Strategy

**Question:** Immediate cutover or gradual migration?

**Option A: Immediate**

- Remove `src/i18n/` in Phase 1
- Force all components to use `@shared/lib/i18n`
- Higher risk but cleaner

**Option B: Gradual**

- Keep both systems during migration
- Component-by-component switchover
- Remove old system in Phase 5
- Lower risk but more complexity

**Recommendation:** Option B (gradual) - safer for large migration

### 2. Empty `entities/jobs/` Folder

**Question:** Remove or implement?

**Option A: Remove**

- It's empty and unused
- Simplifies structure

**Option B: Rename to `entities/experience/`**

- Better naming (jobs → experience)
- Merge with experience data

**Option C: Keep separate**

- Jobs entity for future job listings
- Experience entity for timeline

**Recommendation:** Option B (rename) - experience is more appropriate

### 3. Data Storage Approach

**Question:** TypeScript objects or Astro Content Collections?

**Option A: TypeScript Objects**

- Current approach
- Simple and straightforward
- `model/data.ts` files

**Option B: Astro Content Collections**

- Better performance for large datasets
- Markdown support
- Built-in schema validation
- More complex setup

**Recommendation:** Start with Option A, migrate to Option B if performance issues arise

### 4. Asset Organization

**Question:** Keep `src/assets/icons/` or move to entities/shared?

**Current:** `src/assets/icons/` (24 icon components)

**Option A: Keep as-is**

- Already working
- Don't break what's not broken

**Option B: Move to `@shared/assets/icons/`**

- More FSD-compliant
- Better organization

**Recommendation:** Option A (keep) - low priority, high effort

---

## 📝 Documentation Updates Needed

After migration, update these files:

1. **README.md**
    - Update project structure diagram
    - Document new import patterns
    - Add FSD architecture section

2. **.github/copilot-instructions.md**
    - Remove "migrating to FSD" notes
    - Update to "fully FSD-compliant"
    - Update examples with new paths

3. **docs/** folder
    - Mark all migration docs as "completed"
    - Add "FSD implementation complete" date
    - Create maintenance guide

4. **Create new docs:**
    - `ARCHITECTURE.md` - FSD layer descriptions
    - `CONTRIBUTING.md` - How to add new features/widgets
    - `COMPONENTS.md` - Component catalog

---

## 🎉 Success Metrics

### Before Migration

- ✅ 16 components in legacy structure
- ✅ ~800 lines of non-FSD code
- ✅ 12 architectural violations
- ✅ 2 parallel i18n systems
- ✅ Hardcoded data in 4 components

### After Migration (Target)

- 🎯 0 components in legacy structure
- 🎯 ~800 lines properly organized in FSD
- 🎯 0 architectural violations
- 🎯 1 unified i18n system
- 🎯 All data in entity model layers
- 🎯 7 widgets fully functional
- 🎯 2 features properly extracted
- 🎯 4 entities with complete models
- 🎯 100% Public API coverage
- 🎯 Build time < 10 seconds
- 🎯 Lighthouse scores > 90

---

## 🚀 Next Steps

1. **Review this plan** with team/stakeholders
2. **Answer open questions** (i18n strategy, jobs folder, data approach)
3. **Set up progress tracking** (GitHub Project, Trello, etc.)
4. **Start Phase 1** - Complete Shared Layer
5. **Work through phases sequentially** - don't skip ahead
6. **Test thoroughly** after each phase
7. **Document learnings** for future reference

---

**End of Implementation Plan**

_This plan is a living document. Update progress as you complete tasks._

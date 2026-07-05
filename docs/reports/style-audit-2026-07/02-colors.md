# 02 · Colors — Token Bypass, Hardcoded Status Colors, Low Contrast, Token Naming

[← Back to index](./README.md) · Related: [`01-typography.md`](./01-typography.md) ·
Standard: [`../../STYLE-GUIDE.md`](../../STYLE-GUIDE.md)

**Overall: C+.** The semantic token system in `src/app/styles/colors.css` is well built
(`light-dark()` pairs for text, surfaces, borders, status) but adoption is incomplete: raw
`neutral-*`/`gray-*` utilities color most body text, status UI hardcodes `emerald`/`red`/
`yellow`/`green`, and a few combos fall below WCAG AA contrast. Additionally, the token names
themselves generate confusing Tailwind 4 utilities (`text-text-main`, `border-border-subtle`).

All findings ✅ verified at base commit `4dba60c`.

---

## 1. Token naming stutter (Tailwind 4 semantics)

In Tailwind 4 every `--color-<name>` theme variable generates `text-<name>`, `bg-<name>`,
`border-<name>` utilities. Naming a color token after a CSS property produces stuttering,
confusing classes:

| Token (before) | Generated utility | Usages | Token (after) | Utility (after) |
|---|---|---:|---|---|
| `--color-text-main` | `text-text-main` | 59 | `--color-content-strong` | `text-content-strong` |
| `--color-text-body` | `text-text-body` | 12 | `--color-content` | `text-content` |
| `--color-text-muted` | `text-text-muted` | 53 | `--color-content-muted` | `text-content-muted` |
| `--color-border-subtle` | `border-border-subtle` | 54 | `--color-edge-subtle` | `border-edge-subtle` |
| `--color-border-strong` | `border-border-strong` | 11 | `--color-edge-strong` | `border-edge-strong` |

**Rule going forward** (STYLE-GUIDE §Tokens): the name after `--color-` must describe the
**role** (content, edge, surface, banner…), never the CSS property it will be used with.

Rename also covers every `var(--color-text-*)` / `var(--color-border-*)` reference:
`colors.css` (`body` color, `--shadow-retro-*` scale), `global.css` (scrollbar), and all
inline arbitrary shadows `shadow-[…_var(--color-border-strong)]` across components.

## 2. Raw palette colors on text that should use semantic tokens

| File:line | Current | Target |
|---|---|---|
| `src/widgets/about-me/ui/AboutMe.astro:25` | `[&>p]:text-neutral-700 dark:[&>p]:text-neutral-300` | `[&>p]:text-content` |
| `src/widgets/about-me/ui/AboutMe.astro:68,96` | `text-neutral-700 dark:text-neutral-300` | `text-content` |
| `src/widgets/about-content/ui/AboutContent.astro:58,96` | `text-neutral-700 dark:text-neutral-300` | `text-content` |
| `src/entities/project/ui/ProjectCard.astro:64` | `text-neutral-600 dark:text-neutral-400` | `text-content-muted` |
| `src/entities/project/ui/ProjectCard.astro:83` | `text-neutral-900 dark:text-neutral-50` | `text-content-strong` |
| `src/entities/project/ui/ProjectCard.astro:88` | `text-neutral-700 dark:text-neutral-300` | `text-content` |
| `src/widgets/experience/ui/ExperienceItem.astro:37,41` | `text-neutral-600 dark:text-neutral-400` | `text-content-muted` |
| `src/widgets/experience/ui/Experience.astro:34,48` | `text-neutral-600 dark:text-neutral-400` | `text-content-muted` |
| `src/widgets/devlog/ui/DevlogCard.astro:28,35,53` | `text-neutral-600/700 dark:text-neutral-400` | `text-content-muted` / `text-content` |
| `src/widgets/devlog/ui/DevlogCard.astro:49` | `text-neutral-900 dark:text-neutral-50` | `text-content-strong` |
| `src/widgets/blog/ui/BlogCard.astro:27,48` | `text-neutral-700/600 dark:text-neutral-400` | `text-content-muted` / `text-content` |
| `src/widgets/blog/ui/BlogCard.astro:44` | `text-neutral-900 dark:text-neutral-50` | `text-content-strong` |
| `src/widgets/footer/ui/Footer.astro:83,89` | `text-neutral-600 dark:text-neutral-400` | `text-content-muted` |
| `src/pages/components.astro` + `src/pages/es/components.astro` (~23 lines) | default `text-gray-600/700 dark:text-gray-300/400` | `text-content` / `text-content-muted` |
| `src/shared/ui/title-section/TitleSection.astro:2` | `text-black/80 dark:text-white` (+ dead `font-semibold`, overridden by global `font-bold`) | `text-content-strong`, drop `font-semibold` |

## 3. Hardcoded status colors (tokens exist and are unused)

| File:line | Current | Target |
|---|---|---|
| `src/widgets/recruiter-hud/ui/RecruiterHUD.astro:101` | `bg-emerald-500/20 text-emerald-400 border-emerald-500/40` | `bg-success-500/20 text-success-500 border-success-500/40` |
| `src/widgets/recruiter-hud/ui/RecruiterHUD.astro:107` | `text-emerald-600 dark:text-emerald-400` | `text-status-success-text` |
| `src/widgets/recruiter-hud/ui/RecruiterHUD.astro:342,534` (JS strings) | `bg-emerald-500` | `bg-success-500` |
| `src/widgets/project-case-study/ui/ProjectCaseStudy.astro:114` | `text-red-500` | `text-error-500` |
| `src/widgets/project-case-study/ui/ProjectCaseStudy.astro:121` | `text-yellow-500` | `text-warning-500` |
| `src/widgets/project-case-study/ui/ProjectCaseStudy.astro:135` | `text-green-500` | `text-success-500` |
| `src/shared/ui/badge/Badge.astro:12,14` | `bg-blue-100 text-blue-800…` / `bg-green-100…` defaults | primary/success token variants |

## 4. Low-contrast combinations (sub-AA)

Opacity modifiers stack on already-muted colors, on already-tiny text:

| File:line | Current | Problem | Target |
|---|---|---|---|
| `src/features/cli-terminal/ui/CLITerminal.astro:328` | `text-red-400/40 text-[9px]` | ~40% alpha red at 9px | `text-error-500/80 text-xs` |
| `src/features/cli-terminal/ui/CLITerminal.astro:325` | `text-red-400/60 text-[10px]` | sub-AA | `text-error-500/80 text-xs` |
| `src/features/cli-terminal/ui/CLITerminal.astro:285,295` | `text-text-muted/80 text-[10px]` | muted + alpha + 10px | drop alpha, `text-sm`/`text-xs` |
| `src/features/cli-terminal/ui/CLITerminal.astro:287` | `text-text-muted/60 text-[10px]` | muted + 60% alpha | drop alpha |

## 5. Intentional exception — terminal hex colors

`CLITerminal.astro` (28× `text-[#00b0ff]`) and `SplashScreen.astro` (12× `text-[#00ff88]`)
use hardcoded hex for the phosphor-terminal aesthetic. The terminal surface is **always dark**
regardless of theme, so `light-dark()` tokens don't apply. ✅ **Kept as-is**, documented as an
exception in STYLE-GUIDE. 💡 Follow-up: promote to `--color-terminal-cyan` /
`--color-terminal-green` tokens so the values are named and reusable.

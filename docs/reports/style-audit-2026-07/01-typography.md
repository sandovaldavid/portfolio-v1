# 01 · Typography — Text Sizes Below the Legibility Floor

[← Back to index](./README.md) · Related: [`02-colors.md`](./02-colors.md) ·
[`03-headings.md`](./03-headings.md) · Standard: [`../../STYLE-GUIDE.md`](../../STYLE-GUIDE.md)

**Overall: D.** There is no typography scale anywhere in the design system — no size tokens in
`src/app/styles/colors.css`, no global heading sizes in `src/app/styles/global.css` — so every
component picks sizes ad-hoc, and they drifted far below a legible floor. Real reading copy
renders at 14px or less, decorative labels go as low as **8px**, and the pixel fonts (VT323,
Press Start 2P, Silkscreen) make every nominal size read visually smaller than a regular font.

All findings ✅ verified at base commit `4dba60c`.

---

## 1. The numbers (grep sweep of `src/**/*.astro`)

| Utility | Occurrences | Px | Verdict |
|---|---:|---:|---|
| `text-[8px]` | 6 | 8 | ❌ Banned — below any legibility floor |
| `text-[9px]` | 8 | 9 | ❌ Banned |
| `text-[10px]` | 42 | 10 | ❌ Banned |
| `text-[11px]` | 2 | 11 | ❌ Banned |
| `text-xs` | 82 | 12 | ⚠️ Floor — decorative labels/badges only |
| `text-sm` | 75 | 14 | ⚠️ Secondary text only — **not** body copy |
| `text-base` | 45 | 16 | ✅ Body copy baseline |

58 elements render below 12px. The compounding factor: many use `font-retro-tag` (Silkscreen)
or `font-pixel` (Press Start 2P) with `uppercase tracking-widest`, which further shrinks
perceived size and legibility (already flagged in
[`../portfolio-audit-2026-06/01-design-system.md`](../portfolio-audit-2026-06/01-design-system.md) §3 Problem B).

## 2. New standard applied (decision)

- **Body copy** (paragraphs, descriptions, list content): `text-base` (16px) minimum.
- **Secondary text** (metadata, dates, nav items, functional captions): `text-sm` (14px) minimum.
- **Decorative labels/badges/tags**: `text-xs` (12px) **absolute floor**.
- **Arbitrary `text-[Npx]` with N < 12: banned.**
- **VT323 (+1 step) rule**: reading text set in `font-pixel-clean` uses one step larger than
  its semantic role.

Full rules: [`../../STYLE-GUIDE.md`](../../STYLE-GUIDE.md). Enforced by
`tests/e2e/typography.spec.ts`.

## 3. Finding inventory with target classes

The **Target** column is the fix contract — component fixes follow this table, not ad-hoc judgment.

### 3.1 Body copy below 16px (High severity — real reading text)

| File:line | Element | Current | Target |
|---|---|---|---|
| `src/widgets/about-content/ui/AboutContent.astro:58` | About bio prose (3 `<p>`) | `text-sm` | `text-base` |
| `src/widgets/about-content/ui/AboutContent.astro:88` | "Currently focused" list | `text-sm` | `text-base` |
| `src/entities/project/ui/ProjectCard.astro:88` | Project description `<p>` | `text-sm` | `text-base` |
| `src/widgets/blog/ui/BlogCard.astro:48` | Blog card description `<p>` | `text-sm` | `text-base` |
| `src/widgets/devlog/ui/DevlogCard.astro:53` | Devlog summary `<p>` | `text-sm` | `text-base` |
| `src/widgets/research-content/ui/ResearchContent.astro:100,112,124,182` | Thesis prose (problem/hypothesis/approach/dataset) | `text-sm` | `text-base` |
| `src/widgets/footer/ui/Footer.astro:50` | Footer subtitle | `text-xs sm:text-sm` | `text-sm` |
| `src/widgets/recruiter-hud/ui/RecruiterHUD.astro:229` | HUD stats grid content | `text-[10px]` | `text-sm` |
| `src/widgets/recruiter-hud/ui/RecruiterHUD.astro:261` | HUD summary block content | `text-[10px]` | `text-sm` |
| `src/features/cli-terminal/ui/CLITerminal.astro:287` | Terminal hint body | `text-[10px]` | `text-sm` |
| `src/features/cli-terminal/ui/CLITerminal.astro:295` | Terminal footer body | `text-[10px]` | `text-sm` |

### 3.2 Sub-12px decorative labels (must rise to the 12px floor → `text-xs`)

| File:line | Element | Current |
|---|---|---|
| `src/widgets/recruiter-hud/ui/RecruiterHUD.astro:163,174,185,200,212` | Panel shortcut hints | `text-[8px]` |
| `src/widgets/research-content/ui/ResearchContent.astro:165` | Feature index chip (F01…) | `text-[8px]` |
| `src/widgets/recruiter-hud/ui/RecruiterHUD.astro:101,342` | LIVE badge / copied toast | `text-[9px]` |
| `src/widgets/blog/ui/BlogCard.astro:37` · `BlogDetail.astro:50` | Tag chips | `text-[9px]` |
| `src/widgets/devlog/ui/DevlogCard.astro:42` · `DevlogDetail.astro:36` | Tag chips | `text-[9px]` |
| `src/entities/project/ui/ProjectCard.astro:64` | Feature/Project tag | `text-[9px]` |
| `src/features/cli-terminal/ui/CLITerminal.astro:325,328` | Error hint lines | `text-[10px]`/`text-[9px]` |
| `src/widgets/hero/ui/Hero.astro:24,66,72,88` | Role label, player strip, level, ONLINE badge | `text-[10px]` |
| `src/entities/project/ui/ProjectCard.astro:76` | Case-study kicker | `text-[10px]` |
| `src/widgets/blog/ui/BlogCard.astro:22` · `DevlogCard.astro:24` · `BlogDetail.astro:37` · `DevlogDetail.astro:30` | BLOG/DEVLOG kickers | `text-[10px]` |
| `src/widgets/recruiter-hud/ui/RecruiterHUD.astro:107,143,152,159,170,181,196,208,225,256` | HUD labels/buttons | `text-[10px]` |
| `src/features/cli-terminal/ui/CLITerminal.astro:145,171,212,220,233,241,254,262,275,282,356` | Terminal chrome, kbd keys, panel titles | `text-[10px]` |
| `src/features/splash-screen/ui/SplashScreen.astro:65` | PRESS START button | `text-[10px] sm:text-xs` |
| `src/pages/atena.astro:50,57` + `src/pages/es/atena.astro` (mirror) | Metadata labels | `text-[10px]` |
| `src/widgets/research/ui/Research.astro:38` | IN PROGRESS badge | `text-[10px]` |
| `src/features/cli-terminal/ui/CLITerminal.astro:142` | Terminal title | `text-[11px]` |
| `src/shared/ui/tech-pill/TechPill.astro:30` | Stack pill label (sm) | `text-[11px] md:text-xs` → `text-xs` |

### 3.3 Root cause

1. **No scale exists**: `colors.css` defines color/spacing/shadow tokens but zero `--text-*`
   size tokens; `global.css` sets heading fonts but no heading sizes. Nothing constrains a
   component author.
2. **Pixel-font compensation inverted**: the retro fonts read smaller, so sizes should have
   been *bumped up* — instead labels were shrunk to look "dense/retro".
3. **No enforcement**: no test asserts a computed font-size anywhere
   (see [`04-test-false-positives.md`](./04-test-false-positives.md)).

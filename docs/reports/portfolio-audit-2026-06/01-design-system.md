# 01 · Design System — Color, Typography & Pixel-Art Theming

[← Back to index](./README.md) · Related: [Accessibility](./03-accessibility.md) ·
[Backlog](./08-backlog.md)

The design system lives almost entirely in two files:
`src/app/styles/colors.css` (Tailwind 4 `@theme` block + tokens) and
`src/app/styles/global.css` (resets, headings, scrollbars, container). Tailwind 4 is wired via
`@tailwindcss/vite` (no `tailwind.config.js`), so **all tokens are CSS variables in
`@theme`** — a clean, modern setup.

**Overall: A−.** The token system is cohesive and the retro identity is expressed
consistently. The issues below are refinements, not redesigns.

---

## 1. Color tokens & palette ✅

Tokens use the modern CSS `light-dark()` function so a single semantic variable resolves
correctly per `color-scheme`. This is a genuinely good pattern.

### Brand / primary (note the light↔dark hue shift)

| Token | Light | Dark |
|-------|-------|------|
| `--color-primary-400` | `#3b82f6` (blue) | `#00d8ff` (cyan) |
| `--color-primary-500` | `#0a5cd6` (royal blue) | `#00b0ff` (bright cyan) |
| `--color-primary-600` | `#0044cc` (deep blue) | `#0080ff` (sky) |

The brand deliberately shifts **blue (light) → neon cyan (dark)**, which is what gives the dark
theme its arcade-CRT glow. `primary-50…300` and `700…950` are static (no `light-dark()`).

### Semantic tokens (the ones components should use)

| Semantic | Light | Dark |
|----------|-------|------|
| `--color-background` | `#f5f8fc` | `#020408` (near-black CRT) |
| `--color-surface` | `#ffffff` | `#0a0d14` |
| `--color-surface-highlight` | `#e8eef9` | `#141b29` |
| `--color-text-main` | `#0f172a` | `#f1f5f9` |
| `--color-text-body` | `#334155` | `#cbd5e1` |
| `--color-text-muted` | `#64748b` | `#94a3b8` |
| `--color-border-subtle` | `#cbd5e1` | `#1e293b` |
| `--color-border-strong` | `#0f172a` | `#cbd5e1` |

### Status colors

`--color-success-500 #00e676` · `--color-warning-500 #ffc107` · `--color-error-500 #ff1744`
(each with a `-900` dark variant). These read as "neon arcade" — on-theme.

### Findings

- 💡 **Status tokens are under-used.** The hero's "ONLINE" badge uses Tailwind's default
  `bg-emerald-500` (`src/widgets/hero/ui/Hero.astro:76`) instead of `--color-success-500`
  (`#00e676`). Route status colors through the tokens so the palette stays single-sourced.
- 💡 **No `light-dark()` for status colors.** `success/warning/error` only expose `-500`/`-900`;
  consider light/dark-tuned values for consistency with the rest of the system.
- 💡 **Consider OKLCH for the neons.** Tailwind 4 supports OKLCH; expressing the cyan/green
  neons in OKLCH would let you tune perceived lightness (and contrast) without hue drift. Pure
  polish — current hexes are fine.

---

## 2. Color contrast (WCAG) ✅ palette · 💡 verify rendered combos

The **dark theme is high-contrast by construction.** Against `--color-background` `#020408`,
indicative ratios are comfortably above the WCAG AA 4.5:1 threshold for body text:

| Foreground (dark) | on `#020408` | Approx. ratio | AA text |
|-------------------|--------------|:-------------:|:-------:|
| `text-main #f1f5f9` | background | ~18:1 | ✅ AAA |
| `text-body #cbd5e1` | background | ~13:1 | ✅ AAA |
| `text-muted #94a3b8` | background | ~7:1 | ✅ AA (AAA large) |
| `primary-500 #00b0ff` | background | ~8:1 | ✅ AA |

> These are computed estimates, not an axe scan. The **real** contrast risks are not the token
> ratios but: (a) **light-mode** combinations (unverified — the site forces dark, see
> [bugs](./05-bugs.md)), (b) component-level combos like low-opacity dashed borders
> (`border-primary-500/60`, `Hero.astro:16`), and (c) text over the `bg-primary-500` button in
> light mode (`text-white` on `#0a5cd6` ≈ 4.6:1 — borderline).

- 💡 **Action:** run an automated pass (`axe`, Lighthouse a11y, or Playwright + `@axe-core`) on
  **both** themes and record results. Tracked as `P1-3`. See [accessibility](./03-accessibility.md).

---

## 3. Typography & fonts — the weakest part of the system

### The pixel-font stack ✅

`colors.css:2-8` defines a rich, purpose-built type scale:

```css
--font-sans:        'JetBrains Mono', 'Geist Sans', 'Inter', system-ui, sans-serif;
--font-mono:        'JetBrains Mono', 'Geist Mono', monospace;
--font-pixel:       'Press Start 2P', monospace;   /* hero name, arcade headline */
--font-pixel-clean: 'VT323', monospace;            /* ALL h1–h6 (global.css:17) */
--font-retro-tag:   'Silkscreen', monospace;       /* tiny uppercase labels */
--font-gaming-mono: 'Share Tech Mono', monospace;  /* terminal/CLI flavor */
```

All headings globally use `VT323` + `uppercase` + `tracking-wide` (`global.css:11-19`), and
the hero name uses `Press Start 2P` with a `5px 5px 0` text-shadow (`Hero.astro:30-31`). This
is the heart of the retro identity and it works.

### Problem A — the font supply chain is inconsistent ✅

Three different mechanisms are in play, and they don't agree:

1. **Google Fonts CDN** (`Layout.astro:128-141`) loads the pixel fonts (`Press Start 2P`,
   `VT323`, `Silkscreen`, `Share Tech Mono`, `JetBrains Mono`) via a `<link rel="preload"
   as="style" onload=…>` + `preconnect` to `fonts.googleapis.com` / `fonts.gstatic.com`.
2. **`@fontsource-variable/onest`** is imported (`Layout.astro:4`) — but **`Onest` appears in no
   token** in `colors.css`. It is loaded and never used.
3. **`@fontsource/geist-sans` / `@fontsource/geist-mono`** are in `package.json` deps and are
   referenced in `--font-sans` / `--font-mono` — but they are **never imported** anywhere, so
   they never load. Text falls through to `JetBrains Mono` (from the CDN).

**Net effect:** a third-party font request sits on the **render path**, `Onest` is dead weight,
`Geist` is a dead dependency, and the actual fonts that paint differ from what the tokens imply.

### Problem B — pixel-font legibility at small sizes 💡

`Press Start 2P` and `VT323` are charming but hard to read small. The codebase uses them at
`text-[9px]`/`text-[10px]` with `uppercase` + `tracking-widest` (e.g. `Hero.astro:54,60`,
nameplates, HUD labels). Even at perfect contrast, this hurts readability — especially for the
content a recruiter actually needs to parse.

### 💡 Recommendation — adopt the native Astro 6 Fonts API

The project is on **Astro 6.4.8**, which ships a first-party fonts pipeline
([docs: guides/fonts](https://docs.astro.build/en/guides/fonts/),
[config reference#fonts](https://docs.astro.build/en/reference/configuration-reference/#fonts)).
This **self-hosts** the fonts (no third-party request, better privacy, simpler future CSP),
generates **metric-based optimized fallbacks** (cuts CLS/layout shift), and gives `preload`,
`subsets`, `weights`, and `woff2` out of the box.

**Before** (`Layout.astro` + manual imports + CDN link):

```astro
import '@fontsource-variable/onest';            // unused
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&…" … />
```

**After** (`astro.config.mjs`):

```js
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  // …
  experimental: {
    fonts: [
      { provider: fontProviders.google(), name: 'Press Start 2P', cssVariable: '--font-pixel',       weights: ['400'], fallbacks: ['monospace'] },
      { provider: fontProviders.google(), name: 'VT323',          cssVariable: '--font-pixel-clean', weights: ['400'], fallbacks: ['monospace'] },
      { provider: fontProviders.google(), name: 'Silkscreen',     cssVariable: '--font-retro-tag',   weights: ['400','700'], fallbacks: ['monospace'] },
      { provider: fontProviders.google(), name: 'Share Tech Mono',cssVariable: '--font-gaming-mono', weights: ['400'], fallbacks: ['monospace'] },
      { provider: fontProviders.google(), name: 'JetBrains Mono', cssVariable: '--font-mono',        weights: ['400','500','700'], fallbacks: ['monospace'] },
    ],
  },
});
```

```astro
---
// Layout.astro <head>
import { Font } from 'astro:assets';
---
<Font cssVariable="--font-pixel" preload />   <!-- preload only above-the-fold fonts -->
<Font cssVariable="--font-pixel-clean" preload />
```

> Verify the exact flag name/stability for your Astro patch version — the fonts API moved
> through `experimental` before stabilizing. The config reference above is for `astro@6.x`.
> Then **drop** the `@fontsource-variable/onest` import and the unused `@fontsource/geist-*`
> deps (or actually wire Geist into a token if you want it). Preload **sparingly** — Astro's
> docs warn it can block other resources.

This single migration resolves Problem A, removes a render-path third-party dependency
(helping [performance](./06-performance-seo.md)), and reduces layout shift via optimized
fallbacks. Tracked as `P1-1`.

---

## 4. Pixel-art theming inventory ✅

What's executed well and consistently:

- **Hard edges everywhere:** `rounded-none` + `border-2 border-black dark:border-white`.
- **Offset "3D" hard shadows:** `shadow-[3px_3px_0px…]` → `8px` on the hero card, with
  press/lift hover states (`button.css`, `Hero.astro:39,139`). Tactile arcade feel.
- **CRT scanline overlay + power-off animation** on the splash screen.
- **Custom blocky scrollbar** (`global.css:21-39`) with a `primary-500` thumb and strong border.
- **Dashed retro dividers** (`border-b-2 border-dashed`) and the radial `hero-gradient`.
- **RPG "Character Stats" hero** — `CLASS / ALIGNMENT / HP / MANA / SKILL LEVEL` (`Hero.astro`).

### Consistency notes 💡

- Shadow offsets (`3/4/6/8px`) and border widths are slightly ad-hoc. Consider promoting a
  couple of **shadow tokens** (e.g. `--shadow-retro-sm/md/lg`) so the "depth language" is
  single-sourced like the colors are.
- Reuse the shared button (`@shared/ui`) instead of re-declaring the full shadow/hover class
  string inline (the hero CTA at `Hero.astro:139` duplicates `button.css`).

---

## 5. "Level up" — keeping the retro identity, raising the ceiling

Theme-preserving polish ideas (full list in [09-ideas-level-up.md](./09-ideas-level-up.md)):

- Promote **spacing/shadow scales to tokens** so the system is as principled as the color layer.
- A **scoped readability rule**: keep pixel fonts for display/labels, but render long-form body
  copy (about, research prose) in a slightly more legible mono at ≥14px. The theme survives;
  the reading experience improves.
- Use **View Transitions** (see [performance](./06-performance-seo.md)) for a CRT-wipe page
  transition that reinforces the arcade feel **and** gives free `prefers-reduced-motion` support.

---

[← Back to index](./README.md) · Next: [02 · UI / UX →](./02-ui-ux.md)

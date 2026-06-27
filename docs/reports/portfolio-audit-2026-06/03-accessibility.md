# 03 · Accessibility (a11y)

[← Back to index](./README.md) · Related: [Design system](./01-design-system.md) ·
[Bugs](./05-bugs.md) · [Backlog](./08-backlog.md)

**Overall: B.** The fundamentals are better than most portfolios — semantic HTML, real ARIA on
the complex widgets, and excellent keyboard support. Three concrete gaps hold the grade back,
and all are quick fixes.

---

## Strengths ✅

- **Semantic landmarks**: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>` are used
  appropriately (`Layout.astro:155-228`).
- **Real ARIA on complex widgets**:
  - Experience tabs use the full ARIA tabs pattern (`role="tablist"`/`tab"`/`tabpanel"`,
    `aria-selected`, arrow-key + Home/End navigation).
  - CLI terminal: `role="dialog"`, `aria-modal="true"`, input `aria-label`, output
    `aria-live="polite"`.
- **Keyboard-first**: vim-style nav (`j/k/gg/G`), section jumps (`1-6`), `:`/`/`/`?` shortcuts.
  This is genuinely strong.
- **`lang` is dynamic**: `<html lang={langCode}>` (`Layout.astro:86`) switches en/es.
- **Heading hierarchy** is logical (single h1 in hero, h2 per section).

---

## Gaps (ordered by impact)

### A. Theme flash of incorrect color (FOUC) — also a correctness bug ✅ `P0-1`

`Layout.astro:148-151` runs an inline `<head>` script that **unconditionally** adds the `dark`
class:

```js
<script is:inline>
  // Force dark mode for high-contrast unified retro palette
  document.documentElement.classList.add('dark');
</script>
```

The real theme is only applied **later** by the theme-toggle module script, which reads
`localStorage` (`ThemeToggle.astro:75-88`). So a visitor who chose **Light** or **System** sees
**dark paint first, then a flip to their theme on every navigation** (this is a multi-page
Astro site, so each click is a full load). That's both an accessibility issue (respecting user
preference / reduced flashing) and a polish bug.

💡 **Fix — the official Astro pattern** (
[docs: view-transitions § script behavior](https://docs.astro.build/en/guides/view-transitions/#script-behavior-with-view-transitions)):
read `localStorage` in the head inline script **before paint**, defaulting to `dark`:

```js
<script is:inline>
  function applyTheme() {
    const saved = localStorage.getItem('theme') || 'dark'; // dark = your default
    const isDark = saved === 'dark' ||
      (saved === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  }
  applyTheme();
  document.addEventListener('astro:after-swap', applyTheme); // needed if/when ClientRouter is added
</script>
```

This keeps dark-by-default **and** eliminates the flash. Full detail in [bugs](./05-bugs.md).

### B. No `prefers-reduced-motion` support ✅ `P0-3`

The site has many **infinite/auto** animations: `animate-pulse` (EXP bar, "ONLINE" badge,
status banner), the brand-logo typing + `glitch`, the 404 `blob`, CRT effects, and fade/slide
keyframes (`colors.css:88-109`). None are gated by motion preference. WCAG 2.3.3 + general
comfort.

💡 **Fix (two options, can do both):**
1. A global CSS guard:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
2. Adopt **View Transitions** (`<ClientRouter />`), which respects `prefers-reduced-motion`
   **automatically** ([docs](https://docs.astro.build/en/guides/view-transitions/)). See
   [performance](./06-performance-seo.md).

### C. No "skip to content" link ✅ `P1-2`

The header is `fixed`, the home page is long, and there is no skip link. Keyboard users must
tab through the nav on every page.

💡 **Fix:** first focusable element in `<body>`:
```astro
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-50 …">
  Skip to main content
</a>
```
and add `id="main-content"` to `<main>` (`Layout.astro:158`).

### D. Pixel-font legibility 💡 (see [design system](./01-design-system.md))

Contrast ratios pass AA, but `Press Start 2P`/`VT323` at `text-[9px]`/`text-[10px]` +
`uppercase` + wide tracking are hard to read regardless of contrast. Reserve pixel fonts for
display/labels; render functional/long-form text at ≥14px in a more legible mono.

---

## To verify (don't assert without a scan) 💡 `P1-3`

- **Run axe / Lighthouse a11y on both themes.** Light mode is currently never shown (forced
  dark), so its contrast is unverified — and it's where borderline combos live (e.g.
  `text-white` on `bg-primary-500 #0a5cd6` ≈ 4.6:1).
- **Image alt text audit.** The hero avatar alt is generic ("David Sandoval character sprite",
  `Hero.astro:50`); decorative SVG icons should be `aria-hidden`. Spot-check all `<img>`/SVG.
- **Focus-visible styling.** Confirm a clearly visible focus ring exists on the custom arcade
  buttons/links (hard shadows can visually compete with the default ring).
- **Tab/modal focus trapping.** Confirm the CLI dialog and mobile menu trap focus and restore
  it on close.

---

## Quick reference

| Gap | Severity | Ticket |
|-----|:--------:|:------:|
| Theme FOUC / forced dark | High | `P0-1` |
| No `prefers-reduced-motion` | High | `P0-3` |
| No skip link | Medium | `P1-2` |
| Contrast/alt/focus scan (both themes) | Medium | `P1-3` |
| Pixel-font legibility | Medium | `P2-8` (design) |

---

[← Back to index](./README.md) · Next: [04 · Architecture (FSD) →](./04-architecture-fsd.md)

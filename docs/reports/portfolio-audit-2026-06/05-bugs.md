# 05 · Bugs & Defects

[← Back to index](./README.md) · Related: [Accessibility](./03-accessibility.md) ·
[Performance/SEO](./06-performance-seo.md) · [Backlog](./08-backlog.md)

Every item here was **verified by reading the source** unless marked 📄 *documented*. Each maps
to a backlog ticket in [`08-backlog.md`](./08-backlog.md).

> ✅ **Update 2026-07-02**: BUG-1 through BUG-4 below have all been fixed — their tickets
> (`P0-1`, `P1-1`, `P1-5`, `P2-5`) are marked `✅ Merged` in [`08-backlog.md`](./08-backlog.md)
> Sprint 1/2. Kept here as a record of what the audit originally found.

---

## BUG-1 — Theme flash of incorrect color (FOUC) ✅ → `P0-1`

**Severity:** High · **Files:** `src/app/layouts/Layout.astro:148-151`,
`src/features/theme-toggle/ui/ThemeToggle.astro:75-88`

The layout's `<head>` inline script **unconditionally** forces dark mode on every page load:

```js
<script is:inline>
  // Force dark mode for high-contrast unified retro palette
  document.documentElement.classList.add('dark');
</script>
```

The theme-toggle's own script then reads `localStorage` (`getItem('theme') || 'system'`) and
re-applies the *correct* theme — but only after it executes. Because this is a **multi-page
Astro site** (full reload per navigation), a visitor who selected **Light** or **System** sees:

> dark paint → JS runs → flip to their theme — **on every single page navigation.**

So the theme toggle's "Light"/"System" options are effectively degraded to "a brief flash then
maybe correct." The head script that's *supposed* to prevent FOUC actually causes it for
non-dark users.

**Fix (official Astro pattern):** read `localStorage` in the head inline script before paint,
defaulting to your `dark` preference, and re-run on `astro:after-swap`. See full snippet in
[accessibility › A](./03-accessibility.md). Keeps dark-by-default, removes the flash.

---

## BUG-2 — Inconsistent / wasteful font loading ✅ → `P1-1`

**Severity:** Medium (perf + correctness) · **Files:** `src/app/layouts/Layout.astro:4,128-141`,
`src/app/styles/colors.css:2-3`, `package.json`

Three font mechanisms disagree:

1. Pixel fonts load from the **Google Fonts CDN** — a third-party request on the render path
   (`Layout.astro:128-141`).
2. `@fontsource-variable/onest` is **imported but unused** — `Onest` is in no token
   (`Layout.astro:4` vs `colors.css`).
3. `@fontsource/geist-sans` / `geist-mono` are **dependencies but never imported**, yet
   `--font-sans`/`--font-mono` reference `Geist` — so it never loads; text falls back to
   `JetBrains Mono`.

**Fix:** migrate to the native **Astro 6 Fonts API** (self-host + optimized fallbacks), drop
the dead deps. Full before/after in [design system › 3](./01-design-system.md).

---

## BUG-3 — Hero "Character Stats" + CTA are hardcoded English (i18n gap) ✅ → `P1-5`

**Severity:** Medium · **Files:** `src/widgets/hero/ui/Hero.astro`,
`src/shared/config/i18n/locales/en.json` / `es.json`

The hero renders **only** `t('hero.title')` through i18n (`Hero.astro:27`). Everything else is
a **hardcoded English string literal**, so the Spanish home page (`/es/`) shows English in the
hero:

- Banner: `[ SYSTEM STATUS: ACTIVE // PLAYER 1 READY ]` (`:18`)
- `CHARACTER STATS`, and all stat labels/values: `CLASS: Systems Architect`, `ALIGNMENT: Clean
  Code`, `SPECIALTIES: Java, Angular, React`, `HP / MANA: 99 / 99`, `SKILL LEVEL: Lvl. 99
  (Expert)` (`:71-115`)
- `EXPERIENCE POINTS:` / `100% COMPLETE` (`:123-124`)
- CTA `PRESS START // VIEW WORK` (`:141`)
- `LEVEL 5+ ENGINEER`, `ONLINE`, `P1: DAVID_S` (`:54-61,76`)

Some of these (gaming labels like `ONLINE`, `P1: DAVID_S`) are arguably intentional thematic
constants. But the **CTA** and **stat values** should be translatable.

**Compounding it — dead translation keys:** `hero.subtitle`, `hero.intro`, `hero.description`,
`hero.credential`, `hero.available`, and most of `hero.cta.*` are **defined in `en.json`/`es.json`
but never rendered** by `Hero.astro`. This is drift between the dictionaries and the component:
good copy exists but isn't shown, and hardcoded copy is shown but isn't translated.

**Fix:** route the CTA + stat values through `t()`; either render the unused `hero.*` keys (see
[UI/UX › 1](./02-ui-ux.md), recommended) or remove them to stop the drift.

---

## BUG-4 — Status color not using design tokens ✅ → `P2-5`

**Severity:** Low (consistency) · **File:** `src/widgets/hero/ui/Hero.astro:76`

The "ONLINE" badge uses Tailwind's default `bg-emerald-500` instead of the project's
`--color-success-500` (`#00e676`). Minor, but it bypasses the single-sourced palette. Audit for
other raw Tailwind color utilities that should be tokens.

---

## Performance / SEO defects (see dedicated file)

These are real but live in [`06-performance-seo.md`](./06-performance-seo.md):

- **PERF-1** ✅ Re-measured (`P0-2` merged) — production FCP is **1.1s**. The original 12.3s
  figure came from `docs/INFRASTRUCTURE_AUDIT.md`, which has since been removed from the repo;
  it was a dev-server measurement, not production. → `P0-2`
- **PERF-2** ✅ Third-party Google Fonts on the render path (same root as BUG-2). → `P1-1`
- **SEO-1** ✅ No `hreflang` alternate links emitted (`prefixDefaultLocale: false` does not
  auto-generate them). → `P2-4`

---

## ✅ Debunked — NOT a bug

> **Claim (from an automated pass):** "The Spanish about/research pages show English content
> because they hardcode `Language.ENGLISH`."

**This is false.** Verified directly:

| File | Actual content |
|------|----------------|
| `src/pages/about.astro:6` | `<AboutContent lang={Language.ENGLISH} />` ✅ correct (EN page) |
| `src/pages/es/about.astro:6` | `<AboutContent lang={Language.SPANISH} />` ✅ correct (ES page) |
| `src/pages/es/research.astro:6` | `<ResearchContent lang={Language.SPANISH} … />` ✅ correct |

The page-level i18n binding for about/research is correct. The **real** i18n gap is BUG-3 (the
hero), not these pages. Recorded here so the false alarm doesn't get re-filed.

---

## Bug → ticket index

| Bug | Severity | Ticket |
|-----|:--------:|:------:|
| BUG-1 Theme FOUC | High | `P0-1` |
| BUG-2 Font loading | Medium | `P1-1` |
| BUG-3 Hero i18n gap + dead keys | Medium | `P1-5` |
| BUG-4 Status not tokenized | Low | `P2-5` |
| PERF-1 FCP (re-measure) | High 📄 | `P0-2` |
| SEO-1 No hreflang | Low | `P2-4` |

---

[← Back to index](./README.md) · Next: [06 · Performance & SEO →](./06-performance-seo.md)

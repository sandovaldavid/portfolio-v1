# 08 · Prioritized Backlog — The Executable Plan

[← Back to index](./README.md) · Sources: [Bugs](./05-bugs.md) ·
[Accessibility](./03-accessibility.md) · [Performance/SEO](./06-performance-seo.md) ·
[Design](./01-design-system.md) · [Architecture](./04-architecture-fsd.md) ·
[UI/UX](./02-ui-ux.md) · [Testing](./07-testing.md)

Ticket-ready items with stable IDs (referenced from the topic files). **No code has been
changed** — this is the to-do list if/when implementation is approved.

**Priority:** P0 = do first (blocker / highest leverage) → P3 = nice-to-have.
**Effort:** S ≤ 1h · M ≤ half-day · L ≥ 1 day.

---

## P0 — Blockers & highest leverage

| ID | Title | Effort | Files | Acceptance criteria |
|----|-------|:------:|-------|---------------------|
| **P0-1** | Fix theme FOUC (read `localStorage` before paint) | S | `src/app/layouts/Layout.astro:148-151` | Selecting Light/System persists with **no dark flash** on navigation; dark remains the default when nothing is saved; works with `astro:after-swap`. |
| **P0-2** | Re-measure performance, then triage | M | `.lighthouserc.json`, build | Fresh Lighthouse run on `/` and `/es/` recorded (FCP/LCP/TBT/CLS); `INFRASTRUCTURE_AUDIT.md` updated with current numbers; a follow-up ticket opened for any metric below target. |
| **P0-3** | Add `prefers-reduced-motion` support | S | `src/app/styles/global.css` (+ optionally View Transitions) | With reduced-motion on, pulsing/glitch/blob/typing/CRT animations are suppressed or near-instant; verified via DevTools emulation. |

---

## P1 — High impact

| ID | Title | Effort | Files | Acceptance criteria |
|----|-------|:------:|-------|---------------------|
| **P1-1** | Migrate to native Astro 6 Fonts API + remove dead deps | M | `astro.config.mjs`, `src/app/layouts/Layout.astro:4,128-141`, `package.json` | Pixel/mono fonts self-hosted via `fonts` + `<Font />`; Google Fonts `<link>` removed; unused `@fontsource-variable/onest` and dead `@fontsource/geist-*` removed (or wired to a token); no visual regression; CLS not worse. |
| **P1-2** | Add skip-to-content link | S | `src/app/layouts/Layout.astro:155-158` | First Tab focus reveals a visible "Skip to main content" link that jumps to `#main-content`. |
| **P1-3** | Accessibility & contrast scan (both themes) | M | tests + styles | axe/Lighthouse a11y run on `/`, `/es/`, `/projects`, `/research` in **light and dark**; results recorded; any AA contrast failure fixed or ticketed; image alt text + focus-visible audited. |
| **P1-4** | Close big-tech content gap | M | `src/shared/config/i18n/locales/{en,es}.json`, relevant widgets | Added signals for **scale**, **system-design decisions**, and **collaboration/leadership** where true; ≥1 `vision.*` item links to real proof; remaining "Coming Soon" items hidden (no dead `#` links). |
| **P1-5** | Hero i18n: translate CTA + stats; resolve dead keys | M | `src/widgets/hero/ui/Hero.astro`, `locales/{en,es}.json` | Hero CTA and stat values render via `t()` (Spanish on `/es/`); unused `hero.subtitle`/`intro`/`description`/`credential`/`available`/`cta.*` either rendered (preferred) or removed; no English leakage on `/es/`. |

---

## P2 — Medium / consistency

| ID | Title | Effort | Files | Acceptance criteria |
|----|-------|:------:|-------|---------------------|
| **P2-1** | Replace `@/` with explicit layer aliases (+ lint rule) | M | ~22 imports (see [04](./04-architecture-fsd.md)) | No `@/<layer>` imports remain; an ESLint `no-restricted-imports` rule fails the build on reintroduction. |
| **P2-2** | Rename 3 components to PascalCase | S | `shared/ui/{avatar,badge,social-pill}/*.astro` + their `index.ts` | Files are `Avatar.astro`/`Badge.astro`/`SocialPill.astro`; barrels updated; build green. |
| **P2-3** | Wrap loose widgets into slices | S | `src/widgets/{AboutContent,ResearchContent}.astro` | Each lives in `widgets/<slice>/ui/*.astro` with an `index.ts`; importers updated; or a documented decision to keep them loose. |
| **P2-4** | Emit `hreflang` alternates | S | `src/app/layouts/Layout.astro` (head) | `<link rel="alternate" hreflang>` for en/es + `x-default` rendered per page using `getAbsoluteLocaleUrlList()`; validated in built HTML. |
| **P2-5** | Route status colors through tokens | S | `src/widgets/hero/ui/Hero.astro:76` (+ audit) | "ONLINE" badge uses `--color-success-500`; no raw Tailwind status colors where a token exists. |
| **P2-6** | Adopt View Transitions (`<ClientRouter />`) | L | `Layout.astro`, all load-time scripts | SPA-style navigation enabled with a theme-appropriate transition; CLI/splash/theme/header scripts migrated to `astro:page-load`/`astro:after-swap` and verified to re-init; reduced-motion respected automatically. |
| **P2-7** | Automated a11y tests in CI | M | `tests/e2e`, deps | `@axe-core/playwright` runs on key pages in both themes; CI fails on new serious violations. |
| **P2-8** | Pixel-font readability rule | S | `src/app/styles/global.css` | Long-form/functional text renders ≥14px in a legible mono; pixel fonts reserved for display/labels; retro look preserved. |

---

## P3 — Nice-to-have / level-up

| ID | Title | Effort | Files | Acceptance criteria |
|----|-------|:------:|-------|---------------------|
| **P3-1** | Project case-study ("boss-fight") pages | L | new `pages/` + slice | At least one project has a problem→approach→trade-offs→outcome page, linked from its card. |
| **P3-2** | Technical blog / devlog | L | new route/content collection | `vision.writing` resolves to a real post (e.g. the Zoneless migration); indexable; linked from nav. |
| **P3-3** | Component + visual-regression tests | M | `tests/` | Container-API unit tests for Hero/Header/ProjectCard; Playwright screenshot baselines for key sections. |
| **P3-4** | Configure `security.csp` | M | `astro.config.mjs` | CSP `<meta>`/headers generated; inline scripts (theme/JSON-LD) hashed; self-hosted fonts keep the policy tight; no console CSP violations. |
| **P3-5** | Enable experimental `svgoOptimizer()` | S | `astro.config.mjs` | SVG icon components optimized at build; bundle size reduced; no visual regression. |
| **P3-6** | Extra structured data | S | `Layout.astro`, research/projects pages | `BreadcrumbList` on listing pages; `ScholarlyArticle`/`Article` JSON-LD on the research page; validates in Rich Results test. |
| **P3-7** | Tokenize spacing/shadow scales + résumé/print mode | M | `src/app/styles/*` | Retro shadow/spacing promoted to tokens; a print/résumé stylesheet gives recruiters a clean, legible summary. |

---

## Implementation status

### Sprint 1 — ✅ Complete (June 27, 2026)

| ID | Title | PR | Status |
|----|-------|----|:------:|
| P0-1 | Fix theme FOUC | [#41](https://github.com/sandovaldavid/portfolio-v1/pull/41) | ✅ Merged |
| P0-3 | Add prefers-reduced-motion | [#42](https://github.com/sandovaldavid/portfolio-v1/pull/42) | ✅ Merged |
| P0-2 | Re-measure performance | [#45](https://github.com/sandovaldavid/portfolio-v1/pull/45) | ✅ Merged |
| P1-2 | Skip-to-content link | [#43](https://github.com/sandovaldavid/portfolio-v1/pull/43) | ✅ Merged |
| P2-5 | Status colors to tokens | [#44](https://github.com/sandovaldavid/portfolio-v1/pull/44) | ✅ Merged |

### Sprint 2 — ✅ Complete (June 27, 2026)

| ID | Title | PR | Status |
|----|-------|----|:------:|
| P1-1 | Astro 6 Fonts API | [#49](https://github.com/sandovaldavid/portfolio-v1/pull/49) | ✅ Merged |
| P1-5 | Hero i18n: CTA + stats | [#50](https://github.com/sandovaldavid/portfolio-v1/pull/50) | ✅ Merged |
| P1-4 | Big-tech content gap | [#52](https://github.com/sandovaldavid/portfolio-v1/pull/52) | ✅ Merged |
| P2-1/2/3/4 | FSD cleanup + hreflang | [#51](https://github.com/sandovaldavid/portfolio-v1/pull/51) | ✅ Merged |
| P1-3 | A11y scan (axe-core) | [#53](https://github.com/sandovaldavid/portfolio-v1/pull/53) | ✅ Merged |

### Sprint 3 — ✅ Complete

| ID | Title | PR | Status |
|----|-------|----|:------:|
| P2-6 | View Transitions (`<ClientRouter />`) | [#56](https://github.com/sandovaldavid/portfolio-v1/pull/56) | ✅ Merged |
| P2-7 | Automated a11y tests in CI | [#57](https://github.com/sandovaldavid/portfolio-v1/pull/57) | ✅ Merged |
| P2-8 | Pixel-font readability rule | [#55](https://github.com/sandovaldavid/portfolio-v1/pull/55) | ✅ Merged |
| P3-3 | Component + visual-regression tests | [#58](https://github.com/sandovaldavid/portfolio-v1/pull/58) | ✅ Merged |

### Backlog — P3 polish

| ID | Title | Status |
|----|-------|:------:|
| P3-1 | Project case-study ("boss-fight") pages | ✅ Merged (#64) |
| P3-2 | Technical blog / devlog | ✅ Merged |
| P3-4 | Configure `security.csp` | ❌ Cancelled — incompatible with Astro `<ClientRouter />` (View Transitions); see the devlog entry for this decision |
| P3-5 | Enable experimental `svgoOptimizer()` | ✅ Merged (#62) |
| P3-6 | Extra structured data | ✅ Merged (#62) |
| P3-7 | Tokenize spacing/shadow scales + résumé/print mode | ✅ Merged (#63) |

> Updated 2026-07-02: this section originally listed the above as "Planned"/"Future" — cross-checked
> against `git log` and all items except `P3-4` (explicitly cancelled) have since shipped.

---

> Each P0/P1 bug here maps back to a verified finding in [05-bugs.md](./05-bugs.md) /
> [03-accessibility.md](./03-accessibility.md). PERF-1 (`P0-2`) was re-measured —
> production FCP is 1.1s, the 12.3s figure was a dev-server measurement.

---

[← Back to index](./README.md) · Next: [09 · Ideas →](./09-ideas-level-up.md)

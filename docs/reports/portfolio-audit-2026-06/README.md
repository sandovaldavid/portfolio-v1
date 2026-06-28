# Portfolio Audit — June 2026

> Comprehensive review of the **devsandoval.me** portfolio: design system, UI/UX,
> accessibility, FSD architecture, bugs, performance/SEO, testing, and a prioritized,
> ticket-ready backlog — all aimed at taking the portfolio to a level that lands interviews
> at large software companies, **while preserving the pixel-art retro-gaming identity**.

- **Audited build:** Astro `^6.4.8` · Tailwind CSS `^4.3.1` · TypeScript `5.9.3` · Bun
- **Date:** 2026-06-27
- **Scope:** Analysis only (no code changes). Recommendations cite the official Astro 6 docs.
- **Owner goal:** Software Engineer targeting big-tech / large product companies.

---

## How to read this report

This audit is split into focused files. Start here, then jump to the area you care about.

| # | File | What it covers |
|---|------|----------------|
| — | [`README.md`](./README.md) | This index, executive summary, scoreboard, top priorities |
| 01 | [`01-design-system.md`](./01-design-system.md) | Color tokens, palette, contrast, typography, fonts, pixel-art theming |
| 02 | [`02-ui-ux.md`](./02-ui-ux.md) | Recruiter first impression, content & FAANG-readiness, information architecture |
| 03 | [`03-accessibility.md`](./03-accessibility.md) | A11y audit — theme flash, skip link, reduced motion, contrast, ARIA |
| 04 | [`04-architecture-fsd.md`](./04-architecture-fsd.md) | Feature-Sliced Design compliance review |
| 05 | [`05-bugs.md`](./05-bugs.md) | Verified bugs & defects (+ one debunked false alarm) |
| 06 | [`06-performance-seo.md`](./06-performance-seo.md) | Performance & SEO + Astro-6-native levers |
| 07 | [`07-testing.md`](./07-testing.md) | Testing coverage gaps |
| 08 | [`08-backlog.md`](./08-backlog.md) | **Prioritized, ticket-ready backlog (the executable plan)** |
| 09 | [`09-ideas-level-up.md`](./09-ideas-level-up.md) | Theme-preserving feature ideas + file-reference appendix |

**Evidence convention used throughout:**
- ✅ **Verified** — confirmed by reading the source file (path:line given).
- 📄 **Documented** — taken from existing project docs (e.g. `INFRASTRUCTURE_AUDIT.md`);
  **needs re-measurement** before being treated as current truth.
- 💡 **Recommendation** — grounded in the official Astro 6 docs where a framework feature applies.

---

## Executive summary

This is a **genuinely distinctive portfolio**. The pixel-art retro-gaming theme is executed
with real craft and consistency — CRT scanlines, a boot/splash sequence, an interactive CLI
terminal with vim keybindings, a "Character Stats" hero, and a RecruiterHUD. The engineering
fundamentals are strong too: strict Feature-Sliced Design with near-perfect layer compliance,
complete EN/ES translation dictionaries, rich SEO metadata (OpenGraph, Twitter, JSON-LD), and
a zero-framework-JS approach that aligns with Astro's islands philosophy.

It is **not yet** at "production-grade big-tech showcase" level, and the gap is small and
specific. The blockers cluster into a handful of high-leverage fixes: a **theme flash-of-wrong-
color (FOUC)** on every navigation, a **messy font-loading setup** that depends on a
third-party CDN on the render path, **no `prefers-reduced-motion` support**, a **partially
hardcoded-English hero** that undercuts the otherwise-excellent i18n, and a **documented (but
needs-re-measuring) performance concern**. None of these require rethinking the design — they
are surgical.

**Is this big-tech ready?** *Almost.* The personality and architecture already stand out from
the typical web-dev portfolio. Close the P0/P1 backlog items (theme FOUC, fonts API migration,
reduced-motion, a fresh Lighthouse pass, and a few content additions on scale/leadership) and
this becomes a portfolio that a recruiter remembers **and** that survives an engineer's
scrutiny.

---

## Maturity scoreboard

Grades are this audit's synthesis (A best → F). "Performance" is graded from existing docs and
**must be re-measured** before being trusted.

| Dimension | Grade | One-line verdict |
|-----------|:-----:|------------------|
| Design system | **A−** | Cohesive, characterful retro token system; minor token/contrast/font-config cleanups |
| UI / UX | **A−** | Memorable and interactive; a few information-architecture gaps |
| Accessibility | **B** | Strong ARIA + keyboard nav; theme FOUC, no skip link, no reduced-motion |
| Architecture (FSD) | **A−** | Near-perfect layer compliance; cosmetic alias/naming/loose-widget issues |
| Internationalization | **B+** | Parallel EN/ES dictionaries; hero hardcoded-English + dead keys + no hreflang |
| Performance | **C** 📄 | Documented FCP concern + third-party fonts + heavy CLI script — **re-measure** |
| SEO | **A−** | Rich meta/OG/JSON-LD; missing hreflang, breadcrumbs, article schema |
| Testing | **C−** 📄 | Minimal coverage; i18n unit tests + smoke E2E only |
| Content / FAANG-readiness | **B** | Quantified experience + credible research; missing scale & leadership signals |
| **Overall** | **B+** | Distinctive and well-architected; a small, specific backlog from production-grade |

---

## Top 5 priorities

These are the highest-leverage moves. Full details and acceptance criteria in
[`08-backlog.md`](./08-backlog.md).

1. **Fix the theme flash (FOUC).** `Layout.astro` force-adds `dark` on every load; the toggle
   only corrects afterward → a visible flash for light/system users on every page nav. Use
   Astro's documented `is:inline` + `astro:after-swap` pattern. → `P0-1`
2. **Re-measure performance, then fix what's real.** The 12.3s FCP figure is documented, not
   freshly measured. Run a current Lighthouse pass; the likely culprits (third-party fonts,
   splash overlay, heavy CLI script) are already identified. → `P0-2`
3. **Migrate fonts to the native Astro 6 Fonts API.** Self-host the pixel fonts (today loaded
   from Google Fonts CDN), kill the dead `@fontsource`/Onest mismatch, and get optimized
   fallbacks that reduce layout shift. → `P1-1`
4. **Add `prefers-reduced-motion` support.** Pulsing, glitch, blob, CRT and typing animations
   run unconditionally — an accessibility gap and a comfort issue. → `P0-3`
5. **Close the content gap for big-tech.** The experience bullets already quantify impact;
   add signals of **scale**, **system design**, and **collaboration/leadership**, and finish
   (or hide) the "Coming Soon" Vision items. → `P1-4`

---

## What's genuinely excellent (don't touch)

- The **retro design language** is consistent and tasteful: `light-dark()` semantic tokens,
  blocky `rounded-none` + offset hard shadows, CRT scanlines, custom pixel scrollbars.
- The **CLI terminal** and **splash boot screen** are memorable, accessible (dialog roles,
  `aria-live`), and i18n-aware — a real differentiator.
- **FSD architecture** is applied with discipline: no layer-direction, deep-import, or
  circular-dependency violations.
- **Research depth**: the BiLSTM thesis content (architecture, pipeline, metrics) reads like a
  real engineer, not a template.

---

---

## Implementation Status (updated 2026-06-27)

### Sprint 1 — Completed ✅

| ID | Title | PR | Status |
|----|-------|----|:------:|
| P0-1 | Fix theme FOUC | [#41](https://github.com/sandovaldavid/portfolio-v1/pull/41) | ✅ Merged |
| P0-3 | Add prefers-reduced-motion | [#42](https://github.com/sandovaldavid/portfolio-v1/pull/42) | ✅ Merged |
| P0-2 | Re-measure performance | [#45](https://github.com/sandovaldavid/portfolio-v1/pull/45) | ✅ Merged |
| P1-2 | Skip-to-content link | [#43](https://github.com/sandovaldavid/portfolio-v1/pull/43) | ✅ Merged |
| P2-5 | Status colors to tokens | [#44](https://github.com/sandovaldavid/portfolio-v1/pull/44) | ✅ Merged |

**Performance re-measurement:** FCP 1.1s · LCP 1.4-2.1s · TBT 0ms · CLS 0.005-0.042. The 12.3s figure was dev-server only.

### Sprint 2 — Completed ✅

| ID | Title | PR | Status |
|----|-------|----|:------:|
| P1-1 | Astro 6 Fonts API migration | [#49](https://github.com/sandovaldavid/portfolio-v1/pull/49) | ✅ Merged |
| P1-5 | Hero i18n: translate CTA + stats | [#50](https://github.com/sandovaldavid/portfolio-v1/pull/50) | ✅ Merged |
| P1-4 | Big-tech content gap | [#52](https://github.com/sandovaldavid/portfolio-v1/pull/52) | ✅ Merged |
| P2-1 | Replace @/ with explicit aliases | [#51](https://github.com/sandovaldavid/portfolio-v1/pull/51) | ✅ Merged |
| P2-2 | PascalCase component rename | [#51](https://github.com/sandovaldavid/portfolio-v1/pull/51) | ✅ Merged |
| P2-3 | Wrap loose widgets | [#51](https://github.com/sandovaldavid/portfolio-v1/pull/51) | ✅ Merged |
| P2-4 | Emit hreflang alternates | [#51](https://github.com/sandovaldavid/portfolio-v1/pull/51) | ✅ Merged |
| P1-3 | Accessibility & contrast scan | [#53](https://github.com/sandovaldavid/portfolio-v1/pull/53) | 🔄 PR Open |

### Sprint 3 — Planned

| ID | Title |
|----|-------|
| P2-6 | View Transitions (ClientRouter) |
| P2-7 | Automated a11y tests in CI |
| P2-8 | Pixel-font readability rule |
| P3-3 | Component + visual-regression tests |

### Backlog (P3) — Future

| ID | Title |
|----|-------|
| P3-1 | Project case-study pages |
| P3-2 | Technical devlog |
| P3-4 | Configure CSP |
| P3-5 | SVG optimizer (svgoOptimizer) |
| P3-6 | Structured data enhancements |
| P3-7 | Tokenize spacing/shadow + resume/print mode |
| P3-6 | Structured data enhancements |
| P3-7 | Tokenize spacing/shadow + resume/print mode |

---

*Generated by an automated code/UX audit. Findings marked ✅ were verified against source;
findings marked 📄 come from existing project docs and should be re-measured.*

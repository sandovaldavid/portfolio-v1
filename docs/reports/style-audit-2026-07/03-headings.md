# 03 · Headings — Missing h1, Size Inversions, Wrong Levels

[← Back to index](./README.md) · Related: [`01-typography.md`](./01-typography.md) ·
Standard: [`../../STYLE-GUIDE.md`](../../STYLE-GUIDE.md)

**Overall: C−.** The home page has a correct h1 → h2 → h3 outline, but every sub-page opens at
`h2` with no `h1` anywhere in the document, one widget renders `h2` headings at body-text size,
and card titles use the wrong level. `CLAUDE.md` (Accessibility Requirements) already mandates
"Maintain heading hierarchy" — these are violations of an existing rule, now made precise.

All findings ✅ verified at base commit `4dba60c`.

---

## 1. Sub-pages have no `h1` (High severity — a11y + SEO)

The only `h1` in the codebase is the Hero name (`src/widgets/hero/ui/Hero.astro:29`), which
renders on the home page only. Every other page's top heading is an `h2`:

| Page (EN + ES mirror) | Top heading today | Fix |
|---|---|---|
| `src/pages/projects.astro:14` | `<h2>` "Projects Catalog" | promote to `h1` |
| `src/widgets/about-content/ui/AboutContent.astro:40` (used by about pages) | `<h2>`, then jumps to `h3:83` | promote to `h1` |
| `src/pages/skills.astro` | `<h2>` via widget | promote top heading to `h1` |
| `src/pages/atena.astro` + `es/atena.astro` | `<h2>` | promote to `h1` |
| `src/pages/blog.astro`, `devlog.astro`, `research.astro` (+ `es/` mirrors) | `<h2>` / widget heading | promote top heading to `h1` |

**Rule (STYLE-GUIDE):** exactly **one `h1` per page**, and it is the page title. Section
headings below it are `h2`, nested blocks `h3`, with no skipped levels.

## 2. Heading rendered at body size (visual inversion)

`src/widgets/research-content/ui/ResearchContent.astro:96,108,120,156,177` — the panel
headings are `<h2 class="… text-sm sm:text-base …">` while the paragraphs they label are
`text-sm` (lines 100, 112, 124, 182). At the mobile breakpoint, heading and body are both
**14px** — the heading is distinguished only by weight/color, violating "heading ≥ its body".

**Fix:** `text-sm sm:text-base` → `text-xl sm:text-2xl` (h2 role per scale), body `text-sm` →
`text-base` (see [`01-typography.md`](./01-typography.md) §3.1).

## 3. Card titles at the wrong level

`src/widgets/blog/ui/BlogCard.astro:44` and `src/widgets/devlog/ui/DevlogCard.astro:49` render
card titles as `<h2 class="text-xl">`. These cards appear under a page-level `h2` (`text-4xl`)
on the list pages — two `h2` populations 2.25rem apart, and once the page heading becomes `h1`
(§1) the card level sits directly under it misleadingly.

**Fix:** demote to `h3` (keep `text-xl`, which matches the h3 slot in the scale). After the §1
promotions, verify no page outline skips a level (h1 → h3).

## 4. Correct today (reference)

- Home outline: `h1` Hero (`text-4xl sm:text-6xl lg:text-7xl`) → `h2` section titles via
  `TitleSection.astro` (`text-4xl`) → `h3` card/item titles (`text-2xl`–`text-3xl`). ✅
- Global heading styling (`global.css:12-20`) sets font/tracking/case only — **no sizes** —
  so tag promotions/demotions are visually safe: the size utility stays on the element.

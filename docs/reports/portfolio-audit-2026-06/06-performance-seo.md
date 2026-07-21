# 06 · Performance & SEO

[← Back to index](./README.md) · Related: [Design system](./01-design-system.md) ·
[Bugs](./05-bugs.md) · [Backlog](./08-backlog.md)

The Astro + islands foundation is good for performance, and SEO metadata is already rich. The
work here is (a) **re-measure** the documented performance regression before acting, and (b)
turn on Astro 6 features the project isn't using yet.

---

## Performance

### PERF-1 — The 12.3s FCP figure was documented, not measured ✅ Resolved → `P0-2`

`docs/INFRASTRUCTURE_AUDIT.md` (since removed from the repo) graded performance ~2/10 and cited
**FCP ≈ 12.3s** (target 1.8s) — a documented number, not a fresh measurement of the current
build.

✅ **Update 2026-07-02**: re-measured as part of `P0-2` (merged, PR #45). Production numbers:
**FCP 1.1s · LCP 1.4-2.1s · TBT 0ms · CLS 0.005-0.042.** The 12.3s figure was a dev-server-only
measurement and does not reflect the production build.

### PERF-2 — Third-party fonts on the render path ✅ → `P1-1`

The pixel fonts load from `fonts.googleapis.com` / `fonts.gstatic.com`
(`Layout.astro:128-141`). Even with `preconnect` + `preload`, this adds a cross-origin,
render-blocking dependency and a privacy/CSP footprint. **Self-hosting via the native Astro 6
Fonts API** (see [design system › 3](./01-design-system.md)) removes the third-party hop and
adds optimized fallbacks that cut **CLS**. Same root cause as BUG-2.

### PERF-3 — Heavy client script (CLI terminal) ✅ 💡

`features/cli-terminal/ui/CLITerminal.astro` is ~1327 lines and ships on every page via the
layout. Astro bundles `<script>` automatically, but this is the largest JS payload on the site.

💡 **Options:**
- Keep zero-framework (good), but **lazy-init** the terminal — attach the global key listener
  immediately, and only build/parse the heavy command engine on first activation (`:`).
- Confirm the splash + RecruiterHUD + CLI scripts aren't doing layout-affecting work before
  first paint.
- Use the bundle visualizer already configured (`rollup-plugin-visualizer` →
  `dist/bundle-analysis/index.html`, `astro.config.mjs:14`; `bun run bundle:analyze`) to confirm
  per-route JS size.

### PERF-4 — Splash overlay & perceived load 💡

The splash boot screen is gated to once-per-session (good), but on the first visit it overlays
the home page. Confirm it isn't delaying LCP for the **first** (often the recruiter's) visit —
measure with and without `sessionStorage.pf_booted` set.

### PERF-5 — Optional: experimental SVG optimization (Astro 6.2+) 💡

The site uses many `.astro` SVG icon components (`@assets/icons/*`). Astro 6.2+ offers build-time
SVG optimization via `svgoOptimizer()` (
[docs](https://docs.astro.build/en/reference/experimental-flags/svg-optimization/)):
```js
import { defineConfig, svgoOptimizer } from 'astro/config';
export default defineConfig({ experimental: { svgOptimizer: svgoOptimizer() } });
```
No runtime cost; smaller assets in the production build. Nice-to-have.

---

## SEO

### Strengths ✅

- Per-page `title`/`description`, `keywords`, `author`, `robots`, and **canonical** URL
  (`Layout.astro:91-97`).
- **OpenGraph** (type/title/description/image 1200×630/url/locale) + **Twitter** summary card
  (`:107-125`).
- **JSON-LD**: `Person` (with `sameAs`, `jobTitle`, `worksFor`, `knowsAbout`) + `WebSite`
  (`:47-82`).
- `astro-robots-txt` integration generates `robots.txt` (+ sitemap).
- Favicon, web manifest, theme-color, apple-mobile meta present.

### SEO-1 — No `hreflang` alternate links ✅ → `P2-4`

With `i18n.routing.prefixDefaultLocale: false` (`astro.config.mjs:19-21`), Astro does **not**
auto-emit `<link rel="alternate" hreflang>` tags. For a bilingual site this weakens
international SEO (search engines can't pair en ↔ es).

💡 **Fix (official helper):** emit them in the Layout `<head>` using `astro:i18n`
([docs: internationalization](https://docs.astro.build/en/guides/internationalization/)):
```astro
---
import { getAbsoluteLocaleUrlList } from 'astro:i18n';
const alternates = getAbsoluteLocaleUrlList(Astro.url.pathname);
---
{alternates.map(({ locale, url }) => (
  <link rel="alternate" hreflang={locale} href={url} />
))}
<link rel="alternate" hreflang="x-default" href={/* default-locale URL */} />
```
(You can keep your `@shared/lib/i18n` helpers for everything else; this just uses the built-in
for the URL list.)

### SEO-2 — Missing structured-data opportunities 💡

- **`BreadcrumbList`** on `/projects`, `/research`, etc.
- **`ScholarlyArticle`** (or `Article`) JSON-LD on the research page — the BiLSTM thesis is
  exactly the kind of content that benefits, and it reinforces the research credential.
- Verify `og:image` resolves for non-home pages (the `img_preview` prop) and that each page
  passes a meaningful one.

### SEO-3 — Verify generated artifacts 💡

After build, confirm `dist/robots.txt` and the sitemap exist and list both locales, and that
canonical/OG URLs use the production origin consistently (note: `astro.config.mjs:11` `site` is
`https://sandovaldavid.com` while the live site is `devsandoval.me` — confirm which is canonical
and that `siteConfig.url` agrees, or canonicals/OG will point to the wrong host).

---

## Astro-6 levers summary

| Lever | Benefit | Ticket | Status |
|-------|---------|:------:|:------:|
| Native Fonts API (self-host) | Removes 3rd-party render-path dep; optimized fallbacks (↓CLS) | `P1-1` | ✅ Merged |
| `<ClientRouter />` View Transitions | SPA-feel nav + **auto** reduced-motion; CRT-wipe theme fit | `P2-6` | ✅ Merged (#56) |
| `security.csp` | Addresses documented security gap; easier after self-hosting fonts | `P3-4` | ❌ Cancelled — incompatible with `<ClientRouter />` |
| `svgoOptimizer()` (exp.) | Smaller SVG assets, no runtime cost | `P3-5` | ✅ Merged (#62) |
| `getAbsoluteLocaleUrlList()` | Correct hreflang for bilingual SEO | `P2-4` | ✅ Merged (#51) |

> ⚠️ Adopting `<ClientRouter />` requires migrating load-time scripts (CLI, splash, theme,
> header `IntersectionObserver`) to `astro:page-load` / `astro:after-swap`, or they won't
> re-init after client-side navigation. Plan it as its own task.

---

[← Back to index](./README.md) · Next: [07 · Testing →](./07-testing.md)

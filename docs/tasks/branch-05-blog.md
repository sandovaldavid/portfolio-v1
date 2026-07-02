# Branch: feat/blog

**Base**: `origin/develop`
**Prefix**: `feat/`
**Priority**: Medium
**Why**: The portfolio has no blog — articles are the missing content pillar behind the "Documenting my journey" claim. A native MDX blog on the own domain drives SEO to `sandovaldavid.com` (not a third party), reuses the existing i18n routing and the already-`article`-ready `Layout.astro`, and exposes an RSS feed that powers the GitHub profile README widget. Recommended over Medium, which would siphon SEO and audience to `medium.com`; Medium/dev.to remain optional cross-post targets (with `canonical_url` back to the site) for reach only.

> Architecture note: the blog is a **new FSD slice**, separate from `devlog` (which stays a version-keyed changelog). Unlike `devlog` — whose content lives as plain-text i18n keys in `en.json`/`es.json` — the blog stores real Markdown/MDX in an Astro **content collection**, so articles are authored as files, not translation strings.

---

## Task 5.1 — Install and configure blog dependencies

**Scope**: `package.json`, `astro.config.mjs`, `src/app/styles/`
**Action**: Add the MDX pipeline, RSS, sitemap, and Tailwind typography (none are currently installed), and wire them into Astro.

### Checklist

- [ ] `bun add @astrojs/mdx @astrojs/rss @astrojs/sitemap`
- [ ] `bun add -d @tailwindcss/typography` (for rendering Markdown bodies with `.prose`)
- [ ] Register integrations in `astro.config.mjs` `integrations: []` (currently only `robotsTxt()`):
  - [ ] `mdx()` and `sitemap()` (keep `robotsTxt()`)
- [ ] Enable the typography plugin the Tailwind v4 way (CSS-first — there is **no** `tailwind.config.*`): add `@plugin "@tailwindcss/typography";` to `src/app/styles/global.css`
- [ ] Confirm `site: 'https://sandovaldavid.com'` remains set (RSS/sitemap depend on it)
- [ ] `bun run build` still passes; `bunx vercel build` unaffected

### Acceptance Criteria

- `bun install` is reproducible with the updated `bun.lock`
- MDX files build; `.prose` classes actually render styled Markdown (verify against `DevlogDetail.astro`'s existing `.prose prose-neutral dark:prose-invert` usage)

---

## Task 5.2 — Define the blog content collection

**Scope**: `src/content.config.ts`, `src/content/blog/`
**Action**: Create a single `blog` collection using the Astro Content Layer `glob()` loader, organized by locale via subfolders to match the EN-root / ES-prefixed routing.

### Checklist

- [ ] Create `src/content.config.ts` (Astro 5/6 location — repo root of `src/`, not `src/content/config.ts`)
- [ ] Define the `blog` collection with a `glob()` loader over `src/content/blog/**/*.{md,mdx}`
- [ ] Derive locale from the folder (`en/` vs `es/`) so a post's language is unambiguous
- [ ] Author folders: `src/content/blog/en/` and `src/content/blog/es/`
- [ ] Schema follows the existing `ProjectItem` / `DevlogPost` conventions (typed, minimal), but as **frontmatter** instead of i18n keys

### Template — collection schema

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),        // used for <meta> + RSS + card summary
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      heroImage: image().optional(),  // matches how entities/project attaches ImageMetadata
      draft: z.boolean().default(false),
      canonicalUrl: z.string().url().optional(), // for cross-posted originals
    }),
});

export const collections = { blog };
```

### Acceptance Criteria

- `getCollection('blog')` type-checks with `bun run astro check`
- A post placed under `en/` vs `es/` is resolvable to its locale from its `id`

---

## Task 5.3 — Create the `blog` entity slice

**Scope**: `src/entities/blog/`
**Action**: Wrap the content collection in query helpers, mirroring the `entities/devlog` slice structure (`model/` + barrels). Entities may import `shared` only (FSD rule).

### Checklist

- [ ] `src/entities/blog/model/types.ts` — re-export/derive the post type from the collection (`CollectionEntry<'blog'>`) plus a resolved `BlogPostMeta` for cards
- [ ] `src/entities/blog/model/queries.ts`:
  - [ ] `getBlogPosts(lang)` — collection filtered by locale folder, `draft:false` in prod, sorted by `pubDate` desc
  - [ ] `getBlogPost(lang, slug)` — single entry or `undefined`
  - [ ] Helper to strip the `en/`|`es/` prefix so slugs map cleanly to routes
- [ ] `src/entities/blog/index.ts` barrel re-exports the public API (mirror `entities/devlog/index.ts`)
- [ ] Respect path aliases (`@entities/*`, `@shared/*`) from `tsconfig.json`

### Acceptance Criteria

- Query helpers hide the folder-based locale scheme from callers (pages just ask for `lang`)
- Drafts never appear in production builds

---

## Task 5.4 — Create the `blog` widget slice

**Scope**: `src/widgets/blog/`, `src/widgets/index.ts`
**Action**: Build the list card and the article detail view in the existing neobrutalist / retro-gaming visual language, reusing `shared/ui` primitives. Register them in the central widgets barrel.

### Checklist

- [ ] `src/widgets/blog/ui/BlogCard.astro` — props `post`, `readMoreText`, `readMoreLink` (mirror `DevlogCard.astro` API)
  - [ ] Reuse card style: `border-2 border-black dark:border-white`, `shadow-[3px_3px_0px_0px_var(--color-border-strong)]`, `rounded-none`, `font-retro-tag` labels, `font-pixel-clean` heading, `font-mono` date
  - [ ] Reuse `@shared/ui` `badge` / `tech-pill` for tags, `link-button` for the CTA
- [ ] `src/widgets/blog/ui/BlogDetail.astro` — props `post`, `Content` (rendered MDX component), `backText`, `backLink`
  - [ ] Render the MDX body with `<Content />` inside `.prose prose-neutral dark:prose-invert` (real Markdown, unlike `DevlogDetail`'s `whitespace-pre-wrap` plain text)
  - [ ] Show `pubDate` / `updatedDate` and tags
- [ ] `src/widgets/blog/ui/index.ts` and `src/widgets/blog/index.ts` sub-barrels
- [ ] Add `export { BlogCard, BlogDetail } from './blog';` to `src/widgets/index.ts`

### Acceptance Criteria

- Visually consistent with `DevlogCard` / `ProjectCard` (same borders, shadows, fonts, tokens from `colors.css`)
- Widgets import only from `features`/`entities`/`shared` (FSD compliance)

---

## Task 5.5 — Add bilingual routes (EN root + ES mirror)

**Scope**: `src/pages/blog.astro`, `src/pages/blog/[slug].astro`, `src/pages/es/blog.astro`, `src/pages/es/blog/[slug].astro`
**Action**: Follow the existing physical `es/` page-duplication pattern (EN at root, ES under `/es/`), mirroring `devlog` and `devlog/[slug]`.

### Checklist

- [ ] EN list `src/pages/blog.astro`: `getBlogPosts(Language.ENGLISH)` → `<BlogCard>` with `readMoreLink = /blog/${slug}`
- [ ] ES list `src/pages/es/blog.astro`: `getBlogPosts(Language.SPANISH)` → `readMoreLink = /es/blog/${slug}` (use `getLocalizedPath`)
- [ ] EN detail `src/pages/blog/[slug].astro`: `getStaticPaths()` seeds paths from EN posts; find post, `redirect('/404')` if missing; `render(entry)` → pass `Content` to `<BlogDetail>`
- [ ] ES detail `src/pages/es/blog/[slug].astro`: same, seeded from ES posts
- [ ] On detail pages, pass `article={true}` + article metadata to `Layout.astro` (it already switches `og:type` to `article` and emits `ScholarlyArticle` JSON-LD; hreflang/canonical are already handled)
- [ ] Add a "Blog" nav entry (root + `es/`), matching how `devlog`/`research` are linked

### Acceptance Criteria

- `/blog`, `/blog/<slug>`, `/es/blog`, `/es/blog/<slug>` all build statically
- hreflang alternates and canonical (with `/es` stripped) are correct on article pages

---

## Task 5.6 — RSS feeds + sitemap  (feeds the GitHub profile)

**Scope**: `src/pages/rss.xml.ts`, `src/pages/es/rss.xml.ts`, `src/app/layouts/Layout.astro`
**Action**: Emit per-locale RSS with `@astrojs/rss`. The EN feed is consumed by the GitHub **profile repo** workflow, so its public URL must be stable.

### Checklist

- [ ] `src/pages/rss.xml.ts` (EN) → `https://sandovaldavid.com/rss.xml`
- [ ] `src/pages/es/rss.xml.ts` (ES) → `https://sandovaldavid.com/es/rss.xml`
- [ ] Populate items from `getBlogPosts(lang)` (title, description, `pubDate`, `link`)
- [ ] Add `<link rel="alternate" type="application/rss+xml" href="/rss.xml">` in `Layout.astro` `<head>`
- [ ] Verify `@astrojs/sitemap` includes the new blog routes

### Template — EN feed endpoint

```ts
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getBlogPosts } from '@entities/blog';

export async function GET(context) {
  const posts = await getBlogPosts('en');
  return rss({
    title: 'David Sandoval — Blog',
    description: 'Software Engineering, Data Science & Applied AI',
    site: context.site, // 'https://sandovaldavid.com'
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.slug}/`,
    })),
  });
}
```

### Acceptance Criteria

- `curl https://sandovaldavid.com/rss.xml` returns valid RSS `application/rss+xml`
- **Cross-repo**: the profile repo's `.github/workflows/blog-posts.yml` `feed_list` is set to `https://sandovaldavid.com/rss.xml` and populates the README `<!-- BLOG-POST-LIST -->` markers

---

## Task 5.7 — i18n strings, seed posts, and optional cross-posting

**Scope**: `src/shared/config/i18n/locales/{en,es}.json`, `src/content/blog/**`, `src/features/language-picker`
**Action**: Add UI strings, seed the blog, and document the optional cross-post flow.

### Checklist

- [ ] Add blog UI keys to `en.json` + `es.json`: page title/description, "Read more", "Back to blog", "Published", "Updated", "Tags"
- [ ] Author 1–2 seed posts in both locales (`src/content/blog/en/*.mdx`, `src/content/blog/es/*.mdx`) with complete frontmatter
- [ ] Ensure the `language-picker` maps `/blog` ↔ `/es/blog` correctly (check its path logic)
- [ ] (Optional) Document cross-posting to dev.to / Hashnode with `canonical_url` = the article's `sandovaldavid.com` URL, using the post's `canonicalUrl` frontmatter field
- [ ] (Cleanup, optional) Remove the unused `astro-i18n` dependency flagged during audit if unrelated to this branch

### Acceptance Criteria

- No missing-key warnings from `useTranslations` on any blog page
- Seed posts render in both EN and ES with correct hreflang

---

## Commit Message

```
feat(blog): add native MDX blog with i18n and RSS

- Add @astrojs/mdx, @astrojs/rss, @astrojs/sitemap, tailwind typography
- Define blog content collection (Content Layer glob loader, locale folders)
- Add blog entity slice (locale-aware query helpers)
- Add blog widget slice (BlogCard, BlogDetail) in the barrel
- Add bilingual routes reusing Layout article/hreflang/canonical support
- Emit EN/ES RSS feeds consumed by the GitHub profile README widget
```

## PR Checklist

- [ ] `bun run astro check` passes (types across content collection + slices)
- [ ] `bun run build` passes with all four blog routes generated
- [ ] `.prose` renders MDX correctly in light + dark
- [ ] `/rss.xml` and `/es/rss.xml` return valid feeds
- [ ] hreflang + canonical correct on `/blog/<slug>` and `/es/blog/<slug>`
- [ ] FSD boundaries respected (widget → feature/entity/shared only)
- [ ] Profile repo `blog-posts.yml` `feed_list` updated to `https://sandovaldavid.com/rss.xml`
```

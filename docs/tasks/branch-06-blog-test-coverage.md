# Branch: test/blog-rss-lighthouse

**Base**: `origin/develop`
**Prefix**: `test/`
**Priority**: Low
**Why**: The blog shipped in branch-05 (PR #75) with E2E coverage for the list pages (`/blog`, `/es/blog` in `tests/e2e/pages.spec.ts` and `tests/e2e/a11y.spec.ts`), but two gaps remain from the 2026-07-04 docs review: the RSS endpoints have **zero** test coverage (grep for `rss` across `tests/` returns nothing), and Lighthouse CI still audits only the 6 pre-blog pages, so blog performance/a11y regressions would go unnoticed.

---

## Task 6.1 — Test the RSS endpoints

**Scope**: `tests/e2e/`
**Action**: Cover `src/pages/rss.xml.ts` (EN) and `src/pages/es/rss.xml.ts` (ES) with E2E assertions against the built site. The EN feed is consumed by the GitHub profile README workflow, so a silent breakage has external impact.

### Checklist

- [ ] Add `tests/e2e/rss.spec.ts` (or extend `pages.spec.ts`) requesting `/rss.xml` and `/es/rss.xml`
- [ ] Assert HTTP 200 and an XML/RSS content type
- [ ] Assert the feed parses as XML with a `<channel>` containing `<title>` and at least one `<item>`
- [ ] Assert each `<item>` has `title`, `link`, and `pubDate`, and that links point to `/blog/…` (EN) / `/es/blog/…` (ES)
- [ ] Assert draft posts (`draft: true`) never appear in the production feed
- [ ] Verify the ES feed only contains ES posts and vice versa (locale isolation)

### Acceptance Criteria

- `bun run test tests/e2e/rss.spec.ts` passes on chromium
- A broken or empty feed fails CI instead of shipping silently

---

## Task 6.2 — Add blog pages to Lighthouse CI

**Scope**: `.lighthouserc.json`, `docs/tools.md`
**Action**: Extend the audited URL set (currently `/`, `/about`, `/projects` + `/es` mirrors) with the blog routes so the ≥90/≥95 thresholds also gate the blog.

### Checklist

- [ ] Add `http://localhost:4321/blog` and `http://localhost:4321/es/blog` to `ci.collect.url` in `.lighthouserc.json`
- [ ] (Optional) Add one article detail page (e.g. `/blog/building-this-portfolio-with-astro-and-fsd`) to catch `.prose`/MDX regressions
- [ ] Run `bun run build && bun run lighthouse` locally and confirm all thresholds pass on the new URLs
- [ ] Update `docs/tools.md` and `docs/TESTING.md` with the new audited page count

### Acceptance Criteria

- Lighthouse CI fails if a blog page drops below Performance ≥90 / Accessibility ≥95 / Best Practices ≥90 / SEO ≥90
- Docs reflect the enlarged audit set

---

## Commit Message

```
test(blog): cover RSS endpoints and audit blog pages in Lighthouse CI

- Add E2E assertions for /rss.xml and /es/rss.xml (status, content type,
  items, locale isolation, draft exclusion)
- Add /blog and /es/blog to the Lighthouse CI URL set
- Update docs/tools.md and docs/TESTING.md audit-set references
```

## PR Checklist

- [ ] `bun run test` passes with the new RSS spec
- [ ] `bun run lighthouse` passes locally with the extended URL set
- [ ] `docs/tools.md` / `docs/TESTING.md` updated
- [ ] No source changes outside `tests/`, `.lighthouserc.json`, and docs

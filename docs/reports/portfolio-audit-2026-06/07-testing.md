# 07 · Testing

[← Back to index](./README.md) · Related: [Backlog](./08-backlog.md)

**Overall: C− 📄.** The tooling is set up well (Vitest + coverage, Playwright across browsers,
Lighthouse CI), but the actual coverage is thin. Grades and counts below are partly drawn from
`docs/INFRASTRUCTURE_AUDIT.md` and a scan of `tests/` — **re-confirm counts against the current
tree** before quoting them externally.

---

## Current state ✅ / 📄

- **Unit (Vitest):** concentrated on the i18n module — URL→lang detection, translations,
  dictionaries, interpolation, localized paths (`tests/unit/i18n/**`). Good, but it's the only
  domain covered.
- **E2E (Playwright):** smoke-level — homepage loads, headings visible, nav, mobile, theme,
  basic a11y, basic performance (`tests/e2e/homepage.spec.ts`, `tests/e2e/pages.spec.ts`).
- **Lighthouse CI** configured (`.lighthouserc.json`, `bun run lighthouse`) — but thresholds
  aren't enforced as a hard gate (per the infrastructure audit).
- CLAUDE.md states a **90% coverage target** (lines/functions/branches/statements). Current
  coverage is well below that for anything outside i18n.

---

## Gaps 💡

| Area | Gap | Suggested test |
|------|-----|----------------|
| Theme toggle | No test for persistence / no-FOUC after the BUG-1 fix | E2E: set Light → navigate → assert no `dark` class flash; assert `localStorage` honored |
| i18n rendering | Unit tests cover the lib, not the **rendered** output | E2E: visit `/es/`, assert hero CTA/stats are Spanish after BUG-3 fix |
| CLI terminal | No test for the signature feature | E2E: `:` opens dialog, `whoami`/`goto` work, `Esc` closes, focus restored |
| Accessibility | Only basic checks | Integration: `@axe-core/playwright` on `/`, `/es/`, `/projects`, `/research` — **both themes** |
| Components | No component-level tests | Astro **Container API** + Vitest to render widgets in isolation ([docs](https://docs.astro.build/en/guides/testing/#vitest-and-container-api)) |
| Reduced motion | None | E2E with `prefers-reduced-motion: reduce` emulation → assert animations suppressed |
| Visual regression | None | Playwright screenshots for hero / key sections (guards the retro look) |
| Performance budget | Not gated | Make Lighthouse CI assertions blocking in PRs (FCP/LCP/CLS budgets) |

---

## Recommended sequencing 💡

1. **Lock in the P0 fixes with tests** as you make them: a theme-persistence E2E (BUG-1) and an
   `es` hero-render E2E (BUG-3) double as regression guards.
2. **Add `@axe-core/playwright`** and run it on both themes — cheap, high signal, directly
   supports the [accessibility](./03-accessibility.md) work (`P1-3`).
3. **Adopt the Container API** for a few high-value widget unit tests (Hero, Header, ProjectCard).
4. **Gate Lighthouse** once PERF-1 is re-measured and a realistic budget is set.

These map to backlog items `P2-7` (a11y tests), `P3-3` (component/visual tests), and the
testing notes under the P0 fixes in [`08-backlog.md`](./08-backlog.md).

---

[← Back to index](./README.md) · Next: [08 · Backlog →](./08-backlog.md)

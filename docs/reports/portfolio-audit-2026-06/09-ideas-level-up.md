# 09 · Ideas — "Level Up" (theme-preserving)

[← Back to index](./README.md) · Related: [UI/UX](./02-ui-ux.md) · [Backlog](./08-backlog.md)

Feature ideas to make the portfolio *more* memorable to big-tech recruiters **without
abandoning the pixel-art retro identity**. These extend the existing game metaphor rather than
fighting it. Most map to `P3-*` in the [backlog](./08-backlog.md).

---

## 1. Project "Boss-Fight" case studies 🎮 → `P3-1`

Each project card currently links to code/preview only. Turn the featured ones into
**case-study pages styled as boss encounters**:

- A "boss intro" header (project name + difficulty/tech), then a structured
  **Problem → Approach → Trade-offs → Outcome** body.
- Show the engineering *thinking*, not just the stack — this is exactly what reviewers probe in
  interviews.
- Reuse the existing window-chrome / stat-card components so it stays on-theme.

## 2. Achievements / Trophy system 🏆

A subtle "achievements unlocked" layer that rewards exploration (found the CLI, ran `whoami`,
triggered Protocol 12, switched language, read a case study). Reinforces the game framing and
quietly demonstrates state management and UX polish. Persist in `localStorage`; keep it opt-in
and `prefers-reduced-motion`-aware.

## 3. Live "Stats Screen" backed by real data 📊

The hero stats are flavor (`99/99 HP`). Add a **real** stats panel (the CLI already fetches
GitHub data) — repos, stars, top languages, contribution streak — framed as an RPG stat sheet.
Real numbers under a playful skin reads as confident, not gimmicky. Cache as the CLI already
does to avoid rate limits.

## 4. "Boring Mode" / readability toggle ♿

A toggle that swaps pixel display fonts for a clean, high-legibility set and calms motion —
explicitly *for recruiters who just want the facts fast*. It's a flex: it shows you understand
accessibility and audience needs, and it pairs naturally with `prefers-reduced-motion`
(`P0-3`) and the readability rule (`P2-8`). Could double as the résumé/print mode (`P3-7`).

## 5. Technical devlog as "Patch Notes" 📝 → `P3-2`

`vision.writing` already promises technical writing. Ship it as a **"Patch Notes / Changelog"**
section — each post is a versioned entry (`v1.3.0 — Migrating to Angular Zoneless`). On-theme,
low-friction to start, and one solid post is strong evidence of communication skill (which
big-tech weighs heavily). Use an Astro content collection.

## 6. CRT page transitions ✨ → `P2-6`

Adopt `<ClientRouter />` and define a custom `transition:animate` that mimics a **CRT
channel-change/wipe** between pages. It elevates the arcade feel, makes navigation feel
app-like, and gives **automatic `prefers-reduced-motion`** handling for free. (Mind the
script-reinit caveat — see [performance](./06-performance-seo.md).)

## 7. Interview-ready "Quick Facts" overlay 🎯

Extend the RecruiterHUD with a one-keypress **"Quick Facts"** card: role, years, top stack,
location/timezone, availability, links to resume + best case study. Optimizes for the recruiter
who has 30 seconds, while the rest of the site rewards the curious.

## 8. i18n depth as a feature 🌐

Once the hero is fully translated (`P1-5`), lean into bilingual as a *selling point* — most
portfolios aren't. Ensure the CLI `whoami`/`help` output, case studies, and devlog all respect
locale, and surface the language switch prominently.

---

## Appendix — key file references

Files cited across this report (for whoever implements the backlog):

| Area | Path | Notes |
|------|------|-------|
| Layout / theme / fonts / SEO | `src/app/layouts/Layout.astro` | FOUC script `:148-151`; fonts `:4,128-141`; JSON-LD `:47-82`; uses `@/shared/ui` `:16` |
| Theme toggle | `src/features/theme-toggle/ui/ThemeToggle.astro` | reads `localStorage` `:75-88` |
| Design tokens | `src/app/styles/colors.css` | `@theme`, `light-dark()` tokens, fonts `:2-8` |
| Global styles | `src/app/styles/global.css` | headings→VT323 `:11-19`; scrollbar `:21-39` |
| Hero | `src/widgets/hero/ui/Hero.astro` | hardcoded-EN stats/CTA; `bg-emerald-500` `:76` |
| Header | `src/widgets/header/ui/Header.astro` | scroll-spy `IntersectionObserver` |
| CLI terminal | `src/features/cli-terminal/ui/CLITerminal.astro` | ~1327 lines; heaviest JS |
| Splash | `src/features/splash-screen/ui/SplashScreen.astro` | CRT + once-per-session |
| i18n dictionaries | `src/shared/config/i18n/locales/{en,es}.json` | parallel; unused `hero.*` keys |
| i18n binding (verified OK) | `src/pages/{about,es/about,es/research}.astro` | correct `Language.*` — debunk evidence |
| Naming issues | `src/shared/ui/{avatar,badge,social-pill}/*.astro` | should be PascalCase |
| Loose widgets | `src/widgets/{AboutContent,ResearchContent}.astro` | not in a slice |
| Astro config | `astro.config.mjs` | no fonts API / no ClientRouter / no CSP; `site` host check `:11`; i18n `:16-22` |
| Source of perf numbers | `docs/INFRASTRUCTURE_AUDIT.md` | FCP 12.3s 📄 — re-measure |

### Official Astro docs referenced

- Fonts: <https://docs.astro.build/en/guides/fonts/> · config: `…/configuration-reference/#fonts`
- View Transitions (+ theme-flash pattern, reduced-motion): <https://docs.astro.build/en/guides/view-transitions/>
- Internationalization (hreflang helpers): <https://docs.astro.build/en/guides/internationalization/>
- SVG optimization (exp.): `…/reference/experimental-flags/svg-optimization/`
- CSP: `…/configuration-reference/#securitycspscriptdirective`

---

[← Back to index](./README.md)

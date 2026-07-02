# Features Catalog

Every slice under `src/features/` (4 total): purpose, client-side logic, and public API.
Generated 2026-07-02 — see [`docs/tasks/branch-03-project-docs.md`](./tasks/branch-03-project-docs.md).

**FSD rule reminder**: features may import from `entities` and `shared` only — never from
`widgets`, `pages`, or other `features`. All 4 slices below comply (each only imports `@shared`).

> [!NOTE]
> None of the 4 features (or any widget) uses Astro hydration directives (`client:load`,
> `client:visible`, etc.) — this project has no framework-island components. Interactivity is
> plain `.astro` markup plus vanilla `<script>` / `<script is:inline>` tags.

---

### `theme-toggle` ⚠️ not currently mounted

- **Purpose**: Button + dropdown to switch between light/dark/system theme.
- **Client-side logic**: reads/writes `localStorage['theme']` (`ThemeToggle.astro:87,92,119`) via
  a plain `<script>` tag (no hydration directive).
- **Public API**: `export { ThemeToggle } from './ui'; export type { Theme, ThemeOption } from './model';`
- **Status**: this component is **not imported anywhere** in the app — not in `Layout.astro`, not
  in `header`, not in any page. The theme that's actually applied on the live site comes from a
  separate, duplicated inline script in `src/app/layouts/Layout.astro`'s `<head>` (also reading
  `localStorage.getItem('theme')`). There is currently no UI control for the user to change
  theme; `theme-toggle` is fully built but orphaned.

### `language-picker`

- **Purpose**: EN/ES language-switch links that rewrite the current URL path with/without the `/es` prefix.
- **Client-side logic**: none — purely server-rendered anchor links, no `<script>` tag.
- **Public API**: `export { LanguagePicker } from './ui'; export type { Language, LanguagePickerProps } from './model';`
- **Used in**: `src/widgets/header/ui/Header.astro` and `MobileNav.astro`

### `cli-terminal`

- **Purpose**: Global keyboard engine + CLI overlay + shortcuts modal + easter egg. Activated by
  `:` (CLI), `/` (goto), `?` (shortcuts), `j/k/gg/G` (vim scroll), `1`-`6` (jump to section), a
  secret `12` sequence (Developer Protocol easter egg with live GitHub stats).
- **Client-side logic**: ~1327-line component, the heaviest script on the site (flagged in the
  June 2026 audit, `06-performance-seo.md` PERF-3). Caches GitHub API responses in
  `sessionStorage['pf_gh_stats']` across navigations to avoid rate limits. No hydration directive
  — logic lives in a regular `<script>` tag.
- **Public API**: `export { default as CLITerminal } from './ui/CLITerminal.astro'`
- **Used in**: `src/app/layouts/Layout.astro`

### `splash-screen`

- **Purpose**: Full-screen retro "BIOS boot" intro overlay shown once per browser session before
  the homepage renders.
- **Client-side logic**: a blocking `<script is:inline>` prevents a flash of the splash screen by
  checking `sessionStorage['pf_booted']` before paint; a second regular `<script>` drives the
  boot-sequence animation and sets that flag once dismissed.
- **Public API**: `export { default as SplashScreen } from './ui/SplashScreen.astro'`
- **Used in**: `src/app/layouts/Layout.astro` (only rendered when `isHome` is true)

---

## Follow-up worth tracking

`theme-toggle` and the `badges`/`vision` widgets (see
[`widgets-catalog.md`](./widgets-catalog.md)) are fully implemented but unused in the live app.
Whether to wire them in, remove them, or leave them for later is a product decision outside the
scope of this documentation pass — flagging here so it isn't lost.

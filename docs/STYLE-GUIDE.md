# Style Guide — Typography, Color Tokens & Headings

Prescriptive standard for all UI work in this repository. Established 2026-07-05 from the
findings in [`reports/style-audit-2026-07/`](./reports/style-audit-2026-07/README.md).
Enforced by `tests/e2e/typography.spec.ts`.

**Tech context:** Tailwind CSS 4 (`@theme` in `src/app/styles/colors.css`, no
`tailwind.config.js`). Every `--color-<name>` token generates `text-<name>`, `bg-<name>`,
`border-<name>` utilities.

---

## 1. Typography scale

The browser base size is 16px (no `html { font-size }` override — keep it that way).

| Role | Class | Px | Used for |
|---|---|---:|---|
| Display | `text-4xl sm:text-6xl lg:text-7xl` | 36–72 | Hero `h1` only |
| Page title (`h1`) | `text-3xl sm:text-4xl` (up to `md:text-5xl`) | 30–48 | Top heading of every sub-page |
| Section heading (`h2`) | `text-2xl sm:text-3xl` (home `TitleSection` keeps `text-4xl`) | 24–30 | Section titles |
| Sub-heading (`h3`) | `text-lg sm:text-xl` | 18–20 | Card titles, panel titles |
| **Body copy** | `text-base` | **16** | Paragraphs, descriptions, list content — anything the visitor reads |
| **Secondary** | `text-sm` | **14** | Metadata, dates, nav items, functional captions, dense HUD/terminal reading text |
| **Caption / label** | `text-xs` | **12** | Decorative badges, tags, kickers, kbd hints — **absolute floor** |

### Hard rules

1. **Never** use an arbitrary size below 12px: `text-[8px]`, `text-[9px]`, `text-[10px]`,
   `text-[11px]` are banned. If a label feels too big at `text-xs`, reduce tracking or padding,
   not the font size.
2. **Body copy is `text-base`, not `text-sm`.** If a `<p>` holds sentences someone reads,
   it is body copy.
3. Responsive steps may go *up* from the role's floor (`text-sm sm:text-base` for secondary is
   fine); they may not dip below it on any breakpoint.

### Pixel-font (+1 step) rule

The retro fonts render visually smaller than their nominal size — VT323 (`font-pixel-clean`)
especially, and Press Start 2P / Silkscreen read dense in uppercase. When **reading text**
(not a decorative label) is set in a pixel font, use **one step larger** than the role's
floor: secondary → `text-base`, caption → `text-sm`. Headings already compensate through
their large sizes.

## 2. Color tokens

All color comes from the semantic tokens in `src/app/styles/colors.css` (they handle
light/dark via `light-dark()` — no `dark:` pair needed):

| Token | Utility | Role |
|---|---|---|
| `--color-content-strong` | `text-content-strong` | Headings, emphasized text |
| `--color-content` | `text-content` | Body copy (also the `body` default) |
| `--color-content-muted` | `text-content-muted` | Secondary/metadata text |
| `--color-surface` / `--color-surface-highlight` | `bg-surface` / `bg-surface-highlight` | Panels, cards |
| `--color-edge-subtle` / `--color-edge-strong` | `border-edge-subtle` / `border-edge-strong` | Borders; `--color-edge-strong` also powers the retro shadow scale |
| `--color-success-500` / `--color-warning-500` / `--color-error-500` | `text-success-500`, … | Status UI — never raw `emerald`/`green`/`yellow`/`red` |

### Hard rules

1. **No raw palette colors on text**: `text-neutral-*`, `text-gray-*`, `text-black`,
   `text-white` are banned for content (component-internal contrast like text-on-primary
   buttons is fine).
2. **Status is always tokenized** — success/warning/error, including colors built in JS strings.
3. **No opacity modifiers below `/80` on text at `text-sm` or smaller** — they fall under
   WCAG AA contrast.
4. **Exception — terminal aesthetic**: `CLITerminal.astro` and `SplashScreen.astro` use
   phosphor hexes (`#00b0ff`, `#00ff88`) on an always-dark surface. Allowed there only.
   Follow-up: promote to `--color-terminal-*` tokens.

### Token naming convention

The name after `--color-` becomes the utility suffix. **Name tokens after the role, never
after a CSS property.** `--color-text-main` produced the stutter `text-text-main`;
`--color-border-subtle` produced `border-border-subtle` — that's why they were renamed to
`content-*` / `edge-*`. Before adding a token, say the generated utilities out loud:
`text-<name>`, `bg-<name>`, `border-<name>` must all read sensibly.

## 3. Headings

1. **Exactly one `h1` per page**, and it is the page title. On the home page that's the Hero
   name; on every sub-page it's the top heading of the main content.
2. **No skipped levels** in DOM order (h1 → h2 → h3 …).
3. **A heading is visually ≥ the body text it labels** on every breakpoint — weight/color
   alone don't establish hierarchy.
4. Card titles inside a section use the level below the section's heading (page `h1`/section
   `h2` → card `h3`).
5. Global CSS (`global.css`) sets heading *font/tracking/case* only — sizes always live on the
   element per the scale in §1, so changing a tag never silently changes its size.

## 4. Enforcement

- `tests/e2e/typography.spec.ts` gates: ≥12px floor on all visible text, ≥16px on content
  paragraphs, one `h1`, no level skips, heading ≥ body — across key EN+ES pages, desktop and
  mobile viewports.
- Review checklist: new UI must cite which scale role each text element uses.
- `grep -rn 'text-\[8px\]\|text-\[9px\]\|text-\[10px\]\|text-\[11px\]' src` must stay empty.

# 02 · UI / UX — Recruiter First Impression & Content

[← Back to index](./README.md) · Related: [Design system](./01-design-system.md) ·
[Accessibility](./03-accessibility.md) · [Backlog](./08-backlog.md)

**Overall: A−.** The portfolio makes a strong, memorable first impression and is more
interactive than 95% of engineer portfolios. The gaps are in *information architecture* and a
few *content signals* that big-tech reviewers look for — not in the experience itself.

---

## 1. First impression (the 5-second test) ✅

When a recruiter lands on `/`, they get, in order:

1. A **splash boot sequence** (first visit only — gated by `sessionStorage`, good).
2. A **banner**: `[ SYSTEM STATUS: ACTIVE // PLAYER 1 READY ]`.
3. The **name "David Sandoval"** in `Press Start 2P` with a 3D shadow.
4. A **"Character Stats" dashboard**: `CLASS: Systems Architect`, `ALIGNMENT: Clean Code`,
   `SPECIALTIES: Java, Angular, React`, `HP/MANA: 99/99`, `SKILL LEVEL: Lvl. 99 (Expert)`.
5. A **`PRESS START // VIEW WORK`** arcade CTA.

This is **distinctive and confident**. The gaming framing is a genuine differentiator and
signals personality + front-end skill simultaneously.

### Tension to be aware of 💡

The hero leads with **theme over substance**. `CLASS: Systems Architect` / `Lvl. 99 (Expert)`
is fun, but a recruiter scanning fast doesn't immediately get **"what does he build, at what
level, and is he available?"** The real value proposition lives in translation keys that the
hero **doesn't currently render**:

- `hero.title` = *"Engineering Scalable Systems"* (rendered, but only as a tiny `retro-tag`
  label above the name — `Hero.astro:24-28`).
- `hero.subtitle` = *"Software Engineer · BiLSTM/OSS Researcher · B.S. Computer Engineering"* —
  **defined in `en.json:7` but not rendered in the hero.**
- `hero.credential` = *"Currently @ Atena (Remote) · Researching OSS abandonment prediction
  w/ BiLSTM"* — **also defined (`en.json:8`) but not rendered.**

💡 **Recommendation:** surface `hero.subtitle` + `hero.credential` (and the `available`
signal) prominently near the name. You already wrote great positioning copy — it's just not on
screen. Keep the gamified stats as the *flavor* beneath a clear human-readable headline.

---

## 2. Distinctive interactive features ✅ (keep & lean in)

- **CLI terminal** (`features/cli-terminal`, ~1327 lines): `:` to open, vim nav (`j/k/gg/G`),
  `goto`, `whoami`, `github` (live stats, cached in `sessionStorage`), `skills`, `matrix`,
  easter egg "Protocol 12". Accessible (`role="dialog"`, `aria-modal`, `aria-live`). This is a
  real "wow" for technical reviewers.
- **RecruiterHUD** — a floating "Recruit the Architect" quest with email/resume/copy actions
  and "System Cheats". Smart: it gives a recruiter a fast path to contact.
- **Splash boot screen** — memorable, performance-aware (shown once per session).

These are the portfolio's signature. The only caution is **performance/lifecycle** (the heavy
CLI script and script re-init under View Transitions) — see
[performance](./06-performance-seo.md).

---

## 3. Content quality & FAANG-readiness

### What's strong ✅

- **Experience bullets already quantify impact** (`en.json:32-46`): *"Reduced frontend Bundle
  Size by 35%… optimizing TTI"*, *"3 new REST APIs using .NET 8 and Clean Architecture, >80%
  unit test coverage"*, *"eliminating Zone.js dependency."* This is exactly the
  result-oriented phrasing reviewers want. (Note: an earlier draft of this audit incorrectly
  claimed there were no metrics — there are; this is a strength.)
- **Research depth** (`en.json:200-268`): the BiLSTM thesis is described with a real model
  architecture, data pipeline, engineered features, and evaluation metrics. This differentiates
  from typical web-dev portfolios and reads credibly.
- **Availability is signaled**: `hero.available` = "Available for work", `footer.subtitle` =
  "Open to opportunities and collaborations."

### What's missing for big-tech 💡

Large companies screen for **scale, system design, and collaboration** — currently thin:

- **Scale / load.** No mention of traffic, data volume, throughput, latency SLAs, or
  concurrency. Even one line ("served X requests/day", "processed Y GB nightly") changes the
  altitude.
- **System design.** The hero says "Systems Architect" but the content lists technologies more
  than **architectural decisions** (trade-offs, failure modes, why CQRS, why Zoneless).
- **Collaboration / leadership.** No mention of code review, mentoring, cross-team work, or
  incident response — signals reviewers use to gauge seniority.
- **Proof of "Vision".** All three `vision.*` items (`en.json:270-290`) currently link to `#`
  (LeetCode, Technical Writing, DevSolution Lab) and are "Coming Soon". A placeholder reads as
  *unfinished* to a recruiter.

💡 **Recommendations** (tracked as `P1-4`):
1. Add 2–3 bullets that explicitly state scale/design/collaboration where true.
2. Turn at least **one** Vision item into a real link (a published article or a repo) and
   **hide** the rest until ready, rather than showing dead `#` links.
3. Consider a short, scannable "résumé mode" / print stylesheet so a recruiter can get the
   facts without parsing pixel fonts.

---

## 4. Information architecture

### Current map ✅

`/` (single-scroll: hero → experience → research → projects → about → tech) plus standalone
pages: `/about`, `/projects`, `/skills`, `/research`, `/components`, `/atena`, `/404` — each
mirrored under `/es/`. Navigation uses an `IntersectionObserver` to highlight the active
section (`Header.astro`), which is a nice touch.

### Gaps 💡

- **No case-study pages.** Projects (`en.json:114-143`) have one-paragraph descriptions and
  code/preview buttons, but no deep-dive. Big-tech reviewers love a **problem → approach →
  trade-offs → outcome** narrative. (Idea: "boss-fight" case-study pages — see
  [09-ideas-level-up.md](./09-ideas-level-up.md).)
- **No blog / devlog.** `vision.writing` hints at technical writing but links to `#`. A single
  well-written post (e.g. the Zoneless migration it references) would be strong proof of
  communication skill.
- **No visual timeline.** Experience is tab-based (good UX), but a timeline reinforces
  trajectory at a glance.
- **`/components` and `/atena`** read as internal/showcase pages — confirm they should be
  public and indexable, or `noindex` them.

---

## 5. Micro-interactions & polish ✅ / 💡

- ✅ Arcade button press/lift states, pulsing badges, typing brand logo, glitch effect — all
  reinforce the theme.
- 💡 Many animations are **infinite** (`animate-pulse` on the EXP bar and "ONLINE" badge,
  glitch, blob). Infinite motion is visually noisy and an accessibility issue — gate behind
  `prefers-reduced-motion` (see [accessibility](./03-accessibility.md)).
- 💡 The hero CTA jumps to `#experience`; consider also a secondary "Download Resume" /
  "Contact" CTA in the hero so the primary recruiter actions are one click from the top.

---

[← Back to index](./README.md) · Next: [03 · Accessibility →](./03-accessibility.md)

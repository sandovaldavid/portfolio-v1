# Portfolio V1: Next Steps & Missing Tasks Plan

Based on a comprehensive review of the `docs/` directory—including the July 2026 Style Audit, June 2026 Portfolio Audit, Tasks index, and testing documentation—the FSD migration and the majority of backlog items are **100% complete**. 

However, several critical integration tasks, test stabilizations, and future enhancements remain pending. This document serves as the executable plan for the next iteration.

## 1. Pending PRs & Branch Merges
Although the implementation work is complete within their respective branches, the following branches need to be finalized and merged into `develop`:

- **Branch 06 (`test/blog-rss-lighthouse`)**
  - **Context**: The E2E tests for RSS endpoints and Lighthouse CI coverage have been verified locally. 
  - **Action**: Open and merge the pending PR to `develop`.
- **Branch 07 (`claude/style-bugs-text-sizing-fg813f`)**
  - **Context**: The July 2026 typography and style bug audit fixes are implemented (all tasks in `branch-07-style-bugs-text-sizing.md` are marked complete), but `docs/tasks/README.md` still marks this branch as 🔄 (In Progress). 
  - **Action**: Review, open the PR, and merge into `develop`. Update the `docs/tasks/README.md` status table to ✅.

## 2. Cross-Repository Integrations
- **GitHub Profile RSS Feed Link**
  - **Context**: Branch 05 introduced a native MDX blog with RSS, but the GitHub profile README repo needs to be pointed to the new endpoint.
  - **Action**: Update `blog-posts.yml` `feed_list` in the `sandovaldavid` profile repository to point to `https://sandovaldavid.com/rss.xml`. *(Ref: `branch-05-blog.md`)*

## 3. Testing & CI Infrastructure Hardening
- **Visual Regression Baselines**
  - **Context**: Visual snapshots for Firefox, WebKit, and Mobile Safari are currently known-stale due to sandbox environment limitations. 
  - **Action**: Run `bun run test:snapshots:all` on a full local machine (with all system dependencies) to regenerate and commit accurate visual baselines for non-Chromium browsers. *(Ref: `branch-07-style-bugs-text-sizing.md`, `tasks/README.md`)*
- **Enforce Performance Budgets in CI**
  - **Context**: `lighthouse-budget.json` defines per-page budgets (50-70KB script per page), but it is currently only a reference target and not an enforced CI gate.
  - **Action**: Wire the `lighthouse-budget.json` directly into the Lighthouse CI assertion step to fail the build if page budgets are exceeded. *(Ref: `TESTING.md`)*

## 4. "Level Up" Enhancements (Future Backlog)
The following ideas from the June 2026 audit have been identified as high-value for big-tech recruiters but remain unimplemented. These should be scoped into new branches:

| Feature | Description | Priority |
| :--- | :--- | :--- |
| **Boring Mode / Readability Toggle** | A toggle to swap pixel display fonts for a high-legibility set and calm motion, doubling as a clean print/resume mode. | Medium |
| **Deep i18n in CLI** | Ensure CLI commands (`whoami`, `help`, output) fully respect the active locale. | Medium |
| **Real Stats Screen** | Replace placeholder hero stats with live GitHub data (repos, stars, contributions) styled as an RPG stat sheet. | Low |
| **Interview Quick Facts** | A one-keypress overlay in the RecruiterHUD with role, stack, timezone, and resume links. | Medium |
| **Achievements System** | Opt-in, `localStorage`-backed trophy system to reward exploration (e.g., finding the CLI, reading a case study). | Low |

> [!TIP]
> **Next Immediate Action:** Sync the `develop` branch, merge Branches 06 and 07, and run the snapshot updates locally before beginning any new feature work.

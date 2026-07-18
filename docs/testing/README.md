# Testing & Quality Assurance

This directory contains testing artifacts, screenshots, and performance reports for the portfolio website.

## Directory Structure

```
testing/
├── screenshots/          # Visual regression testing screenshots
│   ├── mobile/          # Mobile device screenshots
│   ├── tablet/          # Tablet device screenshots
│   └── desktop/         # Desktop device screenshots
└── lighthouse/          # Performance & accessibility reports
    ├── latest.json      # Latest Lighthouse audit (machine-readable)
    ├── latest.html      # Latest Lighthouse audit (human-readable)
    └── production.json  # Lighthouse audit against a production build
```

## Taking Screenshots

### Prerequisites

```bash
bun install
```

### Generate Responsive Screenshots

Screenshots are captured automatically using Playwright across three device sizes:

```bash
# Automatic capture (requires dev server running on localhost:4321)
bun run dev  # In one terminal
bun run screenshots  # In another terminal

# Or use the helper script (starts dev server automatically)
bash docs/testing/generate-reports.sh
```

**Captured device sizes:**

- **Mobile**: iPhone 12 Pro (390x844)
- **Tablet**: iPad Pro (1024x1366)
- **Desktop**: 1920x1080

**Alternative: Manual screenshots** using browser DevTools:

```
1. Open http://localhost:4321
2. Press F12 to open DevTools
3. Press Ctrl+Shift+M (or Cmd+Shift+M) for responsive mode
4. Select device from dropdown
5. Right-click and "Capture screenshot"
6. Save to docs/testing/screenshots/{device-type}/
```

### Naming Convention

Screenshots should follow this naming pattern:

```
{device}_{page}[_{variant}].png

Examples:
- mobile_home.png
- mobile_home_fullpage.png
- tablet_research.png
- desktop_about-me_dark-mode.png
```

**Device types**: `mobile`, `tablet`, `desktop`
**Page names**: `home`, `research`, `skills`, `about-me`, etc.
**Variants** (optional): `fullpage`, `dark-mode`, `light-mode`, etc.

## Lighthouse Reports

### Generate Lighthouse Report

Using Claude Code (when the dev server is running on localhost:4321):

```bash
# In Claude Code:
/verify

# This will:
# 1. Start the dev server if not running
# 2. Run Lighthouse audit on key pages
# 3. Generate reports in docs/testing/lighthouse/
```

### Report Files

- **latest.json** — Machine-readable format for CI/CD integration and trend analysis
- **latest.html** — Human-readable interactive report for visual inspection
- **production.json** — Same format as `latest.json`, captured against a production build for
  an apples-to-apples comparison with CI's Lighthouse job

### Understanding Lighthouse Scores

Lighthouse audits measure:

- **Performance** (0-100): Loading speed, Core Web Vitals
- **Accessibility** (0-100): WCAG compliance, screen reader support
- **Best Practices** (0-100): Security, performance best practices
- **SEO** (0-100): Search engine optimization
- **PWA** (0-100): Progressive Web App capabilities

**Target scores**:

- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 90

## Continuous Integration

Screenshots and Lighthouse reports are **NOT committed to version control**.

Add entries to `.gitignore` to keep the repo clean:

```gitignore
docs/testing/screenshots/
docs/testing/lighthouse/
*.png
!src/assets/**/*.png
```

## Workflow Integration

When preparing a PR or deployment:

1. ✅ Take fresh screenshots of modified pages
2. ✅ Run Lighthouse audit on production build (`bun run preview`)
3. ✅ Review reports and commit messages
4. ✅ Push to GitHub (screenshots stay local)

## Tips

- **Take screenshots after making UI changes** to catch visual regressions
- **Run Lighthouse on the preview build** for accurate performance metrics
- **Compare across devices** (mobile, tablet, desktop) to ensure responsive design works
- **Check Lighthouse on both light and dark modes** if applicable

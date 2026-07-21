# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.6.2-beta.0](https://github.com/sandovaldavid/portfolio-v1/compare/porfolio-dev-v1.6.1-beta.0...porfolio-dev-v1.6.2-beta.0) (2026-07-05)


### Bug Fixes

* **styles:** typography floor, token rename, hierarchy, tests ([#85](https://github.com/sandovaldavid/portfolio-v1/issues/85)) ([c44ec77](https://github.com/sandovaldavid/portfolio-v1/commit/c44ec7795af80ca90dd0143fc104a1cee417bdfe))

## [1.6.1-beta.0](https://github.com/sandovaldavid/portfolio-v1/compare/porfolio-dev-v1.6.0-beta.0...porfolio-dev-v1.6.1-beta.0) (2026-07-05)


### Bug Fixes

* **portfolio:** resolve hud/splash bugs and render devlog markdown ([#83](https://github.com/sandovaldavid/portfolio-v1/issues/83)) ([e5ab091](https://github.com/sandovaldavid/portfolio-v1/commit/e5ab0917a05fdbf2ae10cbc39b0ec0b331945a0f))

## [1.6.0-beta.0](https://github.com/sandovaldavid/portfolio-v1/compare/porfolio-dev-v1.5.1-beta.0...porfolio-dev-v1.6.0-beta.0) (2026-07-04)


### Features

* **blog:** add native MDX blog with i18n and RSS ([#75](https://github.com/sandovaldavid/portfolio-v1/issues/75)) ([edcd117](https://github.com/sandovaldavid/portfolio-v1/commit/edcd11707a89d08f30bf719f965b8a31a877e4f0))


### Bug Fixes

* **layout:** pass isHome={false} on devlog and project case-study pages ([#78](https://github.com/sandovaldavid/portfolio-v1/issues/78)) ([1574d1c](https://github.com/sandovaldavid/portfolio-v1/commit/1574d1c21992c448123066abd0d58b6d0646a284))

## [1.5.1-beta.0](https://github.com/sandovaldavid/portfolio-v1/compare/porfolio-dev-v1.5.0-beta.0...porfolio-dev-v1.5.1-beta.0) (2026-06-29)


### Performance Improvements

* **bundle:** optimize assets and reduce dist size by 500K ([#69](https://github.com/sandovaldavid/portfolio-v1/issues/69)) ([d742a0f](https://github.com/sandovaldavid/portfolio-v1/commit/d742a0fb068390f3a8462123bc436e7af7ac251c))

## [1.5.0-beta.0](https://github.com/sandovaldavid/portfolio-v1/compare/porfolio-dev-v1.4.0-beta.0...porfolio-dev-v1.5.0-beta.0) (2026-06-29)


### Features

* **blog:** add devlog pages with Playwright regression tests ([77b9a0d](https://github.com/sandovaldavid/portfolio-v1/commit/77b9a0d2e82020ae56ae004dfa2bc8b7f2eb699d))
* **projects:** P3-1 boss-fight case study pages ([#64](https://github.com/sandovaldavid/portfolio-v1/issues/64)) ([012273c](https://github.com/sandovaldavid/portfolio-v1/commit/012273c22ca114e8de0053adc809c49a2d31d844))

## [1.4.0-beta.0](https://github.com/sandovaldavid/portfolio-v1/compare/porfolio-dev-v1.3.0-beta.0...porfolio-dev-v1.4.0-beta.0) (2026-06-29)


### Features

* **assets:** P3-7 spacing tokens + print mode + image opt ([#63](https://github.com/sandovaldavid/portfolio-v1/issues/63)) ([fd5f29e](https://github.com/sandovaldavid/portfolio-v1/commit/fd5f29e31ba6279663788567691da426d1634d2b))
* **seo:** add svgoOptimizer and structured data ([#62](https://github.com/sandovaldavid/portfolio-v1/issues/62)) ([e0ca3d1](https://github.com/sandovaldavid/portfolio-v1/commit/e0ca3d17dc507453d75c3509c1aaba1e4abeaf54))

## [1.3.0-beta.0](https://github.com/sandovaldavid/portfolio-v1/compare/porfolio-dev-v1.2.0-beta.0...porfolio-dev-v1.3.0-beta.0) (2026-06-28)


### Features

* **ux:** adopt View Transitions with CRT-wipe animation ([#56](https://github.com/sandovaldavid/portfolio-v1/issues/56)) ([2218eca](https://github.com/sandovaldavid/portfolio-v1/commit/2218ecaf53c7f4b077a4f89658ed5cf1b1caef75))


### Bug Fixes

* **a11y:** enforce pixel-font readability rule ([#55](https://github.com/sandovaldavid/portfolio-v1/issues/55)) ([c5ad25f](https://github.com/sandovaldavid/portfolio-v1/commit/c5ad25f1329016b7a47700270b175172952b93cd))
* **tests:** bypass splash screen and fix visual regression baselines ([#60](https://github.com/sandovaldavid/portfolio-v1/issues/60)) ([d75167a](https://github.com/sandovaldavid/portfolio-v1/commit/d75167aeb385362b8929c04e9be239f5dbfba41f))
* **tests:** use Ubuntu CI-generated visual regression snapshots ([#61](https://github.com/sandovaldavid/portfolio-v1/issues/61)) ([b3d3e5d](https://github.com/sandovaldavid/portfolio-v1/commit/b3d3e5d9f2a1d6e169c534fb05c841af2e43601d))

## [1.2.0-beta.0](https://github.com/sandovaldavid/portfolio-v1/compare/porfolio-dev-v1.1.0-beta.0...porfolio-dev-v1.2.0-beta.0) (2026-06-28)


### Features

* **a11y:** add prefers-reduced-motion support (WCAG 2.3.3) ([#42](https://github.com/sandovaldavid/portfolio-v1/issues/42)) ([d5c829a](https://github.com/sandovaldavid/portfolio-v1/commit/d5c829a373b7d9cd0b5b6d295023fe458adadfc8))
* **a11y:** add skip-to-content link ([#43](https://github.com/sandovaldavid/portfolio-v1/issues/43)) ([e1d16cb](https://github.com/sandovaldavid/portfolio-v1/commit/e1d16cb83d6338b0766024a0ae2d74c4b3c068e9))
* **content:** add scale, leadership and system-design signals ([#52](https://github.com/sandovaldavid/portfolio-v1/issues/52)) ([4995992](https://github.com/sandovaldavid/portfolio-v1/commit/49959923fcf65a2d7cfc60c45624446d6fc4c3a5))
* **fonts:** migrate to native Astro 6 Fonts API ([#49](https://github.com/sandovaldavid/portfolio-v1/issues/49)) ([e9cb420](https://github.com/sandovaldavid/portfolio-v1/commit/e9cb4200ed566212ac2396a1fe2026d117b281cc))


### Bug Fixes

* **design:** route hero ONLINE badge to success token ([#44](https://github.com/sandovaldavid/portfolio-v1/issues/44)) ([c97ccbf](https://github.com/sandovaldavid/portfolio-v1/commit/c97ccbf6473477b218dd17b1fc5763ac3114e1c2))
* **i18n:** translate hero CTA, stats and render unused keys ([#50](https://github.com/sandovaldavid/portfolio-v1/issues/50)) ([5b4717f](https://github.com/sandovaldavid/portfolio-v1/commit/5b4717f9ed3939bacac1a51e2cd5ecd46573ad1d))
* **theme:** resolve FOUC by reading localStorage before paint ([#41](https://github.com/sandovaldavid/portfolio-v1/issues/41)) ([1ff7eb4](https://github.com/sandovaldavid/portfolio-v1/commit/1ff7eb4888287a44d2b73d0b913dcef9fb8b5900))


### Performance Improvements

* **docs:** re-measure performance with Lighthouse CI ([#45](https://github.com/sandovaldavid/portfolio-v1/issues/45)) ([228441b](https://github.com/sandovaldavid/portfolio-v1/commit/228441b8522c1d73a6b2c6febba323cb02b9df15))

## [1.1.0-beta.0](https://github.com/sandovaldavid/portfolio-v1/compare/porfolio-dev-v1.0.0-beta.0...porfolio-dev-v1.1.0-beta.0) (2026-06-21)


### Features

* add automated screenshot capture with Playwright ([d391a8a](https://github.com/sandovaldavid/portfolio-v1/commit/d391a8aa1f31ee33ce665614bb38c8e79c4c9318))
* add badges section ([facdaa1](https://github.com/sandovaldavid/portfolio-v1/commit/facdaa196a8ce579b3316d03064fccff19a960e2))
* add clickable badge images ([437063f](https://github.com/sandovaldavid/portfolio-v1/commit/437063f5873781b6cadc922cfb3c2ea518b0cc72))
* **ci:** implement hybrid gh-pages deployment ([#32](https://github.com/sandovaldavid/portfolio-v1/issues/32)) ([cf3436a](https://github.com/sandovaldavid/portfolio-v1/commit/cf3436a944ea65a27f85c8f43dafcf2ff361e708))
* **contact-sidebar:** Add floating left contact sidebar ([3c20dbe](https://github.com/sandovaldavid/portfolio-v1/commit/3c20dbed8b3142f5cc41384d50a89f2fecb66299))
* **i18n:** migrate AboutContent.astro to centralized translations ([b252f23](https://github.com/sandovaldavid/portfolio-v1/commit/b252f23da599bffdb0744c128db87decb3314284))
* **i18n:** migrate Research.astro widget to centralized translations ([ffb1214](https://github.com/sandovaldavid/portfolio-v1/commit/ffb12143c74b24017e956730eeb8b4f9cd6b7916))
* **i18n:** migrate ResearchContent.astro to use centralized translations ([b026727](https://github.com/sandovaldavid/portfolio-v1/commit/b0267270cb2ab11906bc3ea09b42ba4ac79d52ca))
* **research:** Add '▸ FULL RESEARCH' CTA button in Research widget ([3c20dbe](https://github.com/sandovaldavid/portfolio-v1/commit/3c20dbed8b3142f5cc41384d50a89f2fecb66299))
* **research:** Add dedicated /research page (ES + EN) ([3c20dbe](https://github.com/sandovaldavid/portfolio-v1/commit/3c20dbed8b3142f5cc41384d50a89f2fecb66299))


### Bug Fixes

* **ci-cd:** add --prod flag to production deployment ([0f91560](https://github.com/sandovaldavid/portfolio-v1/commit/0f9156092b62a362db7b25c9c66ffbca0b8e4226))
* **ci-cd:** add prod flag to deploy step ([087b6ab](https://github.com/sandovaldavid/portfolio-v1/commit/087b6abbc659aba3e4f5b84822e684ee85297462))
* **ci-cd:** align build and deploy flags for environment consistency ([c7d95eb](https://github.com/sandovaldavid/portfolio-v1/commit/c7d95eb460365bc04377642461c9bbfd8467adcc))
* **ci-cd:** align deployment with portfolio v3 pattern ([6ec1597](https://github.com/sandovaldavid/portfolio-v1/commit/6ec1597ac9bddcbad9350a6133b647076359bb08))
* **ci-cd:** explicitly promote deployment to production ([a064b1d](https://github.com/sandovaldavid/portfolio-v1/commit/a064b1db7c34accd8cb351c221fdbeaec9ca51c3))
* **ci-cd:** install Vercel CLI before deployment ([ee60ba4](https://github.com/sandovaldavid/portfolio-v1/commit/ee60ba41a28d6bfc9bcfe5806e39c2aa6dad0f9d))
* **ci-cd:** match build and deploy flags precisely ([6c8957e](https://github.com/sandovaldavid/portfolio-v1/commit/6c8957e2cc8a0b430efe6ab9477bc823a2fc3030))
* **ci-cd:** optimize GitHub Actions and Vercel configuration ([a644703](https://github.com/sandovaldavid/portfolio-v1/commit/a644703e9ebd09aaf6d01336c04f8ef192163aed))
* **ci-cd:** remove unnecessary promote step after production deployment ([592e5f5](https://github.com/sandovaldavid/portfolio-v1/commit/592e5f500b6e4ba68668970264b420c6c64de04e))
* **ci-cd:** revert production deployment to main branch ([bd0c5d3](https://github.com/sandovaldavid/portfolio-v1/commit/bd0c5d3b7abc90ae8124b25311422e11d2bd41fb))
* **ci-cd:** specify team ID in Vercel deployment commands ([bbffe7b](https://github.com/sandovaldavid/portfolio-v1/commit/bbffe7b75cfccb933ac74564e8330d97f56445c5))
* **ci-cd:** use correct team ID that was previously working ([e618bfd](https://github.com/sandovaldavid/portfolio-v1/commit/e618bfda87bfcd2a940b78c1c68c2fb9ef7be91e))
* **ci-cd:** use GitHub secrets for Vercel environment variables ([126924f](https://github.com/sandovaldavid/portfolio-v1/commit/126924f7bef6dc5452cc38df16f825f39865df80))
* **ci-cd:** use vercel promote for production deployments ([d5c176d](https://github.com/sandovaldavid/portfolio-v1/commit/d5c176dfe3006a65f872d5dc1dcd73e7a913cf93))
* **ci-cd:** use vercel promote to production ([5a064df](https://github.com/sandovaldavid/portfolio-v1/commit/5a064df20180dcc2a0bd603579955fb1cc0763de))
* **ci-cd:** use VERCEL_ORG_ID from GitHub secrets ([5cc46d0](https://github.com/sandovaldavid/portfolio-v1/commit/5cc46d0595cd8983ff4f9768c5e0553c880d0325))
* **ci:** change lighthouse reports directory to non-hidden path ([3147b28](https://github.com/sandovaldavid/portfolio-v1/commit/3147b28264f138b2d0df54e63234e480f13261c2))
* **ci:** change lighthouse reports directory to non-hidden path ([7bfa19a](https://github.com/sandovaldavid/portfolio-v1/commit/7bfa19a9738ea933d7eca57cfda16d62d2d441d9))
* **ci:** fix CodeQL, Playwright, and Lighthouse config ([d4170db](https://github.com/sandovaldavid/portfolio-v1/commit/d4170db726846c8f84be89c925e0e736d2ec17ce))
* **ci:** fix Lighthouse assertions, Pages template, and E2E routes ([baf1456](https://github.com/sandovaldavid/portfolio-v1/commit/baf145650c5d51b04529f7cb8ac6e743e151ccdb))
* **ci:** fix Playwright null response and Lighthouse threshold ([c1336da](https://github.com/sandovaldavid/portfolio-v1/commit/c1336da4add034467ef295a505a3e13bd8ab5fdb))
* **ci:** lower audit level to high and fix Prettier JSX comments ([0ba3415](https://github.com/sandovaldavid/portfolio-v1/commit/0ba3415529145d3f47654c00d38fafce2528dba1))
* **ci:** save lighthouse artifacts before lhci upload cleans local files ([8c733b6](https://github.com/sandovaldavid/portfolio-v1/commit/8c733b6abccf3be179b345b766ec58440f217b5c))
* **ci:** update lockfile and document branch strategy ([d5e19fd](https://github.com/sandovaldavid/portfolio-v1/commit/d5e19fd7025c2546d72f1e98c55ee2b9d393c5ca))
* **ci:** update PR comment and add GitHub Deployment environments ([849999a](https://github.com/sandovaldavid/portfolio-v1/commit/849999abf206a9dd711407f892ee09764d9eccc9))
* **ci:** upgrade deps to fix security vulnerabilities and CI failures ([d4def93](https://github.com/sandovaldavid/portfolio-v1/commit/d4def93e71264124ad491413360bc49f111eb448))
* **ci:** use branch ref for Environments box in PR ([46f56a1](https://github.com/sandovaldavid/portfolio-v1/commit/46f56a1abff0960b28aa6343cd588353a7edde25))
* correct Playwright API usage in screenshot capture ([5e11f71](https://github.com/sandovaldavid/portfolio-v1/commit/5e11f717673b012ea6bde92e3044d2c657ad0c08))
* **i18n:** normalize 404.astro to use Language enum ([8d23b6e](https://github.com/sandovaldavid/portfolio-v1/commit/8d23b6e3e0247b47f0f040856b8b0b0f0dd3e999))
* **i18n:** update language picker for new default language ([87687f4](https://github.com/sandovaldavid/portfolio-v1/commit/87687f480e386d35e565940f8698577bf9003c42))
* install vercel cli in deployment workflows ([5267977](https://github.com/sandovaldavid/portfolio-v1/commit/52679776f4059b632bffa468f632c77dbd5a8155))
* prevent dev server termination issues in generate-reports script ([0f777bc](https://github.com/sandovaldavid/portfolio-v1/commit/0f777bc7f736bc99095a5791f52137ea41bc8e95))
* remove prebuilt option from vercel deployment ([a2a48f2](https://github.com/sandovaldavid/portfolio-v1/commit/a2a48f233aa8d95e2c1f0336e5b957d5adafff74))
* **research/en:** update contact section design to match Spanish version ([3b7b41b](https://github.com/sandovaldavid/portfolio-v1/commit/3b7b41bcb0c8d8de3d8a28a42fa34dfd06d1e807))
* **research:** ensure contact box spans full grid width ([a4157e9](https://github.com/sandovaldavid/portfolio-v1/commit/a4157e9680c52a7a14f94ab0eb1a041dc3aebeb4))
* **research:** move contact box into grid spanning full width ([af83eae](https://github.com/sandovaldavid/portfolio-v1/commit/af83eae6837bada9d6a6afb4b8b100d50b8290c9))
* **research:** remove auto-rows-max for proper grid alignment ([68496ad](https://github.com/sandovaldavid/portfolio-v1/commit/68496ad98e245ecfa7e946965e6753df19e1fa85))
* resolve ESLint and build warnings ([7010fc8](https://github.com/sandovaldavid/portfolio-v1/commit/7010fc825d7bc63e30d80d5cb1e5b57c170f08ca))
* resolve Projects component naming conflicts in page components ([06e8944](https://github.com/sandovaldavid/portfolio-v1/commit/06e8944b39a7e321fe9642f1ada219e4f0690076))
* **testing:** correct default language URLs for screenshot capture ([f2daff9](https://github.com/sandovaldavid/portfolio-v1/commit/f2daff9627582bf9be75bb6782e6a7a81eadfbd4))
* **testing:** improve screenshot capture and report generation scripts ([0e6301e](https://github.com/sandovaldavid/portfolio-v1/commit/0e6301e39cd28dd9b8587f9071d0d3f77a4a6775))
* **test:** use Navigation Timing API for page load measurement ([df55577](https://github.com/sandovaldavid/portfolio-v1/commit/df55577c0ba8226694df9a77416172d0e90067de))


### Performance Improvements

* **projects:** optimize images and fix render-blocking fonts ([94fe873](https://github.com/sandovaldavid/portfolio-v1/commit/94fe873390658511215d7394c950b8d08f32d60b))

## [Unreleased]

### Added
- Comprehensive testing infrastructure (Lighthouse CI, Playwright E2E)
- GitHub Pages publishing for test reports
- Bundle size analysis workflow
- Vitest unit testing framework
- CodeQL security scanning
- Dependabot configuration for dependency updates
- Pre-commit git hook for linting and formatting
- Contributing guidelines (CONTRIBUTING.md)
- Performance budgets (lighthouse-budget.json)
- Semantic versioning configuration (release-it)

### Changed
- Updated Astro from 5.15.3 to 5.17.1
- Updated TypeScript from 5.7.2 to 5.9.3
- Updated Tailwind CSS from 4.1.13 to 4.1.18
- Enhanced validation workflow to include unit tests and security audit
- Improved pre-commit hook implementation

### Security
- Added CodeQL analysis for security vulnerabilities
- Added npm audit to CI/CD pipeline
- Configured Dependabot for automated security patches

---

## [0.1.0] - 2026-06-17

### Initial Release

### Added
- Astro 5.15.3 static site generator
- TypeScript 5.7.2 strict mode
- Tailwind CSS 4.1.13 with dark mode support
- Feature-Sliced Design (FSD) architecture
- Internationalization (i18n) - Spanish/English
- Responsive design (mobile-first)
- Dark/light theme system
- Vercel deployment integration
- ESLint and Prettier configuration
- Commitlint for conventional commits
- Husky git hooks
- Lighthouse performance reporting
- Screenshot automation with Playwright
- GitHub Actions workflows for CI/CD
- Comprehensive documentation
  - Architecture (FSD) guide
  - Development workflow
  - Deployment procedures
  - Testing guidelines

### Features
- Multi-language support (ES/EN)
- Adaptive theme detection
- Performance-optimized static generation
- Semantic HTML and accessibility
- SEO-optimized with meta tags and JSON-LD
- Analytics integration with Vercel
- Robots.txt generation

### Performance
- Lighthouse Performance Score: 91/100
- Lighthouse Accessibility Score: 97/100
- Lighthouse Best Practices Score: 96/100
- Lighthouse SEO Score: 100/100
- Zero JavaScript in critical path
- Optimized images (WebP format)

---

## Release Process

Releases are automated using semantic versioning:

```bash
npm run release
# or with pre-release
npm run release -- --preRelease=beta
```

Changes are tracked using Conventional Commits:
- `feat:` generates MINOR version bump
- `fix:` generates PATCH version bump
- `BREAKING CHANGE:` generates MAJOR version bump

For detailed contributing guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

**Maintainer:** David Sandoval
**Email:** hello@sandovaldavid.com | dev@sandovaldavid.com
**Repository:** https://github.com/sandovaldavid/portfolio-v1

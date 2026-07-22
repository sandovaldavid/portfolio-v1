# Toolchain and dependency policy

## Runtime

- Bun is pinned to `1.3.14` through the `packageManager` field in `package.json`.
- Every GitHub Actions workflow and the development container must use the same Bun version.
- `bun.lock` is committed and automated environments install dependencies with `bun install --frozen-lockfile`.
- Compatibility-sensitive browser tooling uses exact versions. The Playwright package, development image and test image must remain aligned.
- `bun run check:devcontainer` enforces the versioned development-environment contract.

See [DEVCONTAINER.md](DEVCONTAINER.md) for setup, rebuild and validation commands.

## Astro framework contract

The application targets Astro 7 with its matching official integrations and Vite 8. `package.json` and `bun.lock` are the only exact version sources; active documentation records supported major-version behavior rather than duplicating patch numbers.

The Astro 7 migration deliberately applies these decisions:

- keep the built-in English-default and `/es` i18n routing contract;
- retain `Astro.currentLocale` and `astro:i18n` as the supported locale APIs for the remaining i18n roadmap;
- accept the default Sätteri Markdown and MDX processing because the repository does not configure remark, rehype or recma plugins;
- preserve Astro 6 whitespace behavior with `compressHTML: true` until visual review proves that the JSX whitespace default is safe for the existing templates;
- keep experimental SVG optimization because Astro 7 still documents it behind `experimental.svgOptimizer`;
- do not add a `src/fetch.ts` advanced-routing entrypoint because the static portfolio does not require a custom request pipeline.

Any future Astro major upgrade must review the official migration guide, regenerate `bun.lock`, run the complete quality suite and record only repository-specific decisions here.

## Dependency classification

Packages required by the generated application remain in `dependencies`. Build, formatting, type-checking, testing and repository-maintenance tools belong in `devDependencies`.

The repository uses compatible version ranges for routine dependencies and exact versions for compatibility-sensitive packages. Dependency updates must include the regenerated lockfile and pass the complete CI suite.

## Releases

The canonical package identifier is `portfolio-v1`. Automated prerelease pull requests are intentionally disabled because production delivery is tied to validated `main` commits, not package publication.

Create stable tags and GitHub Releases manually only for meaningful public milestones according to [DELIVERY.md](DELIVERY.md). Historical `porfolio-dev-*` and beta tags remain immutable repository history.

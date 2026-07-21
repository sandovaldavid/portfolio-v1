# Toolchain and dependency policy

## Runtime

- Bun is pinned to `1.3.14` through the `packageManager` field in `package.json`.
- Every GitHub Actions workflow must use the same Bun version.
- `bun.lock` is committed and CI installs dependencies with `bun install --frozen-lockfile`.

## Dependency classification

Packages required by the generated application remain in `dependencies`. Build, formatting, type-checking, testing and repository-maintenance tools belong in `devDependencies`.

The repository uses compatible version ranges for routine dependencies and exact versions for compatibility-sensitive packages. Dependency updates must include the regenerated lockfile and pass the complete CI suite.

## Releases

The canonical package identifier is `portfolio-v1`. Automated prerelease pull requests are intentionally disabled because production delivery is tied to validated `main` commits, not package publication.

Create stable tags and GitHub Releases manually only for meaningful public milestones according to [DELIVERY.md](DELIVERY.md). Historical `porfolio-dev-*` and beta tags remain immutable repository history.

# Toolchain and dependency policy

## Runtime

- Bun is pinned to `1.3.14` through the `packageManager` field in `package.json`.
- Every GitHub Actions workflow must use the same Bun version.
- `bun.lock` is committed and CI installs dependencies with `bun install --frozen-lockfile`.

## Dependency classification

Packages required by the generated application remain in `dependencies`. Build, formatting, type-checking, testing and repository-maintenance tools belong in `devDependencies`.

The repository uses compatible version ranges for routine dependencies and exact versions for compatibility-sensitive packages. Dependency updates must include the regenerated lockfile and pass the complete CI suite.

## Releases

The canonical package identifier is `portfolio-v1`. Historical `porfolio-dev-*` tags are immutable repository history and are not renamed. Future Release Please tags and release metadata must use the corrected identifier.

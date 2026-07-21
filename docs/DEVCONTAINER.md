# Development container

The repository devcontainer is the recommended environment for implementation, repository checks, Astro development and Playwright work. It keeps the core toolchain aligned with CI while still using the host Docker daemon for nested Docker-based validation.

## Guarantees

The versioned configuration owns these guarantees:

- Ubuntu 24.04 through the Playwright Noble image;
- Bun `1.3.14`, matching `packageManager`;
- Playwright `1.61.1`, matching the exact `@playwright/test` dependency;
- browsers supplied by the Playwright image through `/ms-playwright`;
- frozen dependency installation from `bun.lock`;
- GitHub CLI and Docker Compose support;
- Docker-outside-of-Docker access to the host daemon;
- the same non-root `pwuser` identity for editing and commands.

`bun run check:devcontainer` rejects version or configuration drift. The command also runs as part of `bun run check`.

## Prerequisites

Install and start:

1. Docker Engine or Docker Desktop.
2. Visual Studio Code.
3. The Dev Containers extension.

The host directories `~/.gemini` and `~/.claude` are created before startup and mounted for credential continuity. Assistant CLIs are optional user tools and are not part of the repository's reproducible core toolchain.

## Open the repository

From Visual Studio Code, run **Dev Containers: Reopen in Container**.

After changing `.devcontainer/devcontainer.json`, `.devcontainer/Dockerfile` or a referenced Feature, run **Dev Containers: Rebuild Container**. Reopening an existing container does not rebuild its image.

The post-create script performs the following checks:

```bash
bun --version
bun install --frozen-lockfile
bunx playwright --version
bun run check:devcontainer
docker --version
docker compose version
```

A successful setup prints the resolved Bun, Playwright and workspace values. A stopped host Docker daemon produces a warning; start Docker before running Docker-backed commands.

## Daily development

```bash
bun run dev
bun run check
bun run test:unit:ci
bun run build
bun run test:e2e:smoke
bun run test:e2e:desktop
bun run test:e2e:extended
```

Astro uses port `4321`, which the devcontainer forwards automatically.

## Visual testing

A native visual run executes directly in the devcontainer:

```bash
RUN_VISUAL_TESTS=true bun run test:e2e:visual
```

Use it for diagnostics and local UI iteration. Screenshot rendering can differ across host kernels, graphics stacks and container configurations.

PR #150 introduces the merge-grade command below and the pinned screenshot contract it uses:

```bash
bun run test:e2e:visual:docker
```

The devcontainer is prepared to run that command through Docker-outside-of-Docker. The inner pinned test container remains the authoritative visual environment; the outer devcontainer is the development shell.

Never regenerate committed snapshots merely to satisfy a native devcontainer mismatch. Reviewed updates must be generated in the pinned visual container and followed by a complete run without `--update-snapshots`.

## Version updates

A Playwright or Bun upgrade is one coordinated change. Update all applicable owners together:

1. `package.json`;
2. `bun.lock` when dependency resolution changes;
3. `.devcontainer/Dockerfile` build arguments;
4. `.devcontainer/devcontainer.json` build arguments;
5. Docker test images and reviewed visual baselines when applicable.

Then rebuild the devcontainer and run:

```bash
bun run check
bun run test:unit:ci
bun run build
```

Playwright image and package versions must match. A mismatch can prevent the installed Playwright client from locating the image's browser executables.

# Development container

The repository devcontainer is the recommended environment for implementation, repository checks, Astro development and Playwright work. It keeps the core toolchain aligned with CI while still using the host Docker daemon for nested Docker-based validation.

## Guarantees

The versioned configuration owns these guarantees:

- Ubuntu 24.04 through the Playwright Noble image;
- Bun `1.3.14`, matching `packageManager`;
- Playwright `1.61.1`, matching the exact `@playwright/test` dependency;
- browsers supplied by the Playwright image through `/ms-playwright`;
- frozen dependency installation from `bun.lock`;
- a container-owned named volume for `node_modules`;
- repair of known ignored/generated workspace paths left by another UID;
- GitHub CLI and Docker Compose support;
- Docker-outside-of-Docker access to the host daemon;
- the same non-root `pwuser` identity for editing and commands.

`bun run check:devcontainer` rejects version, mount, repair-policy or configuration drift. The command also runs as part of `bun run check`.

## Prerequisites

Install and start:

1. Docker Engine or Docker Desktop.
2. Visual Studio Code.
3. The Dev Containers extension.

The host directories `~/.gemini` and `~/.claude` are created before startup and mounted for credential continuity. Assistant CLIs are optional user tools and are not part of the repository's reproducible core toolchain.

## Workspace and dependencies

The repository source is bind-mounted at `/workspaces/portfolio-v1`. The host checkout remains the source of truth for code, documentation and Git state.

`node_modules` is deliberately different. The path `/workspaces/portfolio-v1/node_modules` is overlaid with the Docker named volume `portfolio-v1-devcontainer-node_modules` when the local repository directory is named `portfolio-v1`.

This separation prevents the devcontainer from reusing dependency links created by:

- a native host installation;
- another package manager;
- the pinned visual-test container;
- an interrupted or differently configured Bun installation.

The post-create lifecycle verifies that `node_modules` is a separate mount, assigns its root to `pwuser` and then performs a frozen Bun installation. The permanent workflow runs two additional consecutive frozen installations to prove that setup is idempotent.

## Open the repository

From Visual Studio Code, run **Dev Containers: Reopen in Container**.

After changing `.devcontainer/devcontainer.json`, `.devcontainer/Dockerfile`, the dependency mount or a referenced Feature, run **Dev Containers: Rebuild Container**. Reopening an existing container does not rebuild its image or apply new mount declarations.

The post-create script performs the following checks:

```bash
bash .devcontainer/repair-workspace-permissions.sh
bun --version
bun install --frozen-lockfile
bunx playwright --version
bun run check:devcontainer
docker --version
docker compose version
```

A successful setup prints the resolved Bun, Playwright, workspace and isolated dependency paths. A stopped host Docker daemon produces a warning; start Docker before running Docker-backed commands.

## Recover a stale dependency volume

A normal rebuild preserves the named `node_modules` volume to avoid reinstalling every package from scratch. If that isolated volume itself becomes corrupted, close the devcontainer and remove only the dependency volume from a host terminal:

```bash
docker volume rm portfolio-v1-devcontainer-node_modules
```

Then run **Dev Containers: Rebuild Container**. Docker creates a fresh empty volume and the post-create lifecycle restores dependencies from `bun.lock`.

Do not delete the repository or reset Git to repair dependencies. Removing this named volume affects installed packages only.

## Recover stale generated artifacts

The source checkout is a host bind mount, so generated output from a previous native command, container or UID can remain visible after a rebuild. Typical symptoms are `EACCES` errors involving:

- `.astro`;
- `playwright-report` or `test-results`;
- `test-results.json` or `junit-results.xml`;
- `.docker/runtime`.

The post-create lifecycle repairs these known ignored/generated paths automatically. The Docker visual wrapper repeats the repair before using `.docker/runtime` when it runs inside the devcontainer.

Run the repair manually inside the devcontainer when needed:

```bash
bash .devcontainer/repair-workspace-permissions.sh
```

The script uses an explicit allowlist and refuses symbolic links. It does not recursively change ownership of the repository root or tracked source files. `.docker/` is also excluded from Prettier traversal because it contains container runtime state rather than repository content.

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

The merge-grade visual command is:

```bash
bun run test:e2e:visual:docker
```

The devcontainer runs that command through Docker-outside-of-Docker. The inner pinned test container remains the authoritative visual environment; the outer devcontainer is the development shell.

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

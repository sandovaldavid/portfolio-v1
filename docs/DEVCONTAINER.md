# Development container

The repository devcontainer is the recommended environment for implementation, repository checks, Astro development and Playwright work. It keeps the core toolchain aligned with CI while still using the host Docker daemon for nested Docker-based validation.

## Guarantees

The versioned configuration owns these guarantees:

- Ubuntu 24.04 through the Playwright Noble image;
- Bun `1.3.14`, matching `packageManager`;
- Playwright `1.61.1`, matching the exact `@playwright/test` dependency;
- browsers supplied by the Playwright image through `/ms-playwright`;
- a normalized `pwuser` UID/GID of `1000:1000` before Dev Containers applies host-specific remapping;
- the same non-root `pwuser` identity for the default container process, VS Code, terminals, tasks and lifecycle commands;
- a Docker init process as PID 1 and host IPC for direct Chromium execution;
- frozen dependency installation from `bun.lock`;
- a writable, versioned Bun home at `/home/pwuser/.bun`;
- a container-owned named volume for `node_modules`;
- one-time recovery of inherited dependency-volume ownership through a versioned owner marker;
- repair of Git metadata and known ignored/generated workspace paths left by another UID;
- repair during create, container start and VS Code attach lifecycle events;
- GitHub CLI and Docker Compose support;
- Docker-outside-of-Docker access to the host daemon;
- explicit propagation of the real host workspace path to nested test containers.

`bun run check:devcontainer` rejects version, user, init, IPC, mount, lifecycle, identity, repair-policy or configuration drift. The command also runs as part of `bun run check`.

## Intentional project-specific choices

This repository does not copy a generic `vscode` and `/workspace` template literally:

- `pwuser` is retained because it is the non-root user supplied by the pinned Playwright base image. The Dockerfile normalizes it before Dev Containers applies host-specific remapping and ends with `USER pwuser`.
- `/workspaces/portfolio-v1` remains the canonical workspace because the devcontainer, validation workflow and repository scripts share that contract.
- `waitFor` remains `postStartCommand`. Lifecycle stages execute in order, so a first creation still completes `postCreateCommand`; later starts also block VS Code attachment until Git, Bun, dependency and generated-state repair has completed.
- the named `node_modules` volume remains enabled to isolate Linux dependencies from the host and from the pinned nested Playwright container. Its ownership is managed explicitly instead of relying on the volume's previous state.
- Bash remains the default terminal because it is installed and versioned by the image. The repository does not declare zsh unless the Dockerfile owns that dependency.

## Prerequisites

Install and start:

1. Docker Engine or Docker Desktop.
2. Visual Studio Code.
3. The Dev Containers extension.

The host directories `~/.gemini` and `~/.claude` are created before startup and mounted for credential continuity. Assistant CLIs are optional user tools and are not part of the repository's reproducible core toolchain.

## Workspace and dependencies

The repository source is bind-mounted at `/workspaces/portfolio-v1`. The host checkout remains the source of truth for code, documentation and Git state.

On native Linux, a bind mount preserves the numeric host UID and GID. The development image therefore normalizes `pwuser` to `1000:1000`, and Dev Containers may remap that identity when a different host UID is detected during container creation. The startup repair refuses to change repository ownership when the running user and workspace owner do not match.

`node_modules` is deliberately different. The path `/workspaces/portfolio-v1/node_modules` is overlaid with the Docker named volume `portfolio-v1-devcontainer-node_modules` when the local repository directory is named `portfolio-v1`.

This separation prevents the devcontainer from reusing dependency links created by:

- a native host installation;
- another package manager;
- the pinned visual-test container;
- an interrupted or differently configured Bun installation.

The permission lifecycle stores `.devcontainer-volume-state` inside the named volume. When the marker is missing, uses another schema or identifies another UID/GID, the lifecycle repairs the complete volume once. Later starts repair only mutable tool paths such as `.bin`, `.cache`, `.vite` and `.vite-temp`, then verify that a probe file can be created and removed.

Bun itself is installed under `/home/pwuser/.bun`. The lifecycle stores `.devcontainer-owner-state` there, repairs inherited ownership only when the schema or numeric identity changes, restores the mutable global cache and verifies write access. This matters on Linux because Bun can populate project dependencies from its global cache using hardlinks.

The post-create lifecycle verifies that `node_modules` is a separate mount and prepared for `pwuser` before performing a frozen Bun installation. The permanent workflow deliberately changes both the Bun cache and the entire dependency volume to another numeric UID, creates a stale Vite cache and proves that two consecutive frozen installations plus Vitest succeed after recovery.

## Open the repository

From Visual Studio Code, run **Dev Containers: Reopen in Container**.

After changing `.devcontainer/devcontainer.json`, `.devcontainer/Dockerfile`, the dependency mount, lifecycle commands, `init`, `runArgs` or a referenced Feature, run **Dev Containers: Rebuild Container**. Reopening an existing container does not rebuild its image or apply new mount, user, init or environment declarations.

The startup lifecycle repairs writable Git, Bun, dependency and generated state before VS Code extensions begin repository operations. The attach lifecycle repeats the inexpensive marker and mutable-cache checks for an already-running container.

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

## Validate a runtime configuration update

Changes to `init`, `runArgs`, users, mounts or container-wide environment variables require a real rebuild. After pulling such a change, run **Dev Containers: Rebuild Container** and verify inside the new container:

```bash
test "$(id -u)" = "$(stat -c '%u' /workspaces/portfolio-v1)"
test "$TERM" = "xterm-256color"
cat "$BUN_INSTALL/.devcontainer-owner-state"
cat node_modules/.devcontainer-volume-state
bun install --frozen-lockfile
bun run check
bun run test:unit:ci
bun run build
bun run test:e2e:smoke
bun run test:e2e:visual:docker
git status --short
```

The visual suite must complete without updating snapshots. The final Git status must not contain generated output or local-only assistant configuration staged for commit.

## Recover a stale dependency volume

A normal rebuild preserves the named `node_modules` volume to avoid reinstalling every package from scratch. An inherited volume can contain links or Vite caches written by the UID of an older container. Typical symptoms are repeated Bun `EEXIST` link failures or `EACCES` under `node_modules/.vite-temp`.

After updating the branch, run inside a correctly aligned devcontainer:

```bash
bash .devcontainer/repair-workspace-permissions.sh
cat "$BUN_INSTALL/.devcontainer-owner-state"
cat node_modules/.devcontainer-volume-state
bun install --frozen-lockfile
```

Both states must identify the current numeric UID/GID, for example:

```text
schema=1 uid=1000 gid=1000
```

This repair is safe because `node_modules` is a disposable named volume and the Bun path is restricted to `/home/pwuser/.bun`; neither operation recursively changes tracked source.

If the isolated volume remains structurally corrupted after the automatic recovery, close the devcontainer and remove only that volume from a host terminal:

```bash
docker volume rm portfolio-v1-devcontainer-node_modules
```

Then run **Dev Containers: Rebuild Container**. Docker creates a fresh empty volume and the post-create lifecycle restores dependencies from `bun.lock`.

Do not delete the repository or reset Git to repair dependencies. Removing this named volume affects installed packages only.

## Recover a stale container identity

A log that starts an existing container and includes `--skip-post-create` is not a rebuild. On Linux, an old container may retain a different numeric UID from the host checkout. The repair script reports both identities and exits before changing `.git` or generated paths.

From a host terminal in the repository, inspect the ownership first:

```bash
id
stat -c 'workspace=%u:%g %n' .
docker inspect --format '{{.Config.User}}' <container-id>
```

Restore host ownership only for paths that currently exist and were previously changed by a container:

```bash
for path in \
	.git .astro dist coverage playwright-report test-results \
	test-results.json junit-results.xml .docker; do
	if [ -e "$path" ]; then
		sudo chown -R "$(id -u):$(id -g)" "$path"
	fi
done
```

Remove the stale container shown in the Dev Containers log:

```bash
docker rm -f <container-id>
```

Then run **Dev Containers: Rebuild Container Without Cache**. A successful container must satisfy:

```bash
test "$(id -u)" = "$(stat -c '%u' /workspaces/portfolio-v1)"
test -w /workspaces/portfolio-v1
```

Do not use recursive `chown` on the entire repository. Tracked source remains owned by the host user.

## Recover stale Git or generated artifacts

The source checkout is a host bind mount, so Git metadata and generated output from a previous native command, container or UID can remain visible after a rebuild. Typical symptoms are `EACCES` errors involving:

- `.git/FETCH_HEAD`;
- `.astro`;
- `playwright-report` or `test-results`;
- `test-results.json` or `junit-results.xml`;
- `.docker/runtime`.

The create, start and attach lifecycles repair the actual Git directory and the known ignored/generated paths automatically. Direct Playwright commands repeat the repair before creating reports, and the Docker visual wrapper repeats it before using `.docker/runtime`.

Run the repair manually inside a correctly aligned devcontainer when needed:

```bash
bash .devcontainer/repair-workspace-permissions.sh
```

The script first requires the running UID to match the Linux workspace owner. It then restricts Bun repair to `/home/pwuser/.bun`, resolves the actual Git directory, requires it to remain under the repository and refuses symbolic links. It repairs Bun state, Git metadata, the isolated dependency volume and an explicit generated-path allowlist; it never recursively changes ownership of the repository root or tracked source files. `.docker/` is outside both Prettier and ESLint scope because it contains container runtime state rather than repository content.

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

All direct Playwright scripts use `scripts/run-playwright.mjs`, which repairs stale generated reports only when `DEVCONTAINER=true` and then delegates to the pinned project client.

Astro uses port `4321`, which the devcontainer forwards automatically.

## Visual testing

A native visual run executes directly in the devcontainer:

```bash
RUN_VISUAL_TESTS=true bun run test:e2e:visual
```

The outer devcontainer uses Docker init and host IPC, matching Playwright's recommended process and Chromium shared-memory settings for direct browser execution.

Use the native run for diagnostics and local UI iteration. Screenshot rendering can differ across host kernels, graphics stacks and container configurations.

The merge-grade visual command is:

```bash
bun run test:e2e:visual:docker
```

The devcontainer exports the real host checkout as `HOST_WORKSPACE_FOLDER`. Docker Compose uses that host path rather than `/workspaces/portfolio-v1`, which exists only inside the outer devcontainer. The wrapper verifies that `/workspace/package.json` and `/workspace/bun.lock` are visible in the inner pinned container before installation or tests begin.

The inner pinned test container also uses `init: true` and `ipc: host` and remains the authoritative visual environment; the outer devcontainer is the development shell.

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

#!/usr/bin/env bash
set -euo pipefail

REPOSITORY_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPOSITORY_ROOT"

bash .devcontainer/repair-workspace-permissions.sh

host_git_name=""
host_git_email=""

for host_git_config in \
	/mnt/devcontainer-host-xdg-gitconfig \
	/mnt/devcontainer-host-gitconfig; do
	if [[ ! -r "$host_git_config" ]]; then
		continue
	fi

	candidate_name="$(git config --file "$host_git_config" --get user.name 2>/dev/null || true)"
	candidate_email="$(git config --file "$host_git_config" --get user.email 2>/dev/null || true)"

	if [[ -n "$candidate_name" ]]; then
		host_git_name="$candidate_name"
	fi

	if [[ -n "$candidate_email" ]]; then
		host_git_email="$candidate_email"
	fi
done

repository_git_name="$(git config --local --get user.name 2>/dev/null || true)"
repository_git_email="$(git config --local --get user.email 2>/dev/null || true)"

if [[ -z "$repository_git_name" && -n "$host_git_name" ]]; then
	git config --local user.name "$host_git_name"
	repository_git_name="$host_git_name"
fi

if [[ -z "$repository_git_email" && -n "$host_git_email" ]]; then
	git config --local user.email "$host_git_email"
	repository_git_email="$host_git_email"
fi

if [[ -z "$repository_git_name" || -z "$repository_git_email" ]]; then
	cat >&2 <<'EOF'
Git commit identity is incomplete inside the development container.
Configure it on the host with:

  git config --global user.name "Your Name"
  git config --global user.email "you@example.com"

Then rebuild the development container. Existing repository-local values are never overwritten.
EOF
else
	printf 'Git identity: %s <%s> (repository-local)\n' "$repository_git_name" "$repository_git_email"
fi

dependency_directory="$REPOSITORY_ROOT/node_modules"

if ! awk -v target="$dependency_directory" '$5 == target { found = 1 } END { exit !found }' /proc/self/mountinfo; then
	echo "node_modules is not mounted as an isolated devcontainer volume: $dependency_directory" >&2
	echo "Rebuild the development container after updating main." >&2
	exit 1
fi

sudo chown "$(id -u):$(id -g)" "$dependency_directory"

expected_dependency_state="schema=1 uid=$(id -u) gid=$(id -g)"
actual_dependency_state="$(cat "$dependency_directory/.devcontainer-volume-state" 2>/dev/null || true)"

if [[ "$actual_dependency_state" != "$expected_dependency_state" ]]; then
	echo "The isolated node_modules volume was not prepared for $(id -u):$(id -g)." >&2
	exit 1
fi

if [[ ! -w "$dependency_directory" ]]; then
	echo "The isolated node_modules volume is not writable by $(id -un)." >&2
	exit 1
fi

expected_bun_version="$(node -p "require('./package.json').packageManager.split('@').at(-1)")"
actual_bun_version="$(bun --version)"

if [[ "$actual_bun_version" != "$expected_bun_version" ]]; then
	echo "Bun version mismatch: expected $expected_bun_version, received $actual_bun_version." >&2
	exit 1
fi

bun install --frozen-lockfile

expected_playwright_version="$(node -p "require('./package.json').devDependencies['@playwright/test'].replace(/^[^0-9]*/, '')")"
actual_playwright_version="$(bunx playwright --version | awk '{print $2}')"

if [[ "$actual_playwright_version" != "$expected_playwright_version" ]]; then
	echo "Playwright version mismatch: expected $expected_playwright_version, received $actual_playwright_version." >&2
	exit 1
fi

bun run check:devcontainer

docker --version
docker compose version

if docker info >/dev/null 2>&1; then
	echo "Docker daemon connection: available"
else
	echo "Docker daemon connection: unavailable. Start the host Docker daemon before running Docker-backed tests." >&2
fi

printf '\nDevelopment container ready.\n'
printf 'Bun: %s\n' "$actual_bun_version"
printf 'Playwright: %s\n' "$actual_playwright_version"
printf 'Workspace: %s\n' "$REPOSITORY_ROOT"
printf 'Dependencies: %s (isolated volume)\n' "$dependency_directory"

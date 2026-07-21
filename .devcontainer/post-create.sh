#!/usr/bin/env bash
set -euo pipefail

REPOSITORY_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPOSITORY_ROOT"

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

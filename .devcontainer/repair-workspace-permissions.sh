#!/usr/bin/env bash
set -euo pipefail

if [[ "${DEVCONTAINER:-}" != "true" ]]; then
	echo "Workspace permission repair is restricted to the development container." >&2
	exit 1
fi

REPOSITORY_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPOSITORY_ROOT"

owner="$(id -u):$(id -g)"

generated_paths=(
	.astro
	dist
	coverage
	playwright-report
	test-results
	test-results.json
	junit-results.xml
	bundle-analysis
	bundle-stats.html
	.lighthouseci
	lighthouse-report
	performance-report
	.docker
)

for path in "${generated_paths[@]}"; do
	if [[ -L "$path" ]]; then
		echo "Refusing to repair generated path because it is a symbolic link: $path" >&2
		exit 1
	fi

	if [[ -e "$path" ]]; then
		sudo chown -R "$owner" -- "$path"
		sudo chmod -R u+rwX -- "$path"
	fi
done

mkdir -p .docker/runtime/node_modules .docker/runtime/home

for path in .docker .docker/runtime .docker/runtime/node_modules .docker/runtime/home; do
	if [[ ! -w "$path" ]]; then
		echo "Generated runtime path is not writable after repair: $path" >&2
		exit 1
	fi
done

printf 'Generated workspace paths are writable by %s.\n' "$(id -un)"

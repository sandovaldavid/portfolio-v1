#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

export CI="${CI:-true}"
export RUN_VISUAL_TESTS="${RUN_VISUAL_TESTS:-}"
export HOST_UID="$(id -u)"
export HOST_GID="$(id -g)"

if [[ "${DEVCONTAINER:-}" == "true" ]]; then
	bash .devcontainer/repair-workspace-permissions.sh
fi

mkdir -p .docker/runtime/node_modules .docker/runtime/home

for directory in .docker/runtime/node_modules .docker/runtime/home; do
	if [[ ! -w "$directory" ]]; then
		echo "Docker runtime directory is not writable: $directory" >&2
		echo "Remove .docker/runtime and rerun the command as your normal user." >&2
		exit 1
	fi
done

echo "==> Building pinned Playwright test image..."
docker compose build playwright

echo "==> Running Playwright E2E tests in the pinned container..."
docker compose run --rm \
	-e CI \
	-e RUN_VISUAL_TESTS \
	playwright "$@"

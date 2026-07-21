#!/usr/bin/env bash
set -euo pipefail

if [[ "${DEVCONTAINER:-}" != "true" ]]; then
	echo "Workspace permission repair is restricted to the development container." >&2
	exit 1
fi

REPOSITORY_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPOSITORY_ROOT"

owner="$(id -u):$(id -g)"

git_directory="$(git rev-parse --absolute-git-dir 2>/dev/null || true)"
if [[ -n "$git_directory" ]]; then
	case "$git_directory" in
		"$REPOSITORY_ROOT"/.git | "$REPOSITORY_ROOT"/.git/*)
			if [[ -L "$git_directory" ]]; then
				echo "Refusing to repair Git metadata because it is a symbolic link: $git_directory" >&2
				exit 1
			fi

			sudo chown -R --no-dereference "$owner" -- "$git_directory"
			sudo chmod -R u+rwX -- "$git_directory"

			if [[ ! -w "$git_directory" ]]; then
				echo "Git metadata is not writable after repair: $git_directory" >&2
				exit 1
			fi
			;;
		*)
			echo "Refusing to repair Git metadata outside the repository: $git_directory" >&2
			exit 1
			;;
	esac
fi

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
		sudo chown -R --no-dereference "$owner" -- "$path"
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

printf 'Git metadata and generated workspace paths are writable by %s.\n' "$(id -un)"

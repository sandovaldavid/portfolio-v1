#!/usr/bin/env bash
set -euo pipefail

mkdir -p "$HOME/.gemini" "$HOME/.claude"

identity_directory="$HOME/.cache/portfolio-v1-devcontainer"
identity_file="$identity_directory/git-identity.gitconfig"
mkdir -p "$identity_directory"

temporary_identity_file="$(mktemp "$identity_directory/git-identity.XXXXXX")"
trap 'rm -f "$temporary_identity_file"' EXIT

resolved_name="$(git config --get user.name 2>/dev/null || true)"
resolved_email="$(git config --get user.email 2>/dev/null || true)"

: > "$temporary_identity_file"

if [[ -n "$resolved_name" ]]; then
	git config --file "$temporary_identity_file" user.name "$resolved_name"
fi

if [[ -n "$resolved_email" ]]; then
	git config --file "$temporary_identity_file" user.email "$resolved_email"
fi

chmod 600 "$temporary_identity_file"
mv "$temporary_identity_file" "$identity_file"
trap - EXIT

if [[ -n "$resolved_name" && -n "$resolved_email" ]]; then
	printf 'Prepared devcontainer Git identity for %s <%s>.\n' "$resolved_name" "$resolved_email"
else
	cat >&2 <<'EOF'
Host Git identity could not be resolved for this checkout.
Configure user.name and user.email on the host, then rebuild the development container.
EOF
fi

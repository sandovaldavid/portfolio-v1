#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
workspace_root="$(cd "$script_dir/../.." && pwd)"
target="$workspace_root/.devcontainer/host-allowed-signers"

if [[ -r "$HOME/.config/git/allowed_signers" ]]; then
	cp "$HOME/.config/git/allowed_signers" "$target"
	printf 'Copied allowed_signers from host to %s\n' "$target"
else
	rm -f "$target"
	cat >&2 <<'WARN'
No ~/.config/git/allowed_signers found on host.
SSH commit signing will not work inside the devcontainer.
Create the file on the host with your SSH public keys:
  echo 'your@email.com namespaces="git" ssh-ed25519 AAAA...' > ~/.config/git/allowed_signers
WARN
fi

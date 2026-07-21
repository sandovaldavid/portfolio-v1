#!/usr/bin/env bash
set -euo pipefail

if ! command -v unzip &> /dev/null; then
  echo "==> Installing unzip..."
  sudo apt-get update -qq && sudo apt-get install -y -qq unzip
fi

if ! command -v bun &> /dev/null; then
  echo "==> Installing Bun..."
  curl -fsSL https://bun.sh/install | bash
fi

export PATH="/home/pwuser/.bun/bin:${PATH}"
export BUN_INSTALL="/home/pwuser/.bun"

echo "==> Installing dependencies..."
bun install --frozen-lockfile

echo "==> Running Playwright tests..."
bunx playwright test "$@"

#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Building test image..."
docker compose build playwright

echo "==> Running Playwright E2E tests..."
docker compose run --rm playwright

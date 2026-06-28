#!/usr/bin/env bash
# Regenerate webkit and Mobile Safari visual snapshots using Docker.
# Requires Docker running and port 4321 available.
set -e

echo "Building project..."
bun run build

echo "Starting preview server..."
bun run preview &
SERVER_PID=$!

# Wait for the server to be ready
until curl -sf http://localhost:4321 > /dev/null 2>&1; do
  sleep 1
done
echo "Preview server ready."

echo "Regenerating webkit + Mobile Safari snapshots in Docker..."
docker run --rm \
  -v "$(pwd):/work" \
  -w /work \
  --network=host \
  --security-opt label=disable \
  mcr.microsoft.com/playwright:v1.61.0-noble \
  node node_modules/@playwright/test/cli.js test \
    tests/e2e/visual.spec.ts \
    --project=webkit --project="Mobile Safari" \
    --update-snapshots \
    --output=/tmp/pw-test-results

echo "Stopping preview server..."
kill "$SERVER_PID" 2>/dev/null || true

echo "Done. Review new PNGs in tests/e2e/visual.spec.ts-snapshots/ before committing."

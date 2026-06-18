#!/bin/bash

# Script to generate testing artifacts (screenshots and Lighthouse reports)
# Usage: bash docs/testing/generate-reports.sh

set -e

echo "🚀 Portfolio Testing Artifact Generator"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Check if dev dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    bun install
fi

# Start dev server in background if not running
if ! lsof -Pi :4321 -sTCP:LISTEN -t >/dev/null; then
    echo "🔧 Starting dev server..."
    bun run dev &
    DEV_PID=$!
    sleep 3
    echo "✓ Dev server started (PID: $DEV_PID)"
else
    echo "✓ Dev server already running on :4321"
    DEV_PID=""
fi

echo ""
echo "📸 Taking screenshots..."
echo "   This requires Claude Code /verify skill or Playwright"
echo ""
echo "   Screenshot device types to capture:"
echo "   ✓ Mobile (iPhone 12 Pro 390x844)"
echo "   ✓ Tablet (iPad Pro 1024x1366)"
echo "   ✓ Desktop (1920x1080 or larger)"
echo ""
echo "   Use Claude Code: /verify"
echo "   - Start dev server on localhost:4321"
echo "   - Takes responsive screenshots across all device sizes"
echo "   - Saves to docs/testing/screenshots/{mobile,tablet,desktop}/"
echo ""

echo "🔦 Generating Lighthouse reports..."
echo "   This requires Chrome/Chromium to be installed"
echo ""
echo "   Option 1 - Using Claude Code (recommended):"
echo "     - Use: /verify"
echo ""
echo "   Option 2 - Using Lighthouse CLI:"
echo "     - npm install -g lighthouse (if not installed)"
echo "     - lighthouse http://localhost:4321 --output=json --output-path=docs/testing/lighthouse/latest.json"
echo "     - lighthouse http://localhost:4321 --output=html --output-path=docs/testing/lighthouse/latest.html"
echo ""

# Cleanup
if [ ! -z "$DEV_PID" ]; then
    echo "Stopping dev server..."
    kill $DEV_PID 2>/dev/null || true
fi

echo ""
echo "✅ Done! Check docs/testing/ for your artifacts."
echo ""
echo "📖 For more information, see: docs/testing/README.md"

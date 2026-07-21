#!/bin/bash

# Script to generate testing artifacts (screenshots and Lighthouse reports)
# Usage: bash docs/testing/generate-reports.sh

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

# Check if dev server is already running (cross-platform)
DEV_ALREADY_RUNNING=false
if netstat -tuln 2>/dev/null | grep -q :4321 || lsof -Pi :4321 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✓ Dev server already running on :4321"
    DEV_ALREADY_RUNNING=true
else
    echo "🔧 Starting dev server on :4321..."
    bun run dev > /tmp/portfolio-dev.log 2>&1 &
    DEV_PID=$!

    # Wait for server to be ready
    max_attempts=30
    attempt=0
    while [ $attempt -lt $max_attempts ]; do
        if nc -z localhost 4321 2>/dev/null; then
            break
        fi
        sleep 1
        attempt=$((attempt + 1))
    done

    if [ $attempt -eq $max_attempts ]; then
        echo "❌ Dev server failed to start"
        exit 1
    fi
    echo "✓ Dev server started (PID: $DEV_PID)"
fi

echo ""
echo "📸 Capturing screenshots automatically..."
echo "   Device types: Mobile (390x844) | Tablet (1024x1366) | Desktop (1920x1080)"
echo ""

# Capture screenshots using Playwright
bun run screenshots

SCREENSHOT_RESULT=$?
if [ $SCREENSHOT_RESULT -eq 0 ]; then
    echo "✅ Screenshots captured successfully!"
else
    echo "⚠️  Some screenshots may not have been captured."
fi

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

echo "✅ Testing artifacts generated!"
echo ""

if [ -d "docs/testing/screenshots" ] && [ "$(ls -A docs/testing/screenshots 2>/dev/null)" ]; then
    echo "📸 Screenshots location:"
    echo "   docs/testing/screenshots/{mobile,tablet,desktop}/"
else
    echo "⚠️  No screenshots found. Check if dev server is running."
fi

echo ""
echo "📖 For more information, see: docs/testing/README.md"
echo ""

# Cleanup (only kill if we started it)
if [ "$DEV_ALREADY_RUNNING" = false ] && [ ! -z "$DEV_PID" ]; then
    echo "💡 Dev server still running. Stop with: kill $DEV_PID"
fi

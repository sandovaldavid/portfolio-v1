#!/usr/bin/env node

/**
 * Automated screenshot capture script using Playwright
 * Captures responsive screenshots at mobile, tablet, and desktop sizes
 *
 * Usage: node docs/testing/capture-screenshots.mjs
 */

import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'http://localhost:4321';

// Screenshot configurations
const devices = {
	mobile: {
		width: 390,
		height: 844,
		name: 'iPhone 12 Pro',
		dir: 'mobile',
	},
	tablet: {
		width: 1024,
		height: 1366,
		name: 'iPad Pro',
		dir: 'tablet',
	},
	desktop: {
		width: 1920,
		height: 1080,
		name: 'Desktop',
		dir: 'desktop',
	},
};

const pages = [
	// English (default, no prefix)
	{ url: '/', name: 'home-en' },
	{ url: '/about-me', name: 'about-en' },
	{ url: '/projects', name: 'projects-en' },
	// Spanish (/es prefix)
	{ url: '/es/', name: 'home-es' },
	{ url: '/es/sobre-mi', name: 'about-es' },
	{ url: '/es/proyectos', name: 'projects-es' },
];

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
}

/**
 * Capture screenshot for a page at a specific device size
 */
async function captureScreenshot(page, device, pageConfig) {
	const viewport = {
		width: device.width,
		height: device.height,
	};

	await page.setViewportSize(viewport);

	const filename = `${device.dir}_${pageConfig.name}.png`;
	const filepath = path.join(__dirname, 'screenshots', device.dir, filename);

	try {
		await page.goto(`${BASE_URL}${pageConfig.url}`, {
			waitUntil: 'networkidle',
			timeout: 10000,
		});

		// Wait for images to load
		await page.waitForTimeout(1000);

		await page.screenshot({
			path: filepath,
			fullPage: false,
		});

		console.log(`✓ ${device.name.padEnd(10)} | ${pageConfig.name.padEnd(10)} | ${filename}`);
		return true;
	} catch (error) {
		console.error(`✗ ${device.name.padEnd(10)} | ${pageConfig.name.padEnd(10)} | Error: ${error.message}`);
		return false;
	}
}

/**
 * Main execution
 */
async function main() {
	console.log('📸 Screenshot Capture Tool');
	console.log('==========================\n');

	// Ensure directories exist
	Object.values(devices).forEach((device) => {
		ensureDir(path.join(__dirname, 'screenshots', device.dir));
	});

	console.log(`Target: ${BASE_URL}\n`);
	console.log('Capturing screenshots...\n');
	console.log('Device      | Page       | Filename');
	console.log('------------|------------|----------------------------');

	let browser;
	let successCount = 0;
	let totalCount = 0;

	try {
		browser = await chromium.launch();
		const page = await browser.newPage();

		// Disable animations for consistent screenshots
		await page.addInitScript(() => {
			document.documentElement.style.scrollBehavior = 'auto';
		});

		// Capture screenshots for each combination
		for (const device of Object.values(devices)) {
			for (const pageConfig of pages) {
				totalCount++;
				const success = await captureScreenshot(page, device, pageConfig);
				if (success) successCount++;
			}
		}

		await page.close();
		await browser.close();

		console.log('------------|------------|----------------------------\n');
		console.log(`✅ Complete: ${successCount}/${totalCount} screenshots captured\n`);

		if (successCount === totalCount) {
			console.log('📁 Screenshots saved to:');
			console.log('   docs/testing/screenshots/mobile/');
			console.log('   docs/testing/screenshots/tablet/');
			console.log('   docs/testing/screenshots/desktop/');
			process.exit(0);
		} else {
			console.error('⚠️  Some screenshots failed to capture.');
			process.exit(1);
		}
	} catch (error) {
		console.error('❌ Error:', error.message);
		if (browser) await browser.close();
		process.exit(1);
	}
}

// Run main function
main().catch((error) => {
	console.error('Fatal error:', error);
	process.exit(1);
});

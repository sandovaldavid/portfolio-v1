import { test, expect } from './fixtures';
import type { Page } from '@playwright/test';

/**
 * Prepares the page for visual regression testing by:
 * 1. Waiting for the DOM and network to be idle.
 * 2. Ensuring all images are fully loaded.
 * 3. Hiding fixed/absolute floating overlays (header, sidebar, Recruiter HUD) that overlap screenshots.
 * 4. Disabling smooth scrolling and css transitions/animations to prevent rendering flakiness.
 */
async function preparePage(page: Page, path: string, options: { hideHeader?: boolean } = {}) {
	const { hideHeader = true } = options;

	// Navigate to the target path
	await page.goto(path);

	// Wait for DOM content to be loaded and network activity to be idle
	await page.waitForLoadState('domcontentloaded');
	await page.waitForLoadState('networkidle');

	// Wait for all images on the page to be fully loaded
	await page.evaluate(async () => {
		const images = Array.from(document.querySelectorAll('img'));
		await Promise.all(
			images.map((img) => {
				if (img.complete) return Promise.resolve();
				return new Promise((resolve) => {
					img.addEventListener('load', resolve);
					img.addEventListener('error', resolve);
				});
			})
		);
	});

	// Build selectors of elements to hide during screenshots
	const selectorsToHide = [
		'aside#contact-sidebar',
		'#hud-toggle-btn',
		'#hud-panel',
		'#hud-hint',
		'#cli-overlay',
		'#cli-i18n',
		'#shortcuts-modal',
		'#easter-egg-overlay',
	];
	if (hideHeader) {
		selectorsToHide.push('header');
	}

	// Inject CSS to hide overlays and disable animations/transitions/smooth scroll
	await page.addStyleTag({
		content: `
			/* Hide fixed/absolute elements that overlay page sections */
			${selectorsToHide.join(', ')} {
				display: none !important;
			}

			/* Disable smooth scrolling */
			html, body {
				scroll-behavior: auto !important;
			}

			/* Disable all CSS animations and transitions to ensure frame consistency */
			*, *::before, *::after {
				animation-delay: -1ms !important;
				animation-duration: 0s !important;
				animation-iteration-count: 1 !important;
				transition-duration: 0s !important;
				transition-delay: 0s !important;
			}
		`,
	});

	// Wait a small buffer to let the layout settle and fonts finish rendering
	await page.waitForTimeout(300);
}

test.describe('Visual regression — Hero section', () => {
	test.skip(!!process.env.CI, 'Skip visual regression tests in CI');

	test('homepage hero should match baseline (EN dark)', async ({ page }) => {
		await preparePage(page, '/');
		const hero = page.locator('.hero-gradient').first();
		await expect(hero).toBeVisible();
		await expect(hero).toHaveScreenshot('hero-en-dark.png', {
			maxDiffPixelRatio: 0.05,
		});
	});

	test('homepage hero should render correctly in ES', async ({ page }) => {
		await preparePage(page, '/es/');
		const hero = page.locator('.hero-gradient').first();
		await expect(hero).toBeVisible();
		await expect(hero).toHaveScreenshot('hero-es-dark.png', {
			maxDiffPixelRatio: 0.05,
		});
	});
});

test.describe('Visual regression — Navigation & Main sections', () => {
	test.skip(!!process.env.CI, 'Skip visual regression tests in CI');
	test('header navbar should match baseline', async ({ page }) => {
		// Keep the header visible for the navbar's own visual test
		await preparePage(page, '/', { hideHeader: false });
		const header = page.locator('header').first();
		await expect(header).toBeVisible();
		await expect(header).toHaveScreenshot('header-navbar.png', {
			maxDiffPixelRatio: 0.05,
		});
	});

	test('experience section should match baseline', async ({ page }) => {
		await preparePage(page, '/');
		const experience = page.locator('#experience').first();
		await experience.scrollIntoViewIfNeeded();
		await expect(experience).toBeVisible();
		await expect(experience).toHaveScreenshot('experience-section.png', {
			maxDiffPixelRatio: 0.05,
		});
	});

	test('research section should match baseline', async ({ page }) => {
		await preparePage(page, '/');
		const research = page.locator('#research').first();
		await research.scrollIntoViewIfNeeded();
		await expect(research).toBeVisible();
		await expect(research).toHaveScreenshot('research-section.png', {
			maxDiffPixelRatio: 0.05,
		});
	});

	test('projects section should match baseline', async ({ page }) => {
		await preparePage(page, '/');
		const projects = page.locator('#projects').first();
		await projects.scrollIntoViewIfNeeded();
		await expect(projects).toBeVisible();
		await expect(projects).toHaveScreenshot('projects-section.png', {
			maxDiffPixelRatio: 0.05,
		});
	});

	test('about-me section should match baseline', async ({ page }) => {
		await preparePage(page, '/');
		const aboutMe = page.locator('#about-me').first();
		await aboutMe.scrollIntoViewIfNeeded();
		await expect(aboutMe).toBeVisible();
		await expect(aboutMe).toHaveScreenshot('about-me-section.png', {
			maxDiffPixelRatio: 0.05,
		});
	});

	test('technologies section should match baseline', async ({ page }) => {
		await preparePage(page, '/');
		const technologies = page.locator('#technologies').first();
		await technologies.scrollIntoViewIfNeeded();
		await expect(technologies).toBeVisible();
		await expect(technologies).toHaveScreenshot('technologies-section.png', {
			maxDiffPixelRatio: 0.05,
		});
	});

	test('footer should match baseline', async ({ page }) => {
		await preparePage(page, '/');
		const footer = page.locator('footer#contact');
		await footer.scrollIntoViewIfNeeded();
		await expect(footer).toBeVisible();
		await expect(footer).toHaveScreenshot('footer.png', {
			maxDiffPixelRatio: 0.05,
		});
	});
});

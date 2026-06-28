import { test, expect } from '@playwright/test';

const ACCEPTABLE_DIFF_RATIO = 0.10;

test.describe('Visual regression — Hero section', () => {
	test('homepage hero should match baseline (EN dark)', async ({ page }) => {
		await page.goto('/');
		const hero = page.locator('.hero-gradient').first();
		await expect(hero).toBeVisible();
		await expect(hero).toHaveScreenshot('hero-en-dark.png', {
			maxDiffPixelRatio: ACCEPTABLE_DIFF_RATIO,
		});
	});

	test('homepage hero should render correctly in ES', async ({ page }) => {
		await page.goto('/es/');
		const hero = page.locator('.hero-gradient').first();
		await expect(hero).toBeVisible();
		await expect(hero).toHaveScreenshot('hero-es-dark.png', {
			maxDiffPixelRatio: ACCEPTABLE_DIFF_RATIO,
		});
	});
});

test.describe('Visual regression — Key sections', () => {
	test('header navbar should match baseline', async ({ page }) => {
		await page.goto('/');
		const header = page.locator('header').first();
		await expect(header).toBeVisible();
		await expect(header).toHaveScreenshot('header-navbar.png', {
			maxDiffPixelRatio: ACCEPTABLE_DIFF_RATIO,
		});
	});

	test('experience section should match baseline', async ({ page }) => {
		await page.goto('/');
		const experience = page.locator('#experience').first();
		await experience.scrollIntoViewIfNeeded();
		await expect(experience).toBeVisible();
		await expect(experience).toHaveScreenshot('experience-section.png', {
			maxDiffPixelRatio: ACCEPTABLE_DIFF_RATIO,
		});
	});

	test('footer should match baseline', async ({ page }) => {
		await page.goto('/');
		const footer = page.locator('footer').first();
		await footer.scrollIntoViewIfNeeded();
		await expect(footer).toBeVisible();
		await expect(footer).toHaveScreenshot('footer.png', {
			maxDiffPixelRatio: ACCEPTABLE_DIFF_RATIO,
		});
	});
});

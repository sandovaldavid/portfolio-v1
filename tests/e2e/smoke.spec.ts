import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { test, expect } from './fixtures';

const CRITICAL_ROUTES = ['/', '/es/', '/about', '/es/about', '/projects', '/es/projects'] as const;
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] as const;

async function prepareRouteForAxe(page: Page, route: string) {
	const response = await page.goto(route);
	expect(response?.ok()).toBe(true);
	await page.evaluate(() => {
		localStorage.setItem('theme', 'dark');
		document.documentElement.classList.add('dark');
	});
	await page.reload();
	await page.waitForLoadState('domcontentloaded');
	await page.waitForLoadState('networkidle');
	await page.addStyleTag({
		content: `
            *, *::before, *::after {
                animation-delay: -1ms !important;
                animation-duration: 0s !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0s !important;
                transition-delay: 0s !important;
            }
        `,
	});
}

test.describe('Pull request smoke and accessibility gates', () => {
	for (const route of CRITICAL_ROUTES) {
		test(`${route} renders unique content without serious axe violations`, async ({ page }) => {
			await prepareRouteForAxe(page, route);
			await expect(page.locator('main').first()).toBeVisible();
			await expect(page.locator('h1')).toHaveCount(1);

			const results = await new AxeBuilder({ page }).withTags([...WCAG_TAGS]).analyze();
			const blockingViolations = results.violations.filter(
				violation => violation.impact === 'critical' || violation.impact === 'serious'
			);
			expect(blockingViolations).toEqual([]);
		});
	}

	test('localized About routes render their profile entry', async ({ page }) => {
		await page.goto('/about');
		await expect(page).toHaveTitle('About David Sandoval — Software Engineer');
		await expect(page.getByRole('heading', { level: 1, name: 'Full biography' })).toBeVisible();
		await expect(page.getByText('Angular and reactive frontend architecture')).toBeVisible();

		await page.goto('/es/about');
		await expect(page).toHaveTitle('Sobre David Sandoval — Ingeniero de Software');
		await expect(
			page.getByRole('heading', { level: 1, name: 'Biografía completa' })
		).toBeVisible();
		await expect(page.getByText('Angular y arquitectura frontend reactiva')).toBeVisible();
	});
});

import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';

const CRITICAL_ROUTES = ['/', '/es/', '/about', '/es/about', '/projects', '/es/projects'] as const;
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] as const;

test.describe('Pull request smoke and accessibility gates', () => {
	for (const route of CRITICAL_ROUTES) {
		test(`${route} renders unique content without serious axe violations`, async ({ page }) => {
			const response = await page.goto(route);
			expect(response?.ok()).toBe(true);
			await expect(page.locator('main').first()).toBeVisible();
			await expect(page.locator('h1')).toHaveCount(1);

			const results = await new AxeBuilder({ page }).withTags([...WCAG_TAGS]).analyze();
			const blockingViolations = results.violations.filter(
				violation => violation.impact === 'critical' || violation.impact === 'serious'
			);
			expect(blockingViolations).toEqual([]);
		});
	}
});

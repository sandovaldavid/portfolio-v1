import { test as base, expect } from '@playwright/test';

export const test = base.extend({
	page: async ({ page }, use) => {
		// Bypass splash screen: runs before the is:inline blocking script in SplashScreen.astro
		await page.addInitScript(() => {
			sessionStorage.setItem('pf_booted', 'true');
		});
		await use(page);
	},
});

export { expect };
